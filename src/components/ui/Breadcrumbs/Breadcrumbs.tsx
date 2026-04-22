"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";
import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  const { t } = useTranslation();

  return (
    <nav className={`${styles.breadcrumb} ${className}`} aria-label="Breadcrumb">
      {/* Home link always present */}
      <Link href="/" className={`${styles.breadcrumbLink} ${styles.breadcrumbFirst}`}>
        <ChevronLeft size={16} /> 
        {t("breadcrumb_home")}
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className={styles.breadcrumbSep} />
          {item.isCurrent || !item.href ? (
            <span className={styles.breadcrumbCurrent}>{item.label}</span>
          ) : (
            <Link href={item.href} className={styles.breadcrumbLink}>
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
