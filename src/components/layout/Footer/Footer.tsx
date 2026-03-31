import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h4 className={styles.title}>Покупателям</h4>
            <ul className={styles.list}>
              <li>
                <a href="#">Как сделать заказ</a>
              </li>
              <li>
                <Link href="/payment-methods">Способы оплаты</Link>
              </li>
              <li>
                <a href="#">Доставка</a>
              </li>
              <li>
                <a href="#">Возврат товаров</a>
              </li>
              <li>
                <a href="#">Правила продажи</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.title}>Продавцам</h4>
            <ul className={styles.list}>
              <li>
                <a href="#">Начать продавать</a>
              </li>
              <li>
                <a href="#">Правила для партнеров</a>
              </li>
              <li>
                <a href="#">База знаний</a>
              </li>
              <li>
                <a href="#">Личный кабинет</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.title}>Компания</h4>
            <ul className={styles.list}>
              <li>
                <a href="#">О нас</a>
              </li>
              <li>
                <Link href="/requisites">Реквизиты</Link>
              </li>
              <li>
                <a href="#">Пресс-центр</a>
              </li>
              <li>
                <a href="#">Контакты</a>
              </li>
              <li>
                <a href="#">Вакансии</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.title}>Мы в соцсетях</h4>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon}>
                VK
              </a>
              <a href="#" className={styles.socialIcon}>
                TG
              </a>
              <a href="#" className={styles.socialIcon}>
                YT
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 ShopHub. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
