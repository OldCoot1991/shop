import React from "react";
import Link from "next/link";
import { ChevronLeft, Truck, Package, Info } from "lucide-react";
import styles from "./DeliveryPage.module.css";

const DeliveryPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/" className={`${styles.breadcrumbLink} ${styles.breadcrumbFirst}`}>
            <ChevronLeft size={16} /> Главная
          </Link>
          <span className={styles.breadcrumbSep} />
          <span className={styles.breadcrumbCurrent}>Доставка</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>Доставка</h1>
          
          <div className={styles.legalNoticeBox}>
            <span className={styles.greenDot}></span>
            <p className={styles.legalNoticeText}>
              Данная информация основана на документе — <Link href="/legal#rules" className={styles.linkText}>Правила оплаты, доставки, возврата и отмены заказа</Link>
            </p>
          </div>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Info className={styles.sectionIcon} size={24} />
              <h2>Доставка</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                Доставка товаров осуществляется по всей территории Российской Федерации через СДЭК.
              </p>
              <p className={styles.sectionText}>
                Доступные способы доставки могут включать:
              </p>
              <ul style={{ paddingLeft: "24px", margin: 0, color: "var(--color-muted)" }}>
                <li style={{ marginBottom: "8px", lineHeight: "1.6" }}>курьерскую доставку СДЭК;</li>
                <li style={{ marginBottom: "8px", lineHeight: "1.6" }}>доставку в пункт выдачи заказов СДЭК.</li>
              </ul>
              <p className={styles.sectionText}>
                Стоимость и предполагаемый срок доставки рассчитываются и отображаются при оформлении заказа.
              </p>
              <p className={styles.sectionText}>
                Срок доставки зависит от региона доставки, загруженности логистических каналов, характеристик товара и иных обстоятельств, влияющих на перевозку.
              </p>
              <p className={styles.sectionText}>
                Если Покупатель не получил Заказ по причинам, зависящим от него, в том числе не забрал Заказ из пункта выдачи СДЭК в установленный срок, Продавец вправе отменить Заказ и осуществить возврат денежных средств за вычетом фактически понесённых расходов в случаях, допустимых законодательством РФ.
              </p>
            </div>
          </section>

          <div className={styles.providerGrid}>
            <div className={styles.providerCard}>
              <div className={styles.providerLogoWrapper}>
                <Truck size={48} className={styles.providerIcon} />
              </div>
              <h3 style={{ margin: 0 }}>Курьерская доставка СДЭК</h3>
            </div>
            
            <div className={styles.providerCard}>
              <div className={styles.providerLogoWrapper}>
                <Package size={48} className={styles.providerIcon} />
              </div>
              <h3 style={{ margin: 0 }}>Пункт выдачи заказов СДЭК</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
