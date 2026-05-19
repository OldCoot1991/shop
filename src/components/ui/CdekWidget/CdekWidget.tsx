"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import styles from "./CdekWidget.module.css";
import AutoTranslatable from "@/components/ui/AutoTranslatable/AutoTranslatable";

interface CdekWidgetProps {
  onChoose: (
    address: string,
    deliveryData: {
      tariffCode: number;
      code: string | number;
      address: string;
      price: number;
    }
  ) => void;
  isOpen: boolean;
  onClose: () => void;
  defaultLocation?: string | number[];
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
  defaultLocation = "Нальчик",
}: CdekWidgetProps) {
  const widgetRef = useRef<any>(null);
  const [isScriptLoaded, setIsScriptLoaded] = React.useState(false);
  const initialized = useRef(false);
  const isWidgetReady = useRef(false);

  // Check if script is already globally available on mount
  useEffect(() => {
    if (window.CDEKWidget) {
      console.log("CDEK script already loaded on mount.");
      setIsScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Initialize once when script is loaded.
    // The container is always in the DOM (never display:none) so Yandex Maps
    // always sees real dimensions – this prevents the onComponentMount crash.
    if (isScriptLoaded && !initialized.current && window.CDEKWidget) {
      initialized.current = true;
      try {
        console.log("Initializing CDEKWidget instance...");
        widgetRef.current = new window.CDEKWidget({
          from: "Нальчик",
          root: "cdek-map",
          apiKey: "be687d49-b83b-42e2-829d-7e684dce7b00",
          servicePath: "/cdek-proxy",
          defaultLocation: defaultLocation,
          tariffs: {
            office: [136],
          },
          hideDeliveryOptions: {
            door: true,
            office: false,
          },
          goods: [
            {
              length: 10,
              width: 10,
              height: 10,
              weight: 1,
            },
          ],
          onReady: () => {
            console.log("CDEKWidget is fully loaded and ready!");
            isWidgetReady.current = true;
            // Apply initial location update if it was passed
            try {
              widgetRef.current.updateLocation(defaultLocation);
            } catch (e) {
              console.warn("Failed to set initial CDEK widget location:", e);
            }
          },
          onChoose: (type: string, tariff: any, address: any) => {
            console.log("CDEKWidget onChoose triggered:", type, tariff, address);
            let addressStr = "";
            let addressClean = "";
            if (type === "office") {
              addressClean = `${address.city || ""}, ${address.address || address.name || ""}`;
              addressStr = `ПВЗ СДЭК: ${addressClean}`;
            } else if (type === "door") {
              addressClean = `${address.city || ""}, ${address.formatted || address.name || ""}`;
              addressStr = `Курьер СДЭК: ${addressClean}`;
            } else {
              addressClean = typeof address === "string" ? address : JSON.stringify(address);
              addressStr = addressClean;
            }

            if (tariff && tariff.delivery_sum) {
              addressStr += ` (Доставка: ${tariff.delivery_sum} ₽)`;
            }

            const rawTariffCode = tariff?.tariff_code || tariff?.tariffCode || 136;
            const parsedTariffCode = Number(rawTariffCode);
            const tariffCode = isNaN(parsedTariffCode) ? 136 : parsedTariffCode;

            const rawCityCode = address?.city_code || address?.cityCode || address?.code || 78;
            const parsedCityCode = Number(rawCityCode);
            const cityCode = isNaN(parsedCityCode) ? 78 : parsedCityCode;

            const rawPrice = tariff?.delivery_sum || tariff?.deliverySum || 0;
            const parsedPrice = Number(rawPrice);
            const price = isNaN(parsedPrice) ? 0 : parsedPrice;

            onChoose(addressStr, {
              tariffCode,
              code: cityCode,
              address: addressClean,
              price,
            });
          },
        });
      } catch (err) {
        console.error("Error creating CDEKWidget instance:", err);
        initialized.current = false; // Allow recovery/re-initialization
      }
    }
  }, [isScriptLoaded, defaultLocation]); // eslint-disable-line react-hooks/exhaustive-deps

  // Dynamically update location when widget is opened or defaultLocation changes.
  // Using updateLocation is only safe after the widget is fully ready (isWidgetReady.current is true).
  useEffect(() => {
    if (
      isOpen &&
      isScriptLoaded &&
      widgetRef.current &&
      isWidgetReady.current
    ) {
      try {
        widgetRef.current.updateLocation(defaultLocation);
      } catch (err) {
        console.error("Failed to update CDEK widget location on open:", err);
      }
    }
  }, [isOpen, defaultLocation, isScriptLoaded]);

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
        strategy="afterInteractive"
        onLoad={() => {
          console.log("CDEK Script loaded via strategy afterInteractive");
          setIsScriptLoaded(true);
        }}
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
