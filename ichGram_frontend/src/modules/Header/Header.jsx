import Logo from "./Logo/Logo";

import { NavLink } from "react-router-dom";
import { HomeIcon, SearchIcon, ExploreIcon, MessageIcon, NotificationIcon, CreateIcon } from "../../shared/icons"

import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.sidebar}>
      <Logo />
      <ul className={styles.menu}>
        <li><NavLink to="/main" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}><HomeIcon /> Home</NavLink></li>
        <li><NavLink to="/search" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}><SearchIcon /> Search</NavLink></li>
        <li><NavLink to="/explore" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}><ExploreIcon /> Explore</NavLink></li>
        <li><NavLink to="/messages" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}><MessageIcon /> Messages</NavLink></li>
        <li><NavLink to="/notifications" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}><NotificationIcon /> Notifications</NavLink></li>
        <li><NavLink to="/create" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}><CreateIcon /> Create</NavLink></li>
        <li><NavLink to="/profile" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
        >
          <span className={styles.profileWrapper}>
            <img
              src={localStorage.getItem("avatar")}
              alt="avatar"
              className={styles.avatar}
            />
            Profile
          </span>
        </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;