"use client";

import React from 'react';
import { useTranslation } from "react-i18next";
import { ShieldCheck, CreditCard } from 'lucide-react';
import AutoTranslatable from "@/components/ui/AutoTranslatable/AutoTranslatable";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import styles from './PaymentMethodsPage.module.css';

const PaymentMethodsPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs 
          items={[{ label: t("breadcrumb_payment"), isCurrent: true }]} 
          className={styles.breadcrumb}
        />

        <header className={styles.header}>
          <AutoTranslatable as="h1" className={styles.title} text="Способы оплаты" />
          <AutoTranslatable as="p" className={styles.subtitle} text="Мы предлагаем безопасные и удобные способы оплаты для ваших покупок. Все транзакции защищены современными протоколами шифрования." />
        </header>

        <div className={styles.content}>
          {/* Electronic Payments */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <ShieldCheck className={styles.sectionIcon} size={24} />
              <AutoTranslatable as="h2" text="Электронные платежи" />
            </div>
            <AutoTranslatable as="p" className={styles.sectionText} text="Оплачивайте заказы быстро и без комиссии через наши основные платежные шлюзы." />
            
            <div className={styles.providerGrid}>
              <div className={styles.providerCard}>
                <div className={styles.providerLogoWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/yookassa.svg" alt="ЮKassa" className={styles.providerLogoYoo} />
                </div>
                <h3>ЮKassa</h3>
                <AutoTranslatable as="p" text="Единая касса для оплаты онлайн. Лидер среди платежных агрегаторов России." />
              </div>

              <div className={styles.providerCard}>
                <div className={styles.providerLogoWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/uralsib.png" alt="Уралсиб" className={styles.providerLogoUral} />
                </div>
                <AutoTranslatable as="h3" text="ПАО «БАНК УРАЛСИБ»" />
                <AutoTranslatable as="p" text="Надежные и безопасные платежи через систему банка «Уралсиб»." />
              </div>
            </div>
          </section>

          {/* Main Payment Providers */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <CreditCard className={styles.sectionIcon} size={24} />
              <AutoTranslatable as="h2" text="Оплата Банковской картой On-Line" />
            </div>
            <AutoTranslatable as="p" className={styles.sectionText} text="При оформлении заказа выберите способ оплаты &quot;Банковской картой&quot;. По окончании оформления заказа вам будет доступна форма оплаты. Использовать для оплаты разрешается только вашу личную банковской карту. Все действия с персональными данными осуществляются при помощи защищенного канала на сервере платежной системы. В случае, если осуществить платеж не удается, свяжитесь, пожалуйста, с представителем вашего банка для выяснения причины отказа в платеже." />
            <AutoTranslatable as="p" className={styles.sectionText} text="Для платежа используйте только вашу карту. Платежи выполненные при помощи банковской карты не принадлежащей вам приняты не будут." />
            <AutoTranslatable as="p" className={styles.sectionText} text="Для оплаты заказов могут быть использованы карты VISA, MASTERCARD, МИР Российских банков. Платежи c карт эмитированных зарубежными банками не принимаются." />

            <div className={styles.cardsRow}>
              <div className={styles.cardLogoWrapper} title="Visa">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/visa-logo.svg" alt="Visa" className={styles.cardImg} />
              </div>
              <div className={styles.cardLogoWrapper} title="Mastercard">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/mastercard-logo.svg" alt="Mastercard" className={styles.cardImg} />
              </div>
              <div className={styles.cardLogoWrapper} title="Мир">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/mir-logo.svg" alt="Мир" className={styles.cardImg} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
