# cride

[![NPM version](https://img.shields.io/npm/v/cride?color=a1b858&label=)](https://www.npmjs.com/package/cride)

Credits to [@antfu](https://github.com/antfu).

## Usage

```ts
import { cride } from "cride";

const foo = { name: "foo" };
const bar = 1024;

const object = cride({ foo, bar }, [foo, bar]);

let { foo, bar } = object;
let [foo, bar] = object;
```

## License

[MIT](./LICENSE) License © 2022 [Anthony Fu](https://github.com/antfu)
[MIT](./LICENSE) License © 2022-2023 [Ray](https://github.com/so1ve)
