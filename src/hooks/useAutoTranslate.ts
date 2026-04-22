"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const CACHE_KEY = "ozpro_translations_ru_en";

// Simple local cache to avoid redundant API calls
const getCache = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const setCache = (key: string, value: string) => {
  if (typeof window === "undefined") return;
  try {
    const cache = getCache();
    cache[key] = value;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Silent catch
  }
};

/**
 * Hook to automatically translate text from Russian to the current UI language (primarily English).
 * Uses Google Translate public endpoint (GTX client).
 */
export function useAutoTranslate(text: string | null | undefined) {
  const { i18n } = useTranslation();
  const [translated, setTranslated] = useState<string>(text || "");
  const [isLoading, setIsLoading] = useState(false);

  const targetLang = i18n.language;
  const isRussian = targetLang === "ru";

  useEffect(() => {
    if (!text) {
      setTranslated("");
      return;
    }

    // If target language is Russian, just use the original text
    if (isRussian) {
      setTranslated(text);
      return;
    }

    // Check cache first
    const cache = getCache();
    const cacheKey = `${text}_${targetLang}`;
    if (cache[cacheKey]) {
      setTranslated(cache[cacheKey]);
      return;
    }

    // Fetch from Google Translate API
    const translateText = async () => {
      setIsLoading(true);
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Translation failed");
        
        const data = await response.json();
        // Google Translate returns format: [[[translatedText, originalText, ...]]]
        // We join parts if it split the translation
        const result = data[0].map((item: [string, string, string]) => item[0]).join("");
        
        setCache(cacheKey, result);
        setTranslated(result);
      } catch (error) {
        console.error("Translation error:", error);
        // Fallback to original text on error
        setTranslated(text);
      } finally {
        setIsLoading(false);
      }
    };

    translateText();
  }, [text, targetLang, isRussian]);

  return { translated, isLoading, original: text };
}
