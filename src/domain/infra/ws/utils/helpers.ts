import type { RawWebSocket, SubscriptionCallbacks, WebSocket } from './types'

export const createWebSocketClient = (raw: RawWebSocket): WebSocket => {
  const subscriptions = new Set<string>()

  return {
    user: {
      id: raw.data.session.user.id,
      email: raw.data.session.user.email,
      username: raw.data.session.user.username,
      password: raw.data.session.user.password,
      createdAt: raw.data.session.user.createdAt
    },

    send: (event: string, data: unknown) => raw.send(JSON.stringify({ event, data })),
    publish: (event: string, data: unknown, topic: string) => raw.publish(topic, JSON.stringify({ event, data })),

    subscribe: (topic: string) => {
      raw.subscribe(topic)
      subscriptions.add(topic)
    },
    unsubscribe: (topic: string) => {
      raw.unsubscribe(topic)
      subscriptions.delete(topic)
    },
    isSubscribed: (topic: string) => subscriptions.has(topic),
    close: () => raw.close(),

    get subscriptions() {
      return subscriptions
    }
  }
}

export const wrapWebSocket = (ws: WebSocket, { onSubscribe, onUnsubscribe }: SubscriptionCallbacks): WebSocket => {
  return {
    user: ws.user,

    send: ws.send,
    publish: ws.publish,
    close: ws.close,
    isSubscribed: ws.isSubscribed,

    subscribe(topic: string) {
      ws.subscribe(topic)
      onSubscribe(topic, ws)
    },
    unsubscribe(topic: string) {
      ws.unsubscribe(topic)
      onUnsubscribe(topic, ws)
    },

    get subscriptions() {
      return ws.subscriptions
    }
  }
}
