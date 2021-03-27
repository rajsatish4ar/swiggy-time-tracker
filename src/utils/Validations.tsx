const usernameRegex = /^[a-zA-Z0-9]+$/;
export const isValidUserName = (str: string): boolean =>
  str && usernameRegex.test(str) && str.length > 4;
export const isValidPassword = (str: string): boolean =>
  str && str.trim().length > 5;
