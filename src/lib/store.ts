import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import themeReducer from './features/theme/themeSlice';
import cartReducer from './features/cart/cartSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';
import authReducer from './features/auth/authSlice';
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

export const makeStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    // redux-persist dispatches non-serializable actions internally — ignore them
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    });
    return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
