"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import SettingsModal from "../../../components/ui/SettingsModal/SettingsModal";
import styles from "./Header.module.css";

const DotsGrid = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 36 36"
    fill="currentColor"
    className={styles.dotsSvg}
    aria-label="Открыть настройки"
    role="button"
  >
    <title>Настройки сайта</title>
    {[0, 1, 2].map((row) =>
      [0, 1, 2].map((col) => (
        <rect
          key={`${row}-${col}`}
          x={1 + col * 12}
          y={1 + row * 12}
          width={6.5}
          height={6.5}
          rx={1.5}
        />
      )),
    )}
  </svg>
);

const Header = ({
  header1,
  header2,
}: {
  header1?: React.ReactNode;
  header2?: React.ReactNode;
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className={styles.container}>
      <div className={styles.row1}>
        {header1}
        <div className={styles.rightGroup}>
          <div
            className={styles.dotsWrapper}
            data-tooltip={t("settings_tooltip")}
            suppressHydrationWarning
            onClick={() => setIsSettingsOpen((prev) => !prev)}
          >
            <DotsGrid />
          </div>
        </div>
      </div>
      <div className={styles.row2}>{header2}</div>
      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </header>
  );
};

export default Header;
