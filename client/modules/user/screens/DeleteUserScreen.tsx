import { View, Alert } from "react-native";
import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { SettingsNavigationParamList } from "../navigation/SettingsNavigation";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import StylesFormOptions from "./styles/StylesFormOptions";
import MyButton from "../../../app/components/MyButton";
import MyInput from "../../../app/components/MyInput";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import PasswordInput from "../../../app/components/PasswordInput";
import { useUserActions } from "../hooks/store/useUserActions";

type DeleteUserScreenNavigationProp = StackNavigationProp<
  SettingsNavigationParamList,
  "DeleteUserScreen"
>;

interface DeleteUserScreenProps {
  navigation: DeleteUserScreenNavigationProp;
}

const DeleteUserScreen: React.FC<DeleteUserScreenProps> = ({ navigation }) => {
  const actualUser = FIREBASE_AUTH.currentUser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { removeUser } = useUserActions();

  const confirmDeleteUser = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: handleDeleteUser,
        },
      ]
    );
  };

  const handleDeleteUser = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter your email and password.");
      return;
    }
    const credential = EmailAuthProvider.credential(email, password);
    try {
      await reauthenticateWithCredential(actualUser, credential);
      await actualUser.delete();
      removeUser(actualUser.uid);
      Alert.alert("Success", "Your account has been deleted.");
      await FIREBASE_AUTH.signOut(); // Navigate to login screen or another appropriate screen after deletion
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
    <View style={[styles.container, { height: 50 }]}>
      <MyInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
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
          title="Eliminar"
          onPress={confirmDeleteUser} // Llamada a la función de confirmación
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

export default DeleteUserScreen;
