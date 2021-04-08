import { CLIENT_ID, REDIRECT_URL } from 'config/config.json';

export const GITHUB_AUTH_URL: string = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;