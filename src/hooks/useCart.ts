import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore';
import {
    selectCartItems,
    selectServerCartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    addToServerCart,
    updateServerCartItem,
    removeFromServerCart,
    clearCart,
    clearServerCartAsync,
} from '@/lib/features/cart/cartSlice';

export function useCart() {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const localItems = useAppSelector(selectCartItems);
    const serverItems = useAppSelector(selectServerCartItems);

    const getItemQuantity = (productId: string) => {
        if (isAuthenticated) {
            return serverItems.find((i) => i.id === productId)?.quantity || 0;
        }
        return localItems.find((i) => i.id === productId)?.quantity || 0;
    };

    const isInCart = (productId: string) => getItemQuantity(productId) > 0;

    const addItem = (item: { id: string; title: string; price: number; image: string }) => {
        if (isAuthenticated) {
            const currentQty = getItemQuantity(item.id);
            if (currentQty > 0) {
                dispatch(updateServerCartItem({ id: item.id, quantity: currentQty + 1 }));
            } else {
                dispatch(addToServerCart({ id: item.id, quantity: 1 }));
            }
        } else {
            dispatch(addToCart({ ...item, quantity: 1 }));
        }
    };

    const decreaseItem = (productId: string) => {
        if (isAuthenticated) {
            const currentQty = getItemQuantity(productId);
            if (currentQty > 1) {
                dispatch(updateServerCartItem({ id: productId, quantity: currentQty - 1 }));
            } else if (currentQty === 1) {
                dispatch(removeFromServerCart(productId));
            }
        } else {
            dispatch(decreaseQuantity(productId));
        }
    };

    const removeItem = (productId: string) => {
        if (isAuthenticated) {
            dispatch(removeFromServerCart(productId));
        } else {
            dispatch(removeFromCart(productId));
        }
    };

    const clearAll = () => {
        if (isAuthenticated) {
            dispatch(clearServerCartAsync());
        } else {
            dispatch(clearCart());
        }
    };

    return { getItemQuantity, isInCart, addItem, decreaseItem, removeItem, clearAll };
}
