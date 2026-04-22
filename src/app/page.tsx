"use client";

import ProductSection from "@/components/layout/ProductSection/ProductSection";
import { CATEGORY_IDS } from "@/services/productService";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main
      style={{ maxWidth: "1440px", margin: "0 auto", padding: "24px 16px" }}
    >
      <ProductSection
        title={t("home_stickers")}
        categoryKey="stickers"
        categoryFilter={String(CATEGORY_IDS.stickers)}
      />

      <ProductSection
        title={t("home_stickerpacks")}
        categoryKey="stickerpacks"
        categoryFilter={String(CATEGORY_IDS.stickerPacks)}
      />

      <ProductSection
        title={t("home_double_cards")}
        categoryKey="double-cards"
        categoryFilter={String(CATEGORY_IDS.doubleCards)}
      />

      <ProductSection
        title={t("home_post_cards")}
        categoryKey="post-cards"
        categoryFilter={String(CATEGORY_IDS.postCards)}
      />

      <ProductSection
        title={t("home_badges")}
        categoryKey="badges"
        categoryFilter={String(CATEGORY_IDS.badges)}
      />

      <ProductSection
        title={t("home_magnets")}
        categoryKey="magnets"
        categoryFilter={String(CATEGORY_IDS.magnets)}
      />

      <ProductSection
        title={t("home_patches")}
        categoryKey="patches"
        categoryFilter={String(CATEGORY_IDS.patches)}
      />

      <ProductSection
        title={t("home_mini_cards")}
        categoryKey="mini-cards"
        categoryFilter={String(CATEGORY_IDS.miniCards)}
      />
    </main>
  );
}
