"use client";

import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./Search.module.css";

export default function SearchHeader() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder={t("search_placeholder")}
        />
        <button className={styles.searchButton}>
          <Search size={20} />
        </button>
      </div>
    </div>
  );
}
