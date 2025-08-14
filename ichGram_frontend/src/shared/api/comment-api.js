import backendInstance from "./instance.js"

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const addComment = async ({ postId, description }) => {
  const res = await backendInstance.post(`/comments/${postId}`, { description }, authHeaders());
  console.log("DBG addComment", { postId, len: String(postId).length, description: description });
  return res.data;
};

export const updateComment = async ({ commentId, description }) => {
  const res = await backendInstance.put(`/comments/${commentId}`, { description }, authHeaders());
  return res.data;
};

export const deleteComment = async ({ commentId }) => {
  const res = await backendInstance.delete(`/comments/${commentId}`, authHeaders());
  return res.data;
};

export const likeComment = async (commentId) => {
  const res = await backendInstance.patch(`/comments/${commentId}/like`, null, authHeaders());
  return res.data; 
};


// const API_URL = "http://localhost:3000/api/comments";


// export const addComment = async ({ postId, description }) => {
//   const response = await axios.post(`http://localhost:3000/api/comments/${postId}`, {
//     description
//   }, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}` // если токен есть
//     }
//   });
//   return response.data;
// };

// export const updateComment = async ({ commentId, userId, description }) => {
//   const response = await axios.put(`${API_URL}/${commentId}`, {
//     userId,
//     description,
//   });
//   return response.data;
// };

// export const deleteComment = async ({ commentId, userId }) => {
//   const response = await axios.delete(`${API_URL}/${commentId}`, {
//     data: { userId },
//   });
//   return response.data;
// };

// export const likeComment = async (commentId) => {
//   const response = await axios.patch(`${API_URL}/${commentId}/like`);
//   return response.data;
// };