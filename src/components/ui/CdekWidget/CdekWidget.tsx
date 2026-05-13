"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import styles from "./CdekWidget.module.css";
import AutoTranslatable from "@/components/ui/AutoTranslatable/AutoTranslatable";

interface CdekWidgetProps {
  onChoose: (address: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    CDEKWidget: any;
  }
}

export default function CdekWidget({
  onChoose,
  isOpen,
  onClose,
}: CdekWidgetProps) {
  const widgetRef = useRef<any>(null);
  const [isScriptLoaded, setIsScriptLoaded] = React.useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    // Initialize once when script is loaded.
    // The container is always in the DOM (never display:none) so Yandex Maps
    // always sees real dimensions – this prevents the onComponentMount crash.
    if (isScriptLoaded && !initialized.current && window.CDEKWidget) {
      initialized.current = true;
      widgetRef.current = new window.CDEKWidget({
        from: "Нальчик",
        root: "cdek-map",
        apiKey: "be687d49-b83b-42e2-829d-7e684dce7b00",
        servicePath: "https://ozpro.ru/service.php",
        defaultLocation: "Нальчик",
        goods: [
          {
            length: 10,
            width: 10,
            height: 10,
            weight: 1,
          },
        ],
        onChoose: (type: string, tariff: any, address: any) => {
          let addressStr = "";
          if (type === "office") {
            addressStr = `ПВЗ СДЭК: г. ${address.city || ""}, ${
              address.address || address.name || ""
            }`;
          } else if (type === "door") {
            addressStr = `Курьер СДЭК: г. ${address.city || ""}, ${
              address.formatted || address.name || ""
            }`;
          } else {
            addressStr = JSON.stringify(address);
          }

          if (tariff && tariff.delivery_sum) {
            addressStr += ` (Доставка: ${tariff.delivery_sum} ₽)`;
          }

          onChoose(addressStr);
        },
      });
    }
  }, [isScriptLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep overlay always in the DOM – hide via visibility/opacity, NOT display:none.
  // display:none gives the map container zero dimensions which crashes Yandex Maps.
  const overlayStyle: React.CSSProperties = {
    visibility: isOpen ? "visible" : "hidden",
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "all" : "none",
    transition: "opacity 0.2s ease, visibility 0.2s ease",
  };

  return (
    <>
      <Script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3"
        charSet="utf-8"
        strategy="lazyOnload"
        onLoad={() => setIsScriptLoaded(true)}
      />

      <div className={styles.overlay} onClick={onClose} style={overlayStyle}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <AutoTranslatable as="h3" text="Выберите пункт выдачи СДЭК" />
            <button className={styles.closeBtn} onClick={onClose}>
              &times;
            </button>
          </div>
          <div className={styles.mapContainer}>
            <div
              id="cdek-map"
              className={styles.map}
              style={{ width: "100%", height: "100%" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
