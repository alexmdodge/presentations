

// In Progress
type NonRecursive =
 | string
 | number
 | boolean
 | undefined
 | null
 | Date
 | Function

export type DeepPartial<T> = 
  T extends NonRecursive ? T :
  T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>
  } :
  Partial<T>


// Original:
// https://github.com/krzkaczor/ts-essentials/blob/master/lib/types.ts#L9

/** Essentials */
export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

/** Dictionaries related */
export type Dictionary<T, K extends string | number = string> = { [key in K]: T };
export type DictionaryValues<T> = T extends Dictionary<infer U> ? U : never;

/** Like Partial but recursive */
export type OtherDeepPartial<T> = T extends Primitive | Function | Date
  ? T
  : T extends Map<infer K, infer V>
  ? DeepPartialMap<K, V>
  : T extends Set<infer U>
  ? DeepPartialSet<U>
  : T extends {}
  ? { [K in keyof T]?: OtherDeepPartial<T[K]> }
  : Partial<T>;
interface DeepPartialSet<ItemType> extends Set<OtherDeepPartial<ItemType>> {}
interface DeepPartialMap<KeyType, ValueType> extends Map<OtherDeepPartial<KeyType>, OtherDeepPartial<ValueType>> {}

// Array index type query sample
type Book = {
  title: string;
}

type ArrayOfBooks = Book[]
type MyArray = keyof ArrayOfBooks
type MyArrayValue = ArrayOfBooks[MyArray]
