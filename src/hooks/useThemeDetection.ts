import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { initializeTheme, setTheme } from '../lib/features/theme/themeSlice';

export const useThemeDetection = () => {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector((state) => state.theme.isInitialized);

    useEffect(() => {
        if (isInitialized) return;

        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

        if (savedTheme) {
            dispatch(initializeTheme(savedTheme));
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            dispatch(initializeTheme(prefersDark ? 'dark' : 'light'));
        }
    }, [dispatch, isInitialized]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                dispatch(setTheme(e.matches ? 'dark' : 'light'));
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [dispatch]);
};
