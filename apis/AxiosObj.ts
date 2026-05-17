import axios, { type AxiosInstance } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

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
