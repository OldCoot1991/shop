"use client";

import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../lib/hooks";
import styles from "./LanguageSwitcher.module.css";

const RuFlag = () => (
  <svg width="18" height="13" viewBox="0 0 16 12" style={{ borderRadius: '2px', display: 'block', border: '1px solid rgba(128,128,128,0.3)' }}>
    <rect width="16" height="4" fill="#fff"/>
    <rect y="4" width="16" height="4" fill="#0039a6"/>
    <rect y="8" width="16" height="4" fill="#d52b1e"/>
  </svg>
);

const EnFlag = () => (
  <svg width="18" height="13" viewBox="0 0 16 12" style={{ borderRadius: '2px', display: 'block', border: '1px solid rgba(128,128,128,0.3)' }}>
    <rect width="16" height="12" fill="#fff" />
    <rect y="1" width="16" height="1" fill="#b22234" />
    <rect y="3" width="16" height="1" fill="#b22234" />
    <rect y="5" width="16" height="1" fill="#b22234" />
    <rect y="7" width="16" height="1" fill="#b22234" />
    <rect y="9" width="16" height="1" fill="#b22234" />
    <rect y="11" width="16" height="1" fill="#b22234" />
    <rect width="7" height="6" fill="#3c3b6e" />
    <path d="M1,1 h0.5 M3,1 h0.5 M5,1 h0.5 M2,2 h0.5 M4,2 h0.5 M6,2 h0.5 M1,3 h0.5 M3,3 h0.5 M5,3 h0.5 M2,4 h0.5 M4,4 h0.5 M6,4 h0.5 M1,5 h0.5 M3,5 h0.5 M5,5 h0.5" stroke="#fff" strokeWidth="0.8" />
  </svg>
);

const LANGUAGES = [
  { code: "ru", flag: <RuFlag />, label: "RU", ariaLabel: "Переключить на русский" },
  { code: "en", flag: <EnFlag />, label: "EN", ariaLabel: "Switch to English" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const mode = useAppSelector((state) => state.theme.mode);
  const isDark = mode === "dark";
  
  useEffect(() => {
    if (i18n.language) {
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);

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
