"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import { Product } from "@/lib/mockData";
import { addToCart } from "@/lib/features/cart/cartSlice";
import {
  toggleWishlist,
  selectIsInWishlist,
} from "@/lib/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { selectCartItems } from "@/lib/features/cart/cartSlice";
import { ShoppingCart, Check, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const isInWishlist = useAppSelector(selectIsInWishlist(product.id));
  const [justAdded, setJustAdded] = useState(false);

  const inCart = cartItems.some((item) => item.id === product.id);
  const cartItem = cartItems.find((item) => item.id === product.id);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      }),
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className={styles.card}>
      <Link href={`/product/${product.id}`} className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
        <button
          className={`${styles.wishlistBtn} ${isInWishlist ? styles.wishlistBtnActive : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(
              toggleWishlist({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              }),
            );
          }}
          aria-label={
            isInWishlist ? "Удалить из избранного" : "Добавить в избранное"
          }
        >
          <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
        </button>
        <div className={styles.badges}>
          {discount > 0 && <span className={styles.badge}>-{discount}%</span>}
          {product.badges.map((badge, idx) => (
            <span key={idx} className={styles.badge}>
              {badge}
            </span>
          ))}
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.priceRow}>
          <span className={styles.price}>
            {product.price.toLocaleString("ru-RU")} ₽
          </span>
          {product.oldPrice && (
            <span className={styles.oldPrice}>
              {product.oldPrice.toLocaleString("ru-RU")} ₽
            </span>
          )}
        </div>

        <h4 className={styles.title} title={product.title}>
          {product.title}
        </h4>

        <div className={styles.ratingRow}>
          <span className={styles.star}>★</span>
          <span className={styles.rating}>{product.rating}</span>
          <span className={styles.reviews}>
            ({product.reviewsCount} отзывов)
          </span>
        </div>

        {inCart ? (
          <div className={styles.cartControls}>
            <button
              className={styles.qtyBtn}
              onClick={() =>
                dispatch({ type: "cart/decreaseQuantity", payload: product.id })
              }
            >
              −
            </button>
            <span className={styles.qty}>{cartItem?.quantity}</span>
            <button className={styles.qtyBtn} onClick={handleAddToCart}>
              +
            </button>
          </div>
        ) : (
          <button
            className={`${styles.addToCartBtn} ${justAdded ? styles.addedBtn : ""}`}
            onClick={handleAddToCart}
          >
            {justAdded ? (
              <>
                <Check size={16} /> Добавлено
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> В корзину
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
