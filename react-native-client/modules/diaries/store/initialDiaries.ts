import { DiaryApi, DiaryUI } from "../store/interfaces";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

export const fetchDiaries = (): Promise<DiaryUI[]> => {
    const userId = FIREBASE_AUTH.currentUser ? FIREBASE_AUTH.currentUser.uid : null;
  
    if (!userId) {
      console.error("User ID is null");
      return Promise.resolve([]); // Devuelve una promesa resuelta con un arreglo vacío
    }
  
    return fetch(`http://192.168.56.1:2508/diaries?user_id=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parsea la respuesta JSON
      })
      .then((data) => {
        // Mapea los datos a un arreglo de diarios con la interfaz DiaryUI
        const diaries: DiaryUI[] = data.map((diary: DiaryApi) => ({
          id: diary.id,
          date: new Date(diary.date._seconds * 1000).toISOString(), // Convertir la fecha a cadena ISO 8601
          user_id: diary.user_id,
          description: diary.description,
          title: diary.title,
        }));
  
        return diaries; // Devuelve los diarios mapeados
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        return []; // Devuelve un arreglo vacío en caso de error
      });
  };