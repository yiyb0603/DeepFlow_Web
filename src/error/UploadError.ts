import { ErrorStatus } from 'lib/enum/response';
import Toast from 'lib/Toast';
import { IError } from 'types/Response';
import CustomError from './CustomError';

export default class UploadError extends CustomError {
  constructor(private _error: IError) {
    super(_error);
  }

  public uploadError(): void {
    const { status, message } = this;

    switch (status) {
      case ErrorStatus.VALIDATE:
        Toast.errorToast('지원하지 않는 파일 형식 입니다.');
        return;

      default:
        Toast.errorToast(message);
        return;
    }
  }
}