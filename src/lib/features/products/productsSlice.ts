import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsRequest, ApiProduct, ApiProductsData, FetchProductsParams } from '@/services/productService';

// ── Types ─────────────────────────────────────────────────────────────────────

export type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface CategoryProductsState {
    items: ApiProduct[];
    status: FetchStatus;
    error: string | null;
    pageCount: number;
}

interface ProductsState {
    byCategory: Record<string, CategoryProductsState>;
}

const initialCategoryState = (): CategoryProductsState => ({
    items: [],
    status: 'idle',
    error: null,
    pageCount: 0,
});

const initialState: ProductsState = {
    byCategory: {},
};

// ── Async thunk ───────────────────────────────────────────────────────────────

export const fetchProductsByCategory = createAsyncThunk<
    { key: string; data: ApiProductsData },
    { key: string } & FetchProductsParams,
    { rejectValue: string }
>('products/fetchByCategory', async ({ key, ...params }, { rejectWithValue }) => {
    try {
        const data = await fetchProductsRequest(params);
        return { key, data };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Ошибка загрузки товаров';
        return rejectWithValue(message);
    }
});

// ── Slice ─────────────────────────────────────────────────────────────────────

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByCategory.pending, (state, action) => {
                const key = action.meta.arg.key;
                if (!state.byCategory[key]) {
                    state.byCategory[key] = initialCategoryState();
                }
                state.byCategory[key].status = 'loading';
                state.byCategory[key].error = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                const { key, data } = action.payload;
                state.byCategory[key] = {
                    items: data.products,
                    status: 'succeeded',
                    error: null,
                    pageCount: data.pagination.pageCount,
                };
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                const key = action.meta.arg.key;
                if (!state.byCategory[key]) {
                    state.byCategory[key] = initialCategoryState();
                }
                state.byCategory[key].status = 'failed';
                state.byCategory[key].error = action.payload ?? 'Неизвестная ошибка';
            });
    },
});

export default productsSlice.reducer;

// ── Selectors ─────────────────────────────────────────────────────────────────

interface StateWithProducts {
    products: ProductsState;
}

export const selectCategoryProducts = (key: string) => (state: StateWithProducts) =>
    state.products.byCategory[key] ?? initialCategoryState();
