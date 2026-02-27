"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, SlidersHorizontal } from "lucide-react";
import { ApiProduct } from "@/services/productService";
import ApiProductCard from "@/components/ui/ApiProductCard/ApiProductCard";
import styles from "./ApiCatalogPage.module.css";

type SortOption = "popular" | "price_asc" | "price_desc";

const SORT_LABELS: Record<SortOption, string> = {
  popular: "По популярности", // Note: Sorting by popularity works best with server sorting, using price fallback locally
  price_asc: "Сначала дешевле",
  price_desc: "Сначала дороже",
};

interface ApiCatalogPageProps {
  title: string;
  products: ApiProduct[];
}

export default function ApiCatalogPage({
  title,
  products,
}: ApiCatalogPageProps) {
  const [sort, setSort] = useState<SortOption>("popular");

  // Basic local sorting for testing. Actual sort should be a server param if possible.
  const sorted = useMemo(() => {
    const copy = [...products];
    switch (sort) {
      case "price_asc":
        return copy.sort((a, b) => a.salePrice - b.salePrice);
      case "price_desc":
        return copy.sort((a, b) => b.salePrice - a.salePrice);
      case "popular":
      default:
        // Assume API returns sorted by popular for the moment
        return copy;
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
          <ApiProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
