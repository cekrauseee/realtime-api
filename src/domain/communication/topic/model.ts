import { userModel } from '@/domain/identity/user/model'
import { createdAt, id } from '@/domain/infra/db/utils/helpers'
import { index, pgEnum, pgTable, text, unique } from 'drizzle-orm/pg-core'
import { topicVisibilitySchema } from './utils/schemas'

export const topicVisibilityEnum = pgEnum('topic_visibility', topicVisibilitySchema.enum)

export const topicModel = pgTable(
  'topics',
  {
    id: id(),
    userId: text('user_id')
      .notNull()
      .references(() => userModel.id, { onDelete: 'cascade' }),
    name: text().notNull(),
    normalizedName: text().notNull(),
    visibility: topicVisibilityEnum().notNull(),
    createdAt: createdAt()
  },
  (table) => [unique().on(table.userId, table.normalizedName), index().on(table.userId), index().on(table.userId, table.normalizedName)]
)
