import axios, { AxiosInstance } from 'axios';
import { SERVER_URL } from 'config/config.json';
import { TIMEOUT_SECOND } from 'constants/util';
import refreshToken from 'lib/token/refreshToken';
import { getToken } from './token';

const customAxios: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: TIMEOUT_SECOND,
  headers: {
    access_token: getToken(),
    'Access-Control-Allow-Origin': '*',
  },
});

customAxios.interceptors.request.use(refreshToken);

export default customAxios;