import { noticeListState } from "atom/notice";
import { getNoticeList } from "lib/api/notice/notice.api";
import { selectorFamily } from "recoil";
import { INoticeResponse } from "types/notice.types";

export const getNoticeListState = selectorFamily({
  key: 'getNoticeListState',
  get: (page: number) => async ({ get }) => {
    get(noticeListState);
    const response: INoticeResponse = await getNoticeList(page);
    const { notices } = response.data;

    return notices;
  }
});