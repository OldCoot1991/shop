import { MOCK_PRODUCTS, Product } from "@/lib/mockData";
import CatalogPage from "@/components/layout/CatalogPage/CatalogPage";
import { notFound } from "next/navigation";

// Define catalog sections — easy to extend
const SECTIONS: Record<
  string,
  { title: string; filter: (p: Product) => boolean }
> = {
  hits: {
    title: "Хиты продаж",
    filter: (p) =>
      p.badges.some((b) => b.toLowerCase().includes("хит") || b.includes("%")),
  },
  new: {
    title: "Новинки",
    filter: (p) => p.badges.some((b) => b.toLowerCase().includes("новинк")),
  },
  // Fallback — all products if none match
  all: {
    title: "Все товары",
    filter: () => true,
  },
};

interface Props {
  params: Promise<{ section: string }>;
}

export default async function CatalogRoute({ params }: Props) {
  const { section } = await params;
  const config = SECTIONS[section];

  if (!config) {
    notFound();
  }

  // First try the specific filter; fallback to all products if filter returns empty
  let products = MOCK_PRODUCTS.filter(config.filter);
  if (products.length === 0) {
    products = MOCK_PRODUCTS;
  }

  return (
    <CatalogPage title={config.title} products={products} section={section} />
  );
}

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}
