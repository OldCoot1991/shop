import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck, CreditCard } from 'lucide-react';
import styles from './PaymentMethodsPage.module.css';

const PaymentMethodsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/" className={`${styles.breadcrumbLink} ${styles.breadcrumbFirst}`}>
            <ChevronLeft size={16} /> Главная
          </Link>
          <span className={styles.breadcrumbSep} />
          <span className={styles.breadcrumbCurrent}>Способы оплаты</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>Способы оплаты</h1>
          <p className={styles.subtitle}>
            Мы предлагаем безопасные и удобные способы оплаты для ваших покупок. 
            Все транзакции защищены современными протоколами шифрования.
          </p>
        </header>

        <div className={styles.content}>
          {/* Electronic Payments */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <ShieldCheck className={styles.sectionIcon} size={24} />
              <h2>Электронные платежи</h2>
            </div>
            <p className={styles.sectionText}>
              Оплачивайте заказы быстро и без комиссии через наши основные платежные шлюзы.
            </p>
            <div className={styles.providerGrid}>
              <div className={styles.providerCard}>
                <div className={styles.providerLogoWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/yookassa.svg" alt="ЮKassa" className={styles.providerLogoYoo} />
                </div>
                <h3>ЮKassa</h3>
                <p>Единая касса для оплаты онлайн. Лидер среди платежных агрегаторов России.</p>
              </div>

              <div className={styles.providerCard}>
                <div className={styles.providerLogoWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/uralsib.png" alt="Уралсиб" className={styles.providerLogoUral} />
                </div>
                <h3>ПАО «БАНК УРАЛСИБ»</h3>
                <p>Надежные и безопасные платежи через систему банка «Уралсиб».</p>
              </div>
            </div>
          </section>

          {/* Main Payment Providers */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <CreditCard className={styles.sectionIcon} size={24} />
              <h2>Оплата Банковской картой On-Line</h2>
            </div>
            <p className={styles.sectionText}>
              При оформлении заказа выберите способ оплаты &quot;Банковской картой&quot;. По окончании оформления заказа вам будет доступна форма оплаты. Использовать для оплаты разрешается только вашу личную банковскую карту. Все действия с персональными данными осуществляются при помощи защищенного канала на сервере платежной системы. В случае, если осуществить платеж не удается, свяжитесь, пожалуйста, с представителем вашего банка для выяснения причины отказа в платеже.
            </p>
            <p className={styles.sectionText}>
              Для платежа используйте только вашу карту. Платежи выполненные при помощи банковской карты не принадлежащей вам приняты не будут.
            </p>
            <p className={styles.sectionText}>
              Для оплаты заказов могут быть использованы карты VISA, MASTERCARD, МИР Российских банков. Платежи c карт эмитированных зарубежными банками не принимаются.
            </p>

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
