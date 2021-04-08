export const setStorage = (key: string, value: any): void => {
  return localStorage.setItem(key, value);
}

export const getStorage = (key: string): any => {
  return localStorage.getItem(key);
}