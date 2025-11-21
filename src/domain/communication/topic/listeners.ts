import type { Listener } from '@/domain/infra/ws/utils/types'
import { joinTopicDto, leaveTopicDto } from './dtos'

export const joinTopicListener: Listener = (data, ws) => {
  const parse = joinTopicDto.parse(data)
  if (ws.isSubscribed(parse.topicId)) return

  Array.from(ws.subscriptions.values()).forEach((topic) => ws.unsubscribe(topic))
  ws.subscribe(parse.topicId)
}

export const leaveTopicListener: Listener = (data, ws) => {
  const parse = leaveTopicDto.parse(data)
  ws.unsubscribe(parse.topicId)
}
