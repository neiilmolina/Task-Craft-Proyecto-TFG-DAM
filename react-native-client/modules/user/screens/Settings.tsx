import { View, Text, Button } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { useAppSelector } from '../../../store/hooks/store';
import useAuthActions from '../hooks/useAuthActions';

// import { StackNavigationProp } from "@react-navigation/stack";
// import { AuthNavigationParamList } from "../navigation/AuthNavigator";

// type SettingsScreenNavigationProp = StackNavigationProp<
//   AuthNavigationParamList,
//   "Settings"
// >;

// interface SettingsScreenProps {
//   navigation: SettingsScreenNavigationProp;
// }

const Settings  = () => {
  const { isAuth } = useAppSelector((state) => state.auth)
  const { authLogout } = useAuthActions()

  return (
    <View>
      <Text>Settings</Text>
      <Button onPress={() => authLogout() } title='logout' />

    </View>
  )
}

export default Settings