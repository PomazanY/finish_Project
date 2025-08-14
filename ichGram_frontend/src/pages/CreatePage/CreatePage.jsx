
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../shared/api/post-api";
import CreatePostModal from "../../modules/CreatePostModal/CreatePostModal";

const CreatePage = () => {
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();

    const user = {
        username: localStorage.getItem("username"),
        avatar: localStorage.getItem("avatar"),
        _id: localStorage.getItem("userId"),
    };


    const handleCreatePost = async ({ file, description }) => {
        try {
            await createPost({ file, description });
            setShowModal(false);
            navigate("/profile");
        } catch (err) {
            console.error("Ошибка при создании поста:", err.message || err);

        }
    };

    const handleClose = () => {
        setShowModal(false);
        navigate("/profile");
    };

    return (
        <div>
            {showModal && (
                <CreatePostModal
                    user={user}
                    onClose={handleClose}
                    onSubmit={handleCreatePost}
                />
            )}
        </div>
    );
};

export default CreatePage;