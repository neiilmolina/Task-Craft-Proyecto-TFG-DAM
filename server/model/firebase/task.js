import { db } from "../../configuration/firebase/configuration.cjs";

// Obtener una referencia a la colección "tasks" en Firestore
const collection = db.collection("tasks");

export class TaskModel {
  static async getAllTasks(user_id) {
    try {
      let snapshot;
      // Filtrar por el ID de usuario si se proporciona
      if (user_id) {
        snapshot = await collection.where("user_id", "==", user_id).get();
      } else {
        snapshot = await collection.get();
      }
      const tasks = [];
      snapshot.forEach((doc) => {
        if (doc.exists) {
          tasks.push({ id: doc.id, ...doc.data() });
        }
      });
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  static async getTask(id) {
    try {
      const docRef = collection.doc(id);
      const doc = await docRef.get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      } else {
        console.log("Task not found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching task:", error);
      throw error;
    }
  }

  static async createTask({ input }) {
    try {
      const newTaskRef = await collection.doc(input.id).set(input);
      return newTaskRef.id;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  static async updateTask({id, input}) {
    try {
      const docRef = collection.doc(id);
      await docRef.update(input);
      console.log("Task updated successfully.");
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  static async deleteTask(id) {
    try {
      const docRef = collection.doc(id);
      await docRef.delete();
      console.log("Task deleted successfully.");
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}
