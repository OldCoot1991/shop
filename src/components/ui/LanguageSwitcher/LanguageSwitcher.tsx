"use client";

import React from "react";

import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../lib/hooks";
import styles from "./LanguageSwitcher.module.css";

const LANGUAGES = [
  { code: "ru", flag: "🇷🇺", label: "RU", ariaLabel: "Переключить на русский" },
  { code: "en", flag: "🇬🇧", label: "EN", ariaLabel: "Switch to English" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const mode = useAppSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} data-dark={String(isDark)}>
        {LANGUAGES.map(({ code, flag, label, ariaLabel }, idx) => (
          <React.Fragment key={code}>
            {idx > 0 && <span className={styles.sep} />}
            <button
              className={styles.langBtn}
              data-active={String(currentLang === code)}
              data-dark={String(isDark)}
              onClick={() => i18n.changeLanguage(code)}
              aria-label={ariaLabel}
            >
              <span className={styles.flag}>{flag}</span>
              <span className={styles.code}>{label}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
