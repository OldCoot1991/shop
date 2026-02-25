import React from "react";
import Link from "next/link";
import styles from "./ProductGrid.module.css";
import ProductCard from "../../ui/ProductCard/ProductCard";
import { Product } from "@/lib/mockData";

interface ProductGridProps {
  title: string;
  products: Product[];
  section: string; // URL slug, e.g. "hits" or "new"
}

const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  products,
  section,
}) => {
  return (
    <div className={styles.section}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>{title}</h3>
        <Link href={`/catalog/${section}`} className={styles.seeAllBtn}>
          Смотреть всё
        </Link>
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.gridItem}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
