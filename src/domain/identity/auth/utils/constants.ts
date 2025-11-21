import type { PathnamesDeclaration } from '@/domain/infra/http/utils/constants'
import { sessionDelete, sessionGet, signInPost, signUpPost } from '../controller'
import type { AuthPathname } from './types'

export const AUTH_PATHNAMES = ['/auth/sign-in', '/auth/sign-up', '/auth/session'] as const

export const AUTH_PATHNAMES_DECLARATION: PathnamesDeclaration<AuthPathname> = {
  '/auth/session': {
    public: false,
    controllers: {
      GET: sessionGet,
      DELETE: sessionDelete
    }
  },
  '/auth/sign-in': {
    public: true,
    controllers: { POST: signInPost }
  },
  '/auth/sign-up': {
    public: true,
    controllers: { POST: signUpPost }
  }
}

export const SESSION_TOKEN_COOKIE = 'session_token'
