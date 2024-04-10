import { UserModel } from "./model/firebase/user.js";
import { DiaryModel } from "./model/firebase/diary.js";
import { TaskModel } from "./model/firebase/task.js"
import { createApp } from "./app.js";

createApp({ userModel: UserModel, diaryModel: DiaryModel, taskModel: TaskModel })