import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import AddTaskScreen from '../screens/AddTaskScreen';
import List from "../screens/List";

export type TaskNavigationParamList = {
  List: undefined;
  AddTaskScreen: undefined;
};

const Stack = createStackNavigator();

const TaskNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    </Stack.Navigator>
  );
};

export default TaskNavigation;