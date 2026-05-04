"use client";

import React, { useEffect, useState, useMemo } from "react";
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
import { useTranslation } from "react-i18next";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import AutoTranslatable from "@/components/ui/AutoTranslatable/AutoTranslatable";
import styles from "./Payments.module.css";
import { OrderStatus } from "@/services/orderService";

export default function PaymentsClient() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const status = useAppSelector(selectOrderStatus);
  const error = useAppSelector(selectOrderError);
  const { currentPage, pageCount } = useAppSelector(selectOrderPagination);

  const [processingId, setProcessingId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "ALL">("ALL");

  const statusConfig: Record<OrderStatus, { label: string; colorClass: string }> =
    useMemo(() => ({
      CREATED: { label: t("order_status_created"), colorClass: styles.statusCreated },
      PAID: { label: t("order_status_paid"), colorClass: styles.statusPaid },
      CANCELED: { label: t("order_status_canceled"), colorClass: styles.statusCanceled },
      DELIVERED: { label: t("order_status_delivered"), colorClass: styles.statusDelivered },
    }), [t]);

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
      alert(t("order_pay_error") + err);
      setProcessingId(null);
    }
  };

  const handleCancel = async (orderId: number) => {
    if (!confirm(t("order_cancel_confirm"))) return;
    setProcessingId(orderId);
    try {
      await dispatch(cancelOrderAsync(orderId)).unwrap();
    } catch (err) {
      alert(t("order_cancel_error") + err);
    } finally {
      setProcessingId(null);
    }
  };

  if (status === "loading" && orders.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 size={40} className={styles.spinner} />
        <p>{t("payments_loading")}</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className={styles.errorContainer}>
        <PackageX size={48} className={styles.errorIcon} />
        <h2>{t("payments_error_title")}</h2>
        <p>{error}</p>
        <button
          className={styles.retryBtn}
          onClick={() => dispatch(fetchOrdersAsync(1))}
        >
          {t("payments_retry")}
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <PackageX size={64} className={styles.emptyIcon} />
        <h2>{t("payments_empty_title")}</h2>
        <p>{t("payments_empty_desc")}</p>
        <Link href="/catalog" className={styles.shopBtn}>
          {t("payments_go_catalog")}
        </Link>
      </div>
    );
  }

  const isRu = i18n.language === "ru";

  return (
    <div className={styles.container}>
      <Breadcrumbs className={styles.breadcrumb} />
      <h1 className={styles.pageTitle}>{t("payments_title")}</h1>

      {orders.length > 0 && (
        <div className={styles.filterRow}>
          <button
            className={`${styles.filterBtn} ${filterStatus === "ALL" ? styles.filterBtnActive : ""}`}
            onClick={() => setFilterStatus("ALL")}
          >
            {t("order_filter_all", { defaultValue: "Все" })}
          </button>
          {(["CREATED", "PAID", "CANCELED"] as OrderStatus[]).map((s) => (
            <button
              key={s}
              className={`${styles.filterBtn} ${filterStatus === s ? styles.filterBtnActive : ""}`}
              onClick={() => setFilterStatus(s)}
            >
              {statusConfig[s].label}
            </button>
          ))}
        </div>
      )}

      <div className={styles.ordersList}>
        {[...orders]
          .filter((o) => filterStatus === "ALL" || o.status === filterStatus)
          .map((order) => {
          const config = statusConfig[order.status] || {
            label: order.status,
            colorClass: "",
          };
          const isProcessing = processingId === order.id;

          return (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderMeta}>
                  <h3 className={styles.orderId}>{t("order_num")}{order.id}</h3>
                  <span className={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleDateString(isRu ? "ru-RU" : "en-US", {
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
                        <p className={styles.productName}>
                          <AutoTranslatable text={p.name ? p.name.charAt(0).toUpperCase() + p.name.slice(1) : ""} />
                        </p>
                        <p className={styles.productMeta}>
                          {t("order_item_art")} {p.article} • {p.quantity} {t("order_item_qty")}
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
                  <span>{t("order_sum")}</span>
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
                        <XCircle size={18} /> {t("order_cancel")}
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
                        {t("order_pay")}
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
            {t("pagination_page")} {currentPage} {t("pagination_of")} {pageCount}
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
