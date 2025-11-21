import type { Listener } from '@/domain/infra/ws/utils/types'
import z from 'zod'

export const joinListener: Listener = async (data, ws) => {
  const parse = z.object({ topicId: z.cuid2() }).safeParse(data)
  if (!parse.success) return
  const payload = parse.data

  Array.from(ws.subscriptions.values()).forEach((topic) => ws.unsubscribe(topic))
  ws.subscribe(payload.topicId)
}
