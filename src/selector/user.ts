import { selectorFamily } from "recoil";
import { userInfoState } from "atom/user";
import { getUserInfo } from "lib/api/user/user.api";
import { IUserResponse } from "types/user.types";

export const getUserInfoState = selectorFamily({
  key: 'getMyInfoState',
  get: (idx: number | null) => async ({ get }) => {
    if (idx === null) {
      return null;
    }

    get(userInfoState);
    const response: IUserResponse = await getUserInfo(idx);
    const { user } = response.data;

    return user;
  },
  set: (data: any) => ({ set }) => {
    set(userInfoState, data);
  },
});