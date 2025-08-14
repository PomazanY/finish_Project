import { PhoneMain } from "../../shared/pictures";

import styles from "./NotFoundPage.module.css"

const NotFoundPage = () => {
    return (
        <section className={styles.container}>
            <PhoneMain />
            <div className={styles.content}>
                <p className={styles.title}>Oops! Page Not Found (404 Error)</p>
                <p className={styles.text}>We're sorry, but the page you're looking for doesn't seem to exist. <br />
                    If you typed the URL manually, please double-check the spelling. <br />
                    If you clicked on a link, it may be outdated or broken.</p>
            </div>

        </section>
    )
}
export default NotFoundPage;