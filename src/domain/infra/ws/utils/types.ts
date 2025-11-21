import type { User } from '@/domain/identity/user/utils/types'
import type { ServerWebSocket } from 'bun'
import type z from 'zod'
import type { ServerData } from '../../http/utils/types'
import type { WEBSOCKET_PATHNAMES } from './constants'
import type { eventSchema } from './schemas'

export type WebSocketPathname = (typeof WEBSOCKET_PATHNAMES)[number]

export type RawWebSocket = ServerWebSocket<ServerData>

export type WebSocket = {
  user: User

  send: (event: string, data: unknown) => void
  publish: (event: string, data: unknown, topic: string) => void

  subscribe: (topic: string) => void
  unsubscribe: (topic: string) => void
  isSubscribed: (topic: string) => boolean
  close: () => void

  readonly subscriptions: Set<string>
}

export type Event = z.infer<typeof eventSchema>

export type EventsDeclaration<T extends string> = { [listener in T]: { listener: Listener } }

export type Listener = (data: unknown, ws: WebSocket) => void | Promise<void>

export type SubscriptionCallbacks = { onSubscribe: (topic: string, ws: WebSocket) => void; onUnsubscribe: (topic: string, ws: WebSocket) => void }
