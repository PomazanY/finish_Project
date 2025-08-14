import backendInstance from "./instance.js"

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const createPost = async ({ file, description }) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  formData.append("imageUrl", file);
  formData.append("description", description);
  

  const response = await backendInstance.post("/posts", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
        },
  });

  return response.data;
};


export const getPostById = async (postId) => {
  const response = await backendInstance.get(`/posts/${postId}`);
  return response.data;
};

export const getRandomPosts = async () => {
  const { data } = await backendInstance.get("/posts/explore");
  return data;
};

export const getFeedPosts = async () => {
  const token = localStorage.getItem("token");

  const response = await backendInstance.get("/posts/feed", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const toggleLikePost = async (postId) => {
  const { data } = await backendInstance.patch(`/posts/${postId}/like`);
  return data;
};


export const updatePostById = async (postId, data) => {
  const token = localStorage.getItem("token");

  const response = await backendInstance.put(`/posts/${postId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};




export const likePost = async (postId) => {
  const { data } = await backendInstance.patch(`/posts/${postId}/like`, {}, authHeaders());
  return data; 
};



export const deletePostById = async (postId) => {
  const token = localStorage.getItem("token"); 
  const response = await backendInstance.delete(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};