import React from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
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
import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.page}>
      {/* Background decoration */}
      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>

      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            <ChevronLeft size={16} /> Главная
          </Link>
          <span className={styles.breadcrumbSep}>О нас</span>
        </nav>

        {/* Hero Section */}
        <header className={styles.hero}>
          <h2 className={styles.heroTitle}>О НАС</h2>
          <div className={styles.subtitleWrapper}>
            <h1 className={styles.title}>О НАС</h1>
            <p className={styles.subtitle}>
              ОЗОН-ПРО — это современный и динамично развивающийся интернет-магазин.
            </p>
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
                <h2>Кто мы?</h2>
              </div>
              <p className={styles.sectionText}>
                Мы — команда профессионалов, объединённых общей миссией: сделать онлайн-торговлю доступной, прозрачной и удобной для каждого. Компания зарегистрирована в соответствии со всеми требованиями российского законодательства и работает под руководством опытного менеджмента.
              </p>
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
                <h2>Наша миссия</h2>
              </div>
              <div className={styles.infoContent}>
                <p className={styles.sectionText}>Создавать экосистему, где:</p>
                <ul className={styles.list} style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Zap size={20} color="var(--color-primary)" />
                    <span className={styles.sectionText}>Покупатели получают качественные товары по справедливым ценам</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <ShieldCheck size={20} color="var(--color-primary)" />
                    <span className={styles.sectionText}>Доверие — основа каждой транзакции</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.mediaPlaceholder} style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-primary))' }}></div>
          </section>

          {/* Section 3: Why Us */}
          <section className={styles.whyUsSection}>
            <h2>Почему выбирают нас?</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <Shield className={styles.sectionIcon} size={24} />
                <h3 className={styles.featureTitle}>Надёжность</h3>
                <p className={styles.featureDesc}>Компания с полной юридической регистрацией и прозрачной структурой</p>
              </div>
              <div className={styles.featureCard}>
                <Briefcase className={styles.sectionIcon} size={24} />
                <h3 className={styles.featureTitle}>Профессионализм</h3>
                <p className={styles.featureDesc}>Опытная команда управления</p>
              </div>
              <div className={styles.featureCard}>
                <Zap className={styles.sectionIcon} size={24} />
                <h3 className={styles.featureTitle}>Удобство</h3>
                <p className={styles.featureDesc}>Интуитивный интерфейс и простая система заказов</p>
              </div>
              <div className={styles.featureCard}>
                <ShieldCheck className={styles.sectionIcon} size={24} />
                <h3 className={styles.featureTitle}>Безопасность</h3>
                <p className={styles.featureDesc}>Защита интересов продавца и покупателей</p>
              </div>
              <div className={styles.featureCard}>
                <Headphones className={styles.sectionIcon} size={24} />
                <h3 className={styles.featureTitle}>Поддержка</h3>
                <p className={styles.featureDesc}>Готовая помочь команда на каждом этапе</p>
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
                <h2>Реквизиты компании</h2>
              </div>
              <div className={styles.infoContent}>
                <p className={styles.sectionText}>Мы работаем открыто и прозрачно. Все наши данные доступны для проверки и сотрудничества.</p>
              </div>
            </div>
            <div className={`${styles.mediaPlaceholder} ${styles.requisitesGradientCard}`}>
              <div className={styles.requisitesPremiumList}>
                <div className={styles.requisitePremiumItem}>
                  <label>Наименование</label>
                  <span>ООО &quot;ОЗОН-ПРО&quot;</span>
                </div>
                <div className={styles.requisitesRow}>
                  <div className={styles.requisitePremiumItem}>
                    <label>ИНН</label>
                    <span>9727126450</span>
                  </div>
                  <div className={styles.requisitePremiumItem}>
                    <label>КПП</label>
                    <span>772701001</span>
                  </div>
                </div>
                <div className={styles.requisitePremiumItem}>
                  <label>ОГРН</label>
                  <span>1267700056876</span>
                </div>
                <div className={styles.requisitePremiumItem}>
                  <label>Юридический адрес</label>
                  <span>117218, г. Москва, вн.тер.г. муниципальный округ Котловка, ул. Кржижановского, д. 29, к. 5, помещ. 4А/1/5</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Note with Heart */}
          <div className={styles.finalNoteSection}>
            <Heart className={styles.heartIcon} size={48} />
            <p className={styles.ctaText}>
              Присоединяйтесь к ОЗОН-ПРО и станьте частью растущего сообщества. Мы ценим доверие наших клиентов и партнеров и стремимся обеспечить высочайший уровень обслуживания.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
