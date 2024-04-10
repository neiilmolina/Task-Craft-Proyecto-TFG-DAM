import { db } from "../../configuration/firebase/configuration.cjs";

const collection = db.collection('users'); 

export class UserModel {
  static async getAllUsers() {
    try {
      const snapshot = await collection.get();
      const users = [];
      snapshot.forEach(doc => {
        if (doc.exists) {
          users.push({ id: doc.id, ...doc.data() });
        }
      });
      return users;
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      throw error;
    }
  }

  static async getByUserId({ id }) {
    try {
      const docRef = collection.doc(id);
      const doc = await docRef.get();
      if (doc.exists) return { id: doc.id, ...doc.data() };
      console.log("El usuario no existe.");

    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    }
  }

  static async createUser({ input }) {
    try {
      const newUserRef = await collection.add( input );
      return newUserRef.id;
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      throw error;
    }
  }

  static async updateUser({ id, input }) {
    try {
      const docRef = collection.doc(id);
      await docRef.update(input);
      console.log("Usuario actualizado correctamente.");
      return "User updated successfully";
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  }

  static async deleteUser({ id }) {
    try {
      const docRef = collection.doc(id);
      await docRef.delete();
      console.log("Usuario eliminado correctamente.");
      return "User deleted successfully";
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  }
}
