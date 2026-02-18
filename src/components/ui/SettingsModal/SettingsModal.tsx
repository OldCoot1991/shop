"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import styles from "./SettingsModal.module.css";

interface Props {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: Props) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.title}>{t("settings_title")}</h3>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={t("settings_title")}
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>{t("settings_theme")}</span>
          <ThemeToggle />
        </div>

        <hr className={styles.divider} />

        <div className={styles.row}>
          <span className={styles.label}>{t("settings_language")}</span>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
