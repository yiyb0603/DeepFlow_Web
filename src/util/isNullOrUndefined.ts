const isNullOrUndefined = (value: any): boolean => {
  if (value === undefined || value === null) {
    return true;
  }

  return false;
}

export default isNullOrUndefined;