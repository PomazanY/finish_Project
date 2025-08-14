import { Router } from "express";
import {  addCommentController, updateCommentController, deleteCommentController, likeCommentController } from "../controllers/comments.controller.js";

import { authenticate } from "../middelwares/authorization.js";

const commentsRouter = Router();

commentsRouter.post("/:postId", authenticate, addCommentController);
commentsRouter.put("/:commentId", authenticate, updateCommentController);
commentsRouter.delete("/:commentId", authenticate, deleteCommentController);
commentsRouter.patch("/:commentId/like",authenticate, likeCommentController);
export default commentsRouter;
