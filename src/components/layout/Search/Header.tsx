import { Search } from "lucide-react";
import styles from "./Search.module.css";

export default function SearchHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Искать на ОЗОН-ПРО"
        />
        <button className={styles.searchButton}>
          <Search size={20} />
        </button>
      </div>
    </div>
  );
}
