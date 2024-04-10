import { connection } from "../../configuration/mysql/configuration.js";

export class UserModel {
  static async getAllUsers() {
    try {
      const [rows] = await connection.query("SELECT * FROM users");
      return rows;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }

  static async getByUserId(userId) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );
      if (rows.length > 0) {
        return rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      throw error;
    }
  }

  static async createUser(userData) {
    const { name, email, password, date, url_image } = userData;
    try {
      const [result] = await connection.query(
        "INSERT INTO users (name, email, password, date, url_image) VALUES (?, ?, ?, ?, ?)",
        [name, email, password, date, url_image]
      );
      return result;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }

  static async updateUser(userId, userData) {
    const { name, email, password, date, url_image } = userData;
    try {
      await connection.query(
        "UPDATE users SET name = ?, email = ?, password = ?, date = ?, url_image = ? WHERE id = ?",
        [name, email, password, date, url_image, userId]
      );
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      await connection.query("DELETE FROM users WHERE id = ?", [userId]);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  }
}
