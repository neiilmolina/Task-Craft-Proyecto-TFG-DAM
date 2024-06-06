import { StyleSheet, Text, Pressable, Alert } from "react-native";
import { View } from "../components/ViewCalendar";
import { TaskNavigationParamList } from "../navigation/ListTaskNavigation";
import { Agenda, AgendaEntry } from "react-native-calendars";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import useGroupTasksByDate from "../hooks/useGroupDateTasks"; // import your new function
import { AgendaEntryUI } from "../store/interfaces";
import useTasksLoader from "../hooks/useTasksLoader";
import { CalendarTaskNavigationParamList } from "../navigation/CalendarTaskNavigation";
import TaskHeader from "../components/TaskHeader";

type CalendarScreenNavigationProp = StackNavigationProp<
  CalendarTaskNavigationParamList,
  "Calendar"
>;

interface CalendarScreenProps {
  navigation: CalendarScreenNavigationProp;
}

const Calendar: React.FC<CalendarScreenProps> = ({ navigation }) => {
  const { tasks } = useTasksLoader();
  const groupedTasks = useGroupTasksByDate(tasks); // group tasks by date

  const renderItem = (reservation: AgendaEntryUI, isFirst: boolean) => {
    const getTask = tasks.find((t) => t.id === reservation.id);
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";

    return (
      <Pressable
        style={[styles.item, { height: reservation.height }]}
        onPress={() => navigation.navigate("Detalles", { task: getTask })}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
        <Text style={{ fontSize, color }}>
          {getTask.description.substring(0, 200)}
        </Text>
      </Pressable>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TaskHeader title="Calendario" navigation={navigation} />
      <Agenda
        items={groupedTasks}
        selected={new Date().toISOString().split("T")[0]} // corrected line
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
      />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
