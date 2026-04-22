"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Building2, Landmark, MapPin } from "lucide-react";
import AutoTranslatable from "@/components/ui/AutoTranslatable/AutoTranslatable";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import styles from "./RequisitesPage.module.css";

const RequisitesPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs 
          items={[{ label: t("breadcrumb_requisites"), isCurrent: true }]} 
          className={styles.breadcrumb}
        />

        <header className={styles.header}>
          <AutoTranslatable as="h1" className={styles.title} text="Реквизиты компании" />
          <AutoTranslatable as="p" className={styles.subtitle} text="Полная информация о нашей компании и банковские реквизиты." />
        </header>

        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Building2 className={styles.cardIcon} size={28} />
              <AutoTranslatable as="h2" text="Основная информация" />
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <AutoTranslatable as="span" className={styles.detailLabel} text="Название организации:" />
                <span className={styles.detailValue}>
                  ООО &quot;ОЗОН-ПРО&quot;
                </span>
              </div>
              <div className={styles.detailItem}>
                <AutoTranslatable as="span" className={styles.detailLabel} text="ИНН" />
                <span className={styles.detailValue}>9727126450</span>
              </div>
              <div className={styles.detailItem}>
                <AutoTranslatable as="span" className={styles.detailLabel} text="КПП" />
                <span className={styles.detailValue}>772701001</span>
              </div>
              <div className={styles.detailItem}>
                <AutoTranslatable as="span" className={styles.detailLabel} text="ОГРН" />
                <span className={styles.detailValue}>1267700056876</span>
              </div>
              <div className={styles.detailItem}>
                <AutoTranslatable as="span" className={styles.detailLabel} text="Юридический адрес:" />
                <AutoTranslatable as="span" className={styles.detailValue} text="117218, г. Москва, вн.тер.г. муниципальный округ Котловка, ул. Кржижановского, д. 29, к. 5, помещ. 4А/1/5" />
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Landmark className={styles.cardIcon} size={28} />
              <AutoTranslatable as="h2" text="Банковские реквизиты" />
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <AutoTranslatable as="span" className={styles.detailLabel} text="Банк:" />
                <AutoTranslatable as="span" className={styles.detailValue} text="ПАО «БАНК УРАЛСИБ»" />
              </div>
              <div className={styles.detailItem}>
                <AutoTranslatable as="span" className={styles.detailLabel} text="БИК:" />
                <span className={styles.detailValue}>040349700</span>
              </div>
              <div className={styles.detailItem}>
                <AutoTranslatable as="span" className={styles.detailLabel} text="Корреспондентский счет:" />
                <span className={styles.detailValue}>30101810400000000700</span>
              </div>
              <div className={styles.detailItem}>
                <AutoTranslatable as="span" className={styles.detailLabel} text="Расчетный счет:" />
                <span className={styles.detailValue}>40702810047010002416</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <MapPin className={styles.cardIcon} size={28} />
              <AutoTranslatable as="h2" text="Контакты" />
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <AutoTranslatable as="span" className={styles.detailLabel} text="Юридический адрес:" />
                <AutoTranslatable as="span" className={styles.detailValue} text="117218, г. Москва, вн.тер.г. муниципальный округ Котловка, ул. Кржижановского, д. 29, к. 5, помещ. 4А/1/5" />
              </div>
              <div className={styles.detailItem}>
                <AutoTranslatable as="span" className={styles.detailLabel} text="Почтовый адрес:" />
                <AutoTranslatable as="span" className={styles.detailValue} text="360004, КБР, г. Нальчик, ул. Тургенева, д. 21А" />
              </div>
              <div className={styles.detailItem}>
                <AutoTranslatable as="span" className={styles.detailLabel} text="Электронная почта:" />
                <span className={styles.detailValue}>
                  <a
                    href="mailto:info@ozpro.ru"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    info@ozpro.ru
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequisitesPage;
