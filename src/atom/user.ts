import { atom } from 'recoil';
import { IUserModify } from 'lib/api/user/user.dto';
import { EMajor } from 'lib/enum/majors';
import { IQuestion } from 'types/post.types';
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

export const userListState = atom<IUser[][]>({
  key: 'userListState',
  default: [] as IUser[][],
});

export const popularUserListState = atom<IUser[]>({
  key: 'popularUserListState',
  default: [] as IUser[],
});

export const userSearchKeywordState = atom<string>({
  key: 'userSearchKeywordState',
  default: '',
});

export const userLoading = atom<boolean>({
  key: 'userLoading',
  default: true,
});

export const userPostState = atom<IQuestion[]>({
  key: 'userPostState',
  default: [] as IQuestion[],
});