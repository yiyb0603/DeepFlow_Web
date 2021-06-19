import * as jwt from 'jsonwebtoken';
import { TOKEN_KEY } from 'config/config.json';
import { IToken } from 'types/user.types';
import Cookie from '../Cookie';

class Token {
  public static decodeToken(): IToken {
    const token = Cookie.getCookie(TOKEN_KEY);
    return jwt.decode(token) as IToken;
  }
  
  public static getToken(): string {
    return Cookie.getCookie(TOKEN_KEY) as string;
  }
}

export default Token;