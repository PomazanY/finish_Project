
import backendInstance from "./instance.js"

export const loginUserApi = async (data) => {
  const response = await backendInstance.post("/users/login", data);

  const { token, username, email, avatar, id } = response.data;

  return {
    id,
    token,
    username,
    email,
    avatar,
  };
};

export const registerUserApi = async (data) => {
  const response = await backendInstance.post("/users/register", data);
  return response.data;
};


export const requestPasswordReset = async (email) => {
  const { data } = await backendInstance.post("/users/forgot-password", { email });
  return data; 
};


export const resetPassword = async ({ token, password }) => {
  const { data } = await backendInstance.post("/users/reset-password", { token, password });
  return data; 
};