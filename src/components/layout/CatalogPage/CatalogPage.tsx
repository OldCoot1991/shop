"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, SlidersHorizontal } from "lucide-react";
import { Product } from "@/lib/mockData";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import styles from "./CatalogPage.module.css";

type SortOption = "popular" | "price_asc" | "price_desc" | "rating";

const SORT_LABELS: Record<SortOption, string> = {
  popular: "По популярности",
  price_asc: "Сначала дешевле",
  price_desc: "Сначала дороже",
  rating: "По рейтингу",
};

interface CatalogPageProps {
  title: string;
  products: Product[];
}

export default function CatalogPage({ title, products }: CatalogPageProps) {
  const [sort, setSort] = useState<SortOption>("popular");

  const sorted = useMemo(() => {
    const copy = [...products];
    switch (sort) {
      case "price_asc":
        return copy.sort((a, b) => a.price - b.price);
      case "price_desc":
        return copy.sort((a, b) => b.price - a.price);
      case "rating":
        return copy.sort((a, b) => b.rating - a.rating);
      default:
        return copy.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
  }, [products, sort]);

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>
          <ChevronLeft size={16} />
          Главная
        </Link>
        <span className={styles.breadcrumbSep}>{title}</span>
      </nav>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <span className={styles.productCount}>{products.length} товаров</span>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.sortRow}>
          <SlidersHorizontal size={18} className={styles.sortIcon} />
          <span className={styles.sortLabel}>Сортировка:</span>
          <div className={styles.sortButtons}>
            {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
              <button
                key={key}
                className={`${styles.sortBtn} ${sort === key ? styles.sortBtnActive : ""}`}
                onClick={() => setSort(key)}
              >
                {SORT_LABELS[key]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className={styles.grid}>
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
