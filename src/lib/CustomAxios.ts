import axios, { AxiosInstance } from "axios";
import { getCookie } from "./Cookie";
import { SERVER_URL } from 'config/config.json';

export const customAxios: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: getCookie('access_token'),
});