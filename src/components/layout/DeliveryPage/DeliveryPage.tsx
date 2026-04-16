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
          <Link href="/" className={styles.breadcrumbLink}>
            <ChevronLeft size={16} /> Главная
          </Link>
          <span className={styles.breadcrumbSep}>Доставка</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>Доставка</h1>
          
          <div className={styles.legalNoticeBox}>
            <span className={styles.greenDot}></span>
            <p className={styles.legalNoticeText}>
              Данная информация основана на документе — <Link href="/legal#rules" className={styles.linkText}>Правила оплаты, доставки, возврата и отмены заказа</Link>
            </p>
          </div>

          <p className={styles.subtitle}>
            Доставка товаров осуществляется по всей территории Российской Федерации через СДЭК.
          </p>
        </header>

        <div className={styles.content}>
          {/* Delivery Methods */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Truck className={styles.sectionIcon} size={24} />
              <h2>Способы доставки СДЭК</h2>
            </div>
            <p className={styles.sectionText}>
              Доступные способы доставки могут включать:
            </p>
            <div className={styles.providerGrid}>
              <div className={styles.providerCard}>
                <div className={styles.providerLogoWrapper}>
                  <Truck size={48} className={styles.providerIcon} />
                </div>
                <h3>Курьерская доставка СДЭК</h3>
                <p>Доставка заказа курьером прямо до вашей двери.</p>
              </div>

              <div className={styles.providerCard}>
                <div className={styles.providerLogoWrapper}>
                  <Package size={48} className={styles.providerIcon} />
                </div>
                <h3>Пункт выдачи заказов СДЭК</h3>
                <p>Получение заказа в удобном для вас пункте выдачи.</p>
              </div>
            </div>
          </section>

          {/* Terms and Conditions */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Info className={styles.sectionIcon} size={24} />
              <h2>Стоимость и сроки</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                <strong>Расчет доставки:</strong> Стоимость и предполагаемый срок доставки рассчитываются и отображаются при оформлении заказа. Срок доставки зависит от региона доставки, загруженности логистических каналов, характеристик товара и иных обстоятельств, влияющих на перевозку.
              </p>
              <p className={styles.sectionText}>
                <strong>Отмена и возврат:</strong> Если Покупатель не получил Заказ по причинам, зависящим от него, в том числе не забрал Заказ из пункта выдачи СДЭК в установленный срок, Продавец вправе отменить Заказ и осуществить возврат денежных средств за вычетом фактически понесённых расходов в случаях, допустимых законодательством РФ.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
