import { selectorFamily } from 'recoil';
import { getRecommandsByUserIdx } from 'lib/api/userRecommand/userRecommand.api';
import { IUserRecommandResponse } from 'types/userRecommand.types';

export const userRecommandListSelector = selectorFamily<IUserRecommandResponse, number>({
  key: 'userRecommandListSelector',
  get: (userIdx: number) => async () => {
    const data = await getRecommandsByUserIdx(userIdx);
    return data;
  },
});