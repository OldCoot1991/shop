"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "@/lib/features/auth/authSlice";
import { syncCartOnLogin } from "@/lib/features/cart/cartSlice";
import {
  loginRequest,
  restorePasswordStep1,
  restorePasswordStep2,
  restorePasswordStep3,
} from "@/services/authService";
import styles from "./LoginPage.module.css";

// ── Inline SVG Icons ─────────────────────────────────────────────────────────
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const IconAlertCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconCheckCircle = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const IconKey = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

// ── Success screen (after login) ─────────────────────────────────────────────
function SuccessScreen({ email }: { email: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) { router.push("/profile"); return; }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.success}>
          <div className={styles.successIcon}><IconCheckCircle /></div>
          <h2 className={styles.successTitle}>{t("success_login_title", { defaultValue: "Вы вошли в аккаунт" })}</h2>
          <p className={styles.successSub}>{t("welcome")}</p>
          <span className={styles.successUser}>{email}</span>
          <p className={styles.successRedirect}>
            {t("redirect_countdown", { count: countdown, defaultValue: "Переход в личный кабинет через {{count}} сек…" })}
          </p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ animationDuration: "3s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step dots ────────────────────────────────────────────────────────────────
function StepDots({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className={styles.stepDots}>
      {([1, 2, 3] as const).map((s) => (
        <div
          key={s}
          className={`${styles.stepDot} ${current === s ? styles.stepDotActive : ""} ${current > s ? styles.stepDotDone : ""}`}
        />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
type View = "login" | "reset";
type ResetStep = 1 | 2 | 3 | "done";

export default function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, error, user, isAuthenticated } = useAppSelector((s) => s.auth);

  // ── Login state ────────────────────────────────────────────────────────────
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ── View routing ───────────────────────────────────────────────────────────
  const [view, setView] = useState<View>("login");

  // ── Reset state ────────────────────────────────────────────────────────────
  const [resetStep, setResetStep] = useState<ResetStep>(1);
  const [resetLogin, setResetLogin] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [showResetPass, setShowResetPass] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clean up timer on unmount
  useEffect(() => () => { if (countdownRef.current) clearInterval(countdownRef.current); }, []);

  const startCountdown = (seconds: number) => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(seconds);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(countdownRef.current!); countdownRef.current = null; return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const openReset = () => {
    setView("reset");
    setResetStep(1);
    setResetLogin(login); // prefill with whatever user typed in login field
    setResetToken("");
    setResetCode("");
    setResetPassword("");
    setResetError(null);
    setCountdown(0);
    if (countdownRef.current) clearInterval(countdownRef.current);
    dispatch(clearError());
  };

  const goBackToLogin = () => {
    setView("login");
    setResetStep(1);
    setResetError(null);
    setCountdown(0);
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  // ── Login submit ───────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(loginStart());
    try {
      const userData = await loginRequest({ login, password });
      dispatch(loginSuccess(userData));
      dispatch(syncCartOnLogin());
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t("auth_error_default");
      dispatch(loginFailure(message));
    }
  };

  // ── Reset step 1: send email → get token + timeout ─────────────────────────
  const handleResetStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError(null);
    try {
      const { token, timeout } = await restorePasswordStep1({ login: resetLogin });
      setResetToken(token);
      startCountdown(timeout);
      setResetStep(2);
    } catch (err) {
      setResetError(err instanceof Error ? err.message : t("auth_error"));
    } finally {
      setResetLoading(false);
    }
  };

  // ── Resend code (re-calls step1) ───────────────────────────────────────────
  const handleResend = async () => {
    if (countdown > 0 || resetLoading) return;
    setResetLoading(true);
    setResetError(null);
    try {
      const { token, timeout } = await restorePasswordStep1({ login: resetLogin });
      setResetToken(token);
      setResetCode("");
      startCountdown(timeout);
    } catch (err) {
      setResetError(err instanceof Error ? err.message : t("auth_error"));
    } finally {
      setResetLoading(false);
    }
  };

  // ── Reset step 2: verify code → get new token ──────────────────────────────
  const handleResetStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError(null);
    try {
      const { token } = await restorePasswordStep2({ token: resetToken, code: resetCode });
      setResetToken(token);
      if (countdownRef.current) clearInterval(countdownRef.current);
      setCountdown(0);
      setResetStep(3);
    } catch (err) {
      setResetError(err instanceof Error ? err.message : t("auth_error_invalid_code"));
    } finally {
      setResetLoading(false);
    }
  };

  // ── Reset step 3: set new password → auto login ────────────────────────────
  const handleResetStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError(null);
    try {
      const userData = await restorePasswordStep3({ token: resetToken, password: resetPassword });
      dispatch(loginSuccess(userData));
      dispatch(syncCartOnLogin());
      setResetStep("done");
    } catch (err) {
      setResetError(err instanceof Error ? err.message : t("auth_error_save_pass"));
    } finally {
      setResetLoading(false);
    }
  };

  // ── Already authenticated → show success ──────────────────────────────────
  if (isAuthenticated && user) {
    return <SuccessScreen email={user.email} />;
  }

  // ════════════════════════════════════════════════════════════════════════════
  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Brand */}
        <div className={styles.brand}>
          <Image src="/logo.svg" alt="ОЗОН-ПРО" width={160} height={54} className={styles.logoImg} priority />
        </div>

        {/* ── LOGIN VIEW ─────────────────────────────────────────────────── */}
        {view === "login" && (
          <>
            <h1 className={styles.title}>{t("auth_login")}</h1>
            <p className={styles.subtitle}>{t("login_subtitle", { defaultValue: "Введите свои данные для продолжения" })}</p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {error && (
                <div className={styles.errorBanner}>
                  <IconAlertCircle /> {error}
                </div>
              )}

              {/* Login field */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="login">{t("auth_email_or_phone")}</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><IconMail /></span>
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
                <label className={styles.label} htmlFor="password">{t("auth_password")}</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><IconLock /></span>
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
                    aria-label={showPassword ? t("auth_hide_pass") : t("auth_show_pass")}
                  >
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className={styles.submit} disabled={isLoading || !login || !password}>
                {isLoading ? (<><span className={styles.spinner} /> {t("auth_logging_in")}</>) : t("auth_login_btn")}
              </button>

              {/* Forgot password */}
              <button type="button" className={styles.forgotBtn} onClick={openReset}>
                {t("auth_forgot_pass")}
              </button>

              <Link
                href="/register"
                style={{ textAlign: "center", fontSize: 14, color: "var(--color-primary)", marginTop: 4, textDecoration: "none" }}
              >
                {t("auth_no_account", { defaultValue: "У вас нет аккаунта? Зарегистрироваться" })}
              </Link>
            </form>
          </>
        )}

        {/* ── RESET VIEW ─────────────────────────────────────────────────── */}
        {view === "reset" && (
          <>
            {/* Step dots */}
            {resetStep !== "done" && <StepDots current={resetStep as 1 | 2 | 3} />}

            {/* ── Step 1: Enter email ── */}
            {resetStep === 1 && (
              <form className={styles.form} onSubmit={handleResetStep1} noValidate>
                <button type="button" className={styles.backBtn} onClick={goBackToLogin}>
                  <IconArrowLeft /> {t("auth_back")}
                </button>

                <div className={styles.resetHeader}>
                  <span className={styles.resetIcon}><IconKey /></span>
                  <div>
                    <h1 className={styles.title} style={{ margin: 0 }}>{t("auth_reset_pass")}</h1>
                    <p className={styles.subtitle} style={{ margin: "4px 0 0" }}>
                      {t("auth_enter_email")}
                    </p>
                  </div>
                </div>

                {resetError && (
                  <div className={styles.errorBanner}><IconAlertCircle /> {resetError}</div>
                )}

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="rst-login">{t("auth_email_or_phone")}</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}><IconMail /></span>
                    <input
                      id="rst-login"
                      type="text"
                      className={styles.input}
                      placeholder="email@example.com"
                      value={resetLogin}
                      onChange={(e) => setResetLogin(e.target.value)}
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className={styles.submit} disabled={resetLoading || !resetLogin}>
                  {resetLoading ? (<><span className={styles.spinner} /> {t("auth_sending")}</>) : t("auth_send_code")}
                </button>
              </form>
            )}

            {/* ── Step 2: Enter code ── */}
            {resetStep === 2 && (
              <form className={styles.form} onSubmit={handleResetStep2} noValidate>
                <button type="button" className={styles.backBtn} onClick={() => { setResetStep(1); setResetError(null); setResetCode(""); if (countdownRef.current) clearInterval(countdownRef.current); setCountdown(0); }}>
                  <IconArrowLeft /> {t("auth_back")}
                </button>

                <h1 className={styles.title}>{t("auth_enter_code")}</h1>
                <p className={styles.subtitle}>{t("auth_code_sent", { email: resetLogin })}</p>

                {resetError && (
                  <div className={styles.errorBanner}><IconAlertCircle /> {resetError}</div>
                )}

                <input
                  className={styles.codeInput}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="0000"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ""))}
                  autoFocus
                  required
                />

                {/* Resend row with countdown */}
                <div className={styles.resendRow}>
                  {countdown > 0 ? (
                    <span className={styles.resendTimer}>{t("auth_resend_wait", { seconds: countdown })}</span>
                  ) : (
                    <button type="button" className={styles.resendBtn} onClick={handleResend} disabled={resetLoading}>
                      {t("auth_resend_code")}
                    </button>
                  )}
                </div>

                <button type="submit" className={styles.submit} disabled={resetLoading || resetCode.length < 4}>
                  {resetLoading ? (<><span className={styles.spinner} /> {t("auth_verifying")}</>) : t("auth_verify")}
                </button>
              </form>
            )}

            {/* ── Step 3: New password ── */}
            {resetStep === 3 && (
              <form className={styles.form} onSubmit={handleResetStep3} noValidate>
                <button type="button" className={styles.backBtn} onClick={() => { setResetStep(2); setResetError(null); }}>
                  <IconArrowLeft /> {t("auth_back")}
                </button>

                <h1 className={styles.title}>{t("auth_new_password")}</h1>
                <p className={styles.subtitle}>{t("auth_pass_hint")}</p>

                {resetError && (
                  <div className={styles.errorBanner}><IconAlertCircle /> {resetError}</div>
                )}

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="rst-pass">{t("auth_new_password")}</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}><IconLock /></span>
                    <input
                      id="rst-pass"
                      type={showResetPass ? "text" : "password"}
                      className={styles.input}
                      placeholder="••••••••"
                      value={resetPassword}
                      onChange={(e) => setResetPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className={styles.togglePassword}
                      onClick={() => setShowResetPass((v) => !v)}
                      aria-label={showResetPass ? t("auth_hide_pass") : t("auth_show_pass")}
                    >
                      {showResetPass ? <IconEyeOff /> : <IconEye />}
                    </button>
                  </div>
                </div>

                <button type="submit" className={styles.submit} disabled={resetLoading || resetPassword.length < 8}>
                  {resetLoading ? (<><span className={styles.spinner} /> {t("save_password_loading", { defaultValue: "Сохраняем..." })}</>) : t("save_password_btn", { defaultValue: "Сохранить пароль" })}
                </button>
              </form>
            )}

            {/* ── Done ── */}
            {resetStep === "done" && (
              <div className={styles.success}>
                <div className={styles.successIcon} style={{ background: "rgba(34,197,94,0.12)", color: "#16a34a" }}>
                  <IconCheckCircle />
                </div>
                <h2 className={styles.successTitle}>{t("auth_password_changed", { defaultValue: "Пароль изменён!" })}</h2>
                <p className={styles.successSub}>{t("auth_logging_in")}</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
