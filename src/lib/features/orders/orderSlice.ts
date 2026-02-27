import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getOrdersRequest,
    getOrderByIdRequest,
    createOrderRegistrationRequest,
    payOrderRequest,
    cancelOrderRequest,
    deleteOrderRequest,
    OrderItem,
    RegistrationPayload,
} from '@/services/orderService';
import { RootState } from '@/lib/store';

export interface OrderState {
    orders: OrderItem[];
    currentOrder: OrderItem | null;
    pageCount: number;
    currentPage: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    currentOrder: null,
    pageCount: 0,
    currentPage: 1,
    status: 'idle',
    error: null,
};

// --- Thunks ---

export const fetchOrdersAsync = createAsyncThunk<
    { orders: OrderItem[]; pageCount: number; page: number },
    number | undefined,
    { rejectValue: string }
>('orders/fetchOrders', async (page = 1, { rejectWithValue }) => {
    try {
        const data = await getOrdersRequest(page);
        return { orders: data.orders, pageCount: data.pagination.pageCount, page };
    } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'Ошибка загрузки заказов');
    }
});

export const fetchOrderByIdAsync = createAsyncThunk<OrderItem, string, { rejectValue: string }>(
    'orders/fetchOrderById',
    async (id, { rejectWithValue }) => {
        try {
            return await getOrderByIdRequest(id);
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Ошибка загрузки заказа');
        }
    }
);

// Registration thunk (checkout)
export const createOrderAsync = createAsyncThunk<string, RegistrationPayload[], { rejectValue: string }>(
    'orders/createOrder',
    async (products, { rejectWithValue }) => {
        try {
            const billingUrl = await createOrderRegistrationRequest(products);
            return billingUrl;
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Ошибка оформления заказа');
        }
    }
);

export const payOrderAsync = createAsyncThunk<string, number, { rejectValue: string }>(
    'orders/payOrder',
    async (id, { rejectWithValue }) => {
        try {
            return await payOrderRequest(id);
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Ошибка оплаты заказа');
        }
    }
);


export const cancelOrderAsync = createAsyncThunk<OrderItem, number, { rejectValue: string }>(
    'orders/cancelOrder',
    async (id, { rejectWithValue }) => {
        try {
            return await cancelOrderRequest(id);
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Ошибка отмены заказа');
        }
    }
);

export const deleteOrderAsync = createAsyncThunk<string, string, { rejectValue: string }>(
    'orders/deleteOrder',
    async (id, { rejectWithValue }) => {
        try {
            await deleteOrderRequest(id);
            return id;
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Ошибка удаления заказа');
        }
    }
);

// --- Slice ---

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch List
            .addCase(fetchOrdersAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload.orders;
                state.pageCount = action.payload.pageCount;
                state.currentPage = action.payload.page;
            })
            .addCase(fetchOrdersAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ?? 'Error fetching orders';
                state.orders = []; // safety clear
            })

            // Fetch Single
            .addCase(fetchOrderByIdAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderByIdAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ?? 'Error fetching order details';
            })

            // Cancel
            .addCase(cancelOrderAsync.fulfilled, (state, action) => {
                state.currentOrder = action.payload; // Sync the returned updated order
                // Optionally update in the list as well if it's there
                const idx = state.orders.findIndex(o => o.id === action.payload.id);
                if (idx !== -1) {
                    state.orders[idx] = action.payload;
                }
            })

            // Delete
            .addCase(deleteOrderAsync.fulfilled, (state, action) => {
                const deletedId = Number(action.payload);
                state.orders = state.orders.filter(o => o.id !== deletedId);
                // Also clean up current if it was the one deleted
                if (state.currentOrder?.id === deletedId) {
                    state.currentOrder = null;
                }
            });
    }
});

export const { clearCurrentOrder } = orderSlice.actions;

// Selectors
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectCurrentOrder = (state: RootState) => state.orders.currentOrder;
export const selectOrderPagination = (state: RootState) => ({
    currentPage: state.orders.currentPage,
    pageCount: state.orders.pageCount
});
export const selectOrderStatus = (state: RootState) => state.orders.status;
export const selectOrderError = (state: RootState) => state.orders.error;

export default orderSlice.reducer;
