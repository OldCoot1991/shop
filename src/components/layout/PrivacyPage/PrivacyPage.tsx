import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Server,
  Users,
  Target,
  Share2,
  Cookie,
  ShieldCheck,
  History,
  UserCheck,
  Mail,
  RefreshCw,
} from "lucide-react";
import styles from "./PrivacyPage.module.css";

const PrivacyPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            <ChevronLeft size={16} /> Главная
          </Link>
          <span className={styles.breadcrumbSep}>Политика конфиденциальности</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>Политика конфиденциальности</h1>

          <div
            className={styles.legalNoticeBox}
            style={{ textAlign: "left", alignItems: "flex-start", marginTop: "16px" }}
          >
            <span className={styles.greenDot} style={{ marginTop: "6px" }}></span>
            <p className={styles.legalNoticeText}>
              <strong style={{ display: "block", marginBottom: "8px", color: "var(--color-text)" }}>
                Дата вступления в силу: 01.04.2026
              </strong>
              ООО &quot;ОЗОН-ПРО&quot; уважает право пользователей на конфиденциальность и обязуется защищать
              персональные данные в соответствии с применимым законодательством.
            </p>
          </div>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Server className={styles.sectionIcon} size={24} />
              <h2>1. Кто обрабатывает данные</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                Оператор: ООО &quot;ОЗОН-ПРО&quot;
                <br />
                Адрес: 117218, г. Москва, вн.тер.г. муниципальный округ Котловка, ул. Кржижановского, д. 29, к. 5,
                помещ. 4А/1/5
                <br />
                E-mail: info@ozpro.ru
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Users className={styles.sectionIcon} size={24} />
              <h2>2. Какие данные мы можем собирать</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>Мы можем обрабатывать следующие данные пользователей:</p>
              <ul className={styles.list}>
                <li>имя, фамилию, отчество;</li>
                <li>номер телефона;</li>
                <li>адрес электронной почты;</li>
                <li>адрес доставки;</li>
                <li>данные о заказах, оплатах, возвратах и обращениях;</li>
                <li>данные аккаунта;</li>
                <li>технические данные: IP-адрес, cookie, сведения о браузере, устройстве и действиях на сайте.</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Target className={styles.sectionIcon} size={24} />
              <h2>3. Зачем мы обрабатываем данные</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>Мы используем персональные данные для:</p>
              <ul className={styles.list}>
                <li>регистрации и входа в личный кабинет;</li>
                <li>оформления и исполнения заказов;</li>
                <li>доставки товаров;</li>
                <li>связи с пользователем;</li>
                <li>обработки обращений и возвратов;</li>
                <li>улучшения работы сайта и сервиса;</li>
                <li>выполнения требований закона;</li>
                <li>направления уведомлений и, при наличии согласия, рекламных сообщений.</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Share2 className={styles.sectionIcon} size={24} />
              <h2>4. Кому мы можем передавать данные</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>Мы можем передавать данные:</p>
              <ul className={styles.list}>
                <li>продавцам маркетплейса;</li>
                <li>службам доставки;</li>
                <li>платежным провайдерам;</li>
                <li>IT-подрядчикам и сервисам поддержки;</li>
                <li>государственным органам — в случаях, предусмотренных законом.</li>
              </ul>
              <p className={styles.sectionText}>Мы не продаем персональные данные пользователей.</p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Cookie className={styles.sectionIcon} size={24} />
              <h2>5. Cookies</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>Сайт может использовать файлы cookie и аналитические инструменты, чтобы:</p>
              <ul className={styles.list}>
                <li>обеспечивать корректную работу сайта;</li>
                <li>сохранять настройки пользователя;</li>
                <li>анализировать использование сервиса;</li>
                <li>улучшать пользовательский опыт.</li>
              </ul>
              <p className={styles.sectionText}>Пользователь может изменить настройки cookie в своем браузере.</p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <ShieldCheck className={styles.sectionIcon} size={24} />
              <h2>6. Как мы защищаем данные</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                Мы принимаем необходимые организационные и технические меры для защиты персональных данных от утраты,
                неправомерного доступа, изменения и распространения.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <History className={styles.sectionIcon} size={24} />
              <h2>7. Сколько мы храним данные</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                Мы храним персональные данные не дольше, чем это необходимо для целей обработки, исполнения договоров и
                соблюдения требований законодательства.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <UserCheck className={styles.sectionIcon} size={24} />
              <h2>8. Права пользователя</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>Пользователь вправе:</p>
              <ul className={styles.list}>
                <li>запросить информацию о своих данных;</li>
                <li>потребовать исправления, обновления или удаления данных;</li>
                <li>отозвать согласие на обработку, если она основана на согласии;</li>
                <li>отказаться от рекламных рассылок;</li>
                <li>обратиться с жалобой в уполномоченный орган или в суд.</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Mail className={styles.sectionIcon} size={24} />
              <h2>9. Как с нами связаться</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                По вопросам обработки персональных данных вы можете написать нам:
                <br />
                E-mail: info@ozpro.ru
                <br />
                Адрес: 117218, г. Москва, вн.тер.г. муниципальный округ Котловка, ул. Кржижановского, д. 29, к. 5,
                помещ. 4А/1/5
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <RefreshCw className={styles.sectionIcon} size={24} />
              <h2>10. Изменение политики</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                Мы можем обновлять настоящую Политику. Актуальная версия всегда доступна на сайте по адресу:{" "}
                <Link href="/privacy" className={styles.linkText}>
                  https://ozpro.ru/privacy
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
