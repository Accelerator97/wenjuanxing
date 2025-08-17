import axios from 'axios';
import { message } from 'antd';
import { getToken } from '../utils/user-token';

const base = `http://127.0.0.1:4523/m1/6958385-6675535-default`;

const instance = axios.create({
  timeout: 60 * 10000,
  baseURL: base,
});

export default instance;

// request 拦截：每次请求都带上 token
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`; // JWT 的固定格式
    return config;
  },
  error => Promise.reject(error)
);
// response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use(
  res => {
    const resData = (res.data || {}) as ResType;
    const { errno, data, msg } = resData;

    if (errno !== 0) {
      // 错误提示
      if (msg) {
        message.error(msg);
      }
      //   throw new Error(msg);
    }
    return data as any;
  },
  error => {
    console.warn('axios error', error);
    return Promise.reject(error);
  }
);

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
