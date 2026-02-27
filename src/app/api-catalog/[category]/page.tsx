import { notFound } from "next/navigation";
import ApiCatalogPage from "@/components/layout/ApiCatalogPage/ApiCatalogPage";
import { fetchProductsRequest, fetchFilters } from "@/services/productService";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function ApiCatalogRoute({ params }: Props) {
  const { category } = await params;

  // We need the category title, so let's load filters to find it
  let categoryTitle = "Каталог";
  try {
    const filters = await fetchFilters();
    const categoryGroup = filters.find((f) => f.key === "category");
    if (categoryGroup) {
      // category param is now the numeric ID
      const matchedCategory = categoryGroup.items.find(
        (item) => item.id.toString() === category,
      );
      if (matchedCategory) {
        categoryTitle = matchedCategory.name;
      }
    }
  } catch (error) {
    console.warn("Failed to fetch filters for category title:", error);
  }

  let productsData;
  try {
    // Fetch products passing the Category ID directly
    productsData = await fetchProductsRequest({
      category: category,
    });
  } catch (error) {
    console.error("Failed to fetch products for category:", error);
    // You could return an error boundary page instead of 404 here
    notFound();
  }

  return (
    <ApiCatalogPage title={categoryTitle} products={productsData.products} />
  );
}
