import { type Middleware } from "@reduxjs/toolkit";
import { Rootstate } from "../index";
import { config } from "dotenv"

const URL = process.env.API_URL

const syncWithDatabaseMiddlewareTasks: Middleware =
  (store: any) => (next: any) => (action: any) => {
    const { type, payload } = action;
    const previousState = store.getState() as Rootstate;
    next(action);

    if (type === "tasks/addTask") {
      // Agregar una nueva tarea
      const newTask = payload;
      fetch(`http://192.168.56.1:2508/tasks`, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to add task");
          }
          return res.json();
        })
        .then((data) => {
          // Aquí puedes actualizar el estado con el ID asignado por la base de datos si es necesario
          console.log("Task added successfully:", data);
        })
        .catch((error) => {
          console.error("Error adding task:", error);
        });
    }

    if (type === "tasks/editTask") {
      // Editar una tarea existente
      const editedTask = payload;
      fetch(`http://192.168.56.1:2508/tasks/${editedTask.id}`, {
        method: "PUT",
        body: JSON.stringify(editedTask),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to edit task");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Task edited successfully:", data);
        })
        .catch((error) => {
          console.error("Error editing task:", error);
        });
    }

    if (type === "tasks/deleteTask") {
      // Eliminar una tarea
      const taskId = payload;
      fetch(`http://192.168.56.1:2508/tasks/${taskId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete task");
          }
          // Puedes manejar la respuesta aquí si es necesario
          console.log("Task deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
        });
    }
  };

export default syncWithDatabaseMiddlewareTasks;
