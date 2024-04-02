'use client';

import { toast } from 'react-toastify';
import Axios from './axiosConfig';
import axios from 'axios';
import { DishType } from '@/types/dish';

export const getAllDishes = async () => {
  try {
    const { status, data } = await Axios.get('/product/get');

    console.log({ status, data });
    if (status >= 200 && status < 400) {
      return data;
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

export const addADishV2 = async (data: DishType) => {
  const { categoryId: category, name, description, price, imageProduct } = data;

  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category.toString());
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('status', 'true');
    formData.append('imageProduct', imageProduct!);

    const { status, data } = await Axios.post('/product/addProduct', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      toast.success('Tạo món mới thành công!');
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

export const editADish = async (data: DishType) => {
  const { id, categoryId, name, description, price, imageProduct } = data;

  try {
    const formData = new FormData();
    formData.append('id', id!.toString());
    formData.append('name', name);
    formData.append('categoryId', categoryId.toString());
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('imageProduct', imageProduct!);

    const { status, data } = await Axios.post('/product/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
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

export const deleteADish = async (id: number) => {
  try {
    const { status, data } = await Axios.post(`/product/delete/${id}`);

    console.log({ status, data });

    if (status >= 200 && status < 400) {
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
  id: number;
  dishStatus: string;
};

export const updateDishStatus = async (
  { id, dishStatus }: updateDishStatusRequest,
) => {
  try {
    const { status, data } = await Axios.post('/product/updateStatus', {
      id,
      status: dishStatus,
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      toast.success('Đổi trạng thái món thành công!');
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
