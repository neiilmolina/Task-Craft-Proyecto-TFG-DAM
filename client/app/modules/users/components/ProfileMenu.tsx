import React from "react";
import { View, Button, Image, StyleSheet, Animated } from "react-native";
import { updateProfile } from "firebase/auth";
import useImagePicker from "../hooks/ProfileMenu/useImagePicker";
import useImageUpload from "../hooks/ProfileMenu/useImageUpload";
import useMenuAnimation from "../hooks/ProfileMenu/useMenuAnimation";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import MyButton from "../../../components/MyButton";

const ProfileMenu = ({ image, setImage }) => {
  const actualUser = FIREBASE_AUTH.currentUser;
  
  if (!actualUser) {
    return null; // Or some fallback UI
  }

  const {
    image: imageMenu,
    pickImageFromGallery,
    takePhotoWithCamera,
    setImage: setImageMenu,
  } = useImagePicker(image);
  
  const { uploading, uploadImage } = useImageUpload(actualUser, imageMenu);
  const { menuAnim } = useMenuAnimation();

  const handleUploadImage = async () => {
    try {
      const downloadURL = await uploadImage();
      if (downloadURL) {
        updateProfileImage(downloadURL);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfileImage = async (url) => {
    try {
      await updateProfile(actualUser, { photoURL: url });
      setImage(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Animated.View
      style={[
        styles.menuContainer,
        {
          transform: [
            {
              translateY: menuAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [500, 0],
              }),
            },
          ],
        },
      ]}
    >
      {imageMenu && <Image source={{ uri: imageMenu }} style={styles.image} />}
      <View style={styles.options}>
        <MyButton
          title="Galería"
          onPress={pickImageFromGallery}
          disabled={uploading}
        />
        <MyButton
          title="Cámara"
          onPress={takePhotoWithCamera}
          disabled={uploading}
        />
      </View>
      <MyButton
        title="Subir Imagen"
        onPress={handleUploadImage}
        disabled={imageMenu === image || uploading}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    bottom: 450,
    width: 395,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 2,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 100,
    alignSelf: "center",
  },
});
export default ProfileMenu;
