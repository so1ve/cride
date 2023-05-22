import { klona } from "klona/full";

type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export function createIsomorphicDestructurable<
  T extends Record<string, unknown>,
  A extends readonly any[],
>(obj: T, arr: [...A]): Pick<T & A, keyof T | NumberKeys<A>> {
  const clone = klona(obj);

  Object.defineProperty(clone, Symbol.iterator, {
    enumerable: false,
    value() {
      let index = 0;

      return {
        next: () => ({
          value: arr[index++],
          done: index > arr.length,
        }),
      };
    },
  });

  return clone as T & A;
}
