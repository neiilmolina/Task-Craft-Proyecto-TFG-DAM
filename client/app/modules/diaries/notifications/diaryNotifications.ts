import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DiaryUIWithID } from "../store/interfaces";

// Función para programar una notificación para un diario
export const scheduleNotificationForDiary = async (diary: DiaryUIWithID) => {
  const tomorrowDiaryDate = new Date(diary.date);
  tomorrowDiaryDate.setDate(tomorrowDiaryDate.getDate() + 1);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Diary Reminder",
      body: `Diary: ${diary.title}`,
      data: { diaryId: diary.id }, // Incluye el ID del diario en los datos de la notificación
    },
    trigger: tomorrowDiaryDate,
  });
};

// Función para modificar la fecha de la notificación de un diario
export const rescheduleNotificationForDiary = async (diary: DiaryUIWithID) => {
  const notificationId = await AsyncStorage.getItem(
    `notificationId_${diary.id}`
  );

  if (notificationId) {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      await scheduleNotificationForDiary(diary);
    } catch (error) {
      console.error("Error rescheduling notification for diary:", error);
    }
  }
};

// Función para eliminar la entrada de notificación del AsyncStorage
export const removeNotificationIdFromStorage = async (diaryId: string) => {
  try {
    await AsyncStorage.removeItem(`notificationId_${diaryId}`);
  } catch (error) {
    console.error("Error removing notification ID from AsyncStorage:", error);
  }
};

// Función para recuperar y reprogramar las notificaciones al reiniciar la aplicación
export const restoreNotificationsOnAppRestart = async () => {
  try {
    const notifiedDiariesJson = await AsyncStorage.getItem("notifiedDiaries");
    if (notifiedDiariesJson) {
      const notifiedDiaries: DiaryUIWithID[] = JSON.parse(notifiedDiariesJson);

      for (const diary of notifiedDiaries) {
        if (new Date(diary.date) > new Date()) {
          await scheduleNotificationForDiary(diary);
        } else {
          removeNotificationIdFromStorage(diary.id);
        }
      }
    }
  } catch (error) {
    console.error("Error restoring notifications on app restart:", error);
  }
};
