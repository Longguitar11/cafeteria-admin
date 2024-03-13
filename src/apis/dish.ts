'use client';

import { toast } from 'react-toastify';
import Axios from './axiosConfig';
import axios from 'axios';
import { getDishes } from '@/redux/dishSlice';
import { DishType } from '@/types/dish';

export const getAllDishes = async (dispatch: any) => {
  try {
    const { status, data } = await Axios.get('/product/get');

    console.log({ status, data });
    if (status >= 200 && status < 400) {
      console.log('store dish to dishSlice')
      dispatch(getDishes(data));
    } else {
      toast.error('Chỉ admin mới có thể thực hiện thao tác này!');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

export const addADish = async (data: DishType, dispatch: any) => {
  const { categoryId, name, description, price } = data;

  try {
    const { status, data } = await Axios.post('/product/add', {
      categoryId,
      name,
      description,
      price,
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      getAllDishes(dispatch);
      toast.success('Tạo sản phẩm thành công!');
    } else {
      toast.error('Chỉ admin mới có thể thực hiện thao tác này!');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

export const editADish = async (data: DishType, dispatch: any) => {
  const { id, categoryId, name, description, price } = data;

  try {
    const { status, data } = await Axios.post('/product/update', {
      id,
      categoryId,
      name,
      description,
      price,
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      getAllDishes(dispatch);
      toast.success('Sửa món thành công!');
    } else {
      toast.error('Chỉ admin mới có thể thực hiện thao tác này!');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

export const deleteADish = async (id: number, dispatch: any) => {

  try {
    const { status, data } = await Axios.post(`/product/delete/${id}`);

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      getAllDishes(dispatch);
      toast.success('Xóa món thành công!');
    } else {
      toast.error('Chỉ admin mới có thể thực hiện thao tác này!');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

export type updateDishStatusRequest = {
  id: number
  dishStatus: string
}

export const updateDishStatus = async ({ id, dishStatus  }: updateDishStatusRequest,dispatch: any) => {
  try {
    const { status, data } = await Axios.post('/product/updateStatus', {id, status: dishStatus});

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      getAllDishes(dispatch);
      toast.success('Đổi trạng thái thành công!');
    } else {
      toast.error('Chỉ admin mới có thể thực hiện thao tác này!');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
}

