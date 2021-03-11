import { IError } from "types/Response";

export default class CustomError {
  public status: number = 0;
  public message: string = '';

  constructor(
    error: IError,
  ) {
    const { status, message } = error.response.data;
    this.status = status;
    this.message = message;
  }
}