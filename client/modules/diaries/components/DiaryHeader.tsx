import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ListNavigationParamList } from "../navigation/ListDiaryNavigation";
import Icons from "react-native-vector-icons/MaterialIcons";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import useUsersLoader from "../../user/hooks/store/useUsersLoader";
import { DiaryUIWithID } from "../store/interfaces";

type DiaryHeaderNavigationProp = StackNavigationProp<
  ListNavigationParamList,
  "List"
>;

interface DiaryHeaderProps {
  lastDiary: DiaryUIWithID | null;  // Ensure that lastDiary can be null
  navigation: DiaryHeaderNavigationProp;
}

const DiaryHeader: React.FC<DiaryHeaderProps> = ({ lastDiary, navigation }) => {
  const actualUser = FIREBASE_AUTH.currentUser;
  const moreInfoUser = useUsersLoader().find(
    (user) => user.id === actualUser?.uid
  );

  const handleNavigationAdd = () => {
    const actualDate = new Date();
    const today = actualDate.toDateString();

    if (lastDiary && new Date(lastDiary.date).toDateString() === today) {
      ToastAndroid.show("Aún no es la hora de añadir un diario", ToastAndroid.SHORT);
    } else {
      navigation.navigate("Añadir Diario");
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Diarios</Text>
      <TouchableOpacity onPress={handleNavigationAdd}>
        <Icons name="add" color="white" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1A659E",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default DiaryHeader;
