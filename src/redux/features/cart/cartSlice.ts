/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IProduct } from '@/types/globalTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
}

const initialState: ICart = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );
      existing
        ? (existing.quantity! += 1)
        : state.products.push({ ...action.payload, quantity: 1 });
    },
    removeOne: (state, action) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );
      existing && existing.quantity! > 1
        ? (existing.quantity! -= 1)
        : (state.products = state.products.filter(
            (product) => product._id !== action.payload._id
          ));
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;
export default cartSlice.reducer;
