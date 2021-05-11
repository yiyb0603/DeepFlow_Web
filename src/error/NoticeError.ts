import { ErrorStatus } from 'lib/enum/response';
import { historySingleton } from 'lib/singleton/history';
import Toast from 'lib/Toast';
import { IError } from 'types/Response';
import CustomError from './CustomError';

export default class NoticeError extends CustomError {
  constructor(private _error: IError) {
    super(_error);
  }

  public getNoticeError(): void {
    const { status, message } = this;

    switch (status) {
      case ErrorStatus.NOT_FOUND:
        Toast.errorToast('공지사항이 존재하지 않습니다.');
        historySingleton.goBack();
        return;

      default:
        Toast.errorToast(message);
        return;
    }
  }

  public noticeFormError(): void {
    const { status, message } = this;

    switch (status) {
      case ErrorStatus.VALIDATE:
        Toast.errorToast('검증 오류입니다.');
        return;

      case ErrorStatus.UNFORBIDDEN:
        Toast.errorToast('공지사항 권한이 없습니다.');
        return;

      default:
        Toast.errorToast(message);
        return;
    }
  }
}