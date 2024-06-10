import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TaskNavigationParamList } from "../navigation/ListTaskNavigation";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
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
import MyButton from "../../../components/MyButton";
import { useTaskActions } from "../hooks/useTaskActions";
import MyInput from "../../../components/MyInput";
import { useTextCounter } from "../../../hooks/useTextCounter";
import { scheduleNotificationForTask } from "../hooks/taskNotifications";

// Definición del tipo de navegación para AddTaskScreen
type AddTaskScreenNavigationProp = StackNavigationProp<
  TaskNavigationParamList,
  "AddTaskScreen"
>;

// Propiedades de AddTaskScreen
interface AddTaskScreenProps {
  navigation: AddTaskScreenNavigationProp;
}

// Array de categorías para la tarea
const categories = ["Tarea", "Objetivo", "Evento", "Otros"];

const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ navigation }) => {
  // Obtener el ID de usuario actual
  const userId = FIREBASE_AUTH.currentUser.uid;
  // Obtener acciones relacionadas con las tareas
  const { addNewTask } = useTaskActions();
  // Estados locales para el título, descripción, categoría, fecha y hora
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  // Contadores de caracteres para el título y la descripción
  const { length: titleLength } = useTextCounter(title);
  const { length: descriptionLength } = useTextCounter(description);

  // Estado para errores de validación
  const [errors, setErrors] = useState({
    title: null,
    description: null,
    dateTime: null,
  });

  // Manejar la creación de una nueva tarea
  const handleCreateTask = async () => {
    // Validar título, descripción y fecha/hora
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

    // Combinar fecha y hora seleccionadas
    const combinedDateTime = combineDateAndTime(date, time);
    // Generar un ID único para la tarea
    const id = uuidv4();

    // Crear nueva tarea
    const newTask: TaskUIWithID = {
      id,
      title,
      description,
      category,
      date: format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
      completed: false,
      user_id: userId,
    };

    // Programar la notificación para la tarea
    await scheduleNotificationForTask(newTask);

    // Agregar la tarea a la base de datos
    addNewTask(newTask);
    // Navegar de regreso
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Título */}
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

      {/* Selector de fecha y hora */}
      <DateTimeSelector
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        error={errors.dateTime}
        disabled={false}
      />

      {/* Descripción */}
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

      {/* Selector de categoría */}
      <CategoryPicker
        selectedValue={category}
        onValueChange={setCategory}
        categories={categories}
        enabled={true}
      />

      {/* Botón para crear la tarea */}
      <MyButton title="Crear tarea" onPress={handleCreateTask} />
    </ScrollView>
  );
};

// Estilos
const styles = DetailsAddStyles;

export default AddTaskScreen;
