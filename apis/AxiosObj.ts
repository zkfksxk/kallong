import axios, { type AxiosInstance } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// API 응답 데이터 타입 (모든 API 응답의 기본 구조)
export interface ApiResponse<T = unknown> {
  data: T | null; //api 응답 시 null
  message: string;
  result: boolean; //성공 여부
  resultCode: number; //서버의 status code
}

const createAxiosInstance = (): AxiosInstance => {
  const axiosObj = axios.create({
    baseURL: baseURL,
    timeout: 100000, //90초
  });

  axiosObj.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosObj.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosObj;
};

export const axiosObj = createAxiosInstance();
