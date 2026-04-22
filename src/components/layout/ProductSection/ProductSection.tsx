"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import styles from "./ProductSection.module.css";
import ApiProductCard from "@/components/ui/ApiProductCard/ApiProductCard";
import {
  fetchProductsByCategory,
  selectCategoryProducts,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";

interface ProductSectionProps {
  /** Displayed heading for the section */
  title: string;
  /** Unique key used as Redux cache key (e.g. "stickers") */
  categoryKey: string;
  /** Value to pass as `category` query param (the name string, e.g. "стикеры") */
  categoryFilter?: string;
  /** Value to pass as `topic` query param */
  topicFilter?: string;
  /** Max cards to show */
  limit?: number;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  categoryKey,
  categoryFilter,
  topicFilter,
  limit = 8,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(
    selectCategoryProducts(categoryKey),
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(
        fetchProductsByCategory({
          key: categoryKey,
          page: 1,
          category: categoryFilter,
          topic: topicFilter,
        }),
      );
    }
  }, [dispatch, status, categoryKey, categoryFilter, topicFilter]);

  const visible = items.slice(0, limit);

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>{title}</h3>
        <Link
          href={
            categoryFilter ? `/api-catalog/${categoryFilter}` : "/api-catalog"
          }
          className={styles.seeAllBtn}
        >
          {t("common_view_all")}
        </Link>
      </div>

      {status === "loading" && (
        <div className={styles.skeletonRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      )}

      {status === "failed" && (
        <p className={styles.error}>{t("auth_error_default")}: {error}</p>
      )}

      {status === "succeeded" && visible.length === 0 && (
        <p className={styles.empty}>{t("nav_no_categories")}</p>
      )}

      {(status === "succeeded" || visible.length > 0) && visible.length > 0 && (
        <Swiper
          modules={[FreeMode]}
          freeMode={{ enabled: true, momentum: true, momentumRatio: 0.5 }}
          slidesPerView="auto"
          spaceBetween={16}
          grabCursor={true}
          className={styles.swiper}
        >
          {visible.map((product) => (
            <SwiperSlide key={product.id} className={styles.slide}>
              <ApiProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default ProductSection;
