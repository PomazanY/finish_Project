import { Router } from "express";
import { createPostController, updatePostController,
  deletePostController,
  getPostByIdController, getRandomPostsController, getFeedPostsController,likePostController } from "../controllers/posts.controller.js";
import upload from "../middelwares/upload.js";
import { authenticate } from "../middelwares/authorization.js";

const postsRouter = Router();

postsRouter.post("/", authenticate, upload.single("imageUrl"), createPostController);
postsRouter.get("/feed", authenticate, getFeedPostsController);
postsRouter.get("/explore", getRandomPostsController);
postsRouter.get("/:postId", getPostByIdController);
postsRouter.put("/:postId", authenticate, upload.single("imageUrl"), updatePostController);
postsRouter.delete("/:postId", authenticate, deletePostController);
postsRouter.patch("/:postId/like", authenticate, likePostController);

export default postsRouter;
