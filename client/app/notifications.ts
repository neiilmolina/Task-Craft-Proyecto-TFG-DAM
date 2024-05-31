import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';


// Configuración para manejar las notificaciones cuando la aplicación está en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Función para registrar las notificaciones push y obtener el token
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  let projectId = null;
  if (Constants.manifest && Constants.manifest.extra && Constants.manifest.extra.eas) {
    projectId = Constants.manifest.extra.eas.projectId;
  } else {
    projectId = "tfg-base-de-datos-b7c3d"; // Reemplaza con tu projectId de Firebase
  }

  token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  console.log(token); // Puedes registrar este token en tu servidor si es necesario

  return token;
}
