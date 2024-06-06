import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { SettingsNavigationParamList } from "../navigation/SettingsNavigation";

import FormModal from "../components/FormModal";
import ProfileImage from "../components/ProfileImage";
import SettingsOption from "../components/SettingsOption";

import MyButton from "../../../app/components/MyButton";

import IconFontisto from "react-native-vector-icons/Fontisto";
import IconFeather from "react-native-vector-icons/Feather";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useUserActions } from "../hooks/store/useUserActions";
import { useAppSelector } from "../../../store/hooks/store";
import useUsersLoader from "../hooks/store/useUsersLoader";

type SettingsScreenNavigationProp = StackNavigationProp<
  SettingsNavigationParamList,
  "Settings"
>;

interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}

const Settings: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const iconSize = 20;
  const actualUser = FIREBASE_AUTH.currentUser;
  const moreInfoUser = useUsersLoader().find((user) => user.id === actualUser.uid);
  // const { editExistingUser } = useUserActions();
  // const [dateUser, setDateUser] = useState(moreInfoUser.date);
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [name, setName] = useState<string>(actualUser.displayName);

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

  const handleUpdateUserRedux = () => {};

  return (
    <View style={styles.container}>
      <ProfileImage />
      <View style={styles.options}>
        <SettingsOption
          icon={<IconFeather name="user" size={iconSize} />}
          title="Nombre"
          value={name}
          description="Tap to change your password"
          editIcon={true}
          onPress={() => setIsNameModalVisible(true)}
        />
        <FormModal
          isVisible={isNameModalVisible}
          onClose={() => setIsNameModalVisible(false)}
          label="Actualizar nuevo nombre"
          placeholder="Introduzca un nuevo nombre"
          onSave={handleUpdateDisplayName}
        />
        <SettingsOption
          icon={<IconFontisto name="email" size={iconSize} />}
          title="Email"
          description="Tap to change your password"
          value={actualUser.email}
          editIcon={true}
          onPress={() => navigation.navigate("ChangeEmailScreen")}
        />
        <SettingsOption
          icon={<IconMaterialIcons name="password" size={iconSize} />}
          title="Cambiar contraseña"
          description="Tap to change your password"
          onPress={() => navigation.navigate("PasswordScreen")}
          editIcon={true}
          value={null}
        />
        <SettingsOption
          icon={<IconMaterialIcons name="delete" size={iconSize} />}
          title="Eliminar cuenta"
          description="Tap to change your password"
          onPress={() => navigation.navigate("DeleteUserScreen")}
          editIcon={false}
          value={null}
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
