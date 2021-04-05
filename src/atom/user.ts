import { atom } from 'recoil';
import { IUserModify } from 'lib/api/user/user.dto';
import { EMajor } from 'lib/enum/majors';
import { IPost } from 'types/post.types';
import { IUser } from 'types/user.types';

export const myInfoState = atom<IUser | null>({
  key: 'myInfoState',
  default: null,
});

export const modifyModalState = atom<boolean>({
  key: 'modifyModalState',
  default: false,
});

export const modifyInfoState = atom<IUserModify>({
  key: 'modifyInfoState',
  default: {
    name: '',
    avatar: '',
    description: '',
    email: '',
    position: '',
    location: '',
    blog: '',
    major: EMajor.SOFTWARE,
    generation: 0,
  },
});

export const userInfoState = atom<IUser | null>({
  key: 'userInfoState',
  default: null,
});

export const userListState = atom<(IUser | IUser[])[]>({
  key: 'userListState',
  default: [] as (IUser | IUser[])[],
});

export const userLoading = atom<boolean>({
  key: 'userLoading',
  default: true,
});

export const userPostState = atom<IPost[]>({
  key: 'userPostState',
  default: [] as IPost[],
});