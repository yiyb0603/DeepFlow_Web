import { EMajor } from 'lib/enum/majors';
import { atom } from 'recoil';
import { IRegisterRequest } from 'types/user.types';

export const requestRegisterState = atom<IRegisterRequest>({
  key: 'requestRegisterState',
  default: {
    avatar: '',
    description: '',
    githubId: '',
    location: '',
    email: '',
    name: '',
    blog: '',
    generation: 1,
    major: EMajor.SOFTWARE,
    position: '',
  },
});

export const registerLoading = atom<boolean>({
  key: 'registerLoading',
  default: false,
});