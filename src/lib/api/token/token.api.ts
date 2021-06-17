import axios from 'axios';
import { SERVER_URL, TOKEN_KEY } from 'config/config.json';
import { getToken } from 'lib/token';
import { ITokenResponse } from 'types/token.types';

export const getRefreshToken = async (accessToken: string): Promise<ITokenResponse> => {
  const { data } = await axios.post(`${SERVER_URL}/token`, { accessToken }, {
    headers: {
      [TOKEN_KEY]: getToken(),
    },
  });

  return data;
}