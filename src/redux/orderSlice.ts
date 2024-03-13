'use client';

import { OrderInterface } from '@/types/order';
import { addString, calAmount } from '@/utils/dish';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface OrderState {
  allOrders: OrderInterface[];
}

const initialState: OrderState = {
  allOrders: JSON.parse(localStorage.getItem('allOrders') || '[]'),
};

const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getAllOrders: (state, action: PayloadAction<OrderInterface[]>) => {
      state.allOrders = action.payload;
    },
  },
});

export const { getAllOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
