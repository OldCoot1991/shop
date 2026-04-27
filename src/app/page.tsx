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
