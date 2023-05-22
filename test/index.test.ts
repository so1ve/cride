import { describe, expect, it } from "vitest";

import { cride } from "../src";

describe("create isomorphic destructurable", () => {
  it("destruct", () => {
    const foo = { name: "foo" };
    const bar = 1024 as const;

    const obj = cride({ foo, bar }, [foo, bar]);
    const { foo: foo1, bar: bar1 } = obj;
    const [foo2, bar2] = obj;

    expect(foo1).toBe(foo);
    expect(foo2).toBe(foo);
    expect(bar1).toBe(bar);
    expect(bar2).toBe(bar);
    // make sure it supports array key
    expect(obj[0]).toBe(foo);
  });

  it("iterator", () => {
    const foo = { name: "foo" };
    const bar = 1024 as const;

    const obj = cride({ foo, bar }, [foo, bar]);

    // Support iterator
    const arr = [...obj];

    expect(arr).toEqual([foo, bar]);
  });

  it("async iterator", async () => {
    const foo = { name: "foo" };
    const bar = 1024 as const;

    const obj = cride({ foo, bar }, [foo, bar]);

    // Support async iterator
    const arr = [];
    for await (const item of obj) {
      arr.push(item);
    }

    expect(arr).toEqual([foo, bar]);
  });
});
