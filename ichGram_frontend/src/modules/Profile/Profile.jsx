import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PostModal from "../PostModal/PostModal";
import FollowButton from "../../shared/components/FollowButton/FollowButton"
import { getPostById } from "../../shared/api/post-api";
import styles from "./Profile.module.css";

const Profile = ({ profile }) => {
  const [profileData, setProfileData] = useState(profile);
  const [selectedPost, setSelectedPost] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/editprofile");
  };

  const openPostModal = async (postId) => {
    try {
      const post = await getPostById(postId);
      setSelectedPost(post);
    } catch (err) {
      console.error("Ошибка при загрузке поста:", err);
    }
  };

  const handleCommentAdded = async () => {
    if (!selectedPost?._id) return;
    try {
      const updatedPost = await getPostById(selectedPost._id);
      setSelectedPost(updatedPost);
      setProfileData(prev => ({
        ...prev,
        posts: prev.posts.map(p => (p._id === updatedPost._id ? updatedPost : p))
      }));
    } catch (err) {
      console.error("Ошибка при обновлении поста после комментария:", err);
    }
  };

  return (
    <div className={styles.profile_page}>
      <div className={styles.profile_header}>
        <img className={styles.avatar} src={profileData.avatar} />
        <div className={styles.profile_info}>

          <div className={styles.top_row}>
            <h2 className={styles.username}>{profileData.username}</h2>
            <button className={styles.edit_button} onClick={handleClick}>Edit profile</button>

            {String(localStorage.getItem("userId")) !== String(profileData._id) && (
              <FollowButton
                profileUserId={profileData._id}
                followers={profileData.followers}
              />
            )}
          </div>

          <div className={styles.stats}>
            <span><strong style={{ fontWeight: 'bold' }}>{profileData.postsCount}</strong> posts</span>
            <span><strong style={{ fontWeight: 'bold' }}>{profileData.followers.length}</strong> followers</span>
            <span><strong style={{ fontWeight: 'bold' }}>{profileData.following.length}</strong> following</span>
          </div>


          <p className={styles.bio}>{profileData.bio}</p>
          {profileData.website && (
            <a className={styles.website} href={profileData.website} target="_blank" rel="noreferrer">
              {profileData.website}
            </a>
          )}
        </div>
      </div>

      <div className={styles.post_grid}>
        {profileData.posts && profileData.posts.length > 0 ? (
          profileData.posts.map((post) => (
            <div key={post._id} onClick={() => openPostModal(post._id)}>
              {post.imageUrl && <img src={post.imageUrl} alt="post" />}

            </div>
          ))
        ) : (
          <p>У пользователя пока нет постов.</p>
        )}
      </div>
      <PostModal
        key={selectedPost?._id}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onCommentAdded={handleCommentAdded}
      />

    </div>
  );
};

export default Profile;
