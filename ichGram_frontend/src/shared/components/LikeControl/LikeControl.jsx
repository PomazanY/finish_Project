import { useState } from "react";
import { likePost } from "../../api/post-api" 
import { LikeIcon } from "../../icons";

import styles from "./LikeControl.module.css"

const LikeControl = ({ postId, initialLikes = 0, initialLiked = false, onChange }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);


    const prev = { likes, liked };
    setLiked(!liked);
    setLikes((n) => n + (liked ? -1 : 1));

    try {
      const { likes: srvLikes, liked: srvLiked } = await likePost(postId); 
      setLikes(srvLikes);
      setLiked(srvLiked);
      onChange?.({ postId, likes: srvLikes, liked: srvLiked }); 
    } catch (e) {
    
      setLikes(prev.likes);
      setLiked(prev.liked);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.actions}>
      <button className={styles.iconBtn} onClick={handleClick} disabled={loading} aria-pressed={liked} title={liked ? "Dislike" : "Like"}>
        <LikeIcon filled={liked} />
      </button>
      <span>{likes}</span>
    </div>
  );
};

export default LikeControl;
