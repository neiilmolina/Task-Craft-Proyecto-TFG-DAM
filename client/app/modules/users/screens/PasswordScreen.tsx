import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { validatePassword } from "../validations/validations";
import { updatePassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { SettingsNavigationParamList } from "../navigation/SettingsNavigation";
import MyButton from "../../../components/MyButton";
import PasswordInput from "../../../components/PasswordInput";

type PasswordScreenNavigationProp = StackNavigationProp<
  SettingsNavigationParamList,
  "PasswordScreen"
>;

interface PasswordScreenProps {
  navigation: PasswordScreenNavigationProp;
}

const PasswordScreen: React.FC<PasswordScreenProps> = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const actualUser = FIREBASE_AUTH.currentUser;

  const handleUpdatePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "New password and confirmation do not match");
        return;
      }
      if (!validatePassword(newPassword)) {
        Alert.alert("Error", "Password does not meet requirements");
        return;
      }
      await updatePassword(actualUser, newPassword);
      Alert.alert("Success", "Password updated successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <PasswordInput
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Current Password"
      />
      <PasswordInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
      />
      <PasswordInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm New Password"
      />
      <View style={styles.Buttons}>
        <MyButton
          style={styles.MyButton}
          title="Save"
          onPress={handleUpdatePassword}
        />
        <MyButton
          style={[styles.MyButton, { backgroundColor: "#F89797" }]}
          title="Cancel"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  Buttons: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  MyButton: {
    width: 120,
    height: 50,
  },
});

export default PasswordScreen;
