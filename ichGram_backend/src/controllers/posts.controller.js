import * as postService from "../services/posts.services.js";

import validateBody from "../utils/validateBody.js";
import { updatePostSchema } from "../validation/posts.schema.js"


export const createPostController = async (req, res) => {
  const { description } = req.body;
  const file = req.file;

  if (!description || !file) {
    return res.status(400).json({ message: "Image and description are required" });
  }

  const post = await postService.createPost({ userId: req.user._id, description, file });
  res.status(201).json(post);
};


export const getPostByIdController = async (req, res) => {
  const { postId } = req.params;
  const post = await postService.getPostById(postId);
 
  if (!post) {
    return res.status(404).json({ message: "Пост не найден" });
  }

  res.status(200).json(post);

};

export const getRandomPostsController = async (req, res) => {
    const posts = await postService.getRandomPostsService();
    res.json(posts);
};


export const getFeedPostsController = async (req, res, next) => {
    const userId = req.user?._id || req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const posts = await postService.getFeedPosts(userId);
    return res.json(posts);
};

export const likePostController = async (req, res) => {

    const { postId } = req.params;
    const userId = req.user._id.toString();

    const updated = await postService.likePostService(postId, userId);
    res.status(200).json(updated); 
};


export const updatePostController = async (req, res) => {
  await validateBody(updatePostSchema, req.body);

  const { postId } = req.params;
  const userId = req.user._id;
  const { description, likes } = req.body;
  const imageUrl = req.file ? req.file.path : undefined;

  const updatedPost = await postService.updatePost({ postId, userId, description, imageUrl, likes });

  res.json(updatedPost);
};

export const deletePostController = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id.toString();

    await postService.deletePost({ postId, userId });

    res.json({ message: "Пост успешно удалён" });
  } catch (error) {
    console.error("Ошибка в контроллере удаления:", error);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};


