import { View, Text, Button } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

const Settings = () => {
  return (
    <View>
      <Text>Settings</Text>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />

    </View>
  )
}

export default Settings