import { useDispatch, useSelector } from "react-redux";
import Login from "../../modules/Login/Login";
import { PhoneMain } from "../../shared/pictures"

import { selectAuth } from "../../redux/auth/auth-selector";
import { login } from "../../redux/auth/auth-thunks";

import styles from "./MainLoginPage.module.css"

const MainLoginPage = () => {
    const { loading, error } = useSelector(selectAuth);
    const dispatch = useDispatch()

    const submitForm = async (payload) => {
        const result = await dispatch(login(payload));

        if (login.fulfilled.match(result)) {
            return {
                success: true,
                id: result.payload.id,
                token: result.payload.token,
                username: result.payload.username,
                email: result.payload.email,
                avatar: result.payload.avatar,
            };
        } else {
            return {
                success: false,
                error: result.payload || "Unknown error"
            };
        }
    };

    return (
        <div>
            <main className={styles.wrap}>
                <PhoneMain />
                <Login submitForm={submitForm} loading={loading} error={error} />
            </main>

        </div>

    )
}
export default MainLoginPage;