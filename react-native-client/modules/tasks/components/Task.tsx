import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { format } from "date-fns";
import { TaskWithId } from "../store/interfaces";

interface TaskProps {
  task: TaskWithId;
  navigation: any;
}

const Task: React.FC<TaskProps> = ({ task, navigation }) => {
  return (
    <TouchableOpacity key={task.id} onPress={() => navigation.navigate("Detalles", { task })}>
      <View style={styles.task}>
        <Text style={styles.taskText}>{task.title}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{format(task.date, "yyyy-MM-dd")}</Text>
          <Text style={styles.dateText}>{format(task.date, "HH:mm:ss")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Task;

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffff",
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
    flexDirection: "column",
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    color: "black",
  },
});
