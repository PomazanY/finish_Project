import { useState, useEffect } from "react";
import { timeAgo } from "../../shared/utils/timeAgo";
import CommentForm from "../Comment/CommentForm/CommentForm";
import Comment from "../Comment/Comment";
import { useComments } from "../../shared/hooks/useComments";
import FollowButton from "../../shared/components/FollowButton/FollowButton";
import LikeControl from "../../shared/components/LikeControl/LikeControl";
import styles from "./Main.module.css";

const Main = ({ posts, onUnfollowUser, onAnyCommentAdded }) => {
  const currentUserId = localStorage.getItem("userId");
  const [extraComments, setExtraComments] = useState({});
  const [expandedPosts, setExpandedPosts] = useState({});

  const { addComment, pending: addPending } = useComments({
    onChanged: () => onAnyCommentAdded?.(),
  });

  const toggleComments = (postId) =>
    setExpandedPosts((s) => ({ ...s, [postId]: !s[postId] }));



  useEffect(() => {
    setExtraComments({});
  }, [posts]);

  const getMergedComments = (post) => {
    const base = Array.isArray(post.comments) ? post.comments : [];
    const extra = extraComments[post._id] || [];
    
    const map = new Map();
    [...base, ...extra].forEach((c) => {
      const id = String(c?._id || c?.tempId || Math.random());
      if (!map.has(id)) map.set(id, c);
    });
    return Array.from(map.values());
  };

  return (
    <div className={styles.postList}>
      {posts.map((post) => {
        const initialLiked =
          post.isLikedByMe ??
          (Array.isArray(post.likedBy) &&
            post.likedBy.some((id) => String(id) === String(currentUserId)));

        const mergedComments = getMergedComments(post);
        const isExpanded = !!expandedPosts[post._id];
        const visibleComments = isExpanded
          ? mergedComments
          : mergedComments.slice(-1);

        return (
          <div className={styles.postCard} key={post._id}>
            <div>
              <div className={styles.container}>
                <img
                  src={post.userId?.avatar}
                  className={styles.avatar}
                  alt="Avatar"
                />
                <span>{post.userId?.username}</span>
                <p>{timeAgo(post.createdAt)}</p>
                <FollowButton
                  profileUserId={post.userId?._id}
                  followers={post.userId?.followers || []}
                  onlyUnfollow
                  onUnfollow={onUnfollowUser}
                />
              </div>

              <div className={styles.containerImg}>
                <img src={post.imageUrl} alt="Post" className={styles.img} />
              </div>
            </div>

            <LikeControl
              postId={post._id}
              initialLikes={post.likes ?? 0}
              initialLiked={Boolean(initialLiked)}
            />

            <div className={styles.content}>
              <p>
                <strong>{post.userId?.username}</strong>{" "}
                <em>{post.description}</em>
              </p>

              {mergedComments.length > 0 && (
                <div className={styles.comments}>
                  {visibleComments.map((c) => (
                    <Comment
                      key={c._id || c.tempId}
                      comment={c}
                      onLike={() => { }}
                    />
                  ))}

                  {mergedComments.length > 1 && (
                    <button
                      type="button"
                      className={isExpanded ? styles.viewLessBtn : styles.viewAllBtn}
                      onClick={() => toggleComments(post._id)}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded
                        ? "Hide comments"
                        : `View all comments (${mergedComments.length})`}
                    </button>
                  )}
                </div>
              )}


              <CommentForm
                onSubmit={async (description) => {
                  const created = await addComment({
                    postId: post._id,
                    description,
                  });

                  setExtraComments((prev) => {
                    const arr = prev[post._id] || [];
                    return { ...prev, [post._id]: [...arr, created] };
                  });
                }}
                disabled={addPending}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
