import React, { useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../hooks/Authentifcation/useAuth";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthNavigationParamList } from "../navigation/AuthNavigator";
import MyButton from "../../../app/components/MyButton";
import StylesAuthForm from "./styles/StylesAuthForm";
import MyInput from "../../../app/components/MyInput";
import PasswordInput from "../../../app/components/PasswordInput";
import ImageLogo from "../../../app/components/ImageLogo";

type LoginScreenNavigationProp = StackNavigationProp<
  AuthNavigationParamList,
  "Login"
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}
const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Inicia Sesión</Text>
      <ImageLogo width={70} height={70}/>
      <View style={styles.card}>
        <Text style={styles.h1}>Bienvenido</Text>
        <Text style={styles.h3}>Introduzca tus credenciales</Text>
        <View style={styles.form}>
          <MyInput
            value={email}
            style={styles.input}
            placeholder="Correo electrónico"
            textAlignVertical="center"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <PasswordInput
            value={password}
            style={styles.input}
            placeholder="Contraseña"
            textAlignVertical="center"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.bottom}>
          <MyButton title="Acceder" onPress={handleSignIn} disabled={loading} />
          <Text style={styles.switchText}>
            ¿No tienes cuenta?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Register")}
            >
              Regístrate
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StylesAuthForm;

export default Login;
