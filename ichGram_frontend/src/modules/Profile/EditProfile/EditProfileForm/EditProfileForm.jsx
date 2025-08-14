import { useForm } from "react-hook-form";
import { useState } from "react";

import { fields } from "./fields";
import ButtonForm from "../../../../shared/components/ButtonForm/ButtonForm"
import TextField from "../../../../shared/components/TextField/TextField";
import TextAreaField from "../../../../shared/components/TextAreaField/TextAreaField";

import styles from "./EditProfileForm.module.css";
const EditProfileForm = ({ user, onSubmit }) => {
    const [preview, setPreview] = useState(user.avatar);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [avatarFile, setAvatarFile] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: user.username || "",
            website: user.website || "",
            bio: user.bio || "",
        },
    });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setPreview(URL.createObjectURL(file));
            setUsername(URL.createObjectURL(username));
            setBio(URL.createObjectURL(bio));
        }
    };

    const submitHandler = (data) => {
        onSubmit({ ...data, avatarFile });
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
            <div className={styles.avatarRow}>
                {preview && <img src={preview} alt="avatar" className={styles.avatar} />}
                <div className={styles.container}>
                    <p className={styles.username}>{username}</p>
                    <p className={styles.bio}>{bio}</p>
                </div>
                <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    hidden
                    onChange={handlePhotoChange}
                />

                <ButtonForm as="label" htmlFor="avatar">
                    New photo
                </ButtonForm>
            </div>

            <TextField
                register={register}
                error={errors.username}
                {...fields.username}
                className={styles.input}
            />

            <TextField
                register={register}
                error={errors.website}
                {...fields.website}
                className={styles.input}
            />

            <TextAreaField
                register={register}
                error={errors.bio}
                {...fields.bio}
                rows={4}
                className={styles.input}
            />
            <ButtonForm type="submit">
                    Save
                </ButtonForm>
          
        </form>
    );
};

export default EditProfileForm;
