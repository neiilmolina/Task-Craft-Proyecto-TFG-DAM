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
    dispatch(
      addTask({
        date,
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
