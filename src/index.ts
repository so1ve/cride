type UnneededArrayProperties = Exclude<keyof any[], typeof Symbol.iterator>;

export function createIsomorphicDestructurable<
  T extends { [key: string]: unknown },
  A extends readonly any[],
> (obj: T, arr: A): T & Omit<A, UnneededArrayProperties> {
  const clone = { ...obj };

  Object.defineProperty(clone, Symbol.iterator, {
    enumerable: false,
    value () {
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
