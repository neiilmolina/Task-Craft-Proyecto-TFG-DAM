import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ProfileMenu } from "./ProfileMenu"; // Importamos el componente del menú
import { FIREBASE_AUTH, FIREBASE_STORAGE } from "../../../FirebaseConfig";
import { Animated, Easing } from "react-native";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ProfileImage = () => {
  const { height: screenHeight } = Dimensions.get("window");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar la visibilidad del menú
  const [menuAnim] = useState(new Animated.Value(0));

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // To ensure the image is square
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } 
  };

  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "We need permission to access your camera."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1], // To ensure the image is square
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("No Image", "Please select an image before uploading.");
      return;
    }

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const filename = image.substring(image.lastIndexOf("/") + 1);
      const storageRef = ref(FIREBASE_STORAGE, `images/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Manejar el progreso de la carga si es necesario
        },
        (error) => {
          // Manejar errores durante la carga
          Alert.alert("Error", error.message);
        },
        async () => {
          // Operación completada exitosamente
          // Obtener la URL de descarga de la imagen
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Hacer algo con la URL de descarga, como actualizar el perfil del usuario
          // En este ejemplo, solo lo mostraremos en la consola
          console.log("Download URL:", downloadURL);

          // Mostrar un mensaje de éxito
          Alert.alert("Success", "Photo uploaded successfully!");
        }
      );
    } catch (error) {
      // Manejar errores de red o de otro tipo
      Alert.alert("Error", error.message);
    }
  };


  const showMenu = () => {
    setMenuVisible(true);
    Animated.timing(menuAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const hideMenu = () => {
    Animated.timing(menuAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  const menuTranslateY = menuAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight, screenHeight - 350], // Altura del menú, ajusta según sea necesario
  });

  const handleBackgroundPress = () => {
    hideMenu();
  };

  const handleMenuPress = (e) => {
    e.stopPropagation();
  };

  return (
    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
      <View style={styles.container}>
        <TouchableOpacity onPress={showMenu}>
          <Image
            source={{
              uri: image || "https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png",
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        {menuVisible && (
          <Animated.View
            style={[
              styles.menuContainer,
              { transform: [{ translateY: menuTranslateY }] },
            ]}
          >
            <ProfileMenu
              onPickImageFromGallery={pickImageFromGallery}
              onTakePhotoWithCamera={takePhotoWithCamera}
              onUploadImage={uploadImage}
              uploading={uploading}
              onPress={handleMenuPress}
            />
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      marginBottom: 20,
      position: "relative", // Asegura que el contenedor sea relativo para que los elementos absolutos se posicionen correctamente
    },
    image: {
      width: 200,
      height: 200,
      marginVertical: 10,
      borderRadius: 100,
    },
    menuContainer: {
      position: "absolute", // Posiciona el contenedor en la parte inferior del contenedor principal
      backgroundColor: "black",
      padding:10,
      zIndex: 9,
      width:"100%",
      height:"100%"
    },
  });
  

export default ProfileImage;
