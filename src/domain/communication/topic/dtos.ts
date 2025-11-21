import type { SerializedUser } from '@/domain/identity/user/utils/types'
import z from 'zod'

export const createTopicDto = z.object({ name: z.string().min(1) })

export type TopicUserAppendDto = { user: SerializedUser; topicId: string }

export type TopicUserRemoveDto = { userId: string; topicId: string }
