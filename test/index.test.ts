import { describe, expect, it } from "vitest";
import { createIsomorphicDestructurable } from "../src";

describe("Create Isomorphic Destructurable", () => {
  it("destruct", () => {
    const foo = { name: "foo" };
    const bar = 1024;

    const obj = createIsomorphicDestructurable(
      { foo, bar } as const,
      [foo, bar] as const,
    );
    const { foo: foo1, bar: bar1 } = obj;
    const [foo2, bar2] = obj;

    const { foo, ...rest } = obj;

    expect(foo1).toBe(foo);
    expect(foo2).toBe(foo);
    expect(bar1).toBe(bar);
    expect(bar2).toBe(bar);
  });
});
