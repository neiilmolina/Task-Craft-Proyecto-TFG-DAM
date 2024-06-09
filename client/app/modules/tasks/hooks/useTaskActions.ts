import { useAppDispatch } from "../../../store/hooks/store";
import { addTask, editTask, deleteTask, setTasks } from "../store/slice";
import { TaskUI, TaskUIWithID } from "../store/interfaces";

export const useTaskActions = () => {
  const dispatch = useAppDispatch();

  const addNewTask = ({
    id,
    date,
    user_id,
    description,
    completed,
    title,
    category,
  }: TaskUIWithID) => {
    // Convertir la fecha a formato ISO 8601 antes de llamar al action creator

    const isoDate = new Date(date).toISOString();

    dispatch(
      addTask({
        id,
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
    { date, user_id, description, completed, title, category }: TaskUI
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

  const updateTasks = (tasks: TaskUIWithID[]) => {
    dispatch(setTasks(tasks));
  };

  return {
    addNewTask,
    editExistingTask,
    removeTask,
    updateTasks,
  };
};
