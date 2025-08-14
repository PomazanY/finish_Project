import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { SmileIcon } from "../../../shared/icons"

import styles from "./CommentForm.module.css";

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setCommentText(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onSubmit(commentText);
    setCommentText("");
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <button
        className={styles.btn}
        onClick={(e) => {
          e.preventDefault();
          setShowEmojiPicker(!showEmojiPicker);
        }}
      >
        <SmileIcon />
      </button>

      {showEmojiPicker && (
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      )}

      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add comment"
      />
      <button className={styles.btn} type="submit">Send</button>
    </form>
  );
};

export default CommentForm;
