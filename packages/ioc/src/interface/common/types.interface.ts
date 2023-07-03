export type Pick<T, K extends keyof T> = {
  [key in K]: T[key];
};
