import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TaskNavigationParamList } from "../navigation/ListTaskNavigation";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import DetailsAddStyles from "./styles/DetailsAddStyles";
import { TaskUIWithID } from "../store/interfaces";
import {
  validateTitle,
  validateDescription,
  validateDateTime,
  maxLengthDescription,
  maxLengthTitle,
  combineDateAndTime,
} from "../validations/validations";

import DateTimeSelector from "../components/DateTimeSelector";
import CategoryPicker from "../components/CategoryPicker";
import MyButton from "../../../app/components/MyButton";
import { useTaskActions } from "../hooks/useTaskActions";
import MyInput from "../../../app/components/MyInput";
import { useTextCounter } from "../../../app/hooks/useTextCounter";
import { scheduleNotificationForTask } from "../hooks/taskNotifications";

type AddTaskScreenNavigationProp = StackNavigationProp<
  TaskNavigationParamList,
  "AddTaskScreen"
>;

interface AddTaskScreenProps {
  navigation: AddTaskScreenNavigationProp;
}

const categories = ["Tarea", "Objetivo", "Evento", "Otros"];

const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ navigation }) => {
  const userId = FIREBASE_AUTH.currentUser.uid;
  const { addNewTask } = useTaskActions();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const { length: titleLength } = useTextCounter(title);
  const { length: descriptionLength } = useTextCounter(description);

  const [errors, setErrors] = useState({
    title: null,
    description: null,
    dateTime: null,
  });

  const handleCreateTask = async () => {
    const titleError = validateTitle(title);
    const descriptionError = validateDescription(description);
    const dateTimeError = validateDateTime(date, time);

    if (titleError || descriptionError || dateTimeError) {
      setErrors({
        title: titleError,
        description: descriptionError,
        dateTime: dateTimeError,
      });
      return;
    }

    const combinedDateTime = combineDateAndTime(date, time);
    const id = uuidv4();

    const newTask: TaskUIWithID = {
      id,
      title,
      description,
      category,
      date: format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
      completed: false,
      user_id: userId,
    };

    // Programar la notificación
    await scheduleNotificationForTask(newTask);

    // Agregar la tarea a la base de datos
    addNewTask(newTask);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>
        Título ({titleLength}/{maxLengthTitle}):
      </Text>
      <MyInput
        value={title}
        onChangeText={setTitle}
        placeholder="Ingrese el título de la tarea"
        maxLength={maxLengthTitle}
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <DateTimeSelector
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        error={errors.dateTime}
        disabled={false}
      />

      <Text style={styles.label}>
        Descripción ({descriptionLength}/{maxLengthDescription}):
      </Text>
      <MyInput
        value={description}
        onChangeText={setDescription}
        placeholder="Ingrese la descripción de la tarea"
        multiline
        style={styles.description}
        maxLength={maxLengthDescription}
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description}</Text>
      )}

      <CategoryPicker
        selectedValue={category}
        onValueChange={setCategory}
        categories={categories}
        enabled={true}
      />

      <MyButton title="Crear tarea" onPress={handleCreateTask} />
    </ScrollView>
  );
};

const styles = DetailsAddStyles;

export default AddTaskScreen;
