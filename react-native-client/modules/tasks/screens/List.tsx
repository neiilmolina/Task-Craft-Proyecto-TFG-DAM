import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/store";
import { useUserActions } from "../hooks/useTaskActions"
import { TasksList } from "../components/TasksList";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
  return (
    <TasksList />
  );
};

export default List;
