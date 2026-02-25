import { MOCK_PRODUCTS } from "@/lib/mockData";
import ProductDetail from "@/components/ui/ProductDetail/ProductDetail";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== id && p.category === product.category,
  ).slice(0, 4);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}

// Generate static params for all products
export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ id: p.id }));
}
