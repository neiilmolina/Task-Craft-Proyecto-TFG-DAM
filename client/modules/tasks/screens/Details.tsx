import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CheckBox from "react-native-check-box";
import { StackNavigationProp } from "@react-navigation/stack";
import { TaskNavigationParamList } from "../navigation/ListTaskNavigation";
import { format } from "date-fns";
import { TaskUI, TaskUIWithID } from "../store/interfaces";
import MyButton from "../../../app/components/MyButton";
import MyInput from "../../../app/components/MyInput";
import DetailsAddStyles from "./styles/DetailsAddStyles";
import DateTimeSelector from "../components/DateTimeSelector";
import CategoryPicker from "../components/CategoryPicker";
import {
  validateTitle,
  validateDescription,
  validateDateTime,
  maxLengthDescription,
  maxLengthTitle,
  combineDateAndTime,
} from "../validations/validations";
import { useTextCounter } from "../../../app/hooks/useTextCounter";
import { useTaskActions } from "../hooks/useTaskActions";

type DetailsScreenNavigationProp = StackNavigationProp<
  TaskNavigationParamList,
  "Details"
>;

interface DetailsScreenProps {
  navigation: DetailsScreenNavigationProp;
  route: { params: { task: TaskUIWithID } };
}

const categories = ["Tarea", "Objetivo", "Evento", "Otros"];

const Details: React.FC<DetailsScreenProps> = ({ navigation, route }) => {
  const { removeTask, editExistingTask } = useTaskActions();
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category);
  const [date, setDate] = useState(new Date(task.date));
  const [time, setTime] = useState(new Date(task.date));
  const [isEditing, setIsEditing] = useState(false);

  const { length: titleLength } = useTextCounter(title);
  const { length: descriptionLength } = useTextCounter(description);

  const [errors, setErrors] = useState({
    title: null,
    description: null,
    dateTime: null,
  });

  const handleEditTask = () => {
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
    const updatedTask: TaskUI = {
      title,
      description,
      category,
      date: format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
      completed,
      user_id: task.user_id,
    };
    editExistingTask(task.id, updatedTask);
    setIsEditing(false);
    navigation.goBack();
  };

  const handleDeleteTask = () => {
    removeTask(task.id);
    navigation.goBack();
  };

  const handleCancelEdit = () => {
    setTitle(task.title);
    setDescription(task.description);
    setCategory(task.category);
    setDate(new Date(task.date));
    setTime(new Date(task.date));
    setCompleted(task.completed);
    setIsEditing(false);
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
        editable={isEditing}
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <DateTimeSelector
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        error={errors.dateTime}
        disabled={!isEditing}
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
        editable={isEditing}
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description}</Text>
      )}

      <CategoryPicker
        selectedValue={category}
        onValueChange={setCategory}
        categories={categories}
        enabled={isEditing}
      />

      <CheckBox
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "space-around",
          alignContent: "center",
        }}
        onClick={() => {
          if (isEditing) setCompleted(!completed);
        }}
        isChecked={completed}
        rightText="Completado"
      />

      <View style={styles.buttons}>
        {isEditing ? (
          <>
            <MyButton
              style={styles.MyButton}
              title="Guardar"
              onPress={handleEditTask}
            />
            <MyButton
              style={[styles.MyButton, { backgroundColor: "#F89797" }]}
              title="Cancelar"
              onPress={handleCancelEdit}
            />
          </>
        ) : (
          <>
            <MyButton
              style={styles.MyButton}
              title="Editar"
              onPress={() => setIsEditing(true)}
            />
            <MyButton
              style={[styles.MyButton, { backgroundColor: "#F89797" }]}
              title="Eliminar"
              onPress={handleDeleteTask}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = DetailsAddStyles;

export default Details;
