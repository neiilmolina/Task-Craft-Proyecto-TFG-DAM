import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/store";
import { fetchTasks } from "../store/initialTasks";
import { useTaskActions } from "./useTaskActions"

const useTasksLoader = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks);
  const { updateTasks } = useTaskActions();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        updateTasks(fetchedTasks);
      } catch (error) {
        console.error("Hubo un problema al cargar las tareas:", error);
      }
    };

    loadTasks();
  }, [dispatch]);

  return tasks;
};

export default useTasksLoader;
