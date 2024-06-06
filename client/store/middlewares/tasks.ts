import { type Middleware } from "@reduxjs/toolkit";
import { Rootstate } from "../index";
import { config } from "dotenv";
import { rollbackTask, deleteTask, editTask } from "../../modules/tasks/store/slice";
import { TaskUIWithID } from "../../modules/tasks/store/interfaces";
const URL = process.env.API_URL;

const syncWithDatabaseMiddlewareTasks: Middleware =
  (store: any) => (next: any) => (action: any) => {
    const { type, payload } = action;
    const previousState = store.getState() as Rootstate;
    next(action);

    if (type === "tasks/addTask") {
      // Agregar una nueva tarea
      const newTask = payload as TaskUIWithID;

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
          if (error instanceof SyntaxError && error.message.includes("Unexpected end of input")) {
            // No hacemos nada si se detecta este error específico
            console.log("SyntaxError: JSON Parse error: Unexpected end of input");
            // Retornamos para evitar que el error llegue al bloque catch
            return;
          }
          store.dispatch(deleteTask(newTask.id));
        });
    }

    if (type === "tasks/editTask") {
      // Editar una tarea existente
      const editedTask = payload;
      const editedTaskId = payload.id;
      const taskToEdit = previousState.tasks.find(
        (task) => task.id === editedTaskId
      );
      fetch(`http://192.168.56.1:2508/tasks/${editedTaskId}`, {
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
          if (editedTask) {
            store.dispatch(editTask(taskToEdit));
          }
        });
    }

    if (type === "tasks/deleteTask") {
      // Eliminar una tarea
      const taskId = payload;
      const taskToRemove = previousState.tasks.find(
        (task) => task.id === taskId
      );
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
          if (taskToRemove) {
            store.dispatch(rollbackTask(taskToRemove));
          }
        });
    }
  };

export default syncWithDatabaseMiddlewareTasks;
