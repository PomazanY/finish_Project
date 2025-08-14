import { useState } from "react";
import styles from "./PostModal.module.css";

import { deletePostById } from "../../shared/api/post-api";


import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm/CommentForm";
import PostOptionsModal from "./PostOptionsModal/PostOptionsModal";
import { DetailPostIcon } from "../../shared/icons";

import { useComments } from "../../shared/hooks/useComments";

const PostModal = ({ post, onClose, onCommentAdded }) => {
  const [showOptions, setShowOptions] = useState(false);

  const { addComment, likeComment, pending } = useComments({ onChanged: onCommentAdded, });

  if (!post) return null;

  const handleAddComment = (description) =>
    addComment({ postId: post._id, description });

const handleLike = (commentId) => likeComment(commentId);

  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/posts/${post._id}`;
    navigator.clipboard.writeText(postUrl);
    setShowOptions(false);
    alert("Ссылка скопирована!");
  };

  const handleDelete = async () => {
    try {
      await deletePostById(post._id);
      onClose();
      alert("Пост удалён");
      window.location.reload();
    } catch (err) {
      console.error("Ошибка при удалении поста", err);
    }
  };

  const handleGoToPost = () => {
    window.location.href = `/posts/${post._id}`;
  };

  const handleEdit = () => {
    alert("Форма редактирования пока не реализована.");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.imageContainer}>
          <img src={post.imageUrl} alt="post" />

        </div>

        <div className={styles.infoContainer}>
          <div className={styles.container}>
            <div className={styles.profile}>
              <img
                className={styles.avatar}
                src={post.userId.avatar}
                alt="avatar"
              />
              <p>{post.userId.username}</p>
            </div>
            <button className={styles.btn} onClick={() => setShowOptions(true)}>
              <DetailPostIcon />
            </button>
          </div>
          
          <div className={styles.content}>
    <p className={styles.description}>{post.description}</p>
    <hr className={styles.line} />
    {post.comments.length > 0 ? (
      post.comments.map((c) => (
        <Comment key={c._id} comment={c} onLike={handleLike} />
      ))
    ) : (
      <p className={styles.cmt}>Комментариев пока нет.</p>
    )}
  </div>

  {/* форма закреплена снизу и всегда видна */}
  <div className={styles.footer}>
    <CommentForm onSubmit={handleAddComment} disabled={pending} />
  </div>
        </div>
      </div>

      {showOptions && (
        <PostOptionsModal
          onClose={() => setShowOptions(false)}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onGoToPost={handleGoToPost}
          onCopyLink={handleCopyLink}
        />
      )}
    </div>
  );
};

export default PostModal;
