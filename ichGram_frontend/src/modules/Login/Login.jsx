import { Link } from "react-router-dom";

import styles from "./Login.module.css";

import LoginForm from "./LoginForm/LoginForm";

const Login = ({ submitForm, loading, error }) => {
  
  return (
    <div>
      <div className={styles.wrap}>
        <LoginForm
          submitForm={submitForm}
          loading={loading}
          error={error}
          
        />
        <div className={styles.divider}>
          <hr className={styles.hr} />
          <span className={styles.or}>OR</span>
          <hr className={styles.hr} />
        </div>
        <Link to="/forgot-password" className={styles.linkPassword} >Forget password?</Link>
      </div>

      <div className={styles.wrap}>
        <div className={styles.wraptwo}>
          <p className={styles.text}>Don't have an account?</p>
          <Link to="/register" className={styles.signUp}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
