import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from "firebase/auth";
import StylesFormOptions from "./styles/StylesFormOptions";
import MyInput from "../../../app/components/MyInput";
import PasswordInput from "../../../app/components/PasswordInput";
import MyButton from "../../../app/components/MyButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { SettingsNavigationParamList } from "../navigation/SettingsNavigation";

type ChangeEmailScreenNavigationProp = StackNavigationProp<
  SettingsNavigationParamList,
  "ChangeEmailScreen"
>;

interface ChangeEmailScreenProps {
  navigation: ChangeEmailScreenNavigationProp;
}

const ChangeEmailScreen: React.FC<ChangeEmailScreenProps> = ({ navigation }) => {
  const actualUser = FIREBASE_AUTH.currentUser;
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdateEmail = async () => {
    if (!email || !password || !newEmail) {
      Alert.alert("Error", "Please enter your email and password.");
      return;
    }
    if (email === newEmail) {
      Alert.alert("Error", "El nuevo email debe de ser distinto del actual");
      return;
    }
    const credential = EmailAuthProvider.credential(email, password);
    try {
      await reauthenticateWithCredential(actualUser, credential);
      await updateEmail(actualUser, newEmail);
      Alert.alert("Success", "Tu email se ha cambiado");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Incorrect password. Please try again.");
      } else if (error.code === "auth/requires-recent-login") {
        Alert.alert("Error", "Please re-authenticate and try again.");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <MyInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email actual"
      />
      <MyInput
        style={styles.input}
        value={newEmail}
        onChangeText={setNewEmail}
        placeholder="Nuevo email"
      />
      <PasswordInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
      />
      <View style={styles.Buttons}>
        <MyButton
          style={styles.MyButton}
          title="Guardar"
          onPress={handleUpdateEmail}
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

const styles = StyleSheet.create(StylesFormOptions);

export default ChangeEmailScreen;
