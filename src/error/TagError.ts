import { ErrorStatus } from 'lib/enum/response';
import { historySingleton } from 'lib/singleton/history';
import Toast from 'lib/Toast';
import { IError } from 'types/Response';
import CustomError from './CustomError';

export default class TagError extends CustomError {
  constructor(private _error: IError) {
    super(_error);
  }

  public getTagError(): void {
    const { status, message } = this;

    switch (status) {
      case ErrorStatus.NOT_FOUND:
        Toast.errorToast('존재하지 않는 태그입니다.');
        break;

      default:
        Toast.errorToast(message);
        break;
    }

    historySingleton.goBack();
  }
}