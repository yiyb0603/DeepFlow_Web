import axios from 'axios';
import { SERVER_URL } from 'config/config.json';
import { getToken } from 'lib/Token';
import { ITokenResponse } from 'types/token.types';

export const getRefreshToken = async (accessToken: string): Promise<ITokenResponse> => {
  const { data } = await axios.post(`${SERVER_URL}/token`, { accessToken }, {
    headers: {
      access_token: getToken(),
    },
  });

  return data;
}