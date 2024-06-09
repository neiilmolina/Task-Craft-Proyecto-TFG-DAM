import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  date: z.date(),
  admin: z.boolean(),
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}
