import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { SettingsNavigationParamList } from "../navigation/SettingsNavigation";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import StylesFormOptions from "./styles/StylesFormOptions";
import MyButton from "../../../app/components/MyButton";
import MyInput from "../../../app/components/MyInput";
import { sendEmailVerification, updateEmail } from "firebase/auth";

type EmailScreenNavigationProp = StackNavigationProp<
  SettingsNavigationParamList,
  "EmailScreen"
>;

interface EmailScreenProps {
  navigation: EmailScreenNavigationProp;
}

const EmailScreen: React.FC<EmailScreenProps> = ({ navigation }) => {
  const actualUser = FIREBASE_AUTH.currentUser;
  const [newEmail, setNewEmail] = useState("");

  const handleUpdateEmail = async () => {
    try {
      // Aquí deberías actualizar el email del usuario
    //   await sendEmailVerification(actualUser);
    
    await updateEmail(actualUser, newEmail); // Asegúrate de tener permisos adecuados para actualizar el email
    await FIREBASE_AUTH.signOut()
      Alert.alert(
        "Verify Email",
        "A verification email has been sent to your new email address. Please verify it before updating your email.",
        [{ text: "OK" }]
      );
      navigation.goBack(); // Vuelve a la pantalla anterior tras el éxito
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log(error)
    }
  };

  return (
    <View style={[styles.container, { height: 50 }]}>
      <MyInput
        style={styles.input}
        value={newEmail}
        onChangeText={setNewEmail}
        placeholder="Nuevo email"
      />
      <View style={styles.Buttons}>
        <MyButton
          style={styles.MyButton}
          title="Guardar"
          onPress={() => handleUpdateEmail()} // Llamada correcta a la función
        />
        <MyButton
          style={[styles.MyButton, { backgroundColor: "#F89797" }]}
          title="Cancelar"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StylesFormOptions;

export default EmailScreen;
