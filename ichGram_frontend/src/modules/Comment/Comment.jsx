import { formatDistanceToNow } from "date-fns";
import { LikeIcon } from "../../shared/icons";

import styles from "./Comment.module.css";

const Comment = ({ comment, onLike }) => {
  
  return (
    <div className={styles.comment}>
      <div className={styles.profile}>
        <img
          className={styles.avatar}
          src={comment.userId?.avatar}
          alt="avatar"
        />
        <strong>{comment.userId?.username || "User"}</strong>
      </div>

      {comment.description
        .split(/\n\s*\n/)
        .map((paragraph, index) => (
          <p className={styles.description} key={index}>{paragraph}</p>
        ))}

      <div className={styles.commentMeta}>
        <span>
          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
        </span>

        <div className={styles.likeWrapper}>
          <button
            className={styles.likeButton}
            onClick={() => onLike(comment._id)}
          >
            <LikeIcon
              filled={comment.likes > 0}
              className={styles.likeIcon}
            />
          </button>
          <span>{comment.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
