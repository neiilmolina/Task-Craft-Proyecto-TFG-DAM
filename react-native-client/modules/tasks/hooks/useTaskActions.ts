import { useAppDispatch } from "../../../store/hooks/store";
import {
  Task,
  addTask,
  editTask,
  deleteTask,
  completeTask,
  incompleteTask,
} from "../store/slice";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const addNewTask = ({
    date,
    user_id,
    description,
    completed,
    title,
    category,
  }: Task) => {
    // Convertir la fecha a formato ISO 8601 antes de llamar al action creator
    const isoDate = new Date(date).toISOString();

    dispatch(
      addTask({
        date: isoDate,
        user_id,
        description,
        completed,
        title,
        category,
      })
    );
  };

  const editExistingTask = (
    taskId: string,
    { date, user_id, description, completed, title, category }: Task
  ) => {
    dispatch(
      editTask({
        id: taskId,
        ...{
          date,
          user_id,
          description,
          completed,
          title,
          category,
        },
      })
    );
  };

  const removeTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const markTaskAsComplete = (taskId: string) => {
    dispatch(completeTask(taskId));
  };

  const markTaskAsIncomplete = (taskId: string) => {
    dispatch(incompleteTask(taskId));
  };

  return {
    addNewTask,
    editExistingTask,
    removeTask,
    markTaskAsComplete,
    markTaskAsIncomplete,
  };
};
