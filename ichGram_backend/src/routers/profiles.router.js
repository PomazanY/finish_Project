import { Router } from "express";
import upload from "../middelwares/upload.js";
import { authenticate } from "../middelwares/authorization.js";

import { profileController, updateProfileController, searchUsersController, followUserController, unfollowUserController } from "../controllers/profiles.controller.js";

const profileRouter = Router();
profileRouter.post("/follow/:id", authenticate, followUserController);
profileRouter.post("/unfollow/:id", authenticate, unfollowUserController);

profileRouter.get("/search", authenticate, searchUsersController);

profileRouter.put("/:userId", authenticate, upload.single("avatar"),  updateProfileController);
profileRouter.get("/:username", profileController)



export default profileRouter;

