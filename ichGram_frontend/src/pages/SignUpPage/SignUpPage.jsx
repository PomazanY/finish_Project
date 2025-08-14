import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import SignUp from "../../modules/SignUp/SignUp"
import { clearError } from "../../redux/auth/auth-slice";
import { selectAuth } from "../../redux/auth/auth-selector";
import { register } from "../../redux/auth/auth-thunks";
import styles from "./SignUpPage.module.css"

const SignUpFPage = () => {
    const { loading, error } = useSelector(selectAuth);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const submitForm = async (payload) => dispatch(register(payload));
    return (
        <main className={styles.wrap}>
            <SignUp submitForm={submitForm} loading={loading} error={error} />

        </main>

    )
}
export default SignUpFPage