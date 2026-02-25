"use client";

import React from "react";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import styles from "./CartDrawer.module.css";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppStore";
import {
  selectCartItems,
  selectCartTotal,
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/lib/features/cart/cartSlice";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

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
            {items.length > 0 && (
              <span className={styles.count}>
                {items.reduce((s, i) => s + i.quantity, 0)} шт.
              </span>
            )}
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Закрыть"
          >
            <X size={24} />
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <ShoppingCart size={64} className={styles.emptyIcon} />
              <p className={styles.emptyText}>Корзина пуста</p>
              <p className={styles.emptySubtext}>
                Добавьте товары, чтобы оформить заказ
              </p>
            </div>
          ) : (
            <ul className={styles.list}>
              {items.map((item) => (
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
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        −
                      </button>
                      <span className={styles.qty}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() =>
                          dispatch(addToCart({ ...item, quantity: 1 }))
                        }
                      >
                        +
                      </button>
                      <button
                        className={styles.removeBtn}
                        onClick={() => dispatch(removeFromCart(item.id))}
                        aria-label="Удалить"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Итого:</span>
              <span className={styles.totalPrice}>
                {total.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <button className={styles.checkoutBtn}>Перейти к оформлению</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
