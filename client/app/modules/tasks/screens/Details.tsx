import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CheckBox from "react-native-check-box";
import { StackNavigationProp } from "@react-navigation/stack";
import { TaskNavigationParamList } from "../navigation/ListTaskNavigation";
import { format } from "date-fns";
import { TaskUI, TaskUIWithID } from "../store/interfaces";
import MyButton from "../../../components/MyButton";
import MyInput from "../../../components/MyInput";
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
import { useTextCounter } from "../../../hooks/useTextCounter";
import { useTaskActions } from "../hooks/useTaskActions";
import {
  rescheduleNotificationForTask,
  removeNotificationIdFromStorage,
} from "../hooks/taskNotifications";

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
  // Acciones relacionadas con las tareas
  const { removeTask, editExistingTask } = useTaskActions();
  // Obtener la tarea actual de las props de ruta
  const { task } = route.params;
  // Estados locales para los datos de la tarea y el estado de edición
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category);
  const [date, setDate] = useState(new Date(task.date));
  const [time, setTime] = useState(new Date(task.date));
  const [isEditing, setIsEditing] = useState(false);

  // Obtener la longitud del título y descripción para la validación de longitud
  const { length: titleLength } = useTextCounter(title);
  const { length: descriptionLength } = useTextCounter(description);

  // Estado local para los errores de validación
  const [errors, setErrors] = useState({
    title: null,
    description: null,
    dateTime: null,
  });

  // Función para manejar la edición de la tarea
  const handleEditTask = () => {
    // Validar título, descripción y fecha/hora
    const titleError = validateTitle(title);
    const descriptionError = validateDescription(description);
    const dateTimeError = validateDateTime(date, time);

    // Si hay errores de validación, establecer los errores y detener la edición
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
    // Crear el objeto de tarea actualizado
    const updatedTask: TaskUI = {
      title,
      description,
      category,
      date: format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
      completed,
      user_id: task.user_id,
    };
    // Actualizar la tarea en el almacenamiento
    editExistingTask(task.id, updatedTask);
    // Finalizar la edición y volver a la pantalla anterior
    setIsEditing(false);
    rescheduleNotificationForTask({ id: task.id, ...updatedTask });
    navigation.goBack();
  };

  // Función para manejar la eliminación de la tarea
  const handleDeleteTask = () => {
    removeTask(task.id);
    removeNotificationIdFromStorage(task.id);
    navigation.goBack();
  };

  // Función para cancelar la edición y restaurar los datos originales de la tarea
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
      {/* Input para el título de la tarea */}
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
      {/* Mostrar error de validación del título si existe */}
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      {/* Selector de fecha y hora */}
      <DateTimeSelector
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        error={errors.dateTime}
        disabled={!isEditing}
      />

      {/* Input para la descripción de la tarea */}
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
      {/* Mostrar error de validación de la descripción si existe */}
      {errors.description && (
        <Text style={styles.error}>{errors.description}</Text>
      )}

      {/* Selector de categoría */}
      <CategoryPicker
        selectedValue={category}
        onValueChange={setCategory}
        categories={categories}
        enabled={isEditing}
      />

      {/* Checkbox para marcar la tarea como completada */}
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

      {/* Botones para editar, eliminar o cancelar la edición */}
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
