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
        title={t("home_audio_kolonki")}
        categoryKey="audio_kolonki"
        categoryFilter={String(CATEGORY_IDS.audio_kolonki)}
      />

      <ProductSection
        title={t("home_batareyki_i_akkumulyatory")}
        categoryKey="batareyki_i_akkumulyatory"
        categoryFilter={String(CATEGORY_IDS.batareyki_i_akkumulyatory)}
      />

      <ProductSection
        title={t("home_derzhateli_i_podstavki_dlya_telefona")}
        categoryKey="derzhateli_i_podstavki_dlya_telefona"
        categoryFilter={String(CATEGORY_IDS.derzhateli_i_podstavki_dlya_telefona)}
      />

      <ProductSection
        title={t("home_zaryadnye_ustroystva")}
        categoryKey="zaryadnye_ustroystva"
        categoryFilter={String(CATEGORY_IDS.zaryadnye_ustroystva)}
      />

      <ProductSection
        title={t("home_kabeli_dlya_telefona")}
        categoryKey="kabeli_dlya_telefona"
        categoryFilter={String(CATEGORY_IDS.kabeli_dlya_telefona)}
      />

      <ProductSection
        title={t("home_kompyuternye_komplektuyushchie")}
        categoryKey="kompyuternye_komplektuyushchie"
        categoryFilter={String(CATEGORY_IDS.kompyuternye_komplektuyushchie)}
      />

      <ProductSection
        title={t("home_naushniki")}
        categoryKey="naushniki"
        categoryFilter={String(CATEGORY_IDS.naushniki)}
      />

      <ProductSection
        title={t("home_stekla_zashchitnye_dlya_telefonov")}
        categoryKey="stekla_zashchitnye_dlya_telefonov"
        categoryFilter={String(CATEGORY_IDS.stekla_zashchitnye_dlya_telefonov)}
      />

      <ProductSection
        title={t("home_telefony")}
        categoryKey="telefony"
        categoryFilter={String(CATEGORY_IDS.telefony)}
      />

      <ProductSection
        title={t("home_fleshki_i_karty_pamyati_optom")}
        categoryKey="fleshki_i_karty_pamyati_optom"
        categoryFilter={String(CATEGORY_IDS.fleshki_i_karty_pamyati_optom)}
      />

      <ProductSection
        title={t("home_elektronika_gadzhety_aksessuary")}
        categoryKey="elektronika_gadzhety_aksessuary"
        categoryFilter={String(CATEGORY_IDS.elektronika_gadzhety_aksessuary)}
      />

      {/* <ProductSection
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
      /> */}
    </main>
  );
}
