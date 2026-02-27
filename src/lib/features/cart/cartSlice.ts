import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchCartRequest,
    addToCartRequest,
    removeFromCartRequest,
    clearCartRequest,
    AddToCartPayload,
    CartApiProduct,
    CartApiData
} from '@/services/cartService';

// ── Client-side cart item (local add/remove) ─────────────────────────────────
export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

// ── State ────────────────────────────────────────────────────────────────────
interface CartState {
    // Local items (added via UI — product detail, catalog, etc.)
    items: CartItem[];
    // Server items fetched after login
    serverItems: CartApiProduct[];
    serverCount: number;
    serverTotalPrice: number;
    fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    fetchError: string | null;
}

const initialState: CartState = {
    items: [],
    serverItems: [],
    serverCount: 0,
    serverTotalPrice: 0,
    fetchStatus: 'idle',
    fetchError: null,
};

// ── Async thunk ───────────────────────────────────────────────────────────────
export const fetchCart = createAsyncThunk<CartApiData, void, { rejectValue: string }>(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchCartRequest();
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Ошибка загрузки корзины';
            return rejectWithValue(message);
        }
    },
);

export const addToServerCart = createAsyncThunk<CartApiData, AddToCartPayload, { rejectValue: string }>(
    'cart/addToServerCart',
    async (payload, { rejectWithValue }) => {
        try {
            return await addToCartRequest(payload);
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Ошибка добавления в корзину');
        }
    }
);

export const updateServerCartItem = createAsyncThunk<CartApiData, { id: string; quantity: number }, { rejectValue: string }>(
    'cart/updateServerCartItem',
    async (payload, { rejectWithValue }) => {
        try {
            return await addToCartRequest(payload);
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Ошибка обновления корзины');
        }
    }
);

export const removeFromServerCart = createAsyncThunk<CartApiData, string, { rejectValue: string }>(
    'cart/removeFromServerCart',
    async (productId, { rejectWithValue }) => {
        try {
            return await removeFromCartRequest(productId);
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Ошибка удаления из корзины');
        }
    }
);

export const clearServerCartAsync = createAsyncThunk<CartApiData, void, { rejectValue: string }>(
    'cart/clearServerCartAsync',
    async (_, { rejectWithValue }) => {
        try {
            return await clearCartRequest();
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Ошибка очистки корзины');
        }
    }
);

// ── Slice ─────────────────────────────────────────────────────────────────────
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existing = state.items.find((item) => item.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        decreaseQuantity(state, action: PayloadAction<string>) {
            const existing = state.items.find((item) => item.id === action.payload);
            if (existing && existing.quantity > 1) {
                existing.quantity -= 1;
            } else {
                state.items = state.items.filter((item) => item.id !== action.payload);
            }
        },
        clearCart(state) {
            state.items = [];
        },
        clearServerCart(state) {
            state.serverItems = [];
            state.serverCount = 0;
            state.serverTotalPrice = 0;
            state.fetchStatus = 'idle';
            state.fetchError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.fetchStatus = 'loading';
                state.fetchError = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded';
                state.serverItems = action.payload.products;
                state.serverCount = action.payload.count;
                state.serverTotalPrice = action.payload.totalPrice;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.fetchError = action.payload ?? 'Неизвестная ошибка';
            })
            .addCase(clearServerCartAsync.fulfilled, (state, action) => {
                state.serverItems = action.payload.products;
                state.serverCount = action.payload.count;
                state.serverTotalPrice = action.payload.totalPrice;
            })
            // Fallback for clear if server doesn't support the full DELETE endpoint
            .addCase(clearServerCartAsync.rejected, (state) => {
                state.serverItems = [];
                state.serverCount = 0;
                state.serverTotalPrice = 0;
            })
            // Generic handler for mutations (add, update, remove item)
            .addMatcher(
                (action) =>
                    action.type.startsWith('cart/') &&
                    action.type.endsWith('/fulfilled') &&
                    action.type !== 'cart/fetchCart/fulfilled' &&
                    action.type !== 'cart/clearServerCartAsync/fulfilled',
                (state, action: PayloadAction<CartApiData>) => {
                    // Update state with the returned new cart data after mutations
                    if (action.payload && action.payload.products) {
                        state.serverItems = action.payload.products;
                        state.serverCount = action.payload.count;
                        state.serverTotalPrice = action.payload.totalPrice;
                    }
                }
            );
    },
});

export const {
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    clearServerCart,
} = cartSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectServerCartItems = (state: { cart: CartState }) => state.cart.serverItems;
export const selectCartFetchStatus = (state: { cart: CartState }) => state.cart.fetchStatus;
export const selectCartFetchError = (state: { cart: CartState }) => state.cart.fetchError;

export const selectCartCount = (state: { cart: CartState }) =>
    state.cart.fetchStatus === 'succeeded'
        ? state.cart.serverCount
        : state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state: { cart: CartState }) =>
    state.cart.fetchStatus === 'succeeded'
        ? state.cart.serverTotalPrice / 100 // API возвращает сумму в копейках
        : state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
