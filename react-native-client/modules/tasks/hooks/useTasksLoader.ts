import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/store";
import { fetchTasks } from "../store/initialTasks";
import { setTasks } from "../store/slice";

const useTasksLoader = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        dispatch(setTasks(fetchedTasks));
      } catch (error) {
        console.error("Hubo un problema al cargar las tareas:", error);
      }
    };

    loadTasks();
  }, [dispatch]);

  return tasks;
};

export default useTasksLoader;
