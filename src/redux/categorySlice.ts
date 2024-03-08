'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CategoryType } from '@/types/category';

export interface CategoriesState {
  categories: CategoryType[];
}

export const initialState: CategoriesState = {
  categories: JSON.parse(localStorage.getItem('categories') || '[]'),
};

const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories: (state, action: PayloadAction<CategoryType[]>) => {
      state.categories = action.payload;
      localStorage.setItem('categories', JSON.stringify(state.categories));
    },
  },
});

export const { getCategories } = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
