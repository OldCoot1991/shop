"use client";

import React, { useRef } from "react";
import styles from "./CategoryGrid.module.css";
import { MOCK_CATEGORIES } from "@/lib/mockData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryGrid = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -360 : 360,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h3 className={styles.header}>Популярные категории</h3>
      </div>

      <div className={styles.scrollContainer}>
        <button
          className={`${styles.navBtn} ${styles.navBtnLeft}`}
          onClick={() => scroll("left")}
          aria-label="Прокрутить влево"
        >
          <ChevronLeft size={22} />
        </button>

        <div className={styles.grid} ref={scrollRef}>
          {MOCK_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={styles.card}
              style={{ background: cat.bg }}
            >
              <span className={styles.icon}>{cat.icon}</span>
              <span className={styles.title}>{cat.title}</span>
            </div>
          ))}
        </div>

        <button
          className={`${styles.navBtn} ${styles.navBtnRight}`}
          onClick={() => scroll("right")}
          aria-label="Прокрутить вправо"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default CategoryGrid;
