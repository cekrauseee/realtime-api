import { TOPIC_PATHNAMES_DECLARATION } from '@/domain/communication/topic/utils/constants'
import { AUTH_PATHNAMES_DECLARATION } from '@/domain/identity/auth/utils/constants'
import { WEBSOCKET_PATHNAMES_DECLARATION } from '../../ws/utils/constants'
import type { Method, Pathname, ProtectedController, PublicController } from './types'

type MethodsController<T extends ProtectedController | PublicController> = {
  [method in Method]?: T
}

export type PathnamesDeclaration<T extends string> = {
  [pathname in T]: { public: true; controllers: MethodsController<PublicController> } | { public: false; controllers: MethodsController<ProtectedController> }
}

export const PATHNAMES_DECLARATION: PathnamesDeclaration<Pathname> = {
  ...AUTH_PATHNAMES_DECLARATION,
  ...TOPIC_PATHNAMES_DECLARATION,
  ...WEBSOCKET_PATHNAMES_DECLARATION
}
