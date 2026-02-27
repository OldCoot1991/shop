"use client";

import React, { useState } from "react";
import styles from "./ApiProductCard.module.css";
import {
  ApiProduct,
  getProductImageUrl,
  getAttributeValue,
  formatPrice,
} from "@/services/productService";
import { ShoppingCart, Check } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

interface ApiProductCardProps {
  product: ApiProduct;
}

const ApiProductCard: React.FC<ApiProductCardProps> = ({ product }) => {
  const { getItemQuantity, isInCart, addItem, decreaseItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const imageUrl =
    product.images.length > 0
      ? getProductImageUrl(product.images[0], "full")
      : null;

  const category = getAttributeValue(product.attributes, "Категория");
  const topic = getAttributeValue(product.attributes, "Тематика");

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.name,
      price: product.salePrice / 100,
      image: imageUrl ?? "",
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    decreaseItem(product.id);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart(e);
  };

  return (
    <Link href={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={product.name}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.noImage}>🖼️</div>
        )}
        {category && (
          <div className={styles.badges}>
            <span className={styles.badge}>{category}</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.priceRow}>
          <span className={styles.price}>
            {formatPrice(product.salePrice)} ₽
          </span>
        </div>

        <h4 className={styles.title} title={product.name}>
          {product.name}
        </h4>

        {topic && <p className={styles.topic}>{topic}</p>}

        {inCart ? (
          <div className={styles.cartControls}>
            <button className={styles.qtyBtn} onClick={handleDecrease}>
              −
            </button>
            <span className={styles.qty}>{quantity}</span>
            <button className={styles.qtyBtn} onClick={handleIncrease}>
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
                <Check size={14} /> Добавлено
              </>
            ) : (
              <>
                <ShoppingCart size={14} /> В корзину
              </>
            )}
          </button>
        )}
      </div>
    </Link>
  );
};

export default ApiProductCard;
