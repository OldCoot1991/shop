import React from "react";
import Link from "next/link";
import { ChevronLeft, Building2, Landmark, MapPin } from "lucide-react";
import styles from "./RequisitesPage.module.css";

const RequisitesPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            <ChevronLeft size={16} /> Главная
          </Link>
          <span className={styles.breadcrumbSep}>Реквизиты</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>Реквизиты компании</h1>
          <p className={styles.subtitle}>
            Полная информация о нашей компании и банковские реквизиты.
          </p>
        </header>

        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Building2 className={styles.cardIcon} size={28} />
              <h2>Основная информация</h2>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  Название организации:
                </span>
                <span className={styles.detailValue}>
                  ООО &quot;ОЗОН-ПРО&quot;
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  Юридический адрес организации:
                </span>
                <span className={styles.detailValue}>
                  117218, г. Москва, вн.тер.г. муниципальный округ Котловка, ул.
                  Кржижановского, д. 29, к. 5, помещ. 4А/1/5
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>ИНН</span>
                <span className={styles.detailValue}>9727126450</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>КПП</span>
                <span className={styles.detailValue}>772701001</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>ОГРН</span>
                <span className={styles.detailValue}>1267700056876</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Landmark className={styles.cardIcon} size={28} />
              <h2>Банковские реквизиты</h2>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Банк</span>
                <span className={styles.detailValue}>АО «ТБанк»</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Расчетный счет:</span>
                <span className={styles.detailValue}>40702810310001520851</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>БИК</span>
                <span className={styles.detailValue}>044525974</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>ИНН банка:</span>
                <span className={styles.detailValue}>7710140679</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  Корреспондентский счет банка:
                </span>
                <span className={styles.detailValue}>30101810145250000974</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <MapPin className={styles.cardIcon} size={28} />
              <h2>Контакты и адреса</h2>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Юридический адрес</span>
                <span className={styles.detailValue}>
                  117218, г. Москва, вн.тер.г. муниципальный округ Котловка, ул.
                  Кржижановского, д. 29, к. 5, помещ. 4А/1/5
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Почтовый адрес</span>
                <span className={styles.detailValue}>
                  360004, КБР, г. Нальчик, ул. Тургенева, д. 21А
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Телефон:</span>
                <span className={styles.detailValue}>8 (989) 640-05-23</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequisitesPage;
