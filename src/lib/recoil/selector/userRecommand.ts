import { selectorFamily } from 'recoil';
import { getRecommandsByUserIdx } from 'lib/api/userRecommand/userRecommand.api';
import { IUserRecommand } from 'types/userRecommand.types';

export const userRecommandListSelector = selectorFamily<IUserRecommand[], number>({
  key: 'userRecommandListSelector',
  get: (userIdx: number) => async () => {
    const { data: { recommands } } = await getRecommandsByUserIdx(userIdx);
    return recommands;
  },
});