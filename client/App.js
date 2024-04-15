import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./firebaseConfig.js";
import SignInScreen from "./auth/SignInScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();
export default function App() {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "112619909842-ne4a0gb5kuf15ngiqlc59iqppu9cl8h2.apps.googleusercontent.com",
  }, {
    native: 'com.anonymous.client'
  });
  const getLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { id_Token } = response.params;
      const credential = GoogleAuthProvider.credential(id_Token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      } else {
      }

      return () => unsub();
    });
  }, []);

  // if(loading) ...
  return (
    /*userInfo ? <Navigation></Navigation> : */ <SignInScreen
      promptAsync={promptAsync}
    />
  );
}
