import SignInWithAppleDynamic from '@universal-packages/authentication-apple-module/SignInWithApple.universal-auth-dynamic'
import { initialize } from '@universal-packages/trpc-authentication'

import { appRouter } from '../trpc'

beforeAll(async (): Promise<void> => {
  await initialize({ dynamicsLocation: './tests', secret: 'my-secret', modules: { apple: { enabled: true } } })
})

trpcJest.runTrpcServer(appRouter)

describe('DefaultModuleController', (): void => {
  describe('sign-in-with-apple', (): void => {
    describe('when a successful log in happens', (): void => {
      it('returns ok and the rendered session data', async (): Promise<void> => {
        dynamicApiJest.mockDynamicReturnValue(SignInWithAppleDynamic, { status: 'success', user: { id: 99, email: 'david@universal-packages.com', appleId: '124' } })

        expect(await trpcJest.client(appRouter).signInWithApple.mutate({ code: 'my-code' })).toEqual({
          sessionToken: '',
          status: 'success',
          user: { id: 99, email: 'david@universal-packages.com' }
        })
      })
    })

    describe('when the log in attempt fails', (): void => {
      it('returns invalid credentials message', async (): Promise<void> => {
        dynamicApiJest.mockDynamicReturnValue(SignInWithAppleDynamic, { status: 'failure', message: 'invalid-code' })
        await expect(trpcJest.client(appRouter).signInWithApple.mutate({ code: 'my-code' })).rejects.toThrow('invalid-apple-authentication')
      })
    })
  })
})
