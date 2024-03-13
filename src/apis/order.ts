import axios from 'axios';
import Axios from './axiosConfig';
import { toast } from 'react-toastify';
import { getAllOrders } from '@/redux/orderSlice';

export const getBills = async (dispatch: any) => {
  try {
    const { status, data } = await Axios.get(`/bill/getBills`);

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      dispatch(getAllOrders(data));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

export const deleteABill = async (id: number, dispatch: any) => {
  try {
    const { status, data } = await Axios.post(`/bill/delete/${id}`);

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      getBills(dispatch);
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
