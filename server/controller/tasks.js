import { validateTask, validatePartialTask } from "../schemas/task.js";
import { parseISO } from "date-fns";
export class TaskController {
  constructor({ taskModel }) {
    this.taskModel = taskModel;
  }

  getAllTasks = async (req, res) => {
    try {
      const { user_id } = req.query;
      const tasks = await this.taskModel.getAllTasks(user_id);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getTaskById = async (req, res) => {
    try {
      const { id } = req.params;

      // Verificar si el ID es válido
      if (!id) {
        return res.status(400).json({ error: "Task ID is required" });
      }

      const task = await this.taskModel.getTask(id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createTask = async (req, res) => {
    try {
      const { id, title, description, completed, date, category, user_id } =
        req.body;
      const parsedDate = parseISO(date);
      const result = validateTask({
        id,
        title,
        description,
        completed,
        date: parsedDate,
        category,
        user_id,
      });

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      const newTask = await this.taskModel.createTask({ input: result.data });
      res.status(201).json(newTask);
      console.log(newTask)
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, completed, date, category, user_id } =
        req.body;

      // Crea un objeto para almacenar solo las propiedades definidas
      const updatedDiaryData = {};

      // Agrega las propiedades definidas al objeto

      if (title !== undefined) {
        updatedDiaryData.title = title;
      }
      if (description !== undefined) {
        updatedDiaryData.description = description;
      }
      if (completed !== undefined) {
        updatedDiaryData.completed = completed;
      }
      if (date !== undefined) {
        updatedDiaryData.date = new Date(date);
      }
      if (category !== undefined) {
        updatedDiaryData.category = category;
      }
      if (user_id !== undefined) {
        updatedDiaryData.user_id = user_id;
      }

      // Valida los datos actualizados
      const result = validatePartialTask(updatedDiaryData);

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      // Actualiza la tarea solo con las propiedades definidas
      await this.taskModel.updateTask({ id, input: result.data });
      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      await this.taskModel.deleteTask(id);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
