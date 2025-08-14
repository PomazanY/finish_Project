import Comment from "../db/Comment.js";

import HttpException from "../utils/HttpExeption.js";

export const addCommentToPost = async ({ postId, userId, description }) => {
  const comment = await Comment.create({ postId, userId, description });
  await comment.populate({ path: "userId", select: "username avatar" });
  return comment;
};

export const updateComment = async ({ commentId, userId, description }) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw HttpException(404, "Комментарий не найден");

  if (comment.userId.toString() !== userId) {
    throw HttpException(403, "Нет доступа к редактированию комментария");
  }

  comment.description = description;
  await comment.save();

  return comment;
};

export const deleteComment = async ({ commentId, userId }) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw HttpException(404, "Комментарий не найден");

  if (comment.userId.toString() !== userId) {
    throw HttpException(403, "Нет доступа к удалению комментария");
  }

  await comment.remove();
};


export const likeCommentService = async (commentId, userId) => {
  const liked = await Comment.findOneAndUpdate(
    { _id: commentId, likedBy: { $ne: userId } },
    { $addToSet: { likedBy: userId }, $inc: { likes: 1 } },
    { new: true, select: "_id likes likedBy" }
  );

  if (liked) {
    return { ...liked.toObject(), liked: true };
  }

  const unliked = await Comment.findOneAndUpdate(
    { _id: commentId, likedBy: userId },
    { $pull: { likedBy: userId }, $inc: { likes: -1 } },
    { new: true, select: "_id likes likedBy" }
  );

  if (unliked) {
    if (unliked.likes < 0) {
      unliked.likes = 0;
      await unliked.save();
    }
    return { ...unliked.toObject(), liked: false };
  }
  throw HttpException(404, "Комментарий не найден");
};
