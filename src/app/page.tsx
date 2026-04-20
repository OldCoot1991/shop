import ProductSection from "@/components/layout/ProductSection/ProductSection";
import { CATEGORY_IDS } from "@/services/productService";

export default function Home() {
  return (
    <main
      style={{ maxWidth: "1440px", margin: "0 auto", padding: "24px 16px" }}
    >
      <ProductSection
        title="Аксессуары для телефонов"
        categoryKey="aksessuary_dlya_telefonov"
        categoryFilter={String(CATEGORY_IDS.aksessuary_dlya_telefonov)}
      />
      <ProductSection
        title="Игрушки"
        categoryKey="igrushki"
        categoryFilter={String(CATEGORY_IDS.igrushki)}
      />
      <ProductSection
        title="Канцтовары"
        categoryKey="kantstovary"
        categoryFilter={String(CATEGORY_IDS.kantstovary)}
      />
      <ProductSection
        title="Мячи"
        categoryKey="myachi"
        categoryFilter={String(CATEGORY_IDS.myachi)}
      />
      <ProductSection
        title="Обувь и аксессуары"
        categoryKey="obuv_i_aksessuary"
        categoryFilter={String(CATEGORY_IDS.obuv_i_aksessuary)}
      />
      {/* <ProductSection
        title="Стикеры"
        categoryKey="stickers"
        categoryFilter={String(CATEGORY_IDS.stickers)}
      />

      <ProductSection
        title="Стикерпаки"
        categoryKey="stickerpacks"
        categoryFilter={String(CATEGORY_IDS.stickerPacks)}
      />

      <ProductSection
        title="Двойные открытки"
        categoryKey="double-cards"
        categoryFilter={String(CATEGORY_IDS.doubleCards)}
      />

      <ProductSection
        title="Почтовые открытки"
        categoryKey="post-cards"
        categoryFilter={String(CATEGORY_IDS.postCards)}
      />

      <ProductSection
        title="Значки"
        categoryKey="badges"
        categoryFilter={String(CATEGORY_IDS.badges)}
      />

      <ProductSection
        title="Магниты"
        categoryKey="magnets"
        categoryFilter={String(CATEGORY_IDS.magnets)}
      />

      <ProductSection
        title="Термонашивки"
        categoryKey="patches"
        categoryFilter={String(CATEGORY_IDS.patches)}
      />

      <ProductSection
        title="Миниоткрытки"
        categoryKey="mini-cards"
        categoryFilter={String(CATEGORY_IDS.miniCards)}
      /> */}
    </main>
  );
}
