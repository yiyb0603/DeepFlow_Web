export interface IResponse {
  status: number;
  message: string;
}

export interface ICustomResponse {
  data: any;
}

export interface IError {
  response: {
    data: {
      status: number;
      message: string;
    };
  };
};