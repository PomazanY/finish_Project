import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.navLinks}>
        <Link to="/main">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/create">Create</Link>
      </div>
      <div className={styles.copy}> © {new Date().getFullYear()} ICHgram</div>
    </footer>
  );
};

export default Footer;
