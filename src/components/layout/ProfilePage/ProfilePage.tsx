"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/features/auth/authSlice";
import { logoutRequest } from "@/services/authService";
import styles from "./ProfilePage.module.css";

// SVG icons
const IconUser = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconPhone = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13.5 19.79 19.79 0 0 1 1 4.82 2 2 0 0 1 2.98 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
  </svg>
);

const IconHash = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

const IconShoppingBag = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const IconHeart = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconSettings = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconChevronRight = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconCheck = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function getInitials(
  firstName?: string | null,
  lastName?: string | null,
  email?: string,
) {
  if (firstName && lastName)
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  if (firstName) return firstName[0].toUpperCase();
  if (email) return email[0].toUpperCase();
  return "U";
}

function getDisplayName(
  firstName?: string | null,
  lastName?: string | null,
  email?: string,
) {
  if (firstName || lastName)
    return [firstName, lastName].filter(Boolean).join(" ");
  return email ?? "Пользователь";
}

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);

  // Protect route — redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const handleLogout = async () => {
    await logoutRequest();
    dispatch(logout());
    router.push("/login");
  };

  const initials = getInitials(user.firstName, user.lastName, user.email);
  const displayName = getDisplayName(user.firstName, user.lastName, user.email);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* ── Hero ── */}
        <div className={styles.heroCard}>
          <div className={styles.avatar}>{initials}</div>

          <div className={styles.heroInfo}>
            <h1 className={styles.heroName}>{displayName}</h1>
            <p className={styles.heroEmail}>{user.email}</p>
            <span className={styles.heroBadge}>
              <IconCheck /> Аккаунт подтверждён
            </span>
          </div>

          <button className={styles.logoutBtn} onClick={handleLogout}>
            Выйти
          </button>
        </div>

        {/* ── Info grid ── */}
        <div className={styles.grid}>
          {/* Personal info */}
          <div className={styles.infoCard}>
            <p className={styles.infoCardTitle}>Личные данные</p>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>
                <IconUser />
              </span>
              <div>
                <p className={styles.infoLabel}>Имя</p>
                {user.firstName ? (
                  <p className={styles.infoValue}>{user.firstName}</p>
                ) : (
                  <p className={styles.infoValueEmpty}>Не указано</p>
                )}
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>
                <IconUser />
              </span>
              <div>
                <p className={styles.infoLabel}>Фамилия</p>
                {user.lastName ? (
                  <p className={styles.infoValue}>{user.lastName}</p>
                ) : (
                  <p className={styles.infoValueEmpty}>Не указано</p>
                )}
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>
                <IconHash />
              </span>
              <div>
                <p className={styles.infoLabel}>ID пользователя</p>
                <p className={styles.infoValue}>#{user.id}</p>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className={styles.infoCard}>
            <p className={styles.infoCardTitle}>Контакты</p>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>
                <IconMail />
              </span>
              <div>
                <p className={styles.infoLabel}>Email</p>
                <p className={styles.infoValue}>{user.email}</p>
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>
                <IconPhone />
              </span>
              <div>
                <p className={styles.infoLabel}>Телефон</p>
                {user.phone ? (
                  <p className={styles.infoValue}>{user.phone}</p>
                ) : (
                  <p className={styles.infoValueEmpty}>Не указан</p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.quickCard}>
            <p className={styles.quickTitle}>Быстрый доступ</p>
            <div className={styles.quickLinks}>
              <div className={styles.quickLink}>
                <span className={styles.quickLinkIcon}>
                  <IconShoppingBag />
                </span>
                Мои заказы
                <span className={styles.quickLinkArrow}>
                  <IconChevronRight />
                </span>
              </div>
              <div className={styles.quickLink}>
                <span className={styles.quickLinkIcon}>
                  <IconHeart />
                </span>
                Избранное
                <span className={styles.quickLinkArrow}>
                  <IconChevronRight />
                </span>
              </div>
              <div className={styles.quickLink}>
                <span className={styles.quickLinkIcon}>
                  <IconSettings />
                </span>
                Настройки аккаунта
                <span className={styles.quickLinkArrow}>
                  <IconChevronRight />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
