'use client';

import { DishType } from '@/types/dish';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface DishesState {
  dishes: DishType[];
}

export const initialState: DishesState = {
  dishes: typeof window !== undefined && JSON.parse(localStorage.getItem('dishes') || '[]'),
};

const DishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    getDishes: (state, action: PayloadAction<DishType[]>) => {
      state.dishes = action.payload;
      localStorage.setItem('dishes', JSON.stringify(state.dishes));
    },
  },
});

export const { getDishes } = DishesSlice.actions;
export default DishesSlice.reducer;
