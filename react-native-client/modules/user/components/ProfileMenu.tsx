import React from "react";
import { View, Button, Image, StyleSheet, Animated } from "react-native";
import { updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import useImagePicker from "../hooks/useImagePicker";
import useImageUpload from "../hooks/useImageUpload";
import useMenuAnimation from "../hooks/useMenuAnimation";

const ProfileMenu = ({ image, setImage }) => {
  const actualUser = FIREBASE_AUTH.currentUser;
  
  if (!actualUser) {
    return null; // Or some fallback UI
  }

  const {
    image: imageMenu,
    pickImageFromGallery,
    takePhotoWithCamera,
  } = useImagePicker(image);
  
  const { uploading, uploadImage } = useImageUpload(actualUser, imageMenu);
  const { menuAnim, toggleMenu, menuVisible } = useMenuAnimation();

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
      toggleMenu(); // Cerrar el menú después de actualizar la imagen
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
        <Button
          title="Galería"
          onPress={pickImageFromGallery}
          disabled={uploading}
        />
        <Button
          title="Cámara"
          onPress={takePhotoWithCamera}
          disabled={uploading}
        />
      </View>
      <Button
        title="Subir Imagen"
        onPress={handleUploadImage}
        disabled={imageMenu === image || uploading}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 60,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    zIndex: 2,
    height: 250,
    gap: 10,
  },
  options: {
    flexDirection: "row",
    gap: 30,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
});

export default ProfileMenu;
