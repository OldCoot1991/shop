"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ShoppingCart,
  AlertCircle,
  Loader2,
  CreditCard,
  Package,
  MapPin,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppStore";
import {
  selectCartItems,
  selectServerCartItems,
  selectCartTotal,
  selectCartFetchStatus,
} from "@/lib/features/cart/cartSlice";
import { getProductImageUrl, fetchProductById } from "@/services/productService";
import { createOrderAsync } from "@/lib/features/orders/orderSlice";
import styles from "./CheckoutPage.module.css";
import AutoTranslatable from "@/components/ui/AutoTranslatable/AutoTranslatable";
import CdekWidget from "@/components/ui/CdekWidget/CdekWidget";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const fetchStatus = useAppSelector(selectCartFetchStatus);
  const localItems = useAppSelector(selectCartItems);
  const serverItems = useAppSelector(selectServerCartItems);
  const total = useAppSelector(selectCartTotal);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [deliveryData, setDeliveryData] = useState<{
    tariffCode: number;
    code: string | number;
    address: string;
    price: number;
  } | null>(null);

  const deliveryPrice = deliveryData?.price || 0;
  const grandTotal = total + deliveryPrice;

  // Formatting phone number to "+7 (999) 999-99-99" while typing
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const cleaned = val.replace(/\D/g, "");
    let digits = cleaned;
    
    if (digits.startsWith("8")) {
      digits = "7" + digits.slice(1);
    } else if (digits.length > 0 && !digits.startsWith("7")) {
      digits = "7" + digits;
    } else if (digits.length === 0) {
      setRecipientPhone("");
      return;
    }

    digits = digits.slice(0, 11);

    let formatted = "+7";
    if (digits.length > 1) {
      formatted += ` (${digits.slice(1, 4)}`;
    }
    if (digits.length > 4) {
      formatted += `) ${digits.slice(4, 7)}`;
    }
    if (digits.length > 7) {
      formatted += `-${digits.slice(7, 9)}`;
    }
    if (digits.length > 9) {
      formatted += `-${digits.slice(9, 11)}`;
    }
    
    setRecipientPhone(formatted);
  };

  const getCleanPhone = (formattedPhone: string) => {
    const cleaned = formattedPhone.replace(/\D/g, "");
    return `+${cleaned}`;
  };

  // If not authenticated, send to login
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  const useServerItems = fetchStatus === "succeeded";
  const items = useServerItems ? serverItems : localItems;

  // Local state to cache full product details (including weight/dimensions) fetched from the catalog API
  const [productsDetails, setProductsDetails] = React.useState<Record<string, any>>({});

  // Fetch full details for each item in the cart to obtain correct weight/dimensions
  React.useEffect(() => {
    if (items.length === 0) return;
    items.forEach((item) => {
      if (!productsDetails[item.id]) {
        fetchProductById(item.id)
          .then((details) => {
            if (details) {
              setProductsDetails((prev) => ({
                ...prev,
                [item.id]: details,
              }));
            }
          })
          .catch((err) => {
            console.warn(`Failed to fetch product details for ${item.id}:`, err);
          });
      }
    });
  }, [items, productsDetails]);

  // Map cart items to CDEK goods format using full product details
  const cdekGoods = React.useMemo(() => {
    const goodsList: { length: number; width: number; height: number; weight: number }[] = [];
    console.log("CDEK: Исходные товары из вашей корзины API:", items);
    items.forEach((item) => {
      // Find full product details which contain weight/dimensions
      const detail = productsDetails[item.id] || item;

      const length = ("length" in detail && typeof detail.length === "number" && detail.length > 0) ? detail.length : 10;
      const width = ("width" in detail && typeof detail.width === "number" && detail.width > 0) ? detail.width : 10;
      const height = ("height" in detail && typeof detail.height === "number" && detail.height > 0) ? detail.height : 10;
      
      // Get weight from full product details. If not loaded or empty, fallback to 100.
      const weight = ("weight" in detail && typeof detail.weight === "number" && detail.weight > 0) ? detail.weight : 100;

      for (let i = 0; i < item.quantity; i++) {
        goodsList.push({ length, width, height, weight });
      }
    });
    console.log("CDEK: Результат расчета для отправки (cdekGoods):", goodsList);
    return goodsList;
  }, [items, productsDetails]);

  const handlePay = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    setError(null);
    try {
      const cartPayload = items.map((i) => ({ id: i.id, quantity: i.quantity }));

      if (!deliveryAddress || !deliveryData) {
        throw new Error("Пожалуйста, выберите пункт выдачи СДЭК для оформления заказа");
      }

      if (!recipientName.trim()) {
        throw new Error("Пожалуйста, укажите имя и фамилию получателя");
      }

      if (recipientPhone.length < 18) {
        throw new Error("Пожалуйста, введите корректный номер телефона получателя");
      }

      const parsedCode = Number(deliveryData.code);
      const finalCode = isNaN(parsedCode) ? deliveryData.code : parsedCode;

      const payload = {
        cart: cartPayload,
        delivery: {
          tariffCode: deliveryData.tariffCode,
          name: recipientName.trim(),
          phone: getCleanPhone(recipientPhone),
          code: finalCode,
          address: deliveryData.address,
        },
      };

      console.log("Sending checkout payload:", JSON.stringify(payload, null, 2));
      const billingUrl = await dispatch(createOrderAsync(payload)).unwrap();
      if (billingUrl) {
        window.location.href = billingUrl;
      }
    } catch (err) {
      console.error("Checkout payment error:", err);
      setError(typeof err === "string" ? err : (err instanceof Error ? err.message : "Ошибка оформления заказа"));
    } finally {
      setIsProcessing(false);
    }
  };

  // Loading cart
  if (fetchStatus === "loading") {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <Loader2 size={36} className={styles.loadingSpinner} />
            <AutoTranslatable as="p" text="Загружаем корзину…" />
          </div>
        </div>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <ShoppingCart size={64} strokeWidth={1.2} />
            <AutoTranslatable as="p" text="Ваша корзина пуста" />
            <Link href="/" className={styles.backHomeBtn}>
              <ChevronLeft size={18} /> <AutoTranslatable text="На главную" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/" className={`${styles.breadcrumbLink} ${styles.breadcrumbFirst}`}>
            <ChevronLeft size={16} /> <AutoTranslatable text="Главная" />
          </Link>
          <span className={styles.breadcrumbSep} />
          <AutoTranslatable as="span" className={styles.breadcrumbCurrent} text="Оформление заказа" />
        </nav>

        <AutoTranslatable as="h1" className={styles.title} text="Оформление заказа" />

        <div className={styles.layout}>
          {/* Items */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>
                <Package
                  size={16}
                  style={{
                    display: "inline",
                    marginRight: 8,
                    verticalAlign: "middle",
                  }}
                />
                <AutoTranslatable text="Товары" /> ({itemCount} <AutoTranslatable text="шт." />)
              </p>
            </div>

            {items.map((item) => {
              // Server cart items have images array; local items have a direct image string
              const img =
                "images" in item && item.images?.[0]
                  ? getProductImageUrl(item.images[0], "miniature")
                  : "image" in item
                    ? (item as { image: string }).image
                    : "";

              const name =
                "name" in item
                  ? item.name
                  : "title" in item
                    ? (item as { title: string }).title
                    : "";
              const priceRub =
                "salePrice" in item
                  ? (item.salePrice / 100) * item.quantity
                  : "price" in item
                    ? (item as { price: number }).price * item.quantity
                    : 0;
              const article =
                "article" in item
                  ? (item as { article: string }).article
                  : null;

              return (
                <div key={item.id} className={styles.item}>
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt={name} className={styles.itemImage} />
                  ) : (
                    <div className={styles.itemImagePlaceholder}>
                      <Package size={28} />
                    </div>
                  )}
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}><AutoTranslatable text={name ? name.charAt(0).toUpperCase() + name.slice(1) : ""} /></p>
                    {article && (
                      <p className={styles.itemArticle}><AutoTranslatable text="Арт.:" /> {article}</p>
                    )}
                    <p className={styles.itemQty}><AutoTranslatable text="Кол-во:" /> {item.quantity}</p>
                  </div>
                  <span className={styles.itemPrice}>
                    {priceRub.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <AutoTranslatable as="p" className={styles.summaryTitle} text="Итого" />

            <div className={styles.summaryRow}>
              <span><AutoTranslatable text="Товары" /> ({itemCount} <AutoTranslatable text="шт." />)</span>
              <span>{total.toLocaleString("ru-RU")} <AutoTranslatable text="₽" /></span>
            </div>
            <div className={styles.summaryRow}>
              <AutoTranslatable as="span" text="Доставка" />
              <span>
                {deliveryPrice > 0 ? (
                  `${deliveryPrice.toLocaleString("ru-RU")} ₽`
                ) : (
                  <AutoTranslatable text="по договорённости" />
                )}
              </span>
            </div>

            {deliveryAddress && (
              <div className={styles.deliveryAddressInfo}>
                <MapPin size={16} />
                <span>{deliveryAddress}</span>
              </div>
            )}

            <div className={styles.recipientForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <AutoTranslatable text="ФИО получателя" />
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Фамилия, имя и отчество"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <AutoTranslatable text="Телефон получателя" />
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="+7 (900) 000-00-00"
                  value={recipientPhone}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>

            <button
              className={styles.chooseDeliveryBtn}
              onClick={() => setIsMapOpen(true)}
            >
              <AutoTranslatable text={deliveryAddress ? "Изменить пункт выдачи" : "Выбрать пункт выдачи СДЭК"} />
            </button>

            <hr className={styles.summaryDivider} />

            <div className={styles.summaryTotal}>
              <AutoTranslatable as="span" text="К оплате" />
              <span>{grandTotal.toLocaleString("ru-RU")} <AutoTranslatable text="₽" /></span>
            </div>

            {error && (
              <div className={styles.errorBanner}>
                <AlertCircle size={15} /> <AutoTranslatable text={error} />
              </div>
            )}

            <button
              className={styles.payBtn}
              onClick={handlePay}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className={styles.spinner} /> <AutoTranslatable text="Обработка…" />
                </>
              ) : (
                <>
                  <CreditCard size={18} /> <AutoTranslatable text="Оплатить" />{" "}
                  {grandTotal.toLocaleString("ru-RU")} <AutoTranslatable text="₽" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <CdekWidget
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onChoose={(address, data) => {
          setDeliveryAddress(address);
          setDeliveryData(data);
          setIsMapOpen(false);
        }}
        goods={cdekGoods}
      />
    </div>
  );
}
