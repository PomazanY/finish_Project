import * as profileService from "../services/profiles.services.js"
import cloudinary from "../utils/cloudinary.js";

export const profileController = async (req, res) => {
  const result = await profileService.profile(req.params.username);
  res.json(result)
}

export const updateProfileController = async (req, res) => {
    const { userId } = req.params;
    const { username, website, bio } = req.body;
    const file = req.file;


    const updatedUser = await profileService.updateUserProfile({
        userId,
        username,
        website,
        bio,
        file,
    });

    res.json(updatedUser);

};

export const searchUsersController = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await profileService.searchUsers(query);

    if (!users.length) {
      throw HttpExeption(404, "User search not found");
    }

    res.json(users);
  } catch (error) {
    console.error("Ошибка поиска пользователей:", error);
    res.status(error.status || 500).json({
      message: error.message || "Ошибка сервера",
    });
  }
};



export const followUserController = async (req, res) => {

  const currentUserId = req.user.id;
  const targetUserId = req.params.id;
  const result = await profileService.followUser(currentUserId, targetUserId);
  res.json(result);
};

export const unfollowUserController = async (req, res) => {

  const currentUserId = req.user.id;
  const targetUserId = req.params.id;
  const result = await profileService.unfollowUser(currentUserId, targetUserId);
  res.json(result);

};