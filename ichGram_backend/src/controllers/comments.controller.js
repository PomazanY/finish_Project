import * as commentsService from "../services/comments.services.js"

import validateBody from "../utils/validateBody.js";
import { createCommentSchema, updateCommentSchema } from "../validation/comments.schema.js"

export const addCommentController = async (req, res) => {
  await validateBody(createCommentSchema, req.body);
  const { postId } = req.params;
  const { description } = req.body;
  const userId = req.user._id;

  const comment = await commentsService.addCommentToPost({ postId, userId, description });
  res.status(201).json(comment);
};

export const updateCommentController = async (req, res) => {
  await validateBody(updateCommentSchema, req.body);

  const { commentId } = req.params;
  const { description } = req.body;
  const userId = req.user._id;

  const updatedComment = await commentsService.updateComment({
    commentId,
    userId,
    description,
  });

  res.status(200).json({ message: "Комментарий обновлён", updatedComment });
};

export const deleteCommentController = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  await commentsService.deleteComment({ commentId, userId });

  res.status(200).json({ message: "Комментарий удалён" });
};


export const likeCommentController = async (req, res) => {
   const { commentId } = req.params;
    const userId = req.user._id.toString(); 
    const updated = await commentsService.likeCommentService(commentId, userId);
    res.status(200).json(updated);
  

};