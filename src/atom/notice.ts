import { atom } from "recoil";
import { INotice } from "types/notice.types";

export const noticeListState = atom<INotice[]>({
  key: 'noticeListState',
  default: [] as INotice[],
});