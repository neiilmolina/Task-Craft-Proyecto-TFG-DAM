import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/store";
import { fetchUsers } from "../../store/initialUsers";
import { useUserActions } from "./useUserActions"
import { UserUIWithId } from "../../store/interfaces";

const useUsersLoader = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  const { updateUsers } = useUserActions();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        updateUsers(fetchedUsers);
      } catch (error) {
        console.error("Hubo un problema al cargar los usuarios:", error);
      }
    };

    loadUsers();
  }, [dispatch]);

  return users;
};

export default useUsersLoader;
