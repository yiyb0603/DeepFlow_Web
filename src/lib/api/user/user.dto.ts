import { EMajor } from 'lib/enum/majors';

export interface IUserModify {
  name: string;
  avatar: string;
  email: string;
  blog: string;
  position: string;
  description: string;
  location: string;
  major: EMajor;
  generation: number;
}

export interface SetFCMDto {
  fcmToken: string;
}