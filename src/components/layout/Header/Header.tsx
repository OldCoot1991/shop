"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  Menu,
  X,
  User,
  Heart,
  ShoppingCart,
  ShoppingBag,
  Package,
  Settings,
} from "lucide-react";
import SettingsModal from "../../../components/ui/SettingsModal/SettingsModal";
import CartDrawer from "../../ui/CartDrawer/CartDrawer";
import WishlistDrawer from "../../ui/WishlistDrawer/WishlistDrawer";
import styles from "./Header.module.css";
import SearchHeader from "../Search/Header";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { fetchUser } from "@/lib/features/auth/authSlice";
import { fetchCart, selectCartCount } from "@/lib/features/cart/cartSlice";
import { selectWishlistCount } from "@/lib/features/wishlist/wishlistSlice";
import { fetchFilters, ApiFilterItem } from "@/services/productService";

const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCatalogMenuOpen, setIsCatalogMenuOpen] = useState(false);
  const [categories, setCategories] = useState<ApiFilterItem[]>([]);
  const { t } = useTranslation();
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 1. Verify session on load: if user is "authenticated" in local storage,
    // fetch cart and user data to confirm with server and get fresh info
    if (isAuthenticated) {
      dispatch(fetchUser());
      dispatch(fetchCart());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    // 2. Global redirect: if user becomes unauthenticated (e.g. 401 error, or logged out),
    // kick them to the home page if they are on a protected route.
    if (!isAuthenticated) {
      if (pathname.startsWith("/profile") || pathname.startsWith("/payments")) {
        router.replace("/");
      }
    }
  }, [isAuthenticated, pathname, router]);

  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

  const toggleCatalogMenu = async () => {
    if (isCatalogMenuOpen) {
      setIsCatalogMenuOpen(false);
      return;
    }

    // Open menu and fetch fresh categories
    setIsCatalogMenuOpen(true);
    setIsCategoriesLoading(true);
    try {
      const filters = await fetchFilters();
      const categoryFilter = filters.find((f) => f.key === "category");
      if (categoryFilter) {
        setCategories(categoryFilter.items);
      }
    } catch (err) {
      console.error("Failed to load catalog categories", err);
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  return (
    <header className={styles.header}>
      {/* Основная шапка с лого, каталогом, поиском и иконками профиля */}
      <div className={styles.mainContainer}>
        <div className={styles.logoAndCatalog}>
          <Link href="/" className={styles.logo}>
            <ShoppingBag className={styles.logoIcon} />
            <span className={styles.logoText}>ShopHub</span>
          </Link>

          <div className={styles.catalogWrapper}>
            <button className={styles.catalogBtn} onClick={toggleCatalogMenu}>
              {isCatalogMenuOpen ? <X size={24} /> : <Menu size={24} />}
              <span>Каталог</span>
            </button>
          </div>
        </div>

        {isCatalogMenuOpen && (
          <div className={styles.catalogDropdown}>
            <div className={styles.catalogDropdownInner}>
              {isCategoriesLoading && categories.length === 0 ? (
                <div
                  style={{ padding: "20px", color: "var(--text-secondary)" }}
                >
                  Загрузка категорий...
                </div>
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/api-catalog/${cat.id}`}
                    className={styles.catalogDropdownItem}
                    onClick={() => setIsCatalogMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))
              ) : (
                <div
                  style={{ padding: "20px", color: "var(--text-secondary)" }}
                >
                  Нет доступных категорий
                </div>
              )}
            </div>
          </div>
        )}

        <SearchHeader />

        <div className={styles.actionsBox}>
          {isAuthenticated && user ? (
            <Link
              href="/profile"
              className={styles.actionItem}
              aria-label="Личный кабинет"
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--color-primary)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {user.email[0].toUpperCase()}
              </span>
              <span
                className={styles.actionText}
                style={{
                  maxWidth: 80,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.firstName ?? user.email.split("@")[0]}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className={styles.actionItem}
              aria-label="Войти в личный кабинет"
            >
              <User size={24} className={styles.actionIcon} />
              <span className={styles.actionText}>Войти</span>
            </Link>
          )}

          {/* Ссылка на заказы (только для авторизованных, или для всех - тогда редиректнет) */}
          {isAuthenticated && (
            <Link
              href="/payments"
              className={styles.actionItem}
              aria-label="Мои заказы"
            >
              <Package size={24} className={styles.actionIcon} />
              <span className={styles.actionText}>Заказы</span>
            </Link>
          )}

          <div
            className={styles.actionItem}
            onClick={() => setIsWishlistOpen(true)}
            role="button"
            aria-label="Открыть избранное"
          >
            <Heart size={24} className={styles.actionIcon} />
            <span className={styles.actionText}>Избранное</span>
            {wishlistCount > 0 && (
              <span className={styles.cartBadge}>{wishlistCount}</span>
            )}
          </div>
          <div
            className={styles.actionItem}
            onClick={() => setIsCartOpen(true)}
            role="button"
            aria-label="Открыть корзину"
          >
            <ShoppingCart size={24} className={styles.actionIcon} />
            <span className={styles.actionText}>Корзина</span>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </div>
          <div
            className={styles.actionItem}
            onClick={() => setIsSettingsOpen(true)}
            role="button"
            aria-label={t("settings_tooltip") || "Настройки"}
            suppressHydrationWarning
          >
            <Settings size={24} className={styles.actionIcon} />
            <span className={styles.actionText}>Настройки</span>
          </div>
        </div>
      </div>

      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </header>
  );
};

export default Header;
