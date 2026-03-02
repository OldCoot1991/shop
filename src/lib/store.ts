import { configureStore, combineReducers, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import themeReducer from './features/theme/themeSlice';
import cartReducer, { clearServerCart } from './features/cart/cartSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';
import authReducer, { logout } from './features/auth/authSlice';
import productsReducer from './features/products/productsSlice';
import ordersReducer from './features/orders/orderSlice';

const persistConfig = {
    key: 'shophub',
    storage,
    whitelist: ['cart', 'wishlist', 'auth'], // Persist cart, wishlist, and auth
};

const rootReducer = combineReducers({
    theme: themeReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    products: productsReducer,
    orders: ordersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const authMiddleware: Middleware =
    ({ dispatch }) =>
        (next) =>
            (action: unknown) => {
                if (isRejectedWithValue(action)) {
                    const payload = action.payload;
                    if (typeof payload === 'string' && (payload.includes('401') || payload.includes('403'))) {
                        dispatch(logout());
                        dispatch(clearServerCart());
                    }
                }
                return next(action);
            };

export const makeStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    // redux-persist dispatches non-serializable actions internally — ignore them
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(authMiddleware),
    });
    return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
