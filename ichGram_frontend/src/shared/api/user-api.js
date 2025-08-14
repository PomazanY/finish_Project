import backendInstance from "./instance.js"

export const searchUsers = async (query) => {
  const token = localStorage.getItem("token");

  const response = await backendInstance.get("/profile/search", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      query,
    },
  });

  return response.data; 
};


export const followUser = async (userId) => {
  const token = localStorage.getItem("token");
  return await backendInstance.post(`/profile/follow/${userId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unfollowUser = async (userId) => {
  const token = localStorage.getItem("token");
  return await backendInstance.post(`/profile/unfollow/${userId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

