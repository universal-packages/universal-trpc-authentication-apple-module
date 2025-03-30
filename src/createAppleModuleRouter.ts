import { TRPCError, initTRPC } from '@trpc/server'
import { Authentication } from '@universal-packages/authentication'
import { AppleModuleDynamicNames } from '@universal-packages/authentication-apple-module'
import { BaseTrpcAuthenticationResult, CURRENT_AUTHENTICATION, TrpcAuthenticationDynamicNames } from '@universal-packages/trpc-authentication'
import { z } from 'zod'

export function createDefaultAuthenticationModuleRouter<U extends Record<string, any>, T extends ReturnType<typeof initTRPC.create>>(trpcInstance: T) {
  return trpcInstance.router({
    signInWithApple: trpcInstance.procedure
      .input(
        z.object({
          code: z.string()
        })
      )
      .mutation(async ({ input, ctx }): Promise<BaseTrpcAuthenticationResult & { user: U; sessionToken: string }> => {
        const authenticationInstance = CURRENT_AUTHENTICATION.instance as unknown as Authentication<TrpcAuthenticationDynamicNames & AppleModuleDynamicNames>

        const result = await authenticationInstance.performDynamic('sign-in-with-apple', { code: input.code })

        if (result.status === 'success') {
          const sessionToken = await CURRENT_AUTHENTICATION.instance.performDynamic('set-session', { user: result.user, context: ctx })

          const rendered = await CURRENT_AUTHENTICATION.instance.performDynamic('render-user', { user: result.user })

          return {
            user: rendered as U,
            sessionToken,
            status: 'success'
          }
        }

        throw new TRPCError({ code: 'BAD_REQUEST', message: 'invalid-apple-authentication' })
      })
  })
}
