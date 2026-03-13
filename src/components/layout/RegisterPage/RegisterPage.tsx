"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginSuccess } from "@/lib/features/auth/authSlice";
import { syncCartOnLogin } from "@/lib/features/cart/cartSlice";
import {
  registerStep1Identification,
  registerStep2Verification,
  registerStep3Confirmation,
} from "@/services/authService";
import styles from "./RegisterPage.module.css";

// Minimal inline SVG icons
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

const IconKey = () => (
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
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
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
          <h2 className={styles.successTitle}>Регистрация завершена!</h2>
          <p className={styles.successSub}>Добро пожаловать в ShopHub</p>
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

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  // Local UI State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Registration data
  const [login, setLogin] = useState("");
  const [token, setToken] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Clear errors when inputs change
  useEffect(() => {
    if (error) setError(null);
  }, [login, code, password, confirmPassword]);

  // Handle Step 1: Request Verification Code by Email
  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!login) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await registerStep1Identification({ login });
      setToken(data.token);
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Ошибка отправки кода");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Step 2: Verify the Code
  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await registerStep2Verification({ token, code });
      setToken(data.token);
      setStep(3);
    } catch (err: any) {
      setError(err.message || "Неверный код верификации");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Step 3: Complete Registration with Password
  const handleStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const userData = await registerStep3Confirmation({ token, password });
      dispatch(loginSuccess(userData));
      dispatch(syncCartOnLogin());
      // Step state isn't advanced because the isAuthenticated flag will render the SuccessScreen
    } catch (err: any) {
      setError(err.message || "Ошибка при создании аккаунта");
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent multiple submits / invalid states
  const isSubmitDisabled = () => {
    if (isLoading) return true;
    if (step === 1) return !login;
    if (step === 2) return !code;
    if (step === 3)
      return !password || !confirmPassword || password !== confirmPassword;
    return false;
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

        <h1 className={styles.title}>Создать аккаунт</h1>
        <p className={styles.subtitle}>
          {step === 1 && "Введите email для получения кода"}
          {step === 2 && "Код отправлен на ваш email"}
          {step === 3 && "Придумайте надежный пароль"}
        </p>

        {/* Steps indicator */}
        <div className={styles.steps}>
          <div
            className={`${styles.stepDot} ${step >= 1 ? styles.active : ""}`}
          />
          <div
            className={`${styles.stepDot} ${step >= 2 ? styles.active : ""}`}
          />
          <div
            className={`${styles.stepDot} ${step >= 3 ? styles.active : ""}`}
          />
        </div>

        <form
          className={styles.form}
          onSubmit={
            step === 1 ? handleStep1 : step === 2 ? handleStep2 : handleStep3
          }
          noValidate
        >
          {/* Error banner */}
          {error && (
            <div className={styles.errorBanner}>
              <IconAlertCircle />
              {error}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
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
                  disabled={isLoading}
                  autoComplete="username"
                  required
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="code">
                Код подтверждения
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <IconKey />
                </span>
                <input
                  id="code"
                  type="text"
                  className={styles.input}
                  placeholder="0000"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={isLoading}
                  autoComplete="one-time-code"
                  required
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
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
                    disabled={isLoading}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Скрыть пароль" : "Показать пароль"
                    }
                  >
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="confirmPassword">
                  Повторите пароль
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <IconLock />
                  </span>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    className={styles.input}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitDisabled()}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner} /> Обработка...
              </>
            ) : step === 1 ? (
              "Получить код"
            ) : step === 2 ? (
              "Подтвердить"
            ) : (
              "Зарегистрироваться"
            )}
          </button>

          {step === 1 && (
            <Link
              href="/login"
              style={{
                textAlign: "center",
                fontSize: 14,
                color: "var(--color-primary)",
                marginTop: 8,
                textDecoration: "none",
              }}
            >
              Уже есть аккаунт? Войти
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}
