"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import styles from "./Footer.module.css";
import DeveloperCard from "@/components/ui/DeveloperCard/DeveloperCard";
import { useTranslation } from "react-i18next";
import AutoTranslatable from "@/components/ui/AutoTranslatable/AutoTranslatable";

const Footer = () => {
  const { t } = useTranslation();

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
              <AutoTranslatable 
                as="p" 
                className={styles.brandDesc}
                text="Мы предлагаем лучшие товары по выгодным ценам. Быстрая доставка, гарантия качества и абсолютная надежность."
              />
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.title}>{t("footer_buyers")}</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/" className={styles.link}>
                  {t("footer_catalog")}
                </Link>
              </li>
              <li>
                <Link href="/payment-methods" className={styles.link}>
                  {t("footer_payment")}
                </Link>
              </li>
              <li>
                <Link href="/delivery" className={styles.link}>
                  {t("footer_delivery")}
                </Link>
              </li>
              <li>
                <Link href="/returns" className={styles.link}>
                  {t("footer_returns")}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.title}>{t("footer_company")}</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/about" className={styles.link}>
                  {t("footer_about")}
                </Link>
              </li>
              <li>
                <Link href="/requisites" className={styles.link}>
                  {t("footer_requisites")}
                </Link>
              </li>
              <li>
                <Link href="/legal" className={styles.link}>
                  {t("footer_documents")}
                </Link>
              </li>
              <li>
                <Link href="/contacts" className={styles.link}>
                  {t("footer_contacts")}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.title}>{t("footer_contact_us")}</h4>
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
                <AutoTranslatable 
                  text="117218, г. Москва, вн.тер.г. муниципальный округ Котловка, ул. Кржижановского, д. 29, к. 5, помещ. 4А/1/5"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>
            {t("footer_copyright")}
          </p>
          <DeveloperCard variant="footer" />
          <div className={styles.legalLinks}>
            <a href="/legal#privacy-policy">{t("footer_privacy")}</a>
            <a href="/legal#public-offer">{t("footer_offer")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
