import { customTrim } from "../converter/customTrim";

export const isEmpty = (value: string | Array<any>): boolean => {
  if (!value || value.length <= 0 || customTrim(String(value)).length <= 0) {
    return true;
  }
  
  return false;
}