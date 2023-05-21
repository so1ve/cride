import { describe, expect, it } from "vitest";

import { createIsomorphicDestructurable } from "../src";

describe("create isomorphic destructurable", () => {
  it("destruct", () => {
    const foo = { name: "foo" };
    const bar = 1024 as const;

    const obj = createIsomorphicDestructurable({ foo, bar }, [foo, bar]);
    const { foo: foo1, bar: bar1 } = obj;
    const [foo2, bar2] = obj;

    expect(foo1).toBe(foo);
    expect(foo2).toBe(foo);
    expect(bar1).toBe(bar);
    expect(bar2).toBe(bar);
  });
});
