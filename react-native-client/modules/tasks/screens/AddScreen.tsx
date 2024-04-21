import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const categories = ["Tarea", "Objetivo", "Evento", "Otros"];

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

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

  const handleCreateTask = () => {
    // Aquí puedes implementar la lógica para crear la tarea con los datos ingresados
    const newTask = {
      title,
      description,
      category,
      date,
      completed: false,
      user_id: "id_del_usuario", // Aquí deberías obtener el ID del usuario actual
    };
    console.log("Nueva tarea:", newTask);
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

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Ingrese la descripción de la tarea"
      />

      <Text style={styles.label}>Categoría:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue:string) => setCategory(itemValue)}
        style={styles.picker}
      >
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>

      <Text style={styles.label}>Fecha:</Text>
      <View style={styles.dateContainer}>
        <Text>{date.toDateString()}</Text>
        <Button title="Seleccionar fecha" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
      </View>

      <Button title="Crear tarea" onPress={handleCreateTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
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
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
