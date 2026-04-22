"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { X, Check } from "lucide-react";
import styles from "./SortDrawer.module.css";

interface SortOption {
  key: string;
  label: string;
}

interface SortDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  options: SortOption[];
  currentValue: string;
  onSelect: (value: string) => void;
  title?: string;
}

const SortDrawer: React.FC<SortDrawerProps> = ({
  isOpen,
  onClose,
  options,
  currentValue,
  onSelect,
  title,
}) => {
  const { t } = useTranslation();
  const drawerTitle = title || t("sort_title", { defaultValue: "Сортировка" });

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.header}>
          <div className={styles.indicator} />
          <div className={styles.headerRow}>
            <h2 className={styles.title}>{drawerTitle}</h2>
            <button className={styles.closeBtn} onClick={onClose} aria-label={t("common_close", { defaultValue: "Закрыть" })}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.optionsList}>
            {options.map((option) => {
              const isActive = currentValue === option.key;
              return (
                <button
                  key={option.key}
                  className={`${styles.optionItem} ${isActive ? styles.optionActive : ""}`}
                  onClick={() => {
                    onSelect(option.key);
                    onClose();
                  }}
                >
                  <span className={styles.optionLabel}>{option.label}</span>
                  {isActive && <Check size={20} className={styles.checkIcon} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SortDrawer;
