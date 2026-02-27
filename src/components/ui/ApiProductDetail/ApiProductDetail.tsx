"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  ChevronLeft,
  Truck,
  Shield,
  RotateCcw,
  Package,
} from "lucide-react";
import Link from "next/link";
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
import styles from "./ApiProductDetail.module.css";

interface ApiProductDetailProps {
  product: ApiProduct;
}

export default function ApiProductDetail({ product }: ApiProductDetailProps) {
  const dispatch = useAppDispatch();
  const { getItemQuantity, isInCart, addItem, decreaseItem } = useCart();
  const isInWishlist = useAppSelector(selectIsInWishlist(product.id));

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const [selectedImage, setSelectedImage] = useState(0);

  const images = product.images ?? [];

  const category = getAttributeValue(product.attributes, "Категория");
  const topic = getAttributeValue(product.attributes, "Тематика");

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
    { icon: <Truck size={18} />, text: "Быстрая доставка" },
    { icon: <Shield size={18} />, text: "Гарантия качества" },
    { icon: <RotateCcw size={18} />, text: "Возврат 14 дней" },
  ];

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>
          <ChevronLeft size={16} />
          Главная
        </Link>
        {category && (
          <>
            <span className={styles.breadcrumbSep} />
            <Link href="/catalog" className={styles.breadcrumbLink}>
              {category}
            </Link>
          </>
        )}
        <span className={styles.breadcrumbSep} />
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

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
                  aria-label={`Фото ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getProductImageUrl(img, "miniature")}
                    alt={`${product.name} фото ${i + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
          <div className={styles.mainImage}>
            {mainImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mainImageUrl} alt={product.name} />
            ) : (
              <div className={styles.noImage}>
                <Package size={64} />
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className={styles.info}>
          {/* Article */}
          <p className={styles.article}>Арт.: {product.article}</p>

          {/* Title */}
          <h1 className={styles.title}>{product.name}</h1>

          {/* Topic badge */}
          {topic && <p className={styles.topic}>{topic}</p>}

          {/* Min count hint */}
          {product.minCount > 1 && (
            <p className={styles.minCount}>
              Минимальное кол-во для заказа: {product.minCount} шт.
            </p>
          )}

          {/* Price */}
          <div className={styles.priceBlock}>
            <span className={styles.price}>
              {formatPrice(product.salePrice)} ₽
            </span>
          </div>

          {/* Guarantees */}
          <ul className={styles.guarantees}>
            {guarantees.map((g, i) => (
              <li key={i} className={styles.guaranteeItem}>
                {g.icon}
                <span>{g.text}</span>
              </li>
            ))}
          </ul>

          {/* Actions */}
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
                  В корзине
                </button>
              </>
            ) : (
              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                Купить
              </button>
            )}

            <button
              className={`${styles.wishlistBtn} ${isInWishlist ? styles.wishlistBtnActive : ""}`}
              onClick={handleWishlist}
              aria-label={isInWishlist ? "Убрать из избранного" : "В избранное"}
            >
              <Heart size={22} fill={isInWishlist ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Описание</h2>
          <p className={styles.description}>{product.description}</p>
        </section>
      )}

      {/* Attributes table */}
      {product.attributes.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Характеристики</h2>
          <table className={styles.specsTable}>
            <tbody>
              {product.attributes.map((attr, i) => (
                <tr key={i} className={styles.specRow}>
                  <td className={styles.specLabel}>{attr.name}</td>
                  <td className={styles.specValue}>{attr.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
