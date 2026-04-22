"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { X, ShoppingCart, Trash2, Loader2 } from "lucide-react";
import styles from "./CartDrawer.module.css";
import { useAppSelector } from "@/hooks/useAppStore";
import {
  selectCartItems,
  selectServerCartItems,
  selectCartTotal,
  selectCartFetchStatus,
  selectCartFetchError,
} from "@/lib/features/cart/cartSlice";
import { useCart } from "@/hooks/useCart";
import { getProductImageUrl } from "@/services/productService";
import AuthModal from "@/components/ui/AuthModal/AuthModal";
import AutoTranslatable from "@/components/ui/AutoTranslatable/AutoTranslatable";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const localItems = useAppSelector(selectCartItems);
  const serverItems = useAppSelector(selectServerCartItems);
  const total = useAppSelector(selectCartTotal);
  const fetchStatus = useAppSelector(selectCartFetchStatus);
  const fetchError = useAppSelector(selectCartFetchError);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { addItem, decreaseItem, removeItem, clearAll } = useCart();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  // Prefer server items once fetched successfully, fall back to local items
  const useServerItems = fetchStatus === "succeeded";
  const totalCount = useServerItems
    ? serverItems.reduce((s, i) => s + i.quantity, 0)
    : localItems.reduce((s, i) => s + i.quantity, 0);

  const goToCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
    goToCheckout();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <ShoppingCart size={22} />
            <h2>{t("cart_title")}</h2>
            {totalCount > 0 && (
              <span className={styles.count}>{t("cart_item_count", { count: totalCount, defaultValue: `${totalCount} шт.` })}</span>
            )}
          </div>
          <div className={styles.headerActions}>
            {totalCount > 0 && (
              <button className={styles.clearBtn} onClick={clearAll}>
                <Trash2 size={16} /> {t("cart_clear")}
              </button>
            )}
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label={t("common_close", { defaultValue: "Закрыть" })}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className={styles.body}>
          {/* Loading state */}
          {fetchStatus === "loading" && (
            <div className={styles.loadingState}>
              <Loader2 size={32} className={styles.spinner} />
              <p className={styles.loadingText}>{t("cart_loading")}</p>
            </div>
          )}

          {/* Error state */}
          {fetchStatus === "failed" && fetchError && (
            <div className={styles.errorState}>
              <p className={styles.errorText}>{fetchError}</p>
            </div>
          )}

          {/* Server items */}
          {fetchStatus !== "loading" &&
            useServerItems &&
            (serverItems.length === 0 ? (
              <div className={styles.empty}>
                <ShoppingCart size={64} className={styles.emptyIcon} />
                <p className={styles.emptyText}>{t("cart_empty")}</p>
                <p className={styles.emptySubtext}>
                  {t("cart_empty_sub")}
                </p>
              </div>
            ) : (
              <ul className={styles.list}>
                {serverItems.map((item) => {
                  const apiImageFallback = item.images?.[0];
                  const img = apiImageFallback
                    ? getProductImageUrl(apiImageFallback, "miniature")
                    : "";
                  return (
                    <li key={item.id} className={styles.item}>
                      {img && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img}
                          alt={item.name}
                          className={styles.itemImage}
                        />
                      )}
                      <div className={styles.itemInfo}>
                        <p className={styles.itemTitle}>
                          <AutoTranslatable text={item.name ? item.name.charAt(0).toUpperCase() + item.name.slice(1) : ""} />
                        </p>
                        <p className={styles.itemArticle}>
                          {t("cart_item_article")}: {item.article}
                        </p>
                        <div className={styles.itemBottomRow}>
                          <p className={styles.itemPrice}>
                            {(
                              (item.salePrice / 100) *
                              item.quantity
                            ).toLocaleString("ru-RU")}{" "}
                            ₽
                          </p>
                          <div className={styles.itemControls}>
                            <button
                              className={styles.qtyBtn}
                              onClick={() => decreaseItem(item.id)}
                            >
                              −
                            </button>
                            <span className={styles.qty}>{item.quantity}</span>
                            <button
                              className={styles.qtyBtn}
                              onClick={() =>
                                addItem({
                                  id: item.id,
                                  title: item.name,
                                  price: item.salePrice / 100,
                                  image: img,
                                })
                              }
                            >
                              +
                            </button>
                            <button
                              className={styles.removeBtn}
                              onClick={() => removeItem(item.id)}
                              aria-label={t("cart_item_remove")}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ))}

          {/* Local items (fallback when not authenticated / not yet fetched) */}
          {fetchStatus !== "loading" &&
            !useServerItems &&
            (localItems.length === 0 ? (
              <div className={styles.empty}>
                <ShoppingCart size={64} className={styles.emptyIcon} />
                <p className={styles.emptyText}>{t("cart_empty")}</p>
                <p className={styles.emptySubtext}>
                  {t("cart_empty_sub")}
                </p>
              </div>
            ) : (
              <ul className={styles.list}>
                {localItems.map((item) => (
                  <li key={item.id} className={styles.item}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemInfo}>
                      <p className={styles.itemTitle}>
                        <AutoTranslatable text={item.title ? item.title.charAt(0).toUpperCase() + item.title.slice(1) : ""} />
                      </p>
                      <div className={styles.itemBottomRow}>
                        <p className={styles.itemPrice}>
                          {(item.price * item.quantity).toLocaleString("ru-RU")} ℝ
                        </p>
                        <div className={styles.itemControls}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => decreaseItem(item.id)}
                          >
                            −
                          </button>
                          <span className={styles.qty}>{item.quantity}</span>
                          <button
                            className={styles.qtyBtn}
                            onClick={() =>
                              addItem({
                                id: item.id,
                                title: item.title,
                                price: item.price,
                                image: item.image,
                              })
                            }
                          >
                            +
                          </button>
                          <button
                            className={styles.removeBtn}
                            onClick={() => removeItem(item.id)}
                            aria-label={t("cart_item_remove")}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ))}
        </div>

        {total > 0 && fetchStatus !== "loading" && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>{t("cart_total")}:</span>
              <span className={styles.totalPrice}>
                {total.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              {t("cart_checkout")}
            </button>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={() => {
          setAuthModalOpen(false);
          goToCheckout();
        }}
      />
    </>
  );
};

export default CartDrawer;
