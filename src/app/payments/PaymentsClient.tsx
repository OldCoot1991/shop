"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import {
  fetchOrdersAsync,
  selectOrders,
  selectOrderStatus,
  selectOrderError,
  payOrderAsync,
  cancelOrderAsync,
  selectOrderPagination,
} from "@/lib/features/orders/orderSlice";
import {
  Loader2,
  PackageX,
  CreditCard,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./Payments.module.css";
import { OrderStatus } from "@/services/orderService";

const statusConfig: Record<OrderStatus, { label: string; colorClass: string }> =
  {
    CREATED: { label: "Ожидает оплаты", colorClass: styles.statusCreated },
    PAID: { label: "Оплачен", colorClass: styles.statusPaid },
    CANCELED: { label: "Отменен", colorClass: styles.statusCanceled },
    DELIVERED: { label: "Доставлен", colorClass: styles.statusDelivered },
  };

export default function PaymentsClient() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const status = useAppSelector(selectOrderStatus);
  const error = useAppSelector(selectOrderError);
  const { currentPage, pageCount } = useAppSelector(selectOrderPagination);

  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchOrdersAsync(1));
  }, [dispatch]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) {
      dispatch(fetchOrdersAsync(newPage));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePay = async (orderId: number) => {
    setProcessingId(orderId);
    try {
      const url = await dispatch(payOrderAsync(orderId)).unwrap();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      alert("Не удалось перейти к оплате. Ошибка: " + err);
      setProcessingId(null);
    }
  };

  const handleCancel = async (orderId: number) => {
    if (!confirm("Вы уверены, что хотите отменить этот заказ?")) return;
    setProcessingId(orderId);
    try {
      await dispatch(cancelOrderAsync(orderId)).unwrap();
    } catch (err) {
      alert("Не удалось отменить заказ. Ошибка: " + err);
    } finally {
      setProcessingId(null);
    }
  };

  if (status === "loading" && orders.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 size={40} className={styles.spinner} />
        <p>Загрузка заказов...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className={styles.errorContainer}>
        <PackageX size={48} className={styles.errorIcon} />
        <h2>Произошла ошибка</h2>
        <p>{error}</p>
        <button
          className={styles.retryBtn}
          onClick={() => dispatch(fetchOrdersAsync(1))}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <PackageX size={64} className={styles.emptyIcon} />
        <h2>Заказов пока нет</h2>
        <p>Вы еще ничего не заказывали или ваша корзина пуста.</p>
        <Link href="/catalog" className={styles.shopBtn}>
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Мои заказы</h1>

      <div className={styles.ordersList}>
        {orders.map((order) => {
          const config = statusConfig[order.status] || {
            label: order.status,
            colorClass: "",
          };
          const isProcessing = processingId === order.id;

          return (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderMeta}>
                  <h3 className={styles.orderId}>Заказ №{order.id}</h3>
                  <span className={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className={`${styles.orderStatus} ${config.colorClass}`}>
                  {config.label}
                </div>
              </div>

              <div className={styles.orderItems}>
                {order.products.map((p) => {
                  const img =
                    p.images?.[0]?.miniatureUrl || p.images?.[0]?.tinyUrl;
                  const absImg = img
                    ? img.startsWith("http")
                      ? img
                      : `https://ozpro.ru${img}`
                    : undefined;
                  return (
                    <div key={p.id} className={styles.productRow}>
                      <div className={styles.productImageWrapper}>
                        {absImg ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={absImg}
                            alt={p.name}
                            className={styles.productImage}
                          />
                        ) : (
                          <div className={styles.imagePlaceholder} />
                        )}
                      </div>
                      <div className={styles.productInfo}>
                        <p className={styles.productName}>{p.name}</p>
                        <p className={styles.productMeta}>
                          Арт: {p.article} • {p.quantity} шт.
                        </p>
                      </div>
                      <div className={styles.productPrice}>
                        {((p.salePrice / 100) * p.quantity).toLocaleString(
                          "ru-RU",
                        )}{" "}
                        ₽
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.orderFooter}>
                <div className={styles.orderTotal}>
                  <span>Сумма:</span>
                  <span className={styles.totalAmount}>
                    {(order.amount / 100).toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                <div className={styles.orderActions}>
                  {order.status === "CREATED" && (
                    <>
                      <button
                        className={styles.cancelBtn}
                        onClick={() => handleCancel(order.id)}
                        disabled={isProcessing}
                      >
                        <XCircle size={18} /> Отменить
                      </button>
                      <button
                        className={styles.payBtn}
                        onClick={() => handlePay(order.id)}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <Loader2 size={18} className={styles.spinner} />
                        ) : (
                          <CreditCard size={18} />
                        )}
                        Оплатить
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pageCount > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </button>
          <span className={styles.pageInfo}>
            Страница {currentPage} из {pageCount}
          </span>
          <button
            className={styles.pageBtn}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
