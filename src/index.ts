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
  object: T,
  array: [...A],
): Cride<T, A> =>
  new Proxy(object, {
    get(target, property) {
      if (
        typeof property === "symbol" &&
        SUPPORTED_SYMBOLS.includes(property) &&
        property in array
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return array[property as any].bind(array) as any;
      }
      if (Object.prototype.hasOwnProperty.call(target, property)) {
        return Reflect.get(target, property);
      }
      if (
        typeof property === "string" &&
        isNumber(property) &&
        Number(property) < array.length
      ) {
        return Reflect.get(array, property);
      }
    },
  }) as any;
