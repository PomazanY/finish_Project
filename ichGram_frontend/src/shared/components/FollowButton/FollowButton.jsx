import { useState, useEffect, useMemo } from "react";
import { followUser, unfollowUser } from "../../../shared/api/user-api";
import styles from "./FollowButton.module.css";

const FollowButton = ({ profileUserId, followers = [], onUnfollow, onFollow }) => {
  const currentUserId = localStorage.getItem("userId") || "";
  const [isFollowing, setIsFollowing] = useState(false);
  const [pending, setPending] = useState(false);

  
  const followerIds = useMemo(() => {
    if (!Array.isArray(followers)) return [];
    return followers.map(f =>
      typeof f === "string" ? f : (f?._id ?? String(f))
    ).map(String);
  }, [followers]);

  useEffect(() => {
    setIsFollowing(followerIds.includes(String(currentUserId)));
  }, [followerIds, currentUserId]);


  if (String(currentUserId) === String(profileUserId)) return null;

  const handleFollow = async () => {
    try {
      setPending(true);
      await followUser(profileUserId);
      setIsFollowing(true);
      onFollow?.(profileUserId);
    } catch (err) {
      console.error("Ошибка при подписке:", err);
    } finally {
      setPending(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setPending(true);
      await unfollowUser(profileUserId);
      setIsFollowing(false);
      onUnfollow?.(profileUserId);
    } catch (err) {
      console.error("Ошибка при отписке:", err);
    } finally {
      setPending(false);
    }
  };

  return isFollowing ? (
    <button className={styles.btn} onClick={handleUnfollow} disabled={pending}>
      Unfollow
    </button>
  ) : (
    <button className={styles.btn} onClick={handleFollow} disabled={pending}>
      Follow
    </button>
  );
};

export default FollowButton;
