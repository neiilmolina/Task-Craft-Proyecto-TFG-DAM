import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthNavigationParamList } from '../navigation/AuthNavigator';
type LoginScreenNavigationProp = StackNavigationProp<AuthNavigationParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}
const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      // Si el inicio de sesión es exitoso, podrías navegar a otra pantalla aquí
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Bienvenido</Text>
      <View style={styles.card}>
        <Text style={styles.headerText}>Inicio de Sesión</Text>
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
        <Button title="Login" onPress={handleSignIn} disabled={loading} />
        <Text style={styles.switchText}>
          ¿No tienes cuenta?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
            Regístrate
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  h1:{
    paddingTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#007BFF', // Blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF', // White card
    margin: 20,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    height: '90%',
  },
  headerText: {
    color: '#FFFFFF', // White text
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#000000', // Black text
  },
  link: {
    color: '#007BFF', // Blue text
  },
});

export default Login;
