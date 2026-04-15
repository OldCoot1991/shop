import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import styles from './PaymentMethodsPage.module.css';

const PaymentMethodsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            <ChevronLeft size={16} /> Главная
          </Link>
          <span className={styles.breadcrumbSep}>Способы оплаты</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>Способы оплаты</h1>
          <p className={styles.subtitle}>
            Мы предлагаем безопасные и удобные способы оплаты для ваших покупок. 
            Все транзакции защищены современными протоколами шифрования.
          </p>
        </header>

        <div className={styles.content}>
          {/* Main Payment Providers */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <ShieldCheck className={styles.sectionIcon} size={24} />
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
