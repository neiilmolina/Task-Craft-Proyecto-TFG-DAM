/**
 * Bibliografía: 
 * Creación del servidor: 
 *    Video: https://www.youtube.com/watch?v=eCWNQfzuuso&list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&index=5
 *    Repositorio: https://github.com/midudev/curso-node-js/tree/main/clase-5
 * 
 * */ 

import { UserModel } from "./model/firebase/user.js";
import { DiaryModel } from "./model/firebase/diary.js";
import { TaskModel } from "./model/firebase/task.js"
import { createApp } from "./app.js";

createApp({ userModel: UserModel, diaryModel: DiaryModel, taskModel: TaskModel })