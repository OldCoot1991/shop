"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  Package,
} from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import {
  ApiProduct,
  getProductImageUrl,
  getAttributeValue,
  formatPrice,
} from "@/services/productService";
import { useCart } from "@/hooks/useCart";
import {
  toggleWishlist,
  selectIsInWishlist,
} from "@/lib/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { useAutoTranslate } from "@/hooks/useAutoTranslate";
import styles from "./ApiProductDetail.module.css";

interface ApiProductDetailProps {
  product: ApiProduct;
}

/**
 * Helper component to handle translation of individual attribute rows
 */
const AttributeRow = ({ name, value }: { name: string; value: string }) => {
  const { translated: translatedName } = useAutoTranslate(name);
  const { translated: translatedValue } = useAutoTranslate(value);
  return (
    <tr className={styles.specRow}>
      <td className={styles.specLabel}>{translatedName}</td>
      <td className={styles.specValue}>{translatedValue}</td>
    </tr>
  );
};

export default function ApiProductDetail({ product }: ApiProductDetailProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isInCart, addItem, decreaseItem, getItemQuantity } = useCart();
  const isInWishlist = useAppSelector(selectIsInWishlist(product.id));

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const [selectedImage, setSelectedImage] = useState(0);

  // Dynamic content translation
  const { translated: translatedName } = useAutoTranslate(product.name);
  const { translated: translatedDesc } = useAutoTranslate(product.description);
  
  const categoryStr = getAttributeValue(product.attributes, "Категория") || "";
  const topicStr = getAttributeValue(product.attributes, "Тематика") || "";
  
  const { translated: translatedCategory } = useAutoTranslate(categoryStr);
  const { translated: translatedTopic } = useAutoTranslate(topicStr);

  const images = product.images ?? [];
  const category = translatedCategory;
  const topic = translatedTopic;

  // Map category name to ID for the link (Case-insensitive)
  // These names come from the API (Russian)
  const categoryNamesMap: Record<string, number> = {
    "двойные открытки": 1000,
    "значки": 1001,
    "конверты": 1002,
    "магниты": 1003,
    "мини-открытки": 1004,
    "одинарные открытки": 1005,
    "подставки": 1006,
    "почтовые открытки": 1007,
    "стикерпаки": 1008,
    "стикеры": 1009,
    "шевроны": 1010,
  };

  const categoryId = categoryStr ? categoryNamesMap[categoryStr.toLowerCase()] : null;

  const mainImageUrl =
    images.length > 0
      ? getProductImageUrl(images[selectedImage], "full")
      : null;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.name,
      price: product.salePrice / 100, // kopecks → rubles
      image:
        images.length > 0 ? getProductImageUrl(images[0], "miniature") : "",
    });
  };

  const handleWishlist = () => {
    dispatch(
      toggleWishlist({
        id: product.id,
        title: product.name,
        price: product.salePrice / 100,
        image:
          images.length > 0 ? getProductImageUrl(images[0], "miniature") : "",
      }),
    );
  };

  const guarantees = [
    { icon: <Truck size={18} />, textKey: "guarantee_delivery" },
    { icon: <Shield size={18} />, textKey: "guarantee_quality" },
    { icon: <RotateCcw size={18} />, textKey: "guarantee_return" },
  ];

  return (
    <div className={styles.page}>
      <Breadcrumbs 
        items={[
          ...(category ? [{ 
            label: category.charAt(0).toUpperCase() + category.slice(1), 
            href: categoryId ? `/api-catalog/${categoryId}` : "/api-catalog" 
          }] : []),
          { label: translatedName, isCurrent: true }
        ]} 
        className={styles.breadcrumb}
      />

      {/* Main section */}
      <div className={styles.main}>
        {/* Gallery */}
        <div className={styles.gallery}>
          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumbnail} ${selectedImage === i ? styles.thumbnailActive : ""}`}
                  onClick={() => setSelectedImage(i)}
                  aria-label={t("product_photo", { count: i + 1, defaultValue: `Фото ${i + 1}` })}
                >
                  <Image
                    src={getProductImageUrl(img, "miniature")}
                    alt={t("product_photo", { count: i + 1, defaultValue: `${translatedName} фото ${i + 1}` })}
                    width={80}
                    height={80}
                    className={styles.thumbImage}
                  />
                </button>
              ))}
            </div>
          )}
          <div className={styles.mainImage}>
            {mainImageUrl ? (
              <Image 
                src={mainImageUrl} 
                alt={translatedName}
                width={600}
                height={600}
                priority
                className={styles.mainImageFile}
              />
            ) : (
              <div className={styles.noImage}>
                <Package size={64} />
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className={styles.info}>
          <p className={styles.article}>{t("product_article")} {product.article}</p>

          <h1 className={styles.title}>{translatedName}</h1>

          {topic && <p className={styles.topic}>{topic}</p>}

          {product.minCount > 1 && (
            <p className={styles.minCount}>
              {t("product_min_order", { count: product.minCount })}
            </p>
          )}

          <div className={styles.priceBlock}>
            <span className={styles.price}>
              {formatPrice(product.salePrice)}
            </span>
          </div>

          <ul className={styles.guarantees}>
            {guarantees.map((g, i) => (
              <li key={i} className={styles.guaranteeItem}>
                {g.icon}
                <span>{t(g.textKey)}</span>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            {inCart ? (
              <>
                <div className={styles.cartControls}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => decreaseItem(product.id)}
                  >
                    −
                  </button>
                  <span className={styles.qty}>{quantity}</span>
                  <button className={styles.qtyBtn} onClick={handleAddToCart}>
                    +
                  </button>
                </div>
                <button className={styles.inCartBtn} disabled>
                  {t("cart_incart")}
                </button>
              </>
            ) : (
              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                {t("cart_buy")}
              </button>
            )}

            <button
              className={`${styles.wishlistBtn} ${isInWishlist ? styles.wishlistBtnActive : ""}`}
              onClick={handleWishlist}
              aria-label={isInWishlist ? t("wishlist_remove") : t("wishlist_add")}
            >
              <Heart size={22} fill={isInWishlist ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      {translatedDesc && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("product_desc")}</h2>
          <p className={styles.description}>{translatedDesc}</p>
        </section>
      )}

      {/* Attributes table */}
      {product.attributes.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("product_specs")}</h2>
          <table className={styles.specsTable}>
            <tbody>
              {product.attributes.map((attr, i) => (
                <AttributeRow key={i} name={attr.name} value={attr.value} />
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
