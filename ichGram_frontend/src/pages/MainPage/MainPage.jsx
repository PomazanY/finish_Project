import { useEffect, useState, useCallback } from "react";
import { getFeedPosts } from "../../shared/api/post-api";
import Main from "../..//modules/Main/Main";

const MainPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await getFeedPosts(); 
      setPosts(data);
    } catch (err) {
      console.error("Ошибка загрузки постов:", err);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleUnfollowUser = useCallback((userId) => {
    setPosts((prev) => prev.filter((p) => String(p.userId?._id ?? p.userId) !== String(userId)));
  }, []);

  return (
    <Main
      posts={posts}
      onUnfollowUser={handleUnfollowUser}
      onAnyCommentAdded={fetchPosts}  
    />
  );
};

export default MainPage;
