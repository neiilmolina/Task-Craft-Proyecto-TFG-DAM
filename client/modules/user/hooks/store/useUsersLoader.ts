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
        const usersReduxList: UserUIWithId[] = [
          {
            admin: false,
            date: "2024-06-04T11:32:35.781Z",
            id: "eTHjbJrfOIX52Ee2MRmY3zOG2Li1",
            createDiary: false,
          },
          {
            admin: false,
            date: "2024-06-04T23:32:35.781Z",
            id: "Tk535kicjVRPmMeH2P6U41MRlSV2",
            createDiary: false,
          },
          // Agrega más objetos aquí si es necesario
        ];
        updateUsers(usersReduxList);
      } catch (error) {
        console.error("Hubo un problema al cargar los usuarios:", error);
      }
    };

    loadUsers();
  }, [dispatch]);

  return users;
};

export default useUsersLoader;
