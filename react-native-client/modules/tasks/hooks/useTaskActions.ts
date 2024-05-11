import { useAppDispatch } from "../../../store/hooks/store";
import { addTask, editTask, deleteTask } from "../store/slice";
import { Task } from "../store/interfaces"

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

  return {
    addNewTask,
    editExistingTask,
    removeTask,
  };
};
