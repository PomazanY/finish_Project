import styles from "./PostOptionsModal.module.css"

const PostOptionsModal = ({ onClose, onDelete, onEdit, onGoToPost, onCopyLink }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.delete} onClick={onDelete}>Delete</button>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onGoToPost}>Go to post</button>
        <button onClick={onCopyLink}>Copy link</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PostOptionsModal;