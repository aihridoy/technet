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
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
