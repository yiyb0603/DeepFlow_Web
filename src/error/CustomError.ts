import { IError } from 'types/Response';

export default class CustomError {
  public status: number = 0;
  public message: string = '';

  constructor(error: IError) {
    if (error.response) {
      const { data } = error.response;

      if (data as CustomError) {
        const { status, message } = error.response.data;

        this.status = status;
        this.message = message;
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
}