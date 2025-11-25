import { AuthError } from '@supabase/supabase-js';
import axios, { type AxiosInstance } from 'axios';
import { AUTH_ERROR_MESSAGE_MAP } from '@/shared/common/constants';

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

export const handleAuthErrorMessage = (error: unknown) => {
  console.log('handleAuthErrorMessage', error);

  if (error instanceof AuthError && error.code) {
    return (
      AUTH_ERROR_MESSAGE_MAP[error.code] ??
      '알 수 없는 인증 오류가 발생했습니다. 잠시 후 다시 시도해주세요'
    );
  }

  return '문제가 발생했습니다. 잠시 후 다시 시도해주세요';
};

export const handleError = (error: Error) => {
  console.error(error);
  throw new Error(error.message);
};

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
      //const { status } = response;
      // if (status >= 400 && status < 500) {
      //   throw createCustomError({
      //     name: 'ClientError',
      //     message: '클라이언트 요청 오류',
      //     code: status,
      //   });
      // } else if (status >= 500) {
      //   throw createCustomError({
      //     name: 'ServerError',
      //     message: '서버 내부 오류',
      //     code: status,
      //   });
      // }
      return response;
    },
    (error) => {
      //const customError = createCustomError(error);
      return Promise.reject(error);
    }
  );

  return axiosObj;
};

export const axiosObj = createAxiosInstance();
