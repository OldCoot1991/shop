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
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppStore";
import {
  selectCartItems,
  selectServerCartItems,
  selectCartTotal,
  selectCartFetchStatus,
} from "@/lib/features/cart/cartSlice";
import { getProductImageUrl } from "@/services/productService";
import { createOrderAsync } from "@/lib/features/orders/orderSlice";
import styles from "./CheckoutPage.module.css";

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

  // If not authenticated, send to login
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  const useServerItems = fetchStatus === "succeeded";
  const items = useServerItems ? serverItems : localItems;

  const handlePay = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    setError(null);
    try {
      const payload = items.map((i) => ({ id: i.id, quantity: i.quantity }));
      const billingUrl = await dispatch(createOrderAsync(payload)).unwrap();
      if (billingUrl) {
        window.location.href = billingUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка оформления заказа");
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
            <p>Загружаем корзину…</p>
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
            <p>Ваша корзина пуста</p>
            <Link href="/" className={styles.backHomeBtn}>
              <ChevronLeft size={18} /> На главную
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
            <ChevronLeft size={16} /> Главная
          </Link>
          <span className={styles.breadcrumbSep} />
          <span className={styles.breadcrumbCurrent}>Оформление заказа</span>
        </nav>

        <h1 className={styles.title}>Оформление заказа</h1>

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
                Товары ({itemCount} шт.)
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
                    <p className={styles.itemName}>{name}</p>
                    {article && (
                      <p className={styles.itemArticle}>Арт.: {article}</p>
                    )}
                    <p className={styles.itemQty}>Кол-во: {item.quantity}</p>
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
            <p className={styles.summaryTitle}>Итого</p>

            <div className={styles.summaryRow}>
              <span>Товары ({itemCount} шт.)</span>
              <span>{total.toLocaleString("ru-RU")} ₽</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Доставка</span>
              <span>по договорённости</span>
            </div>

            <hr className={styles.summaryDivider} />

            <div className={styles.summaryTotal}>
              <span>К оплате</span>
              <span>{total.toLocaleString("ru-RU")} ₽</span>
            </div>

            {error && (
              <div className={styles.errorBanner}>
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <button
              className={styles.payBtn}
              onClick={handlePay}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className={styles.spinner} /> Обработка…
                </>
              ) : (
                <>
                  <CreditCard size={18} /> Оплатить{" "}
                  {total.toLocaleString("ru-RU")} ₽
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
