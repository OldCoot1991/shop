"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  SlidersHorizontal,
  Loader2,
  ChevronLeft as PrevIcon,
  ChevronRight,
} from "lucide-react";
import { fetchProductsRequest, ApiProduct } from "@/services/productService";
import ApiProductCard from "@/components/ui/ApiProductCard/ApiProductCard";
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
  /** Numeric category ID string, e.g. "1009" */
  categoryId: string;
}

export default function ApiCatalogPage({
  title,
  categoryId,
}: ApiCatalogPageProps) {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [sort, setSort] = useState<SortOption>("popular");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setStatus("loading");
      setError(null);
      try {
        const data = await fetchProductsRequest({
          category: categoryId,
          page,
          sort: SORT_API[sort],
        });
        if (cancelled) return;
        setProducts(data.products);
        setPageCount(data.pagination.pageCount || 1);
        setStatus("idle");
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Ошибка загрузки");
        setStatus("error");
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [categoryId, page, sort]);

  const retryLoad = () => {
    setStatus("idle"); // triggers re-render which re-runs effect
    setPage((p) => p); // force dependency change
  };

  const handleSort = (s: SortOption) => {
    setSort(s);
    setPage(1);
  };

  const handlePage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        {status === "idle" && (
          <span className={styles.productCount}>{products.length} товаров</span>
        )}
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
                onClick={() => handleSort(key)}
              >
                {SORT_LABELS[key]}
              </button>
            ))}
          </div>
        </div>
      </div>

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
          <button className={styles.retryBtn} onClick={retryLoad}>
            Попробовать снова
          </button>
        </div>
      )}

      {/* Grid */}
      {status === "idle" && products.length === 0 && (
        <p className={styles.empty}>Товары не найдены</p>
      )}

      {status === "idle" && products.length > 0 && (
        <div className={styles.grid}>
          {products.map((product) => (
            <ApiProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && status !== "loading" && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => handlePage(page - 1)}
            disabled={page <= 1}
            aria-label="Предыдущая страница"
          >
            <PrevIcon size={16} />
          </button>

          {Array.from({ length: pageCount }, (_, i) => i + 1)
            .filter(
              (p) => p === 1 || p === pageCount || Math.abs(p - page) <= 2,
            )
            .reduce<(number | "…")[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("…");
              acc.push(p);
              return acc;
            }, [])
            .map((p, idx) =>
              p === "…" ? (
                <span key={`ellipsis-${idx}`} className={styles.pageEllipsis}>
                  …
                </span>
              ) : (
                <button
                  key={p}
                  className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ""}`}
                  onClick={() => handlePage(p as number)}
                >
                  {p}
                </button>
              ),
            )}

          <button
            className={styles.pageBtn}
            onClick={() => handlePage(page + 1)}
            disabled={page >= pageCount}
            aria-label="Следующая страница"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
