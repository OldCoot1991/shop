"use client";

import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import styles from "./AuthModal.module.css";
import { useAppDispatch } from "@/hooks/useAppStore";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/lib/features/auth/authSlice";
import { syncCartOnLogin } from "@/lib/features/cart/cartSlice";
import {
  loginRequest,
  registerStep1Identification,
  registerStep2Verification,
  registerStep3Confirmation,
} from "@/services/authService";

type Tab = "login" | "register";
type RegStep = 1 | 2 | 3 | "done";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called after successful login so the parent can proceed with checkout */
  onAuthSuccess?: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
}: AuthModalProps) {
  const dispatch = useAppDispatch();

  const [tab, setTab] = useState<Tab>("login");

  // ── Login state ────────────────────────────────────────────────────────────
  const [loginField, setLoginField] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // ── Registration state ─────────────────────────────────────────────────────
  const [regStep, setRegStep] = useState<RegStep>(1);
  const [regEmail, setRegEmail] = useState("");
  const [regToken, setRegToken] = useState("");
  const [regCode, setRegCode] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPass, setShowRegPass] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  const resetAll = () => {
    setTab("login");
    setLoginField("");
    setPassword("");
    setShowPass(false);
    setLoginError(null);
    setRegStep(1);
    setRegEmail("");
    setRegToken("");
    setRegCode("");
    setRegPassword("");
    setShowRegPass(false);
    setRegError(null);
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setLoginError(null);
    setRegError(null);
  };

  // ── Login submit ───────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    dispatch(loginStart());
    try {
      const userData = await loginRequest({ login: loginField, password });
      dispatch(loginSuccess(userData));
      dispatch(syncCartOnLogin());
      handleClose();
      onAuthSuccess?.();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Ошибка авторизации";
      setLoginError(msg);
      dispatch(loginFailure(msg));
    } finally {
      setLoginLoading(false);
    }
  };

  // ── Registration steps ─────────────────────────────────────────────────────
  const handleRegStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError(null);
    try {
      const { token } = await registerStep1Identification({ login: regEmail });
      setRegToken(token);
      setRegStep(2);
    } catch (err) {
      setRegError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setRegLoading(false);
    }
  };

  const handleRegStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError(null);
    try {
      const { token } = await registerStep2Verification({
        token: regToken,
        code: regCode,
      });
      setRegToken(token);
      setRegStep(3);
    } catch (err) {
      setRegError(err instanceof Error ? err.message : "Неверный код");
    } finally {
      setRegLoading(false);
    }
  };

  const handleRegStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError(null);
    try {
      const userData = await registerStep3Confirmation({
        token: regToken,
        password: regPassword,
      });
      dispatch(loginSuccess(userData));
      dispatch(syncCartOnLogin());
      setRegStep("done");
      // Auto-close & proceed after 1.5 s
      setTimeout(() => {
        handleClose();
        onAuthSuccess?.();
      }, 1500);
    } catch (err) {
      setRegError(
        err instanceof Error ? err.message : "Ошибка создания аккаунта",
      );
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`${styles.modal} ${isOpen ? styles.modalVisible : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandIcon}>S</div>
          <span className={styles.brandName}>ShopHub</span>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === "login" ? styles.tabActive : ""}`}
            onClick={() => switchTab("login")}
          >
            Войти
          </button>
          <button
            className={`${styles.tab} ${tab === "register" ? styles.tabActive : ""}`}
            onClick={() => switchTab("register")}
          >
            Регистрация
          </button>
        </div>

        {/* ── LOGIN ───────────────────────────────────────────────────── */}
        {tab === "login" && (
          <form className={styles.form} onSubmit={handleLogin} noValidate>
            {loginError && (
              <div className={styles.errorBanner}>
                <AlertCircle size={15} /> {loginError}
              </div>
            )}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="am-login">
                Email или телефон
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <Mail size={15} />
                </span>
                <input
                  id="am-login"
                  className={styles.input}
                  type="text"
                  placeholder="email@example.com"
                  value={loginField}
                  onChange={(e) => setLoginField(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="am-password">
                Пароль
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <Lock size={15} />
                </span>
                <input
                  id="am-password"
                  className={styles.input}
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? "Скрыть пароль" : "Показать пароль"}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loginLoading || !loginField || !password}
            >
              {loginLoading ? (
                <>
                  <span className={styles.spinner} /> Входим...
                </>
              ) : (
                "Войти"
              )}
            </button>
          </form>
        )}

        {/* ── REGISTRATION ────────────────────────────────────────────── */}
        {tab === "register" && (
          <>
            {/* Step dots */}
            {regStep !== "done" && (
              <div className={styles.stepIndicator}>
                {([1, 2, 3] as const).map((s) => (
                  <div
                    key={s}
                    className={`${styles.stepDot} ${regStep === s ? styles.stepDotActive : ""} ${typeof regStep === "number" && regStep > s ? styles.stepDotDone : ""}`}
                  />
                ))}
              </div>
            )}

            {/* Step 1: Email */}
            {regStep === 1 && (
              <form
                className={styles.form}
                onSubmit={handleRegStep1}
                noValidate
              >
                <p className={styles.stepTitle}>Введите email</p>
                <p className={styles.stepSub}>Мы отправим код подтверждения</p>
                {regError && (
                  <div className={styles.errorBanner}>
                    <AlertCircle size={15} /> {regError}
                  </div>
                )}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="reg-email">
                    Email
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                      <Mail size={15} />
                    </span>
                    <input
                      id="reg-email"
                      className={styles.input}
                      type="email"
                      placeholder="email@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={regLoading || !regEmail}
                >
                  {regLoading ? (
                    <>
                      <span className={styles.spinner} /> Отправляем...
                    </>
                  ) : (
                    "Получить код"
                  )}
                </button>
              </form>
            )}

            {/* Step 2: Code */}
            {regStep === 2 && (
              <form
                className={styles.form}
                onSubmit={handleRegStep2}
                noValidate
              >
                <button
                  type="button"
                  className={styles.backBtn}
                  onClick={() => {
                    setRegStep(1);
                    setRegError(null);
                  }}
                >
                  <ArrowLeft size={13} /> Назад
                </button>
                <p className={styles.stepTitle}>Введите код</p>
                <p className={styles.stepSub}>Код отправлен на {regEmail}</p>
                {regError && (
                  <div className={styles.errorBanner}>
                    <AlertCircle size={15} /> {regError}
                  </div>
                )}
                <input
                  className={styles.codeInput}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="0000"
                  value={regCode}
                  onChange={(e) =>
                    setRegCode(e.target.value.replace(/\D/g, ""))
                  }
                  autoFocus
                  required
                />
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={regLoading || regCode.length < 4}
                >
                  {regLoading ? (
                    <>
                      <span className={styles.spinner} /> Проверяем...
                    </>
                  ) : (
                    "Подтвердить"
                  )}
                </button>
              </form>
            )}

            {/* Step 3: Password */}
            {regStep === 3 && (
              <form
                className={styles.form}
                onSubmit={handleRegStep3}
                noValidate
              >
                <button
                  type="button"
                  className={styles.backBtn}
                  onClick={() => {
                    setRegStep(2);
                    setRegError(null);
                  }}
                >
                  <ArrowLeft size={13} /> Назад
                </button>
                <p className={styles.stepTitle}>Придумайте пароль</p>
                <p className={styles.stepSub}>
                  Минимум 8 символов, латинские буквы и цифры
                </p>
                {regError && (
                  <div className={styles.errorBanner}>
                    <AlertCircle size={15} /> {regError}
                  </div>
                )}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="reg-pass">
                    Пароль
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                      <Lock size={15} />
                    </span>
                    <input
                      id="reg-pass"
                      className={styles.input}
                      type={showRegPass ? "text" : "password"}
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className={styles.togglePassword}
                      onClick={() => setShowRegPass((v) => !v)}
                      aria-label={showRegPass ? "Скрыть" : "Показать"}
                    >
                      {showRegPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={regLoading || regPassword.length < 8}
                >
                  {regLoading ? (
                    <>
                      <span className={styles.spinner} /> Создаём аккаунт...
                    </>
                  ) : (
                    "Создать аккаунт"
                  )}
                </button>
              </form>
            )}

            {/* Done */}
            {regStep === "done" && (
              <div className={styles.successBlock}>
                <div className={styles.successIcon}>
                  <CheckCircle size={30} />
                </div>
                <p className={styles.successTitle}>Аккаунт создан!</p>
                <p className={styles.successSub}>
                  Выполняем вход и переходим к оплате…
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
