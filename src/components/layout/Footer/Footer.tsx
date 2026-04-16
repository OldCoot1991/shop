import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand & Contacts */}
          <div className={styles.column}>
            <div className={styles.brandBox}>
              <Link href="/" className={styles.logoLink}>
                <Image
                  src="/logo.svg"
                  alt="Ozpro"
                  width={240}
                  height={80}
                  className={styles.logoImage}
                />
              </Link>
              <p className={styles.brandDesc}>
                Мы предлагаем лучшие товары по выгодным ценам. Быстрая доставка,
                гарантия качества и абсолютная надежность.
              </p>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.title}>Покупателям</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/" className={styles.link}>
                  Каталог магазина
                </Link>
              </li>
              <li>
                <Link href="/payment-methods" className={styles.link}>
                  Способы оплаты
                </Link>
              </li>
              <li>
                <Link href="/delivery" className={styles.link}>
                  Доставка
                </Link>
              </li>
              <li>
                <Link href="/returns" className={styles.link}>
                  Правила возврата
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.title}>О компании</h4>
            <ul className={styles.list}>
              <li>
                <a href="#" className={styles.link}>
                  О нас
                </a>
              </li>
              <li>
                <Link href="/requisites" className={styles.link}>
                  Реквизиты
                </Link>
              </li>
              <li>
                <Link href="/legal" className={styles.link}>
                  Документы
                </Link>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.title}>Связь с нами</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Mail
                  size={18}
                  className={styles.contactIcon}
                  style={{ flexShrink: 0 }}
                />
                <a
                  href="mailto:info@ozpro.ru"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  info@ozpro.ru
                </a>
              </li>
              <li className={styles.contactItem}>
                <MapPin
                  size={18}
                  className={styles.contactIcon}
                  style={{ flexShrink: 0 }}
                />
                <span>
                  117218, г. Москва, вн.тер.г. муниципальный округ Котловка, ул.
                  Кржижановского, д. 29, к. 5, помещ. 4А/1/5
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>
            © 2026 ОЗОН-ПРО. Все права защищены
          </p>
          <div className={styles.legalLinks}>
            <a href="#">Политика конфиденциальности</a>
            <a href="/legal#public-offer">Публичная оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
