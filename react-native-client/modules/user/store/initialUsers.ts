import { UserApp, UserApi } from "./interfaces";

import { config } from "dotenv";

const URL = process.env.API_URL;
const URL_TASK = `${URL}/tasks`;

export const fetchUsers = (): Promise<UserApp[]> => {
  return fetch("http://192.168.56.1:2508/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parsea la respuesta JSON
    })
    .then((data) => {
      const users: UserApp[] = data.map((user: UserApi) => ({
        id: user.id,
        name: user.name,
        date: new Date(user.date._seconds * 1000).toISOString(),
        admin: user.admin,
        url_image: user.url_image,
      }));

      return users; // Devuelve las tareas mapeadas
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      return []; // Devuelve un arreglo vacío en caso de error
    });
};
