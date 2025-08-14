import { Router } from "express";

import { loginUserController, registerUserController, forgotPasswordController, resetPasswordController} from "../controllers/users.controller.js";


const usersRouter = Router();

usersRouter.post("/login", loginUserController);
usersRouter.post("/register", registerUserController);

usersRouter.post("/forgot-password", forgotPasswordController);
// http://localhost:5173/reset-password?token=ZA9xnc6ocLJB-v0VMoUvu
usersRouter.post("/reset-password", resetPasswordController);


export default usersRouter;