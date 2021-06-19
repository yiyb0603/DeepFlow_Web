import { AxiosRequestConfig } from 'axios';
import { TOKEN_KEY } from 'config/config.json';
import { getRefreshToken } from 'lib/api/token/token.api';
import Cookie from 'lib/Cookie';
import Token from 'lib/token';
import isEmpty from 'util/isEmpty';
import { ITokenResponse } from 'types/token.types';
import { IToken } from 'types/user.types';

const refreshToken = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  let accessToken: string = Token.getToken();

  if (!isEmpty(accessToken)) {
    const decode: IToken = Token.decodeToken();
    const nowDate: number = Date.now() / 1000;

    if (decode.exp < nowDate) {
      const response: ITokenResponse = await getRefreshToken(accessToken);

      const { refreshToken } = response.data;
      Cookie.setCookie(TOKEN_KEY, refreshToken);
      accessToken = refreshToken;
    }
    
    config.headers[TOKEN_KEY] = accessToken;
  }
  
  return config;
}

export default refreshToken;