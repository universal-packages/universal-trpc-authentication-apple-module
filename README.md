# tRPC Authentication Apple Module

[![npm version](https://badge.fury.io/js/@universal-packages%2Ftrpc-authentication-apple-module.svg)](https://www.npmjs.com/package/@universal-packages/trpc-authentication-apple-module)
[![Testing](https://github.com/universal-packages/universal-trpc-authentication-apple-module/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-trpc-authentication-apple-module/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-trpc-authentication-apple-module/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-trpc-authentication-apple-module)

[universal-authentication-apple-module](https://github.com/universal-packages/universal-authentication-apple-module) implementation on top of [trpc](https://trpc.io/)

## Router creator

#### **`createAppleModuleRouter(trpc: TRPCInstance)`**

Create a trpc router with the authentication apple module methods. You usually want to combine the base router with other modules.

```js
import { initTRPC } from '@trpc/server'
import { createAuthenticationRouter, createDefaultAuthenticationModuleRouter, initialize } from '@universal-packages/trpc-authentication'
import { createAppleModuleRouter } from '@universal-packages/trpc-authentication-apple-module'

export const trpc = initTRPC.create()
export const appRouter = trpc.router({
  authentication: trpc.mergeRouters(createAuthenticationRouter(trpc), createDefaultAuthenticationModuleRouter(trpc), createAppleModuleRouter(trpc))
})
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
