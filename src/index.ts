type RemoveArrayMethods<T> = Omit<
  T,
  | "at"
  | "concat"
  | "copyWithin"
  | "entries"
  | "every"
  | "fill"
  | "filter"
  | "find"
  | "findIndex"
  | "findLast"
  | "findLastIndex"
  | "flat"
  | "flatMap"
  | "forEach"
  | "includes"
  | "indexOf"
  | "join"
  | "keys"
  | "lastIndexOf"
  | "map"
  | "pop"
  | "push"
  | "reduce"
  | "reduceRight"
  | "reverse"
  | "shift"
  | "slice"
  | "some"
  | "sort"
  | "splice"
  | "toLocaleString"
  | "toString"
  | "unshift"
  | "values"
  | "length"
>;
export type Cride<
  T extends Record<string, unknown>,
  A extends readonly any[],
> = Pick<T, keyof T> & RemoveArrayMethods<A>;

const isNumber = (s: string) => !Number.isNaN(Number(s));
const SUPPORTED_SYMBOLS = [Symbol.iterator, Symbol.asyncIterator];

export const cride = <
  T extends Record<string, unknown>,
  A extends readonly any[],
>(
  obj: T,
  arr: [...A],
): Cride<T, A> =>
  new Proxy(obj, {
    get(target, prop) {
      if (
        typeof prop === "symbol" &&
        SUPPORTED_SYMBOLS.includes(prop) &&
        prop in arr
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return arr[prop as any].bind(arr) as any;
      }
      if (Object.prototype.hasOwnProperty.call(target, prop)) {
        return Reflect.get(target, prop);
      }
      if (
        typeof prop === "string" &&
        isNumber(prop) &&
        Number(prop) < arr.length
      ) {
        return Reflect.get(arr, prop);
      }
    },
  }) as any;
