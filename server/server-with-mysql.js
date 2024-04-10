import { UserModel } from "./model/mysql/user.js";
import { createApp } from "./app.js";

createApp({ userModel: UserModel })