// Expanded from the original:
// https://github.com/krzkaczor/ts-essentials/blob/master/lib/types.ts#L9

export type DeepPartial<T> = {
  [P in keyof T]?: 
  T[P] extends string ? string :
  T[P] extends boolean ? boolean :
  T[P] extends number ? number :
  T[P] extends null ? null :
  T[P] extends Function ? Function :
  T[P] extends Date ? Date :
  T[P] extends Array<infer U> ? Array<DeepPartial<U>> :
  T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> :
    DeepPartial<T[P]>
};
