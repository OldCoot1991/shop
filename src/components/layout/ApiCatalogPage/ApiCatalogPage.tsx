"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  SlidersHorizontal,
  Loader2,
  ChevronLeft as Prev,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
} from "lucide-react";
import { fetchProductsRequest, ApiProduct } from "@/services/productService";
import ApiProductCard from "@/components/ui/ApiProductCard/ApiProductCard";
import SortDrawer from "@/components/ui/SortDrawer/SortDrawer";
import styles from "./ApiCatalogPage.module.css";

type SortOption = "popular" | "price_asc" | "price_desc";

const SORT_LABELS: Record<SortOption, string> = {
  popular: "По популярности",
  price_asc: "Сначала дешевле",
  price_desc: "Сначала дороже",
};
const SORT_API: Record<SortOption, string | undefined> = {
  popular: undefined,
  price_asc: "price_asc",
  price_desc: "price_desc",
};

interface ApiCatalogPageProps {
  title: string;
  categoryId: string;
}

export default function ApiCatalogPage({
  title,
  categoryId,
}: ApiCatalogPageProps) {
  // Products for the current page
  const [products, setProducts] = useState<ApiProduct[]>([]);

  // UI state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState<SortOption>("popular");
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchKey = useRef(0); // cancel stale fetches on sort/category change

  // Fetch products for the current page
  useEffect(() => {
    const key = ++fetchKey.current;
    let cancelled = false;

    async function fetchPage() {
      setStatus("loading");
      setError(null);

      try {
        const data = await fetchProductsRequest({
          category: categoryId,
          page: page,
          sort: SORT_API[sort],
        });

        if (cancelled || fetchKey.current !== key) return;

        setProducts(data.products);
        setTotalPages(data.pagination.pageCount || 1);
        setStatus("idle");
      } catch (e) {
        if (cancelled || fetchKey.current !== key) return;
        setError(e instanceof Error ? e.message : "Ошибка загрузки");
        setStatus("error");
      }
    }

    fetchPage();
    return () => {
      cancelled = true;
    };
  }, [categoryId, sort, page]);

  const handleSort = (s: SortOption) => {
    setSort(s);
    setPage(1);
  };

  const visibleProducts = products;

  const goToPage = (p: number) => {
    const clamped = Math.max(1, Math.min(p, totalPages));
    setPage(clamped);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build page numbers with ellipsis
  const pageNumbers = buildPageNumbers(page, totalPages);

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>
          <ChevronLeft size={16} /> Главная
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
                onClick={() => handleSort(key)}
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
        onSelect={(val) => handleSort(val as SortOption)}
      />

      {/* Loading */}
      {status === "loading" && (
        <div className={styles.loadingState}>
          <Loader2 size={36} className={styles.spinner} />
          <p>Загружаем товары…</p>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className={styles.errorState}>
          <p>{error}</p>
          <button className={styles.retryBtn} onClick={() => setSort((s) => s)}>
            Попробовать снова
          </button>
        </div>
      )}

      {/* Empty */}
      {status === "idle" && products.length === 0 && (
        <p className={styles.empty}>Товары не найдены</p>
      )}

      {/* Grid */}
      {status === "idle" && visibleProducts.length > 0 && (
        <div className={styles.grid}>
          {visibleProducts.map((product) => (
            <ApiProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {status === "idle" && totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <p className={styles.paginationInfo}>
            Страница <strong>{page}</strong> из <strong>{totalPages}</strong>
          </p>
          <div className={styles.pagination}>
            {/* First */}
            <button
              className={styles.pageBtn}
              onClick={() => goToPage(1)}
              disabled={page === 1}
              aria-label="Первая страница"
              title="Первая"
            >
              <ChevronsLeft size={15} />
            </button>

            {/* Prev */}
            <button
              className={styles.pageBtn}
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              aria-label="Предыдущая"
            >
              <Prev size={15} />
            </button>

            {/* Page numbers */}
            {pageNumbers.map((item, idx) =>
              item === "…" ? (
                <span key={`e${idx}`} className={styles.pageEllipsis}>
                  …
                </span>
              ) : (
                <button
                  key={item}
                  className={`${styles.pageBtn} ${page === item ? styles.pageBtnActive : ""}`}
                  onClick={() => goToPage(item as number)}
                >
                  {item}
                </button>
              ),
            )}

            {/* Next */}
            <button
              className={styles.pageBtn}
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages}
              aria-label="Следующая"
            >
              <ChevronRight size={15} />
            </button>

            {/* Last */}
            <button
              className={styles.pageBtn}
              onClick={() => goToPage(totalPages)}
              disabled={page === totalPages}
              aria-label="Последняя страница"
              title="Последняя"
            >
              <ChevronsRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper: build pagination number array with "…"
function buildPageNumbers(current: number, total: number): (number | "…")[] {
  const delta = 2;
  const range: number[] = [];
  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  )
    range.push(i);

  const result: (number | "…")[] = [1];
  if (range[0] > 2) result.push("…");
  result.push(...range);
  if (range[range.length - 1] < total - 1) result.push("…");
  if (total > 1) result.push(total);
  return result;
}
