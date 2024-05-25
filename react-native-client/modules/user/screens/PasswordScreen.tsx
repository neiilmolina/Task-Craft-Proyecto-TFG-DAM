import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { validatePassword } from "../validations/validations";
import { updatePassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { SettingsNavigationParamList } from "../navigation/SettingsNavigation";
import MyInput from "../../../app/components/MyInput";
import MyButton from "../../../app/components/MyButton";

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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === "current") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (passwordType === "new") {
      setShowNewPassword(!showNewPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MyInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Current Password"
          secureTextEntry={!showCurrentPassword}
        />
        <TouchableOpacity
          onPress={() => togglePasswordVisibility("current")}
          style={styles.passwordVisibilityButton}
        >
          <Ionicons
            name={showCurrentPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <MyInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          secureTextEntry={!showNewPassword}
        />
        <TouchableOpacity
          onPress={() => togglePasswordVisibility("new")}
          style={styles.passwordVisibilityButton}
        >
          <Ionicons
            name={showNewPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <MyInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm New Password"
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => togglePasswordVisibility("confirm")}
          style={styles.passwordVisibilityButton}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.Buttons}>
        <MyButton
          style={styles.MyButton}
          title="Save"
          onPress={handleUpdatePassword}
        />
        <MyButton
          style={[styles.MyButton, {backgroundColor: "#F89797"}]}
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 8,
  },
  passwordVisibilityButton: {
    position: "absolute",
    right: 10,
  },
  Buttons: {
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    gap:10,
  },
  MyButton: {
    width: 120,
    height: 50,
  },
});

export default PasswordScreen;
