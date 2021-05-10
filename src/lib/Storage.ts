class Storage {
  public static setStorage(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  public static getStorage(key: string): any {
    return localStorage.getItem(key);
  }

  public static removeStorage(key: string): void {
    localStorage.removeItem(key);
  }
}

export default Storage;