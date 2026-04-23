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
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useCart } from "@/hooks/useCart";
import { useAutoTranslate } from "@/hooks/useAutoTranslate";

interface ApiProductCardProps {
  product: ApiProduct;
}

const ApiProductCard: React.FC<ApiProductCardProps> = ({ product }) => {
  const { isInCart, addItem, decreaseItem, getItemQuantity } = useCart();
  const { t } = useTranslation();
  const [justAdded, setJustAdded] = useState(false);

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const { translated: translatedName } = useAutoTranslate(product.name);
  const categoryStr = getAttributeValue(product.attributes, "Категория") || "";
  const topicStr = getAttributeValue(product.attributes, "Тематика") || "";
  
  const { translated: translatedCategory } = useAutoTranslate(categoryStr);
  const { translated: translatedTopic } = useAutoTranslate(topicStr);

  const imageUrl =
    product.images.length > 0
      ? getProductImageUrl(product.images[0], "full")
      : null;

  const category = translatedCategory;
  const topic = translatedTopic;

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
          <Image
            src={imageUrl}
            alt={translatedName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
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
            {formatPrice(product.salePrice)}
          </span>
        </div>

        <h4 className={styles.title} title={translatedName}>
          {translatedName ? translatedName.charAt(0).toUpperCase() + translatedName.slice(1) : ""}
        </h4>

        <p className={styles.topic}>{topic || "\u00A0"}</p>

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
                <Check size={14} /> {t("cart_added")}
              </>
            ) : (
              <>
                <ShoppingCart size={14} /> {t("cart_add")}
              </>
            )}
          </button>
        )}
      </div>
    </Link>
  );
};

export default ApiProductCard;
