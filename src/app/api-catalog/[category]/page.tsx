import ApiCatalogPage from "@/components/layout/ApiCatalogPage/ApiCatalogPage";
import { fetchFilters } from "@/services/productService";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function ApiCatalogRoute({ params }: Props) {
  const { category } = await params;

  // Resolve the human-readable title from filters (cached 1h server-side)
  let categoryTitle = "Каталог";
  try {
    const filters = await fetchFilters();
    const categoryGroup = filters.find((f) => f.key === "category");
    if (categoryGroup) {
      const matched = categoryGroup.items.find(
        (item) => item.id.toString() === category,
      );
      if (matched) categoryTitle = matched.name;
    }
  } catch {
    // Non-critical — title falls back to "Каталог"
  }

  // Products are fetched fresh client-side by ApiCatalogPage itself
  return <ApiCatalogPage title={categoryTitle} categoryId={category} />;
}
