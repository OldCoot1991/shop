"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "@/lib/features/auth/authSlice";
import { fetchCart } from "@/lib/features/cart/cartSlice";
import { loginRequest } from "@/services/authService";
import styles from "./LoginPage.module.css";

// Minimal inline SVG icons to avoid extra dependencies
const IconMail = () => (
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
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconLock = () => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = () => (
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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
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
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const IconAlertCircle = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconCheckCircle = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

function SuccessScreen({ email }: { email: string }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/profile");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.success}>
          <div className={styles.successIcon}>
            <IconCheckCircle />
          </div>
          <h2 className={styles.successTitle}>Вы вошли в аккаунт</h2>
          <p className={styles.successSub}>Добро пожаловать!</p>
          <span className={styles.successUser}>{email}</span>
          <p className={styles.successRedirect}>
            Переход в личный кабинет через <strong>{countdown}</strong> сек…
          </p>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ animationDuration: "3s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { isLoading, error, user, isAuthenticated } = useAppSelector(
    (s) => s.auth,
  );

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(loginStart());
    try {
      const userData = await loginRequest({ login, password });
      dispatch(loginSuccess(userData));
      // Immediately fetch cart data after successful login
      dispatch(fetchCart());
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Ошибка авторизации";
      dispatch(loginFailure(message));
    }
  };

  if (isAuthenticated && user) {
    return <SuccessScreen email={user.email} />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandIcon}>S</div>
          <span className={styles.brandName}>ShopHub</span>
        </div>

        <h1 className={styles.title}>Вход в аккаунт</h1>
        <p className={styles.subtitle}>Введите свои данные для продолжения</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Error banner */}
          {error && (
            <div className={styles.errorBanner}>
              <IconAlertCircle />
              {error}
            </div>
          )}

          {/* Login field */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login">
              Email или телефон
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <IconMail />
              </span>
              <input
                id="login"
                type="text"
                className={styles.input}
                placeholder="email@example.com"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Пароль
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <IconLock />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={styles.submit}
            disabled={isLoading || !login || !password}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner} />
                Входим...
              </>
            ) : (
              "Войти"
            )}
          </button>

          <Link
            href="/register"
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "var(--color-primary)",
              marginTop: 8,
              textDecoration: "none",
            }}
          >
            У вас нет аккаунта? Зарегистрироваться
          </Link>
        </form>
      </div>
    </div>
  );
}
