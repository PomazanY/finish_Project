import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import SignUpForm from "./SignUpForm/SignUpForm";

const SignUp = ({ submitForm, loading, error }) => {
 
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <SignUpForm submitForm={submitForm} loading={loading} error={error} />
      </div>

      <div className={styles.wrap}>
        <div className={styles.wraptwo}>
          <p className={styles.account}>Have an account?</p>
          <Link to="/" className={styles.login}>Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
