"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { RefreshCcw, AlertTriangle, MonitorPlay, MessageSquareText, CreditCard } from "lucide-react";
import AutoTranslatable from "@/components/ui/AutoTranslatable/AutoTranslatable";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import styles from "./ReturnsPage.module.css";

const ReturnsPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs className={styles.breadcrumb} />

        <header className={styles.header}>
          <AutoTranslatable as="h1" className={styles.title} text="Правила возврата" />
          
          <div className={styles.legalNoticeBox}>
            <span className={styles.greenDot}></span>
            <p className={styles.legalNoticeText}>
              {t("legal_notice")}{" "}
              <Link href="/legal#rules" className={styles.linkText}>
                {t("legal_notice_link")}
              </Link>
            </p>
          </div>

          <AutoTranslatable as="p" className={styles.subtitle} text="Мы стремимся сделать процесс возврата товаров максимально простым и прозрачным для наших клиентов." />
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <RefreshCcw className={styles.sectionIcon} size={24} />
              <AutoTranslatable as="h2" text="Возврат товара надлежащего качества" />
            </div>
            <div className={styles.infoContent}>
              <AutoTranslatable as="p" className={styles.sectionText} text="Покупатель вправе отказаться от Товара надлежащего качества в срок, предусмотренный законодательством РФ для дистанционного способа продажи." />
              <AutoTranslatable as="p" className={styles.sectionText} text="Возврат товара надлежащего качества допускается при условии сохранения:" />
              <ul className={styles.list}>
                <li><AutoTranslatable text="товарного вида;" /></li>
                <li><AutoTranslatable text="потребительских свойств;" /></li>
                <li><AutoTranslatable text="подтверждения покупки у Продавца." /></li>
              </ul>
              <AutoTranslatable as="p" className={styles.sectionText} text="Возврат товара надлежащего качества осуществляется через СДЭК по инструкции, направляемой Продавцом после обращения Покупателя." />
              <AutoTranslatable as="p" className={styles.sectionText} text="Не подлежит возврату товар надлежащего качества, имеющий индивидуально-определённые свойства, если такой товар может быть использован исключительно приобретающим его потребителем." />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <AlertTriangle className={styles.sectionIcon} size={24} />
              <AutoTranslatable as="h2" text="Возврат товара ненадлежащего качества" />
            </div>
            <div className={styles.infoContent}>
              <AutoTranslatable as="p" className={styles.sectionText} text="При обнаружении недостатков товара Покупатель вправе предъявить требования, предусмотренные законодательством РФ." />
              <AutoTranslatable as="p" className={styles.sectionText} text="Продавец вправе провести проверку качества товара, а при необходимости — экспертизу." />
              <AutoTranslatable as="p" className={styles.sectionText} text="Если недостатки возникли не по вине Покупателя, требования Покупателя удовлетворяются в порядке, предусмотренном законодательством РФ." />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <MonitorPlay className={styles.sectionIcon} size={24} />
              <AutoTranslatable as="h2" text="Возврат цифровых товаров" />
            </div>
            <div className={styles.infoContent}>
              <AutoTranslatable as="p" className={styles.sectionText} text="Цифровой товар считается предоставленным с момента направления ключа, кода, ссылки, доступа или иного электронного способа передачи." />
              <AutoTranslatable as="p" className={styles.sectionText} text="После предоставления цифрового товара надлежащего качества возврат, как правило, не производится, если иное не предусмотрено законодательством РФ." />
              <AutoTranslatable as="p" className={styles.sectionText} text="В случае неработоспособности цифрового товара, ошибочного ключа, невозможности получения доступа не по вине Покупателя Продавец рассматривает обращение и при подтверждении проблемы:" />
              <ul className={styles.list}>
                <li><AutoTranslatable text="заменяет цифровой товар;" /></li>
                <li><AutoTranslatable text="повторно предоставляет доступ;" /></li>
                <li><AutoTranslatable text="возвращает денежные средства." /></li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <MessageSquareText className={styles.sectionIcon} size={24} />
              <AutoTranslatable as="h2" text="Порядок обращения по возврату" />
            </div>
            <div className={styles.infoContent}>
              <p className={styles.sectionText}>
                <AutoTranslatable text="Для возврата Покупатель направляет обращение на" /> <strong>info@ozpro.ru</strong> <AutoTranslatable text="и указывает:" />
              </p>
              <ul className={styles.list}>
                <li><AutoTranslatable text="номер заказа;" /></li>
                <li><AutoTranslatable text="ФИО;" /></li>
                <li><AutoTranslatable text="причину обращения;" /></li>
                <li><AutoTranslatable text="описание недостатка или основания возврата;" /></li>
                <li><AutoTranslatable text="фото товара и упаковки, если применимо." /></li>
              </ul>
              <AutoTranslatable as="p" className={styles.sectionText} text="После рассмотрения обращения Продавец направляет Покупателю инструкцию по возврату через СДЭК." />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <CreditCard className={styles.sectionIcon} size={24} />
              <AutoTranslatable as="h2" text="Возврат денежных средств" />
            </div>
            <div className={styles.infoContent}>
              <AutoTranslatable as="p" className={styles.sectionText} text="Возврат денежных средств осуществляется тем способом, которым была произведена оплата, если иной порядок не предусмотрен законом или не согласован сторонами." />
              <AutoTranslatable as="p" className={styles.sectionText} text="Срок возврата денежных средств определяется законодательством РФ, а фактическое зачисление зависит от банка или платёжной системы." />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
