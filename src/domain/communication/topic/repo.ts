import { database } from '@/domain/infra/db'
import { and, eq } from 'drizzle-orm'
import { topicModel } from './model'
import type { Topic } from './utils/types'

export const getUserTopics = async (userId: string): Promise<Topic[]> => {
  const topics = await database.select().from(topicModel).where(eq(topicModel.userId, userId))
  return topics
}

export const getTopicByNormalizedName = async (normalizedName: string, userId: string): Promise<Topic | null> => {
  const [topic] = await database
    .select()
    .from(topicModel)
    .where(and(eq(topicModel.userId, userId), eq(topicModel.normalizedName, normalizedName)))

  return topic ?? null
}

type CreateTopic = typeof topicModel.$inferInsert

export const createTopic = async (data: CreateTopic): Promise<Topic> => {
  const [topic] = await database.insert(topicModel).values(data).returning()
  if (!topic) throw new Error('Topic creation failed')
  return topic
}
