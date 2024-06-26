'use client';

import { toast } from 'react-toastify';
import Axios from './axiosConfig';
import axios from 'axios';

interface SignupRequest {
  email: string;
  password: string;
  contactNumber: string;
  name: string;
}

export const signup = async (data: SignupRequest) => {
  const { email, name, password, contactNumber } = data;

  try {
    const { status } = await Axios.post('/user/signup', {
      name,
      contactNumber,
      email,
      password,
    });

    if (status >= 200 && status < 400) {
      toast.success('Đăng ký tài khoản thành công!');
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

interface SigninRequest {
  email: string;
  password: string;
}

export const signin = async (data: SigninRequest) => {
  const { email, password } = data;

  try {
    const { status, data } = await Axios.post('/user/login', {
      email,
      password,
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      toast.success('Đăng nhập thành công!');
      localStorage.setItem('userToken', data.token);
      return true;
    } else {
      toast.error('Tài khoản chưa được kích hoạt!');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

interface ForgotPasswordRequest {
  email: string;
}

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  const { email } = data;

  try {
    const { status, data } = await Axios.post('/user/forgotPassword', {
      email,
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      toast.success('Kiểm tra email của bạn!');
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export const changePassword = async (data: ChangePasswordRequest) => {
  const { oldPassword, newPassword } = data;

  try {
    const { status, data } = await Axios.post('/user/changePassword', {
      oldPassword,
      newPassword,
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      toast.success('Đổi mật khẩu thành công!');
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error('Mật khẩu cũ không chính xác!');
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

export const checkToken = async () => {
  console.log('check token api');

  try {
    const { status, data } = await Axios.get('/user/checkToken');

    console.log({ status, data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

export type activateUserAccountRequest = {
  id: number;
  userStatus: string;
};

export const activateUserAccount = async (
  data: activateUserAccountRequest,
) => {
  const { id, userStatus } = data;

  try {
    const { status, data } = await Axios.post('/user/update', {
      id,
      status: userStatus,
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      if (userStatus === 'true') toast.success(`Tài khoản đã được duyệt!`);
      else toast.success(`Tài khoản đã bỏ duyệt!`);

      getAllUsers();
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

// GET ALL USERS

export const getAllUsers = async () => {
  try {
    const { status, data } = await Axios.get('/user/get');

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      return data;
    } else toast.error('Không thể lấy dữ liệu người dùng!');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

// DELETE USER

export const deleteAUser = async (id: number) => {
  try {
    const { status, data } = await Axios.post(`/user/delete/${id}`);

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      getAllUsers();
      toast.success('Xóa người dùng thành công!');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};
