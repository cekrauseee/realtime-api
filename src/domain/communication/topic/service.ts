import type { WebSocket } from '@/domain/infra/ws/utils/types'
import type { TopicUserAppendDto, TopicUserRemoveDto } from './dtos'
import { getTopicUsers } from './utils/helpers'
import type { AugmentedTopic, Topic } from './utils/types'

export const augmentTopic = async (topic: Topic): Promise<AugmentedTopic> => {
  const users = getTopicUsers(topic.id)
  return { ...topic, users }
}

export const sendAndPublishTopicUserAppend = (body: TopicUserAppendDto, ws: WebSocket) => {
  const event = 'topic:user:append'

  ws.send(event, body)
  ws.publish(event, body, body.topicId)
}

export const sendAndPublishTopicUserRemove = (body: TopicUserRemoveDto, ws: WebSocket) => {
  const event = 'topic:user:remove'

  ws.send(event, body)
  ws.publish(event, body, body.topicId)
}
