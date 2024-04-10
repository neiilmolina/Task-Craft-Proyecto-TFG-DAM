import { validateUser, validatePartialUser } from "../schemas/user.js";

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    try {
      const users = await this.userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  getById = async (req, res) => {
    const { id } = req.params;
    const user = await this.userModel.getByUserId({ id });
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  };

  create = async (req, res) => {
    const { name, email, password, date, url_image, admin } = req.body;

    const parsedDate = new Date(date);

    const result = validateUser({
      name,
      email,
      password,
      date: parsedDate,
      url_image,
      admin,
    });

    if (!result.success) return res.status(400).json({ error: result.error });

    const newUser = await this.userModel.createUser({ input: result.data });
    res.status(200).json(newUser);
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, date, url_image, admin } = req.body;

    const parsedDate = new Date(date);

    // Validar los datos del usuario actualizado
    const result = validatePartialUser({
      name,
      email,
      password,
      date: parsedDate,
      url_image,
      admin,
    });

    if (!result.success) return res.status(400).json({ error: result.error });

    try {
      // Actualizar el usuario en la base de datos
      await this.userModel.updateUser({ id, input: result.data });
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      // Manejar errores
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Función para eliminar un usuario
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      // Eliminar el usuario de la base de datos
      await this.userModel.deleteUser({ id });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      // Manejar errores
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
