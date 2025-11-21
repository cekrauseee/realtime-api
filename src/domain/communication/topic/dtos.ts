import type { SerializedUser } from '@/domain/identity/user/utils/types'
import z from 'zod'
import { topicVisibilitySchema } from './utils/schemas'

export const createTopicDto = z.object({
  name: z.string().trim().min(1),
  visibility: topicVisibilitySchema
})

export const joinTopicDto = z.object({ topicId: z.cuid2() })

export const leaveTopicDto = z.object({ topicId: z.cuid2() })

export type TopicUserAppendDto = { user: SerializedUser; topicId: string }

export type TopicUserRemoveDto = { userId: string; topicId: string }
