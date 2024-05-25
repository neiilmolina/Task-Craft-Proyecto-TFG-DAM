import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  sendEmailVerification,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { SettingsNavigationParamList } from "../navigation/SettingsNavigation";
import FormModal from "../components/FormModal";
import ProfileImage from "../components/ProfileImage";
import MyButton from "../../../app/components/MyButton";
import SettingsOption from "../components/SettingsOption";

type SettingsScreenNavigationProp = StackNavigationProp<
  SettingsNavigationParamList,
  "Settings"
>;

interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}

const Settings: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const actualUser = FIREBASE_AUTH.currentUser;
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [name, setName] = useState<string>(actualUser.displayName);

  const deleteActualUser = async () => {
    try {
      await deleteUser(actualUser);
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDisplayName = async (newDisplayName: string) => {
    try {
      if (newDisplayName === null) {
        Alert.alert("Error", "El campo esta vacío");
      } else if (newDisplayName === name) {
        Alert.alert("Error", "Son el mismo nombre");
      } else {
        await updateProfile(actualUser, { displayName: newDisplayName });
        Alert.alert("Success", "Display name updated successfully!");
        setName(newDisplayName);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ProfileImage />
      <View style={styles.options}>
        <SettingsOption
          icon=""
          title="Nombre"
          value={actualUser.displayName}
          description="Tap to change your password"
          onPress={() => setIsNameModalVisible(true)}
        />
        <FormModal
          isVisible={isNameModalVisible}
          onClose={() => setIsNameModalVisible(false)}
          label="Actualizar nuevo nombre"
          placeholder="Introduzca un nuevo nombre"
          value={name}
          onSave={handleUpdateDisplayName}
        />
        <SettingsOption
          icon=""
          title="Email"
          description="Tap to change your password"
          value={actualUser.email}
          onPress={() => navigation.navigate("EmailScreen")}
        />
        <SettingsOption
          icon=""
          title="Cambiar contraseña"
          description="Tap to change your password"
          onPress={() => navigation.navigate("PasswordScreen")}
        />
        <SettingsOption
          icon=""
          title="Eliminar cuenta"
          description="Tap to change your password"
          onPress={deleteActualUser}
        />
      </View>
      <MyButton
        style={{ backgroundColor: "#F89797" }}
        onPress={() => FIREBASE_AUTH.signOut()}
        title="Cerrar Sesión"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "column",
    gap: 10,
  },
  options: {
    flexDirection: "column",
    gap: 0,
  },
});

export default Settings;
