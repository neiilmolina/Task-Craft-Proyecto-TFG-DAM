import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/store";
import { fetchTasks } from "../store/initialTasks";
import { useTaskActions } from "./useTaskActions";

const useTasksLoader = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { updateTasks } = useTaskActions();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        updateTasks(fetchedTasks);
      } catch (error) {
        console.error("Hubo un problema al cargar las tareas:", error);
        setError("Hubo un problema al cargar las tareas. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false); // Esto asegura que loading se establece en false independientemente del resultado
      }
    };

    loadTasks();
  }, []);

  return { tasks, loading, error };
};

export default useTasksLoader;
