import { useEffect, useState } from "react";
import { getRandomPosts, getPostById } from "../../shared/api/post-api";
import PostModal from "../../modules/PostModal/PostModal";

import styles from "./ExplorePage.module.css";

export default function ExplorePage() {
  const [posts, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    getRandomPosts().then(setPosts);
  }, []);

  const openPost = async (p) => {
    try {
      setLoadingId(p._id);
      document.body.style.overflow = "hidden";
      const full = await getPostById(p._id);
      setModalPost(full);
    } catch (e) {
      console.error("Не удалось загрузить пост", e);
    } finally {
      setLoadingId(null);
    }
  };

  const closePost = () => {
    setModalPost(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      <div className={styles.explore}>
        {posts.map((p) => (
          <button
            key={p._id}
            className={styles.tile}
            onClick={() => openPost(p)}
            aria-label="Открыть пост"
          >
            <img src={p.imageUrl} alt={p.description || "post"} />
            {loadingId === p._id && <div className={styles.loading} />}
          </button>
        ))}
      </div>

      {modalPost && (
        <PostModal
          post={modalPost}
          onClose={closePost}
          onCommentAdded={async () => {
            const full = await getPostById(modalPost._id);
            setModalPost(full);
          }}
        />
      )}
    </>
  );
}
