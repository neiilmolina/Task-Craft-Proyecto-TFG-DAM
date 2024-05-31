import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ListNavigationParamList } from "../navigation/ListDiaryNavigation";

type DiaryHeaderNavigationProp = StackNavigationProp<
  ListNavigationParamList,
  "List"
>;

interface DiaryHeaderProps {
  navigation: DiaryHeaderNavigationProp;
}


const DiaryHeader: React.FC<DiaryHeaderProps> = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Diarios</Text>
      <Button
        title="Añadir diario"
        onPress={() => navigation.navigate("Añadir Tarea")}
      />
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
