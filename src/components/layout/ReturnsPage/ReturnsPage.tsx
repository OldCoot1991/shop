import React from "react";
import Link from "next/link";
import { ChevronLeft, RefreshCcw, AlertTriangle, MonitorPlay, MessageSquareText, CreditCard } from "lucide-react";
import styles from "./ReturnsPage.module.css";

const ReturnsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            <ChevronLeft size={16} /> Главная
          </Link>
          <span className={styles.breadcrumbSep}>Правила возврата</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>Правила возврата</h1>
          
          <div className={styles.legalNoticeBox}>
            <span className={styles.greenDot}></span>
            <p className={styles.legalNoticeText}>
              Данная информация основана на документе — <Link href="/legal#rules" className={styles.linkText}>Правила оплаты, доставки, возврата и отмены заказа</Link>
            </p>
          </div>

          <p className={styles.subtitle}>
            Мы стремимся сделать процесс возврата товаров максимально простым и прозрачным для наших клиентов.
          </p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <RefreshCcw className={styles.sectionIcon} size={24} />
              <h2>Товар надлежащего качества</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                Вы вправе отказаться от товара надлежащего качества в срок, предусмотренный законодательством РФ для дистанционного способа продажи. Возврат допускается при условии сохранения:
              </p>
              <ul className={styles.list}>
                <li>товарного вида;</li>
                <li>потребительских свойств;</li>
                <li>подтверждения покупки у нас.</li>
              </ul>
              <p className={styles.sectionText}>
                Возврат осуществляется через СДЭК по инструкции, направляемой нами после вашего обращения. Не подлежит возврату товар надлежащего качества, имеющий индивидуально-определённые свойства.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <AlertTriangle className={styles.sectionIcon} size={24} />
              <h2>Товар ненадлежащего качества</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                При обнаружении недостатков товара вы вправе предъявить требования, предусмотренные законодательством РФ. Мы можем провести проверку качества товара, а при необходимости — экспертизу. Если недостатки возникли не по вашей вине, ваши требования удовлетворяются в порядке, предусмотренном законом.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <MonitorPlay className={styles.sectionIcon} size={24} />
              <h2>Цифровые товары</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                После предоставления цифрового товара (направления ключа, кода, ссылки и т.д.) надлежащего качества возврат, как правило, не производится. В случае неработоспособности цифрового товара, ошибочного ключа или невозможности получения доступа не по вашей вине, мы рассматриваем обращение и при подтверждении проблемы:
              </p>
              <ul className={styles.list}>
                <li>заменяем цифровой товар;</li>
                <li>повторно предоставляем доступ;</li>
                <li>либо возвращаем денежные средства.</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <MessageSquareText className={styles.sectionIcon} size={24} />
              <h2>Порядок обращения</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                Для возврата направьте обращение на <strong>info@ozpro.ru</strong> и укажите:
              </p>
              <ul className={styles.list}>
                <li>номер заказа;</li>
                <li>ваши ФИО;</li>
                <li>причину обращения и описание недостатка;</li>
                <li>фото товара и упаковки, если применимо.</li>
              </ul>
              <p className={styles.sectionText}>
                После рассмотрения обращения вы получите инструкцию по возврату через СДЭК.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <CreditCard className={styles.sectionIcon} size={24} />
              <h2>Возврат денежных средств</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                Возврат денежных средств осуществляется тем способом, которым была произведена оплата. Срок возврата определяется законодательством РФ, а фактическое зачисление зависит от вашего банка или платёжной системы.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
