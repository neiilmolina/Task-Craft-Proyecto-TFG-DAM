import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddTaskScreen from "../screens/AddTaskScreen";
import Details from "../screens/Details";
import Calendar from "../screens/Calendar";
import { TaskUIWithID } from "../store/interfaces";

export type CalendarTaskNavigationParamList = {
  Calendar: undefined; // Define los parámetros que se pasarán a la pantalla Details
  AddTaskScreen: undefined;
  Details: { task: TaskUIWithID };
};

const Stack = createStackNavigator();

const CalendarTaskNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendario"
        component={Calendar}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Añadir Tarea" component={AddTaskScreen} />
      <Stack.Screen name="Detalles" component={Details} />
    </Stack.Navigator>
  );
};

export default CalendarTaskNavigation;
