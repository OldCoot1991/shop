"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, SlidersHorizontal, ChevronDown, ChevronRight } from "lucide-react";
import { Product } from "@/lib/mockData";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import SortDrawer from "@/components/ui/SortDrawer/SortDrawer";
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
  section?: string;
}

export default function CatalogPage({ title, products }: CatalogPageProps) {
  const [sort, setSort] = useState<SortOption>("popular");
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);

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
        <span className={styles.breadcrumbSep}>
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </span>
      </nav>

      {/* Breadcrumb - Title removed as requested */}

      <div className={styles.toolbar}>
        <div className={styles.sortRow}>
          <SlidersHorizontal size={18} className={styles.sortIcon} />
          <span className={styles.sortLabel}>Сортировка:</span>
          
          {/* Desktop Version */}
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

          {/* Mobile Version - Single Button */}
          <button 
            className={styles.mobileSortTrigger}
            onClick={() => setIsSortDrawerOpen(true)}
          >
            <span className={styles.mobileSortLabel}>Сортировка</span>
            <ChevronRight size={14} className={styles.mobileSortArrow} />
            <div className={styles.mobileSortValue}>
              <span>{SORT_LABELS[sort]}</span>
              <ChevronDown size={16} />
            </div>
          </button>
        </div>
      </div>

      <SortDrawer
        isOpen={isSortDrawerOpen}
        onClose={() => setIsSortDrawerOpen(false)}
        options={Object.entries(SORT_LABELS).map(([key, label]) => ({ key, label }))}
        currentValue={sort}
        onSelect={(val) => setSort(val as SortOption)}
      />

      {/* Product grid */}
      <div className={styles.grid}>
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
