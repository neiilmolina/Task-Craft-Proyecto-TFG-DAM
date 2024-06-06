import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons"

interface TaskHeaderProps {
  title: string;
  navigation: any;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({title, navigation }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Añadir Tarea")}
      >
        <Icons name="add" color="white" size={30}/>
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

export default TaskHeader;
