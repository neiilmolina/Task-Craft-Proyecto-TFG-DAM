// ProfileImage.js
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import ProfileMenu from "./ProfileMenu"; // Importamos el componente del menú
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

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

  return (
    <TouchableOpacity onPress={handleImagePress}>
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        {menuVisible && <ProfileMenu image={image} setImage={setImage}/>} 
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default ProfileImage;
