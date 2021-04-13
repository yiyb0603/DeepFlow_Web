import axios, { AxiosInstance } from 'axios';
import { SERVER_URL } from 'config/config.json';
import { refreshToken } from 'util/refreshToken';
import { getToken } from './Token';

export const customAxios: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    access_token: getToken(),
    'Access-Control-Allow-Origin': '*',
  },
});

customAxios.interceptors.request.use(refreshToken);