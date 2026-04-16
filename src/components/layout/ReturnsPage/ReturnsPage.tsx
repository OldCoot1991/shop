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
              <h2>Возврат товара надлежащего качества</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                Покупатель вправе отказаться от Товара надлежащего качества в срок, предусмотренный законодательством РФ для дистанционного способа продажи.
              </p>
              <p className={styles.sectionText}>
                Возврат товара надлежащего качества допускается при условии сохранения:
              </p>
              <ul className={styles.list}>
                <li>товарного вида;</li>
                <li>потребительских свойств;</li>
                <li>подтверждения покупки у Продавца.</li>
              </ul>
              <p className={styles.sectionText}>
                Возврат товара надлежащего качества осуществляется через СДЭК по инструкции, направляемой Продавцом после обращения Покупателя.
              </p>
              <p className={styles.sectionText}>
                Не подлежит возврату товар надлежащего качества, имеющий индивидуально-определённые свойства, если такой товар может быть использован исключительно приобретающим его потребителем.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <AlertTriangle className={styles.sectionIcon} size={24} />
              <h2>Возврат товара ненадлежащего качества</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                При обнаружении недостатков товара Покупатель вправе предъявить требования, предусмотренные законодательством РФ.
              </p>
              <p className={styles.sectionText}>
                Продавец вправе провести проверку качества товара, а при необходимости — экспертизу.
              </p>
              <p className={styles.sectionText}>
                Если недостатки возникли не по вине Покупателя, требования Покупателя удовлетворяются в порядке, предусмотренном законодательством РФ.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <MonitorPlay className={styles.sectionIcon} size={24} />
              <h2>Возврат цифровых товаров</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                Цифровой товар считается предоставленным с момента направления ключа, кода, ссылки, доступа или иного электронного способа передачи.
              </p>
              <p className={styles.sectionText}>
                После предоставления цифрового товара надлежащего качества возврат, как правило, не производится, если иное не предусмотрено законодательством РФ.
              </p>
              <p className={styles.sectionText}>
                В случае неработоспособности цифрового товара, ошибочного ключа, невозможности получения доступа не по вине Покупателя Продавец рассматривает обращение и при подтверждении проблемы:
              </p>
              <ul className={styles.list}>
                <li>заменяет цифровой товар;</li>
                <li>повторно предоставляет доступ;</li>
                <li>возвращает денежные средства.</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <MessageSquareText className={styles.sectionIcon} size={24} />
              <h2>Порядок обращения по возврату</h2>
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                Для возврата Покупатель направляет обращение на <strong>info@ozpro.ru</strong> и указывает:
              </p>
              <ul className={styles.list}>
                <li>номер заказа;</li>
                <li>ФИО;</li>
                <li>причину обращения;</li>
                <li>описание недостатка или основания возврата;</li>
                <li>фото товара и упаковки, если применимо.</li>
              </ul>
              <p className={styles.sectionText}>
                После рассмотрения обращения Продавец направляет Покупателю инструкцию по возврату через СДЭК.
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
                Возврат денежных средств осуществляется тем способом, которым была произведена оплата, если иной порядок не предусмотрен законом или не согласован сторонами.
              </p>
              <p className={styles.sectionText}>
                Срок возврата денежных средств определяется законодательством РФ, а фактическое зачисление зависит от банка или платёжной системы.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
