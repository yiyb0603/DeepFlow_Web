import { AxiosRequestConfig } from 'axios';
import { customAxios } from 'lib/CustomAxios';
import { decodeToken, getToken } from 'lib/Token';
import { IToken } from 'types/user.types';

export const refreshToken = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  let accessToken: string = getToken();

  if (accessToken) {
    const decode: IToken = decodeToken();
    const nowDate: number = Date.now() / 1000;
    
    if (decode.exp < nowDate) {
      const { data } = await customAxios.post('/token', { accessToken });
      const { refreshToken } = data.data;
      accessToken = refreshToken;
    }
    
    config.headers['access_token'] = accessToken;
  }
  
  return config;
}