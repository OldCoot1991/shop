import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserRequest } from '@/services/authService';

interface AuthUser {
    id: number;
    email: string;
    phone: string | null;
    firstName: string | null;
    lastName: string | null;
}

interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const fetchUser = createAsyncThunk<AuthUser, void, { rejectValue: string }>(
    'auth/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            return await getUserRequest();
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Ошибка получения данных пользователя';
            return rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<AuthUser>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                // We don't set isAuthenticated to true here just in case, but it should already be true
            })
            // If fetchUser fails (e.g., 401), the authMiddleware in store.ts will catch it and dispatch logout()
            .addCase(fetchUser.rejected, (state, action) => {
                console.error('Failed to fetch user profile:', action.payload);
            });
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
