import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

import { UploadIcon, SmileIcon } from "../../shared/icons"
import styles from "./CreatePostModal.module.css";

const CreatePostModal = ({ user, onClose, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleSubmit = () => {
    if (file && description.trim()) {
      onSubmit({ file, description });
      onClose();
    }
  };

  const handleEmojiClick = (emojiData) => {
    setDescription((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };


  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.container}>
          <h2 className={styles.title}>Create new post</h2>
          <button className={styles.btn} onClick={handleSubmit}>Send</button>

        </div>


        <div className={styles.content}>
          <div className={styles.left}>
            {!file ? (
              <label className={styles.uploadLabel}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                />
                <div className={styles.uploadIcon}><UploadIcon /></div>
              </label>
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className={styles.preview}
              />
            )}
          </div>


          <div className={styles.right}>
            <div className={styles.userInfo}>
              <img
                className={styles.avatar}
                src={user.avatar}
                alt="avatar"
              />
              <p>{user.username}</p>
            </div>

            <div className={styles.textareaContainer}>
              <textarea
                className={styles.textarea}
                placeholder="Write a caption..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={2200}
              />

              <button
                className={styles.emojiButton}
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              >
                <SmileIcon />
              </button>

              {showEmojiPicker && (
                <div className={styles.emojiPicker}>
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;