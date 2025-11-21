import { serializeUser } from '@/domain/identity/user/utils/helpers'
import type { User } from '@/domain/identity/user/utils/types'
import { getClients } from '@/domain/infra/ws/state'
import type { SubscriptionCallbacks } from '@/domain/infra/ws/utils/types'
import { sendAndPublishTopicUserAppend, sendAndPublishTopicUserRemove } from '../service'

export const getTopicUsers = (topicId: string) => {
  const clients = getClients()

  return clients.reduce((users: User[], client) => {
    if (client.isSubscribed(topicId)) users.push(client.user)
    return users
  }, [])
}

export const mountSubscriptionCallbacks = (): SubscriptionCallbacks => ({
  onSubscribe: (topic, ws) => sendAndPublishTopicUserAppend({ user: serializeUser(ws.user), topicId: topic }, ws),
  onUnsubscribe: (topic, ws) => sendAndPublishTopicUserRemove({ userId: ws.user.id, topicId: topic }, ws)
})
