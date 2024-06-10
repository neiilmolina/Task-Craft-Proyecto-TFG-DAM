import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Task from "../components/Task"; 
import { TaskUIWithID } from "../store/interfaces"; 

interface TaskSectionProps {
  tasks: TaskUIWithID[];
  emptyMessage: string;
  navigation: any;
  title: string;
}

const TaskSection: React.FC<TaskSectionProps> = ({
  tasks,
  emptyMessage,
  navigation,
  title,
}) => {
  // Ordenar las tareas por fecha de manera descendente
  const sortedTasks = tasks.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


  return (
    <>
      <Text style={styles.label}>{title}</Text>
      <View>
        {sortedTasks.length === 0 ? (
          <Text style={styles.message}>{emptyMessage}</Text>
        ) : (
          sortedTasks.map((task) => (
            <Task key={task.id} task={task} navigation={navigation} />
          ))
        )}
      </View>
    </>
  );
};

export default TaskSection;

const styles = StyleSheet.create({
  label: {
    color: "gray",
    margin: 10,
  },
  message: {
    marginVertical:15,
    color: "gray",
    textAlign: "center",
    fontSize: 15,
  },
});
