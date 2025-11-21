import type { User } from '@/domain/identity/user/utils/types'
import type z from 'zod'
import type { TOPIC_EVENTS, TOPIC_PATHNAMES } from './constants'
import type { topicSchema, topicVisibilitySchema } from './schemas'

export type Topic = z.infer<typeof topicSchema>

export type AugmentedTopic = { users: User[] } & Topic

export type TopicVisibility = z.infer<typeof topicVisibilitySchema>

export type TopicPathname = (typeof TOPIC_PATHNAMES)[number]

export type TopicEvent = (typeof TOPIC_EVENTS)[number]
