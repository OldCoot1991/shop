"use client";

import React from "react";
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
import { createOrderAsync } from "@/lib/features/orders/orderSlice";
import { useAppDispatch } from "@/hooks/useAppStore";
import AuthModal from "@/components/ui/AuthModal/AuthModal";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const localItems = useAppSelector(selectCartItems);
  const serverItems = useAppSelector(selectServerCartItems);
  const total = useAppSelector(selectCartTotal);
  const fetchStatus = useAppSelector(selectCartFetchStatus);
  const fetchError = useAppSelector(selectCartFetchError);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { addItem, decreaseItem, removeItem, clearAll } = useCart();
  const dispatch = useAppDispatch();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  // Prefer server items once fetched successfully, fall back to local items
  const useServerItems = fetchStatus === "succeeded";
  const totalCount = useServerItems
    ? serverItems.reduce((s, i) => s + i.quantity, 0)
    : localItems.reduce((s, i) => s + i.quantity, 0);

  const displayItems = useServerItems ? serverItems : localItems;

  const doCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const payload = displayItems.map((i) => ({
        id: i.id,
        quantity: i.quantity,
      }));
      const billingUrl = await dispatch(createOrderAsync(payload)).unwrap();
      if (billingUrl) {
        window.location.href = billingUrl;
      }
    } catch (err) {
      console.error("Ошибка оформления заказа:", err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
    doCheckout();
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
            <h2>Корзина</h2>
            {totalCount > 0 && (
              <span className={styles.count}>{totalCount} шт.</span>
            )}
          </div>
          <div className={styles.headerActions}>
            {totalCount > 0 && (
              <button className={styles.clearBtn} onClick={clearAll}>
                <Trash2 size={16} /> Очистить
              </button>
            )}
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Закрыть"
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
              <p className={styles.loadingText}>Загружаем корзину…</p>
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
                <p className={styles.emptyText}>Корзина пуста</p>
                <p className={styles.emptySubtext}>
                  Добавьте товары, чтобы оформить заказ
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
                        <p className={styles.itemTitle}>{item.name}</p>
                        <p className={styles.itemArticle}>
                          Арт.: {item.article}
                        </p>
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
                            aria-label="Удалить"
                          >
                            <Trash2 size={16} />
                          </button>
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
                <p className={styles.emptyText}>Корзина пуста</p>
                <p className={styles.emptySubtext}>
                  Добавьте товары, чтобы оформить заказ
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
                      <p className={styles.itemTitle}>{item.title}</p>
                      <p className={styles.itemPrice}>
                        {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
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
                          aria-label="Удалить"
                        >
                          <Trash2 size={16} />
                        </button>
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
              <span>Итого:</span>
              <span className={styles.totalPrice}>
                {total.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <button
              className={styles.checkoutBtn}
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <>
                  <Loader2 size={18} className={styles.spinner} /> Оформление...
                </>
              ) : (
                "Перейти к оформлению"
              )}
            </button>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={() => {
          setAuthModalOpen(false);
          doCheckout();
        }}
      />
    </>
  );
};

export default CartDrawer;
