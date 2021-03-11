import { History } from 'history';
import { errorToast } from 'lib/Toast';
import { IError } from 'types/Response';
import CustomError from './CustomError';

export default class AuthError extends CustomError {
  constructor(
    private _error: IError,
  ) {
    super(_error);
  }

  public registerError(history: History<unknown>): void {
    const { status, message } = this;

    switch (status) {
      case 401:
        errorToast('깃허브 인증을 실패했습니다.');
        history.push('/');
        return;

      default:
        errorToast(message);
        return;
    }
  }
}