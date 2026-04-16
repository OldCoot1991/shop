import React from "react";
import Link from "next/link";
import { ChevronLeft, LifeBuoy, Handshake } from "lucide-react";
import styles from "./ContactsPage.module.css";

const ContactsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            <ChevronLeft size={16} /> Главная
          </Link>
          <span className={styles.breadcrumbSep}>Контакты</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>Контакты</h1>
          <p className={styles.subtitle}>
            Свяжитесь с нами удобным для вас способом. Мы всегда рады помочь!
          </p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <LifeBuoy className={styles.sectionIcon} size={24} />
              <h2>Покупателям</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>Если у вас есть вопросы, напишите нам на</p>
              <a
                href="mailto:support@ozpro.ru"
                className={styles.linkText}
                style={{ display: "inline-block", fontSize: "1.25rem", marginTop: "4px" }}
              >
                support@ozpro.ru
              </a>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Handshake className={styles.sectionIcon} size={24} />
              <h2>Сотрудничество</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>По вопросам сотрудничества напишите на</p>
              <a
                href="mailto:info@ozpro.ru"
                className={styles.linkText}
                style={{ display: "inline-block", fontSize: "1.25rem", marginTop: "4px" }}
              >
                info@ozpro.ru
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
