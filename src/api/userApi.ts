import ForgotPassword from '../components/auth/ForgotPassword';
import axiosClient from './axiosClient';

interface typeUserApi {
  login: any;
  getMe: any;
  register: any;
  loginWithGoogle: any;
  updateProfile: any;
  forgotPassword: any;
  resetPassword: any;
}
const usersApi: typeUserApi = {
  login: (params: any) => {
    const url = '/users/sign-in';
    return axiosClient.post(url, params);
  },
  getMe: () => {
    const url = '/users/me';
    return axiosClient.get(url);
  },
  register: (params: any) => {
    const url = '/users/sign-up';
    return axiosClient.post(url, params);
  },
  loginWithGoogle: () => {
    const url = '/users/auth/google';
    return axiosClient.get(url);
  },
  updateProfile: (params: any) => {
    const url = '/users/update-profile';
    return axiosClient.put(url, params);
  },
  forgotPassword: (params: any) => {
    const url = '/users/forgot-password';
    return axiosClient.get(url, params);
  },
  resetPassword: (params: any) => {
    const url = `/users/reset-password/${params.token}`;
    return axiosClient.post(url, { password: params.password });
  }
};

export default usersApi;
