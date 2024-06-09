import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import ProfileMenu from "./ProfileMenu"; // Importamos el componente del menú
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";

const ProfileImage = () => {
  const actualUser = FIREBASE_AUTH.currentUser;
  const urlImage = actualUser?.photoURL 
    ? actualUser.photoURL 
    : "https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png";
  
  const [image, setImage] = useState<string>(urlImage);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleImagePress = () => {
    setMenuVisible(!menuVisible);
  };

  const handleOverlayPress = () => {
    setMenuVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={handleImagePress}>
        <View style={styles.container}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </TouchableOpacity>
      {menuVisible && (
        <>
          <TouchableWithoutFeedback onPress={handleOverlayPress}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <ProfileMenu image={image} setImage={setImage} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 100,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
});

export default ProfileImage;
