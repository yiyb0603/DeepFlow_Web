import { AxiosRequestConfig } from 'axios';
import { getRefreshToken } from 'lib/api/token/token.api';
import Cookie from 'lib/Cookie';
import { decodeToken, getToken } from 'lib/token';
import { ITokenResponse } from 'types/token.types';
import { IToken } from 'types/user.types';

const refreshToken = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  let accessToken: string = getToken();

  if (accessToken) {
    const decode: IToken = decodeToken();
    const nowDate: number = Date.now() / 1000;

    if (decode.exp < nowDate) {
      const response: ITokenResponse = await getRefreshToken(accessToken);

      const { refreshToken } = response.data;
      Cookie.setCookie('access_token', refreshToken);
      accessToken = refreshToken;
    }
    
    config.headers['access_token'] = accessToken;
  }
  
  return config;
}

export default refreshToken;