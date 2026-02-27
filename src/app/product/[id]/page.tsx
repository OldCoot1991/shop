import { fetchProductById } from "@/services/productService";
import ApiProductDetail from "@/components/ui/ApiProductDetail/ApiProductDetail";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  let product;
  try {
    product = await fetchProductById(id);
  } catch (err) {
    if (err instanceof Error && err.message === "NOT_FOUND") {
      notFound();
    }
    throw err;
  }

  return <ApiProductDetail product={product} />;
}
