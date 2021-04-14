import { ErrorStatus } from 'lib/enum/response';
import { errorToast } from 'lib/Toast';
import { IError } from 'types/Response';
import CustomError from './CustomError';

export default class RecommandError extends CustomError {
  constructor(
    private _error: IError,
  ) {
    super(_error);
  }

  public createRecommandError(): void {
    const { status, message } = this;

    switch (status) {
      case ErrorStatus.DUPLICATE:
        errorToast('이미 추천한 사용자입니다.');
        return;

      default:
        errorToast(message);
        return;
    }
  }
}