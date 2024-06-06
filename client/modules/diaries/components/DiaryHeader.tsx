import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ListNavigationParamList } from "../navigation/ListDiaryNavigation";
import Icons from "react-native-vector-icons/MaterialIcons";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import useUsersLoader from "../../user/hooks/store/useUsersLoader";
import { ToastAndroid } from "react-native";

type DiaryHeaderNavigationProp = StackNavigationProp<
  ListNavigationParamList,
  "List"
>;

interface DiaryHeaderProps {
  navigation: DiaryHeaderNavigationProp;
}

const DiaryHeader: React.FC<DiaryHeaderProps> = ({ navigation }) => {
  const actualUser = FIREBASE_AUTH.currentUser;
  const moreInfoUser = useUsersLoader().find(
    (user) => user.id === actualUser.uid
  );
  console.log(moreInfoUser);

  const handleNavigationAdd = () => {
    const parsedUserDate = new Date(moreInfoUser.date);
    const actualDate = new Date();

    const message = "Aún no es la hora de añadir un diario";
    navigation.navigate("Añadir Diario");

    // Compara las horas y los minutos
    // Meter que si hay un diario con esta fecha no se pueda cambiar de pantalla
    // VEr si no han pasado x tiempo del último diario que se ha creado a la hora que se ha establecido con el día de hoy
    // if (
    //   actualDate.getHours() > parsedUserDate.getHours() ||
    //   (actualDate.getHours() === parsedUserDate.getHours() &&
    //     actualDate.getMinutes() >= parsedUserDate.getMinutes())
    // ) {
    //   if (moreInfoUser.createDiary) {
    //     navigation.navigate("Añadir Diario");
    //   } else {
    //     moreInfoUser.createDiary = true;
    //     navigation.navigate("Añadir Diario");
    //   }
    // } else {
    //   ToastAndroid.show(message, ToastAndroid.SHORT);
    // }
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
  },
});

export default DiaryHeader;
