import { db } from "../../configuration/firebase/configuration.cjs";

// Obtener una referencia a la colección "diaries" en Firestore
const collection = db.collection("diaries");

export class DiaryModel {
  static async getAllDiaries({ user_id }) {
    try {
      let snapshot;
      // Filtrar por el ID de usuario si se proporciona
      if (user_id) {
        snapshot = await collection.where("user_id", "==", user_id).get();
      } else {
        snapshot = await collection.get();
      }
      const diaries = [];
      snapshot.forEach((doc) => {
        if (doc.exists) {
          diaries.push({ id: doc.id, ...doc.data() });
        }
      });
      return diaries;
    } catch (error) {
      console.error("Error fetching diaries:", error);
      throw error;
    }
  }

  static async getDiaryById({ id }) {
    try {
      const docRef = collection.doc(id);
      const doc = await docRef.get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      } else {
        console.log("Diary not found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching diary:", error);
      throw error;
    }
  }

  static async createDiary({ input }) {
    try {
      const newDiaryRef = await collection.add(input);
      return newDiaryRef.id;
    } catch (error) {
      console.error("Error creating diary:", error);
      throw error;
    }
  }

  static async updateDiary({ id, input }) {
    try {
      const docRef = collection.doc(id);
      await docRef.update(input);
      console.log("Diary updated successfully.");
    } catch (error) {
      console.error("Error updating diary:", error);
      throw error;
    }
  }

  static async deleteDiary({ id }) {
    try {
      const docRef = collection.doc(id);
      await docRef.delete();
      console.log("Diary deleted successfully.");
    } catch (error) {
      console.error("Error deleting diary:", error);
      throw error;
    }
  }
}
