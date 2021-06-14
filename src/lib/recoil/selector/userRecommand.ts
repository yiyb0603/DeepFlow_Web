import { selectorFamily } from 'recoil';
import { getRecommandsByUserIdx } from 'lib/api/userRecommand/userRecommand.api';
import { IUserRecommand } from 'types/userRecommand.types';
import RecommandError from 'error/RecommandError';

export const userRecommandListSelector = selectorFamily<IUserRecommand[], number>({
  key: 'userRecommandListSelector',
  get: (userIdx: number) => async () => {
    try {
      const { data: { recommands } } = await getRecommandsByUserIdx(userIdx);
      return recommands;
    } catch (error) {
      new RecommandError(error).getRecommandsError();
      throw error;
    }
  },
});