import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileByUsername, updateProfile } from "../../../shared/api/profile-api"

import EditProfileForm from "./EditProfileForm/EditProfileForm";

import styles from "./EditProfile.module.css"

const EditProfile = () => {
    const username = localStorage.getItem("username");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadUser = async () => {
        try {
            const profile = await getProfileByUsername(username);
            setUser(profile);
        } catch (error) {
            console.error("Ошибка при загрузке профиля:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (username) {
            loadUser();
        }
    }, [username]);

    const handleSave = async (formData) => {
        try {
            setLoading(true);
            const data = new FormData();
            data.append("username", formData.username);
            data.append("website", formData.website);
            data.append("bio", formData.bio);
            if (formData.avatarFile) {
                data.append("avatar", formData.avatarFile);
            }

            const updated = await updateProfile(user._id, data);
            setUser(updated);
            navigate("/profile");
        } catch (error) {
            console.error("Ошибка при обновлении профиля:", error);
            alert("Не удалось сохранить профиль");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Edit Profile</h2>
            {loading ? <p>Loading...</p> : <EditProfileForm user={user} onSubmit={handleSave} />}
        </div>
    );
};

export default EditProfile;
