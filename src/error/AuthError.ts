import { ErrorStatus } from 'lib/enum/response';
import { historySingleton } from 'lib/singleton/history';
import Toast from 'lib/Toast';
import { IError } from 'types/Response';
import CustomError from './CustomError';

export default class AuthError extends CustomError {
  constructor(
    private _error: IError,
  ) {
    super(_error);
  }

  public registerError(): void {
    const { status, message } = this;

    switch (status) {
      case ErrorStatus.UNAUTHORIZED:
        Toast.errorToast('깃허브 인증을 실패했습니다.');
        historySingleton.push('/');
        return;

      default:
        Toast.errorToast(message);
        return;
    }
  }
}