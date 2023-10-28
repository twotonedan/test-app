/* eslint-disable @typescript-eslint/no-explicit-any */
export type PickPartial<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>;
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
export type Implements<T, _U extends T> = _U;

export type ValueOf<T> = T[keyof T];
