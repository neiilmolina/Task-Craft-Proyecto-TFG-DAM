import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthNavigationParamList } from "../navigation/AuthNavigator";
import MyButton from "../../../app/components/MyButton";
import StylesAuthForm from "../components/StylesAuthForm";

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
      <View style={styles.card}>
        <Text style={styles.h1}>Bienvenido</Text>
        <Text style={styles.h3}>Pon tus credenciales</Text>
        <View style={styles.form}>
          <TextInput
            value={email}
            style={styles.input}
            placeholder="Correo electrónico"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            value={password}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Contraseña"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.bottom}>
        <MyButton title="Login" onPress={handleSignIn} disabled={loading} />
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
