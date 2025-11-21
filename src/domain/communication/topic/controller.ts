import { normalizeResourceName } from '@/domain/infra/db/utils/helpers'
import { conflict, created, ok, unprocessableEntity } from '@/domain/infra/http/utils/helpers'
import type { ProtectedController } from '@/domain/infra/http/utils/types'
import { createTopicDto } from './dtos'
import { createTopic, getTopicByNormalizedName, getUserTopics } from './repo'
import { augmentTopic } from './service'
import type { AugmentedTopic } from './utils/types'

export const topicsGet: ProtectedController = async (_, session) => {
  const topics = await getUserTopics(session.user.id)
  const augmenteds: AugmentedTopic[] = await Promise.all(topics.map(augmentTopic))
  return ok({ topics: augmenteds })
}

export const topicsPost: ProtectedController = async (req, session) => {
  const body = await req.json()
  const parse = createTopicDto.safeParse(body)
  if (!parse.success) return unprocessableEntity()

  const payload = parse.data

  const normalized = normalizeResourceName(payload.name)
  const normalizedExists = await getTopicByNormalizedName(normalized, session.user.id)

  if (normalizedExists) return conflict('Name is already in use')

  const topic = await createTopic({
    userId: session.user.id,
    name: payload.name,
    normalizedName: normalizeResourceName(payload.name)
  })

  const augmented = await augmentTopic(topic)
  return created({ topic: augmented })
}
