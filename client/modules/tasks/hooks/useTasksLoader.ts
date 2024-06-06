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



// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks/store";
// import { fetchTasks } from "../store/initialTasks";
// import { useTaskActions } from "./useTaskActions";
// import * as Notifications from "expo-notifications";
// import { usePushNotifications } from "../../../app/hooks/usePushNotifications";

// const useTasksLoader = () => {
//   const dispatch = useAppDispatch();
//   const tasks = useAppSelector((state) => state.tasks);
//   const { updateTasks } = useTaskActions();
//   const { expoPushToken } = usePushNotifications();

//   useEffect(() => {
//     const loadTasks = async () => {
//       try {
//         const fetchedTasks = await fetchTasks();
//         updateTasks(fetchedTasks);

//         // Schedule notification for each task at the specified date and time
//         fetchedTasks.forEach((task) => {
//           if (expoPushToken) {
//             const taskDate = new Date(task.date);
//             if (taskDate > new Date()) { // Ensure the task date is in the future
//               Notifications.scheduleNotificationAsync({
//                 content: {
//                   title: "Task Reminder",
//                   body: `Task: ${task.title}`,
//                   data: { task },
//                 },
//                 trigger: taskDate,
//               });
//             }
//           }
//         });
//       } catch (error) {
//         console.error("Hubo un problema al cargar las tareas:", error);
//       }
//     };

//     loadTasks();
//   }, [dispatch, expoPushToken, updateTasks]);

//   return tasks;
// };

// export default useTasksLoader;
