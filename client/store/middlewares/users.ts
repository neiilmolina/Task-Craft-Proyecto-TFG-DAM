import { type Middleware } from "@reduxjs/toolkit";
import { Rootstate } from "../index";
import { config } from "dotenv";

const URL = process.env.API_URL;

const syncWithDatabaseMiddlewareUsers: Middleware =
  (store: any) => (next: any) => (action: any) => {
    const { type, payload } = action;
    const previousState = store.getState() as Rootstate;
    next(action);

    if (type === "users/addUser") {
      // Agregar una nueva tarea
      const newUser = payload;

      fetch(`http://192.168.56.1:2508/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to add user");
          }
          return res.json();
        })
        .then((data) => {
          // Aquí puedes actualizar el estado con el ID asignado por la base de datos si es necesario
          console.log("User added successfully:", data);
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }

    if (type === "users/editUser") {
      // Editar una tarea existente
      const editedUser = payload;
      const editedUserId = editedUser.id
      fetch(`http://192.168.56.1:2508/users/${editedUserId}`, {
        method: "PUT",
        body: JSON.stringify(editedUser),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to edit user");
          }
          return res.json();
        })
        .then((data) => {
          console.log("User edited successfully:", data);
        })
        .catch((error) => {
          console.error("Error editing user:", error);
        });
    }

    if (type === "users/deleteUser") {
      // Eliminar una tarea
      const userId = payload;
      fetch(`http://192.168.56.1:2508/users/${userId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete user");
          }
          // Puedes manejar la respuesta aquí si es necesario
          console.log("User deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

export default syncWithDatabaseMiddlewareUsers;
