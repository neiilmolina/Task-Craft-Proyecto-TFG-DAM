import { UserUIWithId, UserApi } from "./interfaces";

export const fetchUsers = (): Promise<UserUIWithId[]> => {
  return fetch("http://192.168.56.1:2508/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parsea la respuesta JSON
    })
    .then((data) => {
      const users: UserUIWithId[] = data.map((user: UserApi) => ({
        id: user.id,
        date: new Date(user.date._seconds * 1000).toISOString(),
        admin: user.admin,
      }));

      return users;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      return []; // Devuelve un arreglo vacío en caso de error
    });
};
