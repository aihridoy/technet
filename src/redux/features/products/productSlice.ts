import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProductFilters {
  status: boolean;
  priceRange: number;
  category: string;
  minRating: number;
}

const initialState: IProductFilters = {
  status: false,
  priceRange: 2500,
  category: 'All',
  minRating: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleStatus: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setMinRating: (state, action: PayloadAction<number>) => {
      state.minRating = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { toggleStatus, setPriceRange, setCategory, setMinRating, resetFilters } =
  productSlice.actions;
export default productSlice.reducer;
