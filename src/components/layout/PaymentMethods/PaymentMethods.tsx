import React from 'react';
import styles from './PaymentMethods.module.css';

const UralsibLogo = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img 
    src="/uralsib.svg" 
    alt="Банк Уралсиб" 
    className={styles.logoImg}
  />
);

const YookassaLogo = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img 
    src="/yookassa.svg" 
    alt="ЮKassa" 
    className={styles.logoImg}
  />
);

const PaymentMethods = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={styles.title}>Способы оплаты</h3>
        <div className={styles.methods}>
          <div className={styles.methodCard}>
            <div className={`${styles.iconWrapper} ${styles.uralsib}`} title="Уралсиб">
              <UralsibLogo />
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.methodCard}>
            <div className={styles.iconWrapper} title="ЮKassa">
              <YookassaLogo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
