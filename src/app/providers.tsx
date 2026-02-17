'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../lib/store';
import StyledComponentsRegistry from '../lib/registry';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from '../lib/hooks';
import { lightTheme, darkTheme, GlobalStyles } from '../styles/theme';
import { useThemeDetection } from '../hooks/useThemeDetection';
import '../lib/i18n';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
    useThemeDetection();
    const mode = useAppSelector((state) => state.theme.mode);
    const theme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles theme={theme} />
            {children}
        </ThemeProvider>
    );
}

export default function Providers({ children }: { children: React.ReactNode }) {
    const [store] = useState(() => makeStore());

    return (
        <Provider store={store}>
            <StyledComponentsRegistry>
                <ThemeWrapper>{children}</ThemeWrapper>
            </StyledComponentsRegistry>
        </Provider>
    );
}
