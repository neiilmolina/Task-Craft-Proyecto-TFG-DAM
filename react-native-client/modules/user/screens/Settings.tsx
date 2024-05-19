import React from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { updateEmail, updatePassword, updateProfile, sendEmailVerification } from "firebase/auth";
import UpdateField from "../components/UdpateFIeld";
import PasswordField from "../components/PasswordField";
import { validatePassword } from "../validations/validations";
import ProfileImage from "../components/ProfileImage";

const Settings = () => {
  const actualUser = FIREBASE_AUTH.currentUser;

  const handleUpdateEmail = async (newEmail) => {
    try {
      await sendEmailVerification(actualUser);
      Alert.alert(
        "Verify Email",
        "A verification email has been sent to your new email address. Please verify it before updating your email.",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleUpdatePassword = async (newPassword) => {
    try {
      if (!validatePassword(newPassword)) {
        return;
      }
      await updatePassword(actualUser, newPassword);
      Alert.alert("Success", "Password updated successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleUpdateDisplayName = async (newDisplayName) => {
    try {
      await updateProfile(actualUser, { displayName: newDisplayName });
      Alert.alert("Success", "Display name updated successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ProfileImage />
      <UpdateField label="Email" value={actualUser.email || ""} onSave={handleUpdateEmail} />
      <UpdateField label="Nombre" value={actualUser.displayName || ""} onSave={handleUpdateDisplayName} />
      <PasswordField label="Cambia tu contraseña" onSave={handleUpdatePassword} />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "column",
  },
});

export default Settings;
