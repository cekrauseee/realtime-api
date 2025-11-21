import z from 'zod'
import { mountSubscriptionCallbacks } from '../communication/topic/utils/helpers'
import type { Session } from '../identity/auth/utils/types'
import { appendClientAndReturn, getClient, removeClient } from './ws/state'
import { EVENTS_DECLARATION } from './ws/utils/constants'
import { eventSchema } from './ws/utils/schemas'

export const websocket: Bun.WebSocketHandler<{ session: Session }> = {
  open: (ws) => {
    appendClientAndReturn(ws, mountSubscriptionCallbacks())
  },
  message: async (ws, message) => {
    let author = getClient(ws.data.session.user.id)
    if (!author) author = appendClientAndReturn(ws, mountSubscriptionCallbacks())

    try {
      const parse = z
        .object({
          event: eventSchema,
          data: z.unknown()
        })
        .safeParse(JSON.parse(message.toString()))

      if (!parse.success) return
      const payload = parse.data

      const declaration = EVENTS_DECLARATION[payload.event]
      await declaration.listener(payload.data, author)
    } catch (err) {
      console.error(err)
    }
  },
  close: (ws) => {
    const author = getClient(ws.data.session.user.id)
    if (!author) return

    author.subscriptions?.forEach((topic) => author.unsubscribe(topic))
    removeClient(author.user.id)
  }
}
