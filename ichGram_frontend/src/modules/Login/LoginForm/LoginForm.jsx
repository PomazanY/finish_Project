import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.css";

import TextField from "../../../shared/components/TextField/TextField";
import ButtonForm from "../../../shared/components/ButtonForm/ButtonForm";
import { fields } from "./fields";

const LoginForm = ({ submitForm, loading, error }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (values) => {

        const result = await submitForm(values);

        if (result.success) {
            localStorage.setItem("token", result.token);
            localStorage.setItem("username", result.username);
            localStorage.setItem("avatar", result.avatar);
            localStorage.setItem("userId", result.id);
         
            navigate("/main");
        } else {
            console.error("Login failed:", result.error);
        }

        reset();
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.textField}>
            <h1 className={styles.title}>ICHGRAM</h1>
            <TextField
                register={register}
                error={errors.identifier}
                {...fields.identifier}
                className={styles.whiteInput}
            />
            <TextField
                register={register}
                error={errors.password}
                {...fields.password}
                className={styles.whiteInput}
            />
            <ButtonForm type="submit" disabled={loading}>Log in
            </ButtonForm>
            {loading && <p className={styles.loadingText}>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default LoginForm;
