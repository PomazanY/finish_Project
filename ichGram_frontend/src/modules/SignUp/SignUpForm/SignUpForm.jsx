import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { fields } from "./fields";

import TextField from "../../../shared/components/TextField/TextField"
import ButtonForm from "../../../shared/components/ButtonForm/ButtonForm";

import styles from "./SignUpForm.module.css"

const SignUpForm = ({ submitForm, loading, error }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const result = await submitForm(values);

        if (result.error) {
            console.error("Registration error:", result.error);
            return;
        }

        reset();
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.textField}>
            <h1 className={styles.title}>ICHGRAM</h1>
            <h2 className={styles.signUp}>Sign up to see photos and videos from your friends.</h2>

            <TextField register={register} error={errors.email} {...fields.email} className={styles.whiteInput} />
            <TextField register={register} error={errors.fullName} {...fields.fullName} className={styles.whiteInput} />
            <TextField register={register} error={errors.username} {...fields.username} className={styles.whiteInput} />
            <TextField register={register} error={errors.password} {...fields.password} className={styles.whiteInput} />

            <p className={styles.text}>
                People who use our service may have uploaded your contact information to Instagram.
            </p>
            <p className={styles.agreeSignUp}>
                By signing up, you agree to our{" "}
                <a href="/terms" className={styles.link} target="_blank" rel="noopener noreferrer">
                    Terms
                </a>,{" "}
                <a href="/policy" className={styles.link} target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                </a>{" "}
                <span>and</span>{" "}
                <a href="/cookies" className={styles.link} target="_blank" rel="noopener noreferrer">
                    Cookies Policy
                </a>.
            </p>

            <ButtonForm type="submit" disabled={loading}>Sign up</ButtonForm>
            {/* {loading && <p className={styles.loadingText}>Loading...</p>} */}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};


export default SignUpForm;