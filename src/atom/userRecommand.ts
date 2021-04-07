import { atom } from 'recoil';
import { IUserRecommand } from 'types/userRecommand.types';

export const userRecommandListState = atom<IUserRecommand[]>({
  key: 'userRecommandListState',
  default: [] as IUserRecommand[],
});