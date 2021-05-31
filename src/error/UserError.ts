import { ErrorStatus } from 'lib/enum/response';
import { historySingleton } from 'lib/singleton/history';
import Toast from 'lib/Toast';
import { IError } from 'types/Response';
import CustomError from './CustomError';

export default class UserError extends CustomError {
  constructor(private _error: IError) {
    super(_error);
  }

  public getUserError(): void {
    const { status, message } = this;

    switch (status) {
      case ErrorStatus.NOT_FOUND:
        Toast.errorToast('존재하지 않는 유저입니다.');
        historySingleton.goBack();
        return;

      default:
        Toast.errorToast(message);
    }
  }
}