import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { getProfileByUsername } from "../../shared/api/profile-api";

import Profile from "../../modules/Profile/Profile";


const ProfilePage = () => {
  const { username } = useParams();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUsername = username || localStorage.getItem("username");

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfileByUsername(currentUsername);
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUsername, location.pathname]); 

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Profile not found.</p>;

  return <Profile profile={profile} />;
};

export default ProfilePage;
