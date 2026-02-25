import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
    id: string;
    title: string;
    price: number;
    image: string;
}

interface WishlistState {
    items: WishlistItem[];
}

const initialState: WishlistState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist(state, action: PayloadAction<WishlistItem>) {
            const exists = state.items.find((i) => i.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter((i) => i.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromWishlist(state, action: PayloadAction<string>) {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },
    },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state: { wishlist: WishlistState }) => state.wishlist.items;
export const selectWishlistCount = (state: { wishlist: WishlistState }) => state.wishlist.items.length;
export const selectIsInWishlist = (id: string) => (state: { wishlist: WishlistState }) =>
    state.wishlist.items.some((i) => i.id === id);

export default wishlistSlice.reducer;
