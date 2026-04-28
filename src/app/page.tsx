"use client";

import { useEffect, useState } from "react";
import ProductSection from "@/components/layout/ProductSection/ProductSection";
import { fetchFilters, ApiFilterItem } from "@/services/productService";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<ApiFilterItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const filters = await fetchFilters();
        const categoryFilter = filters.find((f) => f.key === "category");
        if (categoryFilter) {
          setCategories(categoryFilter.items);
        }
      } catch (err) {
        console.error("Failed to load categories for home page", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  // 1. Immediately reset scroll to top on mount if there's a hash to prevent browser's native jump
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.startsWith("#category-")) {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // 2. Handle scrolling to a specific category after content is likely stabilized
  useEffect(() => {
    if (!isLoading && categories.length > 0 && typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#category-")) {
        // Longer delay to allow sections to load products and stabilize their heights
        const timer = setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            const isMobile = window.innerWidth <= 768;
            const headerOffset = isMobile ? 200 : 110;
            
            // Re-calculate absolute position from document top
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, categories]);

  return (
    <main
      style={{ maxWidth: "1440px", margin: "0 auto", padding: "24px 16px" }}
    >
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
          {t("nav_loading")}
        </div>
      ) : categories.length > 0 ? (
        categories.map((cat) => (
          <ProductSection
            key={cat.id}
            title={cat.name}
            categoryKey={`cat_${cat.id}`}
            categoryFilter={String(cat.id)}
            sectionId={`category-${cat.id}`}
          />
        ))
      ) : (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
          {t("nav_no_categories")}
        </div>
      )}
    </main>
  );
}
