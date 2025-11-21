import { createWebSocketClient, wrapWebSocket } from './utils/helpers'
import type { RawWebSocket, SubscriptionCallbacks, WebSocket } from './utils/types'

const clients: Map<string, WebSocket> = new Map()

export const getClients = () => Array.from(clients.values())

export const getClient = (userId: string) => clients.get(userId) ?? null

export const appendClientAndReturn = (ws: RawWebSocket, cbs: SubscriptionCallbacks): WebSocket => {
  const client = createWebSocketClient(ws)
  const wrapped = wrapWebSocket(client, cbs)
  clients.set(ws.data.session.user.id, wrapped)

  return wrapped
}

export const removeClient = (userId: string) => clients.delete(userId)
