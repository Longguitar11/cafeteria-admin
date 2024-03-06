'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CategoryType } from '@/types/category';
import { escapeText } from '@/utils/text';
import { toast } from 'react-toastify';
import { UserType } from '@/types/user';

export interface UserState {
  users: UserType[];
}

export const initialState: UserState = {
  users:
    typeof window !== undefined &&
    JSON.parse(localStorage.getItem('allUsers') || '[]'),
};

const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAllUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = [...action.payload];

      localStorage.setItem('allUsers', JSON.stringify(state.users));
    },
  },
});

export const { getAllUsers } = UsersSlice.actions;
export default UsersSlice.reducer;
