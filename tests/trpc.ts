import { initTRPC } from '@trpc/server'

import { createAppleModuleRouter } from '../src'

export const trpc = initTRPC.create()

export const appRouter = trpc.mergeRouters(createAppleModuleRouter(trpc))
