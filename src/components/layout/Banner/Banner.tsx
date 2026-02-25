import React from "react";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        <div className={styles.textSection}>
          <h2 className={styles.title}>Грандиозная распродажа электроники</h2>
          <p className={styles.subtitle}>
            Скидки до 50% на топовые бренды. Успейте купить выгодно!
          </p>
          <button className={styles.button}>Смотреть все акции</button>
        </div>
        <div className={styles.imageSection}>
          <div className={styles.decorativeCircle}></div>
          <span className={styles.emoji}>💻📱</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
