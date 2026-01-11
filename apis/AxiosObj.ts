import axios, { type AxiosInstance } from 'axios';

// export interface CustomError {
//   code?: number;
//   name: string;
//   message: string;
// }

// export const createCustomError = (error: unknown): CustomError => {
//   if (axios.isAxiosError(error)) {
//     return {
//       code: error.response?.status,
//       name: error.name,
//       message: error.message,
//     };
//   }

//   if (error instanceof Error) {
//     return {
//       name: error.name,
//       message: error.message,
//     };
//   }

//   return {
//     name: 'UnknownError',
//     message: '알 수 없는 에러가 발생했습니다.',
//   };
// };

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const createAxiosInstance = (): AxiosInstance => {
  const axiosObj = axios.create({
    baseURL: baseURL,
    timeout: 100000, //90초
    maxRedirects: 3,
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
