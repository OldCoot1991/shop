'use client';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../lib/hooks';

const ToggleWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ToggleContainer = styled.div<{ $isDark: boolean }>`
    background: ${({ $isDark }) =>
        $isDark
            ? 'rgba(45, 55, 72, 0.6)'
            : 'rgba(255, 255, 255, 0.8)'};
    backdrop-filter: blur(10px);
    border: 2px solid ${({ $isDark }) => $isDark ? 'rgba(74, 85, 104, 0.8)' : 'rgba(203, 213, 224, 0.8)'};
    border-radius: 24px;
    padding: 4px;
    display: flex;
    gap: 4px;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: ${({ $isDark }) =>
        $isDark
            ? '0 4px 16px rgba(0, 0, 0, 0.3)'
            : '0 4px 16px rgba(0, 0, 0, 0.1)'};

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${({ $isDark }) =>
        $isDark
            ? '0 6px 20px rgba(59, 130, 246, 0.4)'
            : '0 6px 20px rgba(14, 165, 233, 0.3)'};
    }
`;

const LanguageButton = styled.button<{ $isActive: boolean; $isDark: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    border: none;
    background: ${({ $isActive, $isDark }) =>
        $isActive
            ? ($isDark
                ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                : 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)')
            : 'transparent'};
    color: ${({ $isActive, theme }) => $isActive ? '#fff' : theme.text};
    font-size: 0.875rem;
    font-weight: ${({ $isActive }) => $isActive ? '600' : '500'};
    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    position: relative;
    z-index: ${({ $isActive }) => $isActive ? 2 : 1};
    box-shadow: ${({ $isActive }) =>
        $isActive ? '0 2px 8px rgba(59, 130, 246, 0.3)' : 'none'};
    user-select: none;
    cursor: pointer;

    &:hover {
        opacity: ${({ $isActive }) => $isActive ? 1 : 0.7};
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.primary};
        outline-offset: 2px;
    }
`;

const Flag = styled.span`
    font-size: 1.1rem;
    line-height: 1;
    filter: ${({ theme }) => theme.body === '#121212' ? 'brightness(1.1)' : 'brightness(1)'};
`;

const LangCode = styled.span`
    font-weight: 600;
    letter-spacing: 0.5px;
`;

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
    const mode = useAppSelector((state) => state.theme.mode);
    const isDark = mode === 'dark';

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <ToggleWrapper>
            <ToggleContainer $isDark={isDark}>
                <LanguageButton
                    $isActive={currentLang === 'ru'}
                    $isDark={isDark}
                    onClick={() => changeLanguage('ru')}
                    aria-label="Переключить на русский"
                >
                    <Flag>🇷🇺</Flag>
                    <LangCode>RU</LangCode>
                </LanguageButton>
                <LanguageButton
                    $isActive={currentLang === 'en'}
                    $isDark={isDark}
                    onClick={() => changeLanguage('en')}
                    aria-label="Switch to English"
                >
                    <Flag>🇬🇧</Flag>
                    <LangCode>EN</LangCode>
                </LanguageButton>
            </ToggleContainer>
        </ToggleWrapper>
    );
};

export default LanguageSwitcher;
