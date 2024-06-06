import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { format } from "date-fns";
import { TaskUIWithID } from "../store/interfaces";

interface TaskProps {
  task: TaskUIWithID;
  navigation: any;
}

const Task: React.FC<TaskProps> = ({ task, navigation }) => {
  return (
    <TouchableOpacity
      key={task.id}
      onPress={() => navigation.navigate("Detalles", { task })}
    >
      <View style={styles.task}>
        <Text style={styles.taskText}>{task.title}</Text>
        <View style={styles.dateContainer}>
          <Text style={[styles.dateText, { color: new Date(task.date) > new Date() ? "black" : "#F89797" }]}>{format(task.date, "dd-MM-yyyy")}</Text>
          <Text style={[styles.dateText, { color: new Date(task.date) > new Date() ? "black" : "#F89797" }]}>{format(task.date, "HH:mm")}</Text>
        </View>
        <Text style={styles.dateText}>{task.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Task;

const styles = StyleSheet.create({
  task: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#ffff",
    gap: 10,
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    color: "black",
  },
  taskText: {
    fontSize: 16,
    color: "#1A659E",
  },
  dateContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    color: "black",
  },
});
