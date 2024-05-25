import { useAppDispatch } from "../../../store/hooks/store";
import { addUser, editUser, deleteUser, setUsers } from "../store/slice";
import { UserApp } from "../store/interfaces";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const addNewUser = ({ id, name, date, admin, url_image }: UserApp) => {
    // Convertir la fecha a formato ISO 8601 antes de llamar al action creator

    const isoDate = new Date(date).toISOString();

    dispatch(
      addUser({
        id,
        name,
        date: isoDate,
        admin,
        url_image,
      })
    );
  };

  const editExistingUser = ({ id, name, date, admin, url_image }: UserApp) => {
    dispatch(editUser({ id, name, date, admin, url_image }));
  };

  const removeUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const updateUsers = (users: UserApp[]) => {
    dispatch(setUsers(users));
  }

  return {
    addNewUser,
    editExistingUser,
    removeUser,
    updateUsers,
  };
};
