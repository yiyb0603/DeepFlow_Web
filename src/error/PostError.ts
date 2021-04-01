import { History } from 'history';
import { ErrorStatus } from 'lib/enum/response';
import { errorToast } from 'lib/Toast';
import { IError } from 'types/Response';
import CustomError from './CustomError';

export default class PostError extends CustomError {
  constructor(
    private _error: IError,
  ) {
    super(_error);
  }

  public getPostError(history: History): void {
    const { status, message } = this;
    switch (status) {
      case ErrorStatus.NOT_FOUND:
        errorToast('존재하지 않는 글입니다.');
        history.push('/');
        return;

      default:
        errorToast(message);
        return;
    }
  }
}