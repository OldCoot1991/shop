"use client";

import React from "react";
import { X, Heart, Trash2, ShoppingCart } from "lucide-react";
import styles from "./WishlistDrawer.module.css";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppStore";
import {
  selectWishlistItems,
  removeFromWishlist,
} from "@/lib/features/wishlist/wishlistSlice";
import { addToCart } from "@/lib/features/cart/cartSlice";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose }) => {
  const items = useAppSelector(selectWishlistItems);
  const dispatch = useAppDispatch();

  const handleMoveToCart = (item: (typeof items)[number]) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: 1,
      }),
    );
    dispatch(removeFromWishlist(item.id));
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={onClose}
      />
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Heart size={22} />
            <h2>Избранное</h2>
            {items.length > 0 && (
              <span className={styles.count}>
                {items.length} товар
                {items.length > 1 ? (items.length < 5 ? "а" : "ов") : ""}
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
              <Heart size={64} className={styles.emptyIcon} />
              <p className={styles.emptyText}>Список пуст</p>
              <p className={styles.emptySubtext}>
                Добавляйте товары в избранное, нажимая на ♡
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
                      {item.price.toLocaleString("ru-RU")} ₽
                    </p>
                    <div className={styles.itemActions}>
                      <button
                        className={styles.moveToCartBtn}
                        onClick={() => handleMoveToCart(item)}
                      >
                        <ShoppingCart size={14} />В корзину
                      </button>
                      <button
                        className={styles.removeBtn}
                        onClick={() => dispatch(removeFromWishlist(item.id))}
                        aria-label="Удалить из избранного"
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
      </div>
    </>
  );
};

export default WishlistDrawer;
