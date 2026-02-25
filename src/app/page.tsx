import Banner from "@/components/layout/Banner/Banner";
import CategoryGrid from "@/components/layout/CategoryGrid/CategoryGrid";
import ProductGrid from "@/components/layout/ProductGrid/ProductGrid";
import Footer from "@/components/layout/Footer/Footer";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export default function Home() {
  // Простая разбивка моковых товаров для демонстрации разных секций
  const hits = MOCK_PRODUCTS.slice(0, 4);
  const newItems = MOCK_PRODUCTS.slice(2, 6);

  return (
    <main
      style={{ maxWidth: "1440px", margin: "0 auto", padding: "24px 16px" }}
    >
      <Banner />
      <CategoryGrid />
      <ProductGrid title="Хиты продаж" products={hits} section="hits" />
      <ProductGrid title="Новинки" products={newItems} section="new" />
      <Footer />
    </main>
  );
}
