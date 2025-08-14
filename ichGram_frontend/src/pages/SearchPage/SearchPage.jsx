
import { useState } from "react";
import { searchUsers } from "../../shared/api/user-api";

import { Link } from "react-router-dom";

import styles from "./SearchPage.module.css";
const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const users = await searchUsers(value);
      setResults(users);
    } catch (err) {
      console.error("Ошибка поиска:", err);
    }
  };

  return (
    <>
      <div className={styles.overlay} />

      <div className={styles.searchPanel}>
        <h2 className={styles.title}>Search</h2>
        <input
          type="text"
          placeholder="Search users"
          value={search}
          onChange={handleChange}
          className={styles.searchInput}
        />

        <div className={styles.results}>
          {results.map((user) => (
            <Link key={user._id} to={`/profile/${user.username}`} className={styles.userItem}>
              <img src={user.avatar} alt="avatar" className={styles.avatar} />
              <span>{user.username}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );

};
export default SearchPage;