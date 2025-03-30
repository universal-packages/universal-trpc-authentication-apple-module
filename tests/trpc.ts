import { initTRPC } from '@trpc/server'

import { createDefaultAuthenticationModuleRouter } from '../src'

export const trpc = initTRPC.create()

export const appRouter = trpc.mergeRouters(createDefaultAuthenticationModuleRouter(trpc))
