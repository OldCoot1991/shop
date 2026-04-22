"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import styles from "./AuthModal.module.css";
import Image from "next/image";
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
  restorePasswordStep1,
  restorePasswordStep2,
  restorePasswordStep3,
} from "@/services/authService";

type Tab = "login" | "register" | "reset";
type RegStep = 1 | 2 | 3 | "done";
type ResetStep = 1 | 2 | 3 | "done";

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
  const { t } = useTranslation();
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

  // ── Reset-password state ────────────────────────────────────────────────────
  const [resetStep, setResetStep] = useState<ResetStep>(1);
  const [resetLogin, setResetLogin] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [showResetPass, setShowResetPass] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetCountdown, setResetCountdown] = useState(0);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = (seconds: number) => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setResetCountdown(seconds);
    countdownRef.current = setInterval(() => {
      setResetCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!);
          countdownRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

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
    // reset-password
    setResetStep(1);
    setResetLogin("");
    setResetToken("");
    setResetCode("");
    setResetPassword("");
    setShowResetPass(false);
    setResetError(null);
    setResetCountdown(0);
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setLoginError(null);
    setRegError(null);
    setResetError(null);
    if (t !== "reset") {
      setResetStep(1);
      setResetLogin("");
      setResetToken("");
      setResetCode("");
      setResetPassword("");
      setResetCountdown(0);
      if (countdownRef.current) clearInterval(countdownRef.current);
    }
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
      const msg = err instanceof Error ? err.message : t("auth_error_default");
      setLoginError(msg);
      dispatch(loginFailure(msg));
    } finally {
      setLoginLoading(false);
    }
  };

  // ── Reset-password steps ───────────────────────────────────────────────────
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

  const handleResetResend = async () => {
    if (resetCountdown > 0) return;
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

  const handleResetStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError(null);
    try {
      const { token, timeout } = await restorePasswordStep2({
        token: resetToken,
        code: resetCode,
      });
      setResetToken(token);
      if (countdownRef.current) clearInterval(countdownRef.current);
      setResetCountdown(timeout); // store but don't tick (not needed on step 3)
      setResetStep(3);
    } catch (err) {
      setResetError(err instanceof Error ? err.message : t("auth_error_invalid_code"));
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError(null);
    try {
      const userData = await restorePasswordStep3({
        token: resetToken,
        password: resetPassword,
      });
      dispatch(loginSuccess(userData));
      dispatch(syncCartOnLogin());
      setResetStep("done");
      setTimeout(() => {
        handleClose();
        onAuthSuccess?.();
      }, 1500);
    } catch (err) {
      setResetError(
        err instanceof Error ? err.message : t("auth_error_save_pass"),
      );
    } finally {
      setResetLoading(false);
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
      setRegError(err instanceof Error ? err.message : t("auth_error"));
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
      setRegError(err instanceof Error ? err.message : t("auth_error_invalid_code"));
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
        err instanceof Error ? err.message : t("auth_error_default"),
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
          aria-label={t("common_close", { defaultValue: "Закрыть" })}
        >
          <X size={20} />
        </button>

        {/* Brand */}
        <div className={styles.brand}>
          <Image src="/logo.svg" alt="ОЗОН-ПРО" width={140} height={46} className={styles.logoImg} priority />
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === "login" ? styles.tabActive : ""}`}
            onClick={() => switchTab("login")}
          >
            {t("auth_login")}
          </button>
          <button
            className={`${styles.tab} ${tab === "register" ? styles.tabActive : ""}`}
            onClick={() => switchTab("register")}
          >
            {t("auth_register")}
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
                {t("auth_email_or_phone")}
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
                {t("auth_password")}
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
                  aria-label={showPass ? t("auth_hide_pass") : t("auth_show_pass")}
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
                  <span className={styles.spinner} /> {t("auth_logging_in")}
                </>
              ) : (
                t("auth_login_btn")
              )}
            </button>
            <button
              type="button"
              className={styles.forgotBtn}
              onClick={() => switchTab("reset")}
            >
              {t("auth_forgot_pass")}
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
                <p className={styles.stepTitle}>{t("auth_enter_email")}</p>
                <p className={styles.stepSub}>{t("reg_email_sub", { defaultValue: "Мы отправим код подтверждения" })}</p>
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
                      <span className={styles.spinner} /> {t("auth_sending")}
                    </>
                  ) : (
                    t("auth_send_code")
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
                  <ArrowLeft size={13} /> {t("auth_back")}
                </button>
                <p className={styles.stepTitle}>{t("auth_enter_code")}</p>
                <p className={styles.stepSub}>{t("auth_code_sent", { email: regEmail })}</p>
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
                      <span className={styles.spinner} /> {t("auth_verifying")}
                    </>
                  ) : (
                    t("auth_verify")
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
                  <ArrowLeft size={13} /> {t("auth_back")}
                </button>
                <p className={styles.stepTitle}>{t("auth_create_pass")}</p>
                <p className={styles.stepSub}>
                  {t("auth_pass_hint")}
                </p>
                {regError && (
                  <div className={styles.errorBanner}>
                    <AlertCircle size={15} /> {regError}
                  </div>
                )}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="reg-pass">
                    {t("auth_password")}
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
                      aria-label={showRegPass ? t("auth_hide_pass") : t("auth_show_pass")}
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
                      <span className={styles.spinner} /> {t("auth_creating_acc")}
                    </>
                  ) : (
                    t("auth_register_btn")
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
                <p className={styles.successTitle}>{t("auth_success_reg")}</p>
                <p className={styles.successSub}>
                  {t("auth_proceeding")}
                </p>
              </div>
            )}
          </>
        )}
        {/* ── RESET PASSWORD ─────────────────────────────────────────── */}
        {tab === "reset" && (
          <>
            {/* Step dots */}
            {resetStep !== "done" && (
              <div className={styles.stepIndicator}>
                {([1, 2, 3] as const).map((s) => (
                  <div
                    key={s}
                    className={`${styles.stepDot} ${
                      resetStep === s ? styles.stepDotActive : ""
                    } ${
                      typeof resetStep === "number" && resetStep > s
                        ? styles.stepDotDone
                        : ""
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Step 1: Enter email / login */}
            {resetStep === 1 && (
              <form className={styles.form} onSubmit={handleResetStep1} noValidate>
                <button
                  type="button"
                  className={styles.backBtn}
                  onClick={() => switchTab("login")}
                >
                  <ArrowLeft size={13} /> {t("auth_back")}
                </button>
                <p className={styles.stepTitle}>
                  <KeyRound size={16} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
                  {t("auth_reset_pass")}
                </p>
                <p className={styles.stepSub}>
                  {t("auth_enter_email")}
                </p>
                {resetError && (
                  <div className={styles.errorBanner}>
                    <AlertCircle size={15} /> {resetError}
                  </div>
                )}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="rst-login">
                    {t("auth_email_or_phone")}
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                      <Mail size={15} />
                    </span>
                    <input
                      id="rst-login"
                      className={styles.input}
                      type="text"
                      placeholder="email@example.com"
                      value={resetLogin}
                      onChange={(e) => setResetLogin(e.target.value)}
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={resetLoading || !resetLogin}
                >
                  {resetLoading ? (
                    <><span className={styles.spinner} /> {t("auth_sending")}</>
                  ) : (
                    t("auth_send_code")
                  )}
                </button>
              </form>
            )}

            {/* Step 2: Enter code */}
            {resetStep === 2 && (
              <form className={styles.form} onSubmit={handleResetStep2} noValidate>
                <button
                  type="button"
                  className={styles.backBtn}
                  onClick={() => {
                    setResetStep(1);
                    setResetError(null);
                    setResetCode("");
                    if (countdownRef.current) clearInterval(countdownRef.current);
                    setResetCountdown(0);
                  }}
                >
                  <ArrowLeft size={13} /> {t("auth_back")}
                </button>
                <p className={styles.stepTitle}>{t("auth_enter_code")}</p>
                <p className={styles.stepSub}>{t("auth_code_sent", { email: resetLogin })}</p>
                {resetError && (
                  <div className={styles.errorBanner}>
                    <AlertCircle size={15} /> {resetError}
                  </div>
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
                <div className={styles.resendRow}>
                  {resetCountdown > 0 ? (
                    <span className={styles.resendTimer}>
                      {t("auth_resend_wait", { seconds: resetCountdown })}
                    </span>
                  ) : (
                    <button
                      type="button"
                      className={styles.resendBtn}
                      onClick={handleResetResend}
                      disabled={resetLoading}
                    >
                      {t("auth_resend_code")}
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={resetLoading || resetCode.length < 4}
                >
                  {resetLoading ? (
                    <><span className={styles.spinner} /> {t("auth_verifying")}</>
                  ) : (
                    t("auth_verify")
                  )}
                </button>
              </form>
            )}

            {/* Step 3: New password */}
            {resetStep === 3 && (
              <form className={styles.form} onSubmit={handleResetStep3} noValidate>
                <button
                  type="button"
                  className={styles.backBtn}
                  onClick={() => {
                    setResetStep(2);
                    setResetError(null);
                  }}
                >
                  <ArrowLeft size={13} /> {t("auth_back")}
                </button>
                <p className={styles.stepTitle}>{t("auth_new_password")}</p>
                <p className={styles.stepSub}>
                  {t("auth_pass_hint")}
                </p>
                {resetError && (
                  <div className={styles.errorBanner}>
                    <AlertCircle size={15} /> {resetError}
                  </div>
                )}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="rst-pass">
                    {t("auth_new_password")}
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                      <Lock size={15} />
                    </span>
                    <input
                      id="rst-pass"
                      className={styles.input}
                      type={showResetPass ? "text" : "password"}
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
                      aria-label={showResetPass ? "Скрыть" : "Показать"}
                    >
                      {showResetPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={resetLoading || resetPassword.length < 8}
                >
                  {resetLoading ? (
                    <><span className={styles.spinner} /> Сохраняем...</>
                  ) : (
                    "Сохранить пароль"
                  )}
                </button>
              </form>
            )}

            {/* Done */}
            {resetStep === "done" && (
              <div className={styles.successBlock}>
                <div className={styles.successIcon}>
                  <CheckCircle size={30} />
                </div>
                <p className={styles.successTitle}>Пароль изменён!</p>
                <p className={styles.successSub}>
                  Выполняем вход в аккаунт…
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
