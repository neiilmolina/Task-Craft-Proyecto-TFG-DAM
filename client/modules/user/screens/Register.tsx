import React, { useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../hooks/Authentifcation/useAuth";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthNavigationParamList } from "../navigation/AuthNavigator";
import StylesAuthForm from "./styles/StylesAuthForm";
import MyButton from "../../../app/components/MyButton";
import { ToastAndroid } from "react-native";
import PasswordInput from "../../../app/components/PasswordInput";
import MyInput from "../../../app/components/MyInput";
import { useUserActions } from "../hooks/store/useUserActions";
import { UserUIWithId } from "../store/interfaces";

// Asumiendo que AuthNavigationParamList es un tipo definido en otro archivo, aquí lo importamos

type RegisterScreenNavigationProp = StackNavigationProp<
  AuthNavigationParamList,
  "Register"
>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const Register: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp } = useAuth();
  const { addNewUser } = useUserActions();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      ToastAndroid.show("Las contraseñas no coinciden", ToastAndroid.SHORT);
      return;
    }
    try {
      const { correctValidation, newUserId } = await signUp(email, password);

      // Si el registro es exitoso, podrías navegar a la pantalla de inicio de sesión aquí
      if (correctValidation) {
        navigation.navigate("Login");
        const date = new Date(Date.now());
        date.setHours(10);
        const userDataBase: UserUIWithId = {
          id: newUserId,
          date: date.toISOString(),
          admin: false,
          createDiary: true,
        };

        addNewUser(userDataBase);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Registrate</Text>
      <View style={styles.card}>
        <Text style={styles.h1}>Bienvenido</Text>
        <Text style={styles.h3}>Pon tus credenciales</Text>
        <View style={styles.form}>
          <MyInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
          />
          <PasswordInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <PasswordInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View style={styles.bottom}>
          <MyButton title="Registrarse" onPress={handleRegister} />
          <Text style={styles.switchText}>
            ¿Tienes cuenta?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Login")}
            >
              Inicia Sesión
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StylesAuthForm;

export default Register;
