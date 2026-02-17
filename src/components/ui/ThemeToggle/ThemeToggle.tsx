'use client';

import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { toggleTheme } from '../../../lib/features/theme/themeSlice';

const ToggleButton = styled.button<{ $isDark: boolean }>`
    background: ${({ $isDark }) => $isDark
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)'};
    border: 2px solid ${({ $isDark }) => $isDark ? '#4a5568' : '#cbd5e0'};
    width: 60px;
    height: 32px;
    border-radius: 20px;
    cursor: pointer;
    padding: 0;
    position: relative;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    overflow: visible;

    &:hover {
        transform: scale(1.05);
        box-shadow: ${({ $isDark }) => $isDark
        ? '0 4px 12px rgba(138, 180, 248, 0.3)'
        : '0 4px 12px rgba(255, 193, 7, 0.4)'};
    }
    
    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.primary};
        outline-offset: 2px;
    }
`;

const Knob = styled.div<{ $isDark: boolean }>`
    width: 26px;
    height: 26px;
    background: ${({ $isDark }) => $isDark ? '#fff' : '#fff'};
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 3px;
    transform: translateX(${({ $isDark }) => $isDark ? '28px' : '0'});
    transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    color: ${({ $isDark }) => $isDark ? '#1a202c' : '#f59e0b'};
`;

const ThemeToggle = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.theme.mode);
    const isDark = mode === 'dark';

    return (
        <ToggleButton
            $isDark={isDark}
            onClick={() => dispatch(toggleTheme())}
            aria-label={isDark ? "Переключить на светлую тему" : "Переключить на темную тему"}
        >
            <Knob $isDark={isDark}>
                {isDark ? (
                    <Moon size={16} strokeWidth={2.5} />
                ) : (
                    <Sun size={16} strokeWidth={2.5} />
                )}
            </Knob>
        </ToggleButton>
    );
};

export default ThemeToggle;
