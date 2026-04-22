"use client";

import React from "react";
import { LifeBuoy, Handshake } from "lucide-react";
import AutoTranslatable from "@/components/ui/AutoTranslatable/AutoTranslatable";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import styles from "./ContactsPage.module.css";
import { useTranslation } from "react-i18next";

const ContactsPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs 
          items={[
            { label: t("breadcrumb_contacts"), isCurrent: true }
          ]} 
        />

        <header className={styles.header}>
          <AutoTranslatable as="h1" className={styles.title} text="Контакты" />
          <AutoTranslatable as="p" className={styles.subtitle} text="Свяжитесь с нами удобным для вас способом. Мы всегда рады помочь!" />
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <LifeBuoy className={styles.sectionIcon} size={24} />
              <AutoTranslatable as="h2" text="Покупателям" />
            </div>
            <div className={styles.infoContent}>
              <AutoTranslatable as="p" className={styles.sectionText} text="Если у вас есть вопросы, напишите нам на" />
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
              <AutoTranslatable as="h2" text="Сотрудничество" />
            </div>
            <div className={styles.infoContent}>
              <AutoTranslatable as="p" className={styles.sectionText} text="По вопросам сотрудничества напишите на" />
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
