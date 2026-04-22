"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Truck, Package, Info } from "lucide-react";
import AutoTranslatable from "@/components/ui/AutoTranslatable/AutoTranslatable";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import styles from "./DeliveryPage.module.css";

const DeliveryPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs 
          items={[{ label: t("breadcrumb_delivery"), isCurrent: true }]} 
          className={styles.breadcrumb}
        />

        <header className={styles.header}>
          <AutoTranslatable as="h1" className={styles.title} text="Доставка" />
          
          <div className={styles.legalNoticeBox}>
            <span className={styles.greenDot}></span>
            <p className={styles.legalNoticeText}>
              {t("legal_notice")}{" "}
              <Link href="/legal#rules" className={styles.linkText}>
                {t("legal_notice_link")}
              </Link>
            </p>
          </div>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Info className={styles.sectionIcon} size={24} />
              <AutoTranslatable as="h2" text="Доставка" />
            </div>
            <div className={styles.infoContent}>
              <AutoTranslatable as="p" className={styles.sectionText} text="Доставка товаров осуществляется по всей территории Российской Федерации через СДЭК." />
              <AutoTranslatable as="p" className={styles.sectionText} text="Доступные способы доставки могут включать:" />
              <ul style={{ paddingLeft: "24px", margin: 0, color: "var(--color-muted)" }}>
                <li style={{ marginBottom: "8px", lineHeight: "1.6" }}>
                  <AutoTranslatable text="курьерскую доставку СДЭК;" />
                </li>
                <li style={{ marginBottom: "8px", lineHeight: "1.6" }}>
                  <AutoTranslatable text="доставку в пункт выдачи заказов СДЭК." />
                </li>
              </ul>
              <AutoTranslatable as="p" className={styles.sectionText} text="Стоимость и предполагаемый срок доставки рассчитываются и отображаются при оформлении заказа." />
              <AutoTranslatable as="p" className={styles.sectionText} text="Срок доставки зависит от региона доставки, загруженности логистических каналов, характеристик товара и иных обстоятельств, влияющих на перевозку." />
              <AutoTranslatable as="p" className={styles.sectionText} text="Если Покупатель не получил Заказ по причинам, зависящим от него, в том числе не забрал Заказ из пункта выдачи СДЭК в установленный срок, Продавец вправе отменить Заказ и осуществить возврат денежных средств за вычетом фактически понесённых расходов в случаях, допустимых законодательством РФ." />
            </div>
          </section>

          <div className={styles.providerGrid}>
            <div className={styles.providerCard}>
              <div className={styles.providerLogoWrapper}>
                <Truck size={48} className={styles.providerIcon} />
              </div>
              <AutoTranslatable as="h3" style={{ margin: 0 }} text="Курьерская доставка СДЭК" />
            </div>
            
            <div className={styles.providerCard}>
              <div className={styles.providerLogoWrapper}>
                <Package size={48} className={styles.providerIcon} />
              </div>
              <AutoTranslatable as="h3" style={{ margin: 0 }} text="Пункт выдачи заказов СДЭК" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
