import backendInstance from "./instance.js"

export const getProfileByUsername = async (username) => {
  const response = await backendInstance.get(`/profile/${username}`);
  return response.data;
};

export const updateProfile = async (userId, formData) => {
  const token = localStorage.getItem("token");

  const response = await backendInstance.put(`/profile/${userId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      
    },
  });

  return response.data;
};