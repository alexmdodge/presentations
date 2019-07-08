export type DeepPartial<T> = {
  [P in keyof T]?: 
    T[P] extends Array<infer U> ? Array<DeepPartial<U>> :
    T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> :
    T[P] extends string ? string :
    T[P] extends boolean ? boolean :
    T[P] extends number ? number :
    T[P] extends null ? null :
    DeepPartial<T[P]>
};

