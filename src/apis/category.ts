'use client';

import { toast } from 'react-toastify';
import Axios from './axiosConfig';
import axios from 'axios';
import { getCategories } from '@/redux/categorySlice';
import { escapeText } from '@/utils/text';
import { CategoryType } from '@/types/category';

export const getAllCategories = async (dispatch: any) => {
  try {
    const { status, data } = await Axios.get('/category/get');

    console.log({ status, data });
    if (status >= 200 && status < 400) {
      dispatch(getCategories(data));
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

export const addACategory = async (data: CategoryRequest, dispatch: any) => {
  const { name } = data;

  

  try {
    const { status, data } = await Axios.post('/category/add', {
      name,
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      getAllCategories(dispatch);
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

export const editACategory = async (data: CategoryRequest, dispatch: any) => {
  const { id, name } = data;

  try {
    const { status, data } = await Axios.post('/category/update', {
      id,
      name,
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      getAllCategories(dispatch);
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
