export enum EResponse {
  OK = 200,
};

export enum ErrorStatus {
  VALIDATE = 400,
  UNAUTHORIZED = 401,
  UNFORBIDDEN = 403,
  NOT_FOUND = 404,
  DUPLICATE = 409,
  EXPIRED_TOKEN = 410,
};