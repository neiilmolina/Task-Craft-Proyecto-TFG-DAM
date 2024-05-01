import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthNavigationParamList } from "../navigation/AuthNavigator";

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

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      await signUp(email, password);
      // Si el registro es exitoso, podrías navegar a la pantalla de inicio de sesión aquí
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Bienvenido</Text>
      <View style={styles.card}>
        <Text style={styles.headerText}>Inicio de Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button title="Registrarse" onPress={handleRegister} />
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
  );
};

const styles = StyleSheet.create({
  h1: {
    paddingTop: 40,
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: '#007BFF', // Blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    backgroundColor: "#FFFFFF", // White card
    margin: 20,
    borderRadius: 10,
    padding: 20,
    width: "80%",
    height: "90%",
  },
  headerText: {
    color: '#FFFFFF', // White text
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#000000', // Black text
  },
  link: {
    color: "blue",
  },
});

export default Register;
