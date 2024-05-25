import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "react-native-check-box";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useTaskActions } from "../hooks/useTaskActions";

import { StackNavigationProp } from "@react-navigation/stack";
import { TaskNavigationParamList } from "../navigation/ListTaskNavigation";

import { format } from "date-fns";

import { Task, TaskWithId } from "../store/interfaces";

import MyButton from "../../../app/components/MyButton";
import MyInput from "../../../app/components/MyInput";
import DetailsAddStyles from "./styles/DetailsAddStyles";

type DetailsScreenNavigationProp = StackNavigationProp<
  TaskNavigationParamList,
  "Details"
>;

interface DetailsScreenProps {
  navigation: DetailsScreenNavigationProp;
  route: { params: { task: TaskWithId } }; // Corrige la definición de los props de ruta
}

const categories = ["Tarea", "Objetivo", "Evento", "Otros"];

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation, route }) => {
  const { removeTask, editExistingTask } = useTaskActions();
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed); // Asegura que el estado completed se inicialice con el valor de la tarea
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category);
  const [date, setDate] = useState(new Date(task.date)); // Convierte la fecha de la tarea en un objeto Date
  const [time, setTime] = useState(new Date(task.date)); // Usa la misma fecha de la tarea para la hora
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate: Date) => {
    hideDatePicker();
    setDate(selectedDate);
  };

  const showTimePicker = () => {
    setIsTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setIsTimePickerVisible(false);
  };

  const handleConfirmTime = (selectedTime: Date) => {
    hideTimePicker();
    setTime(selectedTime);
  };

  const handleEditTask = () => {
    const updatedTask: Task = {
      title,
      description,
      category,
      date: format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss"),
      completed,
      user_id: task.user_id,
    };
    editExistingTask(task.id, updatedTask);
    navigation.goBack(); // Vuelve a la pantalla anterior después de editar la tarea
  };

  const handleDeleteTask = () => {
    removeTask(task.id);
    navigation.goBack(); // Vuelve a la pantalla anterior después de eliminar la tarea
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <MyInput
        value={title}
        onChangeText={setTitle}
        placeholder="Ingrese el título de la tarea"
      />

      <View style={styles.timeDateContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.label}>{date.toDateString()}</Text>
          <MyButton
            style={styles.MyButton}
            title="Fecha"
            onPress={showDatePicker}
          />
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.label}>{time.toLocaleTimeString()}</Text>
          <MyButton
            style={styles.MyButton}
            title="Hora"
            onPress={showTimePicker}
          />
        </View>
      </View>

      <Text style={styles.label}>Descripción:</Text>
      <MyInput
        value={description}
        style={styles.description}
        onChangeText={setDescription}
        multiline
        placeholder="Ingrese la descripción de la tarea"
        textAlignVertical="top"
      />

      <Text style={styles.label}>Categoría:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue: string) => setCategory(itemValue)}
        style={styles.picker}
      >
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />

      <CheckBox
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "space-around",
          alignContent: "center",
        }}
        onClick={() => {
          setCompleted(!completed);
        }}
        isChecked={completed}
        rightText="Completado"
      />

      <View style={styles.buttons}>
        <MyButton
          style={styles.MyButton}
          title="Editar"
          onPress={handleEditTask}
        />
        <MyButton
          style={[styles.MyButton, { backgroundColor: "#F89797" }]}
          title="Eliminar"
          onPress={handleDeleteTask}
        />
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = DetailsAddStyles;