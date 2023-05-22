type _NumberKeys<T> = {
  [K in keyof T]: K extends `${number}` ? K : never;
};
// @ts-expect-error
type NumberKeys<T> = _NumberKeys<T>[number];
type IsTuple<T extends readonly any[]> = number extends T["length"]
  ? false
  : true;
type IsomorphicDestructurable<
  T extends Record<string, unknown>,
  A extends readonly any[],
> = Pick<
  T & A,
  keyof T | (IsTuple<A> extends true ? NumberKeys<A> : `${number}`)
> &
  A;

const isNumber = (s: string) => !Number.isNaN(Number(s));

export const cride = <
  T extends Record<string, unknown>,
  A extends readonly any[],
>(
  obj: T,
  arr: [...A],
): IsomorphicDestructurable<T, A> =>
  new Proxy(obj, {
    get(target, prop) {
      if (prop === Symbol.iterator) {
        // Get the iterator of the array
        return arr[Symbol.iterator].bind(arr) as any;
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
