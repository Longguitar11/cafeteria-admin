import axios from 'axios';
import Axios from './axiosConfig';
import { toast } from 'react-toastify';

export const getBills = async () => {
  try {
    const { status, data } = await Axios.get(`/bill/getBills`);

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      return data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

export const deleteABill = async (id: number) => {
  try {
    const { status, data } = await Axios.post(`/bill/delete/${id}`);

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      getBills();
      toast.success('Xóa đơn hàng thành công!');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};
