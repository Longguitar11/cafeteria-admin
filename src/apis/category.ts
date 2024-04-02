'use client';

import { toast } from 'react-toastify';
import Axios from './axiosConfig';
import axios from 'axios';
import { storeCategories } from '@/containers/CategoriesManagement/CategoriesManagement.utils';

export const getAllCategories = async () => {
  try {
    const { status, data } = await Axios.get('/category/get');

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      storeCategories(data);
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

interface CategoryRequest {
  id?: number;
  name: string;
}

export const addACategory = async (data: CategoryRequest) => {
  const { name } = data;

  try {
    const { status, data } = await Axios.post('/category/add', {
      name,
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      toast.success('Tạo loại thành công!');
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

export const editACategory = async (data: CategoryRequest) => {
  const { id, name } = data;

  try {
    const { status, data } = await Axios.post('/category/update', {
      id,
      name,
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      toast.success('Sửa loại thành công!');
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

export const deleteACategory = async (id: number) => {
  try {
    const { status, data } = await Axios.post(`/category/delete/${id}`);

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      toast.success('Xóa loại thành công!');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};
