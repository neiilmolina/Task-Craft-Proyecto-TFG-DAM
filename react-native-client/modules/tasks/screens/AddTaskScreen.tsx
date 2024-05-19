import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useTaskActions } from "../hooks/useTaskActions";

import { StackNavigationProp } from "@react-navigation/stack";
import { TaskNavigationParamList } from "../navigation/ListTaskNavigation";

import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

type AddTaskScreenNavigationProp = StackNavigationProp<
  TaskNavigationParamList,
  "AddTaskScreen"
>;

interface AddTaskScreenProps {
  navigation: AddTaskScreenNavigationProp;
}

const categories = ["Tarea", "Objetivo", "Evento", "Otros"];

const AddTaskScreen: React.FC<AddTaskScreenProps> = ({navigation}) => {
  const userId = FIREBASE_AUTH.currentUser.uid;
  const { addNewTask } = useTaskActions();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
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

  // Dentro de handleCreateTask
  const handleCreateTask = () => {
    // Convertir la fecha y hora a objetos Date
    const taskDate = new Date(date);
    const id = uuidv4();

    // Crear la nueva tarea con los datos ingresados
    const newTask = {
      id,
      title,
      description,
      category,
      // Formatear la fecha y la hora a una cadena en formato ISO 8601
      date: format(taskDate, "yyyy-MM-dd'T'HH:mm:ss"),
      completed: false,
      user_id: userId, // Aquí deberías obtener el ID del usuario actual
    };
    console.log("Nueva tarea:", newTask);
    addNewTask(newTask);
    navigation.goBack(); 
    // Aquí podrías enviar la nueva tarea al backend o realizar otras acciones necesarias
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Ingrese el título de la tarea"
      />
      <View style={styles.timeDateContainer}>
        <View style={styles.dateContainer}>
          <Text>{date.toDateString()}</Text>
          <Button title="Fecha" onPress={showDatePicker} />
        </View>
        <View style={styles.dateContainer}>
          <Text>{time.toLocaleTimeString()}</Text>
          <Button title="Hora" onPress={showTimePicker} />
        </View>
      </View>

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
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

      <Button title="Crear tarea" onPress={handleCreateTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#1A659E",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  timeDateContainer: {
    marginTop: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default AddTaskScreen;
