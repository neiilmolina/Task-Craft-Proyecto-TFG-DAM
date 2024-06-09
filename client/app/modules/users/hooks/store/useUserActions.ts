import { useAppDispatch } from "../../../../store/hooks/store";
import { addUser, editUser, deleteUser, setUsers } from "../../store/slice";
import { UserUIWithId } from "../../store/interfaces";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const addNewUser = ({ id, date, admin, createDiary }: UserUIWithId) => {
    // Convertir la fecha a formato ISO 8601 antes de llamar al action creator
    const isoDate = new Date(date).toISOString();

    dispatch(
      addUser({
        id,
        date: isoDate,
        admin,
        createDiary,
      })
    );
  };

  const editExistingUser = ({ id, date, admin, createDiary }: UserUIWithId) => {
    dispatch(editUser({ id, date, admin, createDiary }));
  };

  const removeUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const updateUsers = (users: UserUIWithId[]) => {
    dispatch(setUsers(users));
  };

  return {
    addNewUser,
    editExistingUser,
    removeUser,
    updateUsers,
  };
};
