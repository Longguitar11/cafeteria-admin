'use client';

import { OrderInterface } from '@/types/order';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OrderState {
  allOrders: OrderInterface[];
}

const initialState: OrderState = {
  allOrders:
    typeof window !== undefined &&
    JSON.parse(localStorage.getItem('allOrders') || '[]'),
};

const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getAllOrders: (state, action: PayloadAction<OrderInterface[]>) => {
      state.allOrders = action.payload;
      localStorage.setItem('allOrders', JSON.stringify(state.allOrders));
    },
  },
});

export const { getAllOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
