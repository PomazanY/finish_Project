import styles from "./TextAreaField.module.css";

const MAX_LENGTH = 150;

const TextAreaField = ({ register, error, name, rules = {}, className = "", ...props }) => {
    return (
        <div>
            <textarea
                {...register(name, rules)}
                id={name}
                maxLength={MAX_LENGTH}
                className={`${styles.input} ${className}`}
                {...props}
            />
            {error && <p className={styles.error}>{error.message}</p>}
        </div>
    );
};

export default TextAreaField;
