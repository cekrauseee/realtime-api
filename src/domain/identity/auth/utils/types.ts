import type { User } from '../../user/utils/types'
import type { AUTH_PATHNAMES } from './constants'

export type AuthPathname = (typeof AUTH_PATHNAMES)[number]

export type Session = { user: User }
