import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import Register from './Register';

export type YourStackParamList = {
  Login: undefined;
  Register: undefined;
  // Otras pantallas de tu aplicación y sus parámetros si los tienen
};

const Stack = createStackNavigator<YourStackParamList>();

const AuthNavigator = () => {
  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  </NavigationContainer>
  )
};

export default AuthNavigator;