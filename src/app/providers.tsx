'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../lib/store';
import StyledComponentsRegistry from '../lib/registry';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from '../lib/hooks';
import { lightTheme, darkTheme, GlobalStyles } from '../styles/theme';
import '../lib/i18n'; // Initialize i18n

function ThemeWrapper({ children }: { children: React.ReactNode }) {
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
    const storeRef = useRef<AppStore>(undefined);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    return (
        <Provider store={storeRef.current}>
            <StyledComponentsRegistry>
                <ThemeWrapper>{children}</ThemeWrapper>
            </StyledComponentsRegistry>
        </Provider>
    );
}
