import { INoticeDto } from 'lib/api/notice/notice.dto';
import { atom } from 'recoil';
import { INotice } from 'types/notice.types';

export const initialNoticeState: INoticeDto = {
  title: '',
  contents: '',
};

export const requestNoticeState = atom<INoticeDto>({
  key: 'requestNoticeState',
  default: initialNoticeState,
});

export const noticeListState = atom<INotice[]>({
  key: 'noticeListState',
  default: [] as INotice[],
});

export const noticeState = atom<INotice | null>({
  key: 'noticeState',
  default: null,
});