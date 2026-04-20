"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  Check,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Product } from "@/lib/mockData";
import { addToCart } from "@/lib/features/cart/cartSlice";
import {
  toggleWishlist,
  selectIsInWishlist,
} from "@/lib/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { selectCartItems } from "@/lib/features/cart/cartSlice";
import Link from "next/link";
import styles from "./ProductDetail.module.css";

interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetail({
  product,
  relatedProducts = [],
}: ProductDetailProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const isInWishlist = useAppSelector(selectIsInWishlist(product.id));
  const inCart = cartItems.some((item) => item.id === product.id);
  const cartItem = cartItems.find((item) => item.id === product.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const images = product.images?.length ? product.images : [product.image];

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
  };

  const handleToggleWishlist = () => {
    dispatch(
      toggleWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }),
    );
  };

  const guarantees = [
    {
      icon: <Truck size={18} />,
      text: product.deliveryInfo ?? "Быстрая доставка",
    },
    { icon: <Shield size={18} />, text: "Гарантия 1 год" },
    { icon: <RotateCcw size={18} />, text: "Возврат 14 дней" },
  ];

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

  const categoryId = product.category ? categoryNamesMap[product.category.toLowerCase()] : null;

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={`${styles.breadcrumbLink} ${styles.breadcrumbFirst}`}>
          <ChevronLeft size={16} />
          Главная
        </Link>
        {product.category && (
          <>
            <span className={styles.breadcrumbSep} />
            <Link 
              href={categoryId ? `/api-catalog/${categoryId}` : "/"} 
              className={styles.breadcrumbLink}
            >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
          </>
        )}
        <span className={styles.breadcrumbSep} />
        <span className={styles.breadcrumbCurrent}>{product.title}</span>
      </nav>

      {/* Main block */}
      <div className={styles.main}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {images.map((img, i) => (
              <button
                key={i}
                className={`${styles.thumbnail} ${selectedImage === i ? styles.thumbnailActive : ""}`}
                onClick={() => setSelectedImage(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`${product.title} фото ${i + 1}`} />
              </button>
            ))}
          </div>
          <div className={styles.mainImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[selectedImage]} alt={product.title} />
            {discount > 0 && (
              <span className={styles.discountBadge}>−{discount}%</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className={styles.info}>
          {product.brand && <p className={styles.brand}>{product.brand}</p>}
          <h1 className={styles.title}>{product.title}</h1>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={18}
                  fill={s <= Math.round(product.rating) ? "#ffb800" : "none"}
                  stroke={s <= Math.round(product.rating) ? "#ffb800" : "#ccc"}
                />
              ))}
            </div>
            <span className={styles.ratingValue}>{product.rating}</span>
            <span className={styles.reviewsCount}>
              {product.reviewsCount} отзывов
            </span>
            {product.inStock !== false ? (
              <span className={styles.inStock}>В наличии</span>
            ) : (
              <span className={styles.outOfStock}>Нет в наличии</span>
            )}
          </div>

          {/* Price */}
          <div className={styles.priceBlock}>
            <span className={styles.price}>
              {product.price.toLocaleString("ru-RU")} ₽
            </span>
            {product.oldPrice && (
              <span className={styles.oldPrice}>
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
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

          {/* Cart actions */}
          <div className={styles.actions}>
            {inCart ? (
              <div className={styles.cartControls}>
                <button
                  className={styles.qtyBtn}
                  onClick={() =>
                    dispatch({
                      type: "cart/decreaseQuantity",
                      payload: product.id,
                    })
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
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
                disabled={product.inStock === false}
              >
                <ShoppingCart size={20} />В корзину
              </button>
            )}
            <button
              className={`${styles.wishlistBtn} ${isInWishlist ? styles.wishlistBtnActive : ""}`}
              onClick={handleToggleWishlist}
              aria-label={isInWishlist ? "Убрать из избранного" : "В избранное"}
            >
              <Heart size={22} fill={isInWishlist ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Badges */}
          {product.badges.length > 0 && (
            <div className={styles.badges}>
              {product.badges.map((badge, i) => (
                <span key={i} className={styles.badge}>
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Описание</h2>
          <p className={styles.description}>{product.description}</p>
        </section>
      )}

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ключевые особенности</h2>
          <ul className={styles.featureList}>
            {product.features.map((feat, i) => (
              <li key={i} className={styles.featureItem}>
                <Check size={16} className={styles.featureCheck} />
                {feat}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Specs */}
      {product.specs && product.specs.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Характеристики</h2>
          <table className={styles.specsTable}>
            <tbody>
              {product.specs.map((spec, i) => (
                <tr key={i} className={styles.specRow}>
                  <td className={styles.specLabel}>{spec.label}</td>
                  <td className={styles.specValue}>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Отзывы ({product.reviews.length})
          </h2>
          <div className={styles.reviewList}>
            {product.reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className={styles.reviewAvatar}
                  />
                  <div>
                    <p className={styles.reviewAuthor}>{review.author}</p>
                    <p className={styles.reviewDate}>{review.date}</p>
                  </div>
                  <div className={styles.reviewStars}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill={s <= review.rating ? "#ffb800" : "none"}
                        stroke={s <= review.rating ? "#ffb800" : "#ccc"}
                      />
                    ))}
                  </div>
                </div>
                <p className={styles.reviewText}>{review.text}</p>
                {(review.pros || review.cons) && (
                  <div className={styles.reviewProsConsGrid}>
                    {review.pros && (
                      <div className={styles.reviewPros}>
                        <span className={styles.prosLabel}>Достоинства</span>
                        <span>{review.pros}</span>
                      </div>
                    )}
                    {review.cons && (
                      <div className={styles.reviewCons}>
                        <span className={styles.consLabel}>Недостатки</span>
                        <span>{review.cons}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Похожие товары</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className={styles.relatedCard}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  className={styles.relatedImage}
                />
                <p className={styles.relatedTitle}>{p.title}</p>
                <p className={styles.relatedPrice}>
                  {p.price.toLocaleString("ru-RU")} ₽
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
