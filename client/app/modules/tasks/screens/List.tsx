import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TaskNavigationParamList } from "../navigation/ListTaskNavigation";
import useTasksLoader from "../hooks/useTasksLoader";
import TaskHeader from "../components/TaskHeader";
import TaskListSection from "../components/TaskListSection";

type ListNavigationProp = StackNavigationProp<TaskNavigationParamList, "List">;

interface ListProps {
  navigation: ListNavigationProp;
}

const List = ({ navigation }: ListProps) => {
  const { tasks, loading, error } = useTasksLoader();

  const renderTaskListSection = React.useCallback(
    ({ item }) => <TaskListSection tasks={item} navigation={navigation} />,
    [navigation]
  );

  return (
    <SafeAreaView style={styles.container}>
      <TaskHeader title="Tareas" navigation={navigation} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1A659E" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : tasks.length > 0 ? (
        <FlatList
          data={[tasks]} // FlatList requiere una prop `data`
          renderItem={renderTaskListSection}
          keyExtractor={(item, index) => index.toString()} // Necesita un `keyExtractor`
          contentContainerStyle={styles.taskContainer}
          ListFooterComponent={<View style={styles.bottomSpacing} />}
        />
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>No tienes tareas en este momento</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  taskContainer: {
    flexGrow: 1,
    padding: 10,
    paddingBottom: 50, // Espacio adicional al final del contenido
  },
  bottomSpacing: {
    height: 50, // Altura del espacio adicional
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginVertical: 25,
    color: "gray",
    textAlign: "center",
    fontSize: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
  },
});
