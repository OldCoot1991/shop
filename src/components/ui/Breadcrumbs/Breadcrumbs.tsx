"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";
import { fetchFilters } from "@/services/productService";
import styles from "./Breadcrumbs.module.css";

// --- Types ---
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]; // Optional manual override
  className?: string;
}

// --- Segment to Translation Key Map ---
const STATIC_SEGMENTS: Record<string, string> = {
  about: "breadcrumb_about",
  contacts: "breadcrumb_contacts",
  delivery: "breadcrumb_delivery",
  "payment-methods": "breadcrumb_payment",
  returns: "breadcrumb_returns",
  requisites: "breadcrumb_requisites",
  legal: "breadcrumb_legal",
  profile: "breadcrumb_profile",
  wishlist: "breadcrumb_wishlist",
  "api-catalog": "breadcrumb_catalog",
  payments: "breadcrumb_payments",
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items: manualItems, className = "" }) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [dynamicItems, setDynamicItems] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    // If manual items provided, use them
    if (manualItems) {
      setDynamicItems(manualItems);
      return;
    }

    const buildBreadcrumbs = async () => {
      if (!pathname || pathname === "/") {
        setDynamicItems([]);
        return;
      }

      const segments = pathname.split("/").filter(Boolean);
      const items: BreadcrumbItem[] = [];
      let currentPath = "";

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        currentPath += `/${segment}`;
        const isLast = i === segments.length - 1;

        // 1. Check static mapping
        if (STATIC_SEGMENTS[segment]) {
          items.push({
            label: t(STATIC_SEGMENTS[segment]),
            href: isLast ? undefined : currentPath,
            isCurrent: isLast,
          });
          continue;
        }

        // 2. Handle numeric IDs (categories) in /api-catalog/[id]
        if (segments[i - 1] === "api-catalog" && !isNaN(Number(segment))) {
          try {
            const filters = await fetchFilters();
            const categoryFilter = filters.find((f) => f.key === "category");
            const category = categoryFilter?.items.find(
              (cat) => String(cat.id) === segment
            );
            if (category) {
              items.push({
                label: category.name.charAt(0).toUpperCase() + category.name.slice(1),
                href: isLast ? undefined : currentPath,
                isCurrent: isLast,
              });
              continue;
            }
          } catch (err) {
            console.error("Breadcrumbs: failed to fetch category name", err);
          }
        }

        // 3. Fallback: capitalize segment
        // (This part will usually be replaced by manual items for products)
        items.push({
          label: segment.charAt(0).toUpperCase() + segment.slice(1),
          href: isLast ? undefined : currentPath,
          isCurrent: isLast,
        });
      }

      setDynamicItems(items);
    };

    buildBreadcrumbs();
  }, [pathname, manualItems, t]);

  // Don't show anything on home page
  if (pathname === "/") return null;

  return (
    <nav className={`${styles.breadcrumb} ${className}`} aria-label="Breadcrumb">
      {/* Home link always present */}
      <Link href="/" className={`${styles.breadcrumbLink} ${styles.breadcrumbFirst}`}>
        <ChevronLeft size={16} /> 
        {t("breadcrumb_home")}
      </Link>

      {dynamicItems.map((item, index) => {
        const isCollapsed = dynamicItems.length > 2 && index > 0 && index < dynamicItems.length - 1;
        
        return (
          <React.Fragment key={index}>
            {/* On mobile, we hide middle segments and show an ellipsis or nothing */}
            <span className={`${styles.breadcrumbSep} ${isCollapsed ? styles.collapsedMobile : ""}`} />
            
            <div className={`${styles.itemWrapper} ${isCollapsed ? styles.collapsedMobile : ""}`}>
              {item.isCurrent || !item.href ? (
                <span className={styles.breadcrumbCurrent}>{item.label}</span>
              ) : (
                <Link href={item.href} className={styles.breadcrumbLink}>
                  {item.label}
                </Link>
              )}
            </div>
            
            {/* Show ellipsis on mobile if we have collapsed segments */}
            {index === 1 && dynamicItems.length > 2 && (
              <span className={styles.mobileEllipsis}>...</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
