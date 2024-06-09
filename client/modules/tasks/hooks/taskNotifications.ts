import * as Notifications from "expo-notifications";
import { TaskUIWithID } from "../store/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Dentro de la función para programar la notificación
export const scheduleNotificationForTask = async (task: TaskUIWithID) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Task Reminder',
      body: `Task: ${task.title}`,
      data: { taskId: task.id }, // Incluye el ID de la tarea en los datos de la notificación
    },
    trigger: new Date(task.date),
  });
};



// Función para modificar la fecha de la notificación de una tarea
export const rescheduleNotificationForTask = async (task: TaskUIWithID) => {
  // Obtener el ID de la notificación guardado previamente en AsyncStorage
  const notificationId = await AsyncStorage.getItem(
    `notificationId_${task.id}`
  );

  if (notificationId) {
    try {
      // Si se encuentra el ID de la notificación, cancelar la notificación anterior
      await Notifications.cancelScheduledNotificationAsync(notificationId);

      // Programar una nueva notificación con la fecha actualizada de la tarea
      await scheduleNotificationForTask(task);
    } catch (error) {
      console.error("Error rescheduling notification for task:", error);
    }
  }
};

// Función para eliminar la entrada de notificación del AsyncStorage
export const removeNotificationIdFromStorage = async (taskId: string) => {
  try {
    await AsyncStorage.removeItem(`notificationId_${taskId}`);
  } catch (error) {
    console.error("Error removing notification ID from AsyncStorage:", error);
  }
};

// Función para recuperar y reprogramar las notificaciones al reiniciar la aplicación
export const restoreNotificationsOnAppRestart = async () => {
  try {
    // Obtener las tareas notificadas previamente desde AsyncStorage
    const notifiedTasksJson = await AsyncStorage.getItem("notifiedTasks");
    if (notifiedTasksJson) {
      const notifiedTasks: TaskUIWithID[] = JSON.parse(notifiedTasksJson);

      // Iterar sobre las tareas notificadas previamente
      for (const task of notifiedTasks) {
        // Verificar si la fecha de la tarea es futura
        if (new Date(task.date) > new Date()) {
          // Reprogramar la notificación para la tarea
          await scheduleNotificationForTask(task);
        } else {
          removeNotificationIdFromStorage(task.id);
        }
      }
    }
  } catch (error) {
    console.error("Error restoring notifications on app restart:", error);
  }
};
