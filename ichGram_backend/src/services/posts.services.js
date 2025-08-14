import Post from "../db/Post.js";
import User from "../db/User.js";

import cloudinary from "../utils/cloudinary.js"
import HttpException from "../utils/HttpExeption.js";

export const createPost = async ({ userId, description, file, }) => {
  if (!file) {
    throw HttpException(400, "Image is required");
  }


  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "posts",
        use_filename: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(file.buffer);
  });


  const post = await Post.create({
    userId,
    imageUrl: uploadResult.secure_url,
    description,
  });

  const populatedPost = await Post.findById(post._id)
    .populate({ path: "userId", select: "username avatar" })
    .lean();

  await User.updateOne({ _id: userId }, { $inc: { postsCount: 1 } });

  return populatedPost;
};



export const getPostById = async (postId) => {

  return await Post.findById(postId)
    .populate("userId", "username avatar")
    .populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "username avatar"
      }
    });

};

export async function getRandomPostsService() {
  const usersCollection = User.collection.name;

  const pipeline = [
    { $match: {} },
    { $addFields: { _r: { $rand: {} } } },
    { $sort: { _r: 1 } },
    {
      $lookup: {
        from: usersCollection,
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: false } },
    {
      $project: {
        imageUrl: 1,
        description: 1,
        createdAt: 1,
        "user._id": 1,
        "user.username": 1,
        "user.avatar": 1,

        likesCount: {
          $cond: [
            { $isArray: "$likes" },
            { $size: "$likes" },
            { $ifNull: ["$likesCount", 0] } 
          ],
        },
        commentsCount: {
          $cond: [
            { $isArray: "$comments" },
            { $size: "$comments" },
            { $ifNull: ["$commentsCount", 0] }
          ],
        },
      },
    },
    { $unset: "_r" },
  ];

  return Post.aggregate(pipeline);
}



export const getFeedPosts = async (userId) => {
  const user = await User.findById(userId).select("following");
  if (!user) throw HttpException(404, "User not found");

  const followingIds = Array.isArray(user.following) ? user.following : [];

  const query = followingIds.length
    ? { userId: { $in: followingIds } }
    : {};

  return Post.find(query)
    .populate("userId", "username avatar followers")
    .populate({ path: "comments", populate: { path: "userId", select: "username avatar" } })
    .sort({ createdAt: -1 })

};


export const updatePost = async ({ postId, description, imageUrl, likes }) => {
  const updateData = {};
  if (description) updateData.description = description;
  if (imageUrl) updateData.imageUrl = imageUrl;
  if (likes !== undefined) updateData.likes = likes;

  const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true });

  if (!updatedPost) throw HttpException(404, "Post is not found");

  return updatedPost;
};

export const likePostService = async (postId, userId) => {

  const liked = await Post.findOneAndUpdate(
    { _id: postId, likedBy: { $ne: userId } },
    { $addToSet: { likedBy: userId }, $inc: { likes: 1 } },
    { new: true, select: "_id likes likedBy" }
  );
  if (liked) return { ...liked.toObject(), liked: true };


  const unliked = await Post.findOneAndUpdate(
    { _id: postId, likedBy: userId },
    { $pull: { likedBy: userId }, $inc: { likes: -1 } },
    { new: true, select: "_id likes likedBy" }
  );
  if (unliked) {
    if (unliked.likes < 0) { unliked.likes = 0; await unliked.save(); }
    return { ...unliked.toObject(), liked: false };
  }

  throw HttpException(404, "Пост не найден");
};


export const deletePost = async ({ postId, userId }) => {
  const post = await Post.findById(postId);
  if (!post) throw HttpException(404, "Post not found");
  if (post.userId.toString() !== userId) {
    throw HttpException(403, "You are not allowed to delete this post");
  }

  const deleted = await Post.findByIdAndDelete(postId);
  return deleted;
};