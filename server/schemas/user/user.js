import { z } from "zod";
import { isUUID } from "../validations.js";

const userSchema = z.object({
  id: z.string().refine(
    (id) => {
      return isUUID(id); // Validamos el UUID utilizando la función isUUID
    },
    {
      message: "The id must be a valid UUID",
    }
  ),
  name: z
    .string()
    .min(1, {
      invalid_type_error: "User name must be a string",
      message: "The name of the user must be required",
    })
    .max(255), // Máximo 255 caracteres
  email: z.string().email({
    invalid_type_error: "User email must be a string",
    message: "Invalid email address",
  }), // Utiliza el método email() para validar correos electrónicos
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }), // Ejemplo de regla de validación para la contraseña
  date: z.date(),
  url_image: z.string().url({ message: "Poster must be a valid URL" }),
  admin: z.boolean(),
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}
