import User from "../db/User.js";
import Post from "../db/Post.js";
import Comment from "../db/Comment.js";
import HttpException from "../utils/HttpExeption.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const profile = async (username) => {

  const user = await User.findOne({ username }).lean();
  if (!user) throw HttpException(404, `User ${username} not found`);

  const posts = await Post.find({ userId: user._id }).sort({ createdAt: -1 });
  const comments = await Comment.find({ userId: user._id })
    .populate("postId", "description imageUrl createdAt")
    .sort({ createdAt: -1 });

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    avatar: user.avatar || "",
    bio: user.bio || "",
    website: user.website || "",
    followers: Array.isArray(user.followers) ? user.followers : [],
    following: Array.isArray(user.following) ? user.following : [],
    followersCount: user.followers?.length || 0,
    followingCount: user.following?.length || 0,
    postsCount: posts.length,
    posts,
    comments,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const updateUserProfile = async ({ userId, username, website, bio, file }) => {
  const updateData = { username, website, bio };

  try {

    if (file) {
      const result = await uploadAvatarToCloudinary(file);
      if (!result?.secure_url) {
        throw new Error("Ошибка загрузки изображения: secure_url не получен");
      }
      updateData.avatar = result.secure_url;
    }


    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error("Пользователь не найден");
    }

    const posts = await Post.find({ userId }).sort({ createdAt: -1 });;
    const comments = await Comment.find({ userId })
      .populate("postId", "description imageUrl createdAt")
      .sort({ createdAt: -1 });

    return {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
      avatar: updatedUser.avatar || "",
      bio: updatedUser.bio || "",
      website: updatedUser.website || "",
      followersCount: Array.isArray(updatedUser.followers) ? updatedUser.followers.length : 0,
      followingCount: Array.isArray(updatedUser.following) ? updatedUser.following.length : 0,

      postsCount: posts.length,
      posts,
      comments,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };

  } catch (err) {
    console.error("Ошибка при обновлении профиля:", err);
    throw err;
  }
};


const uploadAvatarToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "avatars", use_filename: true },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(file.buffer);
  });
};


export const searchUsers = async (query) => {
  if (!query) {
    throw HttpException(400, "Пустой запрос");
  }

  const users = await User.find({
    username: { $regex: query, $options: "i" }
  }).select("_id username avatar");

  return users;
};


export const followUser = async (currentUserId, targetUserId) => {
  if (currentUserId === targetUserId) {
    throw HttpException(400, "Нельзя подписаться на самого себя");
  }

  const currentUserObjectId = new mongoose.Types.ObjectId(currentUserId);
  const targetUserObjectId = new mongoose.Types.ObjectId(targetUserId);

  const currentUser = await User.findById(currentUserObjectId);
  const targetUser = await User.findById(targetUserObjectId);

  if (!targetUser) {
    throw HttpException(404, "Пользователь не найден");
  }

  if (currentUser.following.includes(targetUserObjectId)) {
    throw HttpException(409, "Вы уже подписаны на этого пользователя");
  }

  currentUser.following.push(targetUserObjectId);
  targetUser.followers.push(currentUserObjectId);

  await currentUser.save();
  await targetUser.save();

  return { message: "Подписка успешна" };
};


export const unfollowUser = async (currentUserId, targetUserId) => {
  if (currentUserId === targetUserId) {
    throw HttpException(400, "Нельзя отписаться от самого себя");
  }

  const currentUserObjectId = new mongoose.Types.ObjectId(currentUserId);
  const targetUserObjectId = new mongoose.Types.ObjectId(targetUserId);

  const currentUser = await User.findById(currentUserObjectId);
  const targetUser = await User.findById(targetUserObjectId);

  if (!targetUser) {
    throw HttpException(404, "Пользователь не найден");
  }

  currentUser.following = currentUser.following.filter(
    (id) => id.toString() !== targetUserObjectId.toString()
  );
  targetUser.followers = targetUser.followers.filter(
    (id) => id.toString() !== currentUserObjectId.toString()
  );

  await currentUser.save();
  await targetUser.save();

  return { message: "Отписка успешна" };
};
