"use client";

import { Sun, Moon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { toggleTheme } from "../../../lib/features/theme/themeSlice";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <div className={styles.segmented} data-dark={String(isDark)}>
      <button
        className={styles.segBtn}
        data-active={String(!isDark)}
        onClick={() => !isDark || dispatch(toggleTheme())}
        aria-label="Светлая тема"
      >
        <Sun size={13} strokeWidth={2} />
        <span>Светлая</span>
      </button>
      <button
        className={styles.segBtn}
        data-active={String(isDark)}
        onClick={() => isDark || dispatch(toggleTheme())}
        aria-label="Тёмная тема"
      >
        <Moon size={13} strokeWidth={2} />
        <span>Тёмная</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
