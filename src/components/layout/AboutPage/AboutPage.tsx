"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { 
  Users, 
  Target, 
  ShieldCheck, 
  Briefcase, 
  Zap, 
  Shield, 
  Headphones, 
  FileText,
  Heart
} from "lucide-react";
import AutoTranslatable from "@/components/ui/AutoTranslatable/AutoTranslatable";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import styles from "./AboutPage.module.css";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      {/* Background decoration */}
      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>

      <div className={styles.container}>
        <Breadcrumbs 
          items={[
            { label: t("breadcrumb_about"), isCurrent: true }
          ]} 
          className={styles.breadcrumb}
        />

        {/* Hero Section */}
        <header className={styles.hero}>
          <AutoTranslatable as="h2" className={styles.heroTitle} text="О НАС" />
          <div className={styles.subtitleWrapper}>
            <AutoTranslatable as="h1" className={styles.title} text="О НАС" />
            <AutoTranslatable as="p" className={styles.subtitle} text="ОЗОН-ПРО — это современный и динамично развивающийся интернет-магазин." />
          </div>
        </header>

        <div className={styles.sectionsGrid}>
          {/* Section 1: Who we are */}
          <section className={styles.narrativeSection}>
            <div className={styles.sectionContent}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                  <Users size={24} />
                </div>
                <AutoTranslatable as="h2" text="Кто мы?" />
              </div>
              <AutoTranslatable as="p" className={styles.sectionText} text="Мы — команда профессионалов, объединённых общей миссией: сделать онлайн-торговлю доступной, прозрачной и удобной для каждого. Компания зарегистрирована в соответствии со всеми требованиями российского законодательства и работает под руководством опытного менеджмента." />
            </div>
            <div className={styles.mediaPlaceholder}></div>
          </section>

          {/* Section 2: Mission */}
          <section className={`${styles.narrativeSection} ${styles.reverse}`}>
            <div className={styles.sectionContent}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                  <Target size={24} />
                </div>
                <AutoTranslatable as="h2" text="Наша миссия" />
              </div>
              <div className={styles.infoContent}>
                <AutoTranslatable as="p" className={styles.sectionText} text="Создавать экосистему, где:" />
                <ul className={styles.list} style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Zap size={20} color="var(--color-primary)" />
                    <AutoTranslatable as="span" className={styles.sectionText} text="Покупатели получают качественные товары по справедливым ценам" />
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <ShieldCheck size={20} color="var(--color-primary)" />
                    <AutoTranslatable as="span" className={styles.sectionText} text="Доверие — основа каждой транзакции" />
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.mediaPlaceholder} style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-primary))' }}></div>
          </section>

          {/* Section 3: Why Us */}
          <section className={styles.whyUsSection}>
            <AutoTranslatable as="h2" text="Почему выбирают нас?" />
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <Shield className={styles.sectionIcon} size={24} />
                <AutoTranslatable as="h3" className={styles.featureTitle} text="Надёжность" />
                <AutoTranslatable as="p" className={styles.featureDesc} text="Компания с полной юридической регистрацией и прозрачной структурой" />
              </div>
              <div className={styles.featureCard}>
                <Briefcase className={styles.sectionIcon} size={24} />
                <AutoTranslatable as="h3" className={styles.featureTitle} text="Профессионализм" />
                <AutoTranslatable as="p" className={styles.featureDesc} text="Опытная команда управления" />
              </div>
              <div className={styles.featureCard}>
                <Zap className={styles.sectionIcon} size={24} />
                <AutoTranslatable as="h3" className={styles.featureTitle} text="Удобство" />
                <AutoTranslatable as="p" className={styles.featureDesc} text="Интуитивный интерфейс и простая система заказов" />
              </div>
              <div className={styles.featureCard}>
                <ShieldCheck className={styles.sectionIcon} size={24} />
                <AutoTranslatable as="h3" className={styles.featureTitle} text="Безопасность" />
                <AutoTranslatable as="p" className={styles.featureDesc} text="Защита интересов продавца и покупателей" />
              </div>
              <div className={styles.featureCard}>
                <Headphones className={styles.sectionIcon} size={24} />
                <AutoTranslatable as="h3" className={styles.featureTitle} text="Поддержка" />
                <AutoTranslatable as="p" className={styles.featureDesc} text="Готовая помочь команда на каждом этапе" />
              </div>
            </div>
          </section>

          {/* Section 4: Requisites */}
          <section className={styles.narrativeSection}>
            <div className={styles.sectionContent}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                  <FileText size={24} />
                </div>
                <AutoTranslatable as="h2" text="Реквизиты компании" />
              </div>
              <div className={styles.infoContent}>
                <AutoTranslatable as="p" className={styles.sectionText} text="Мы работаем открыто и прозрачно. Все наши данные доступны для проверки и сотрудничества." />
              </div>
            </div>
            <div className={`${styles.mediaPlaceholder} ${styles.requisitesGradientCard}`}>
              <div className={styles.requisitesPremiumList}>
                <div className={styles.requisitePremiumItem}>
                  <AutoTranslatable as="label" text="Наименование" />
                  <span>ООО &quot;ОЗОН-ПРО&quot;</span>
                </div>
                <div className={styles.requisitesRow}>
                  <div className={styles.requisitePremiumItem}>
                    <AutoTranslatable as="label" text="ИНН" />
                    <span>9727126450</span>
                  </div>
                  <div className={styles.requisitePremiumItem}>
                    <AutoTranslatable as="label" text="КПП" />
                    <span>772701001</span>
                  </div>
                </div>
                <div className={styles.requisitePremiumItem}>
                  <AutoTranslatable as="label" text="ОГРН" />
                  <span>1267700056876</span>
                </div>
                <div className={styles.requisitePremiumItem}>
                  <AutoTranslatable as="label" text="Юридический адрес" />
                  <AutoTranslatable as="span" text="117218, г. Москва, вн.тер.г. муниципальный округ Котловка, ул. Кржижановского, д. 29, к. 5, помещ. 4А/1/5" />
                </div>
              </div>
            </div>
          </section>

          {/* Footer Note with Heart */}
          <div className={styles.finalNoteSection}>
            <Heart className={styles.heartIcon} size={48} />
            <AutoTranslatable as="p" className={styles.ctaText} text="Присоединяйтесь к ОЗОН-ПРО и станьте частью растущего сообщества. Мы ценим доверие наших клиентов и партнеров и стремимся обеспечить высочайший уровень обслуживания." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
