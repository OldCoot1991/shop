import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
    mode: 'light' | 'dark';
    isInitialized: boolean;
}

const initialState: ThemeState = {
    mode: 'light',
    isInitialized: false,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', state.mode);
            }
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.mode = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', state.mode);
            }
        },
        initializeTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.mode = action.payload;
            state.isInitialized = true;
        }
    },
});

export const { toggleTheme, setTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;
