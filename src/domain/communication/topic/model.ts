import { userModel } from '@/domain/identity/user/model'
import { createdAt, id } from '@/domain/infra/db/utils/helpers'
import { index, pgTable, text, unique } from 'drizzle-orm/pg-core'

export const topicModel = pgTable(
  'topics',
  {
    id: id(),
    userId: text('user_id')
      .notNull()
      .references(() => userModel.id, { onDelete: 'cascade' }),
    name: text().notNull(),
    normalizedName: text().notNull(),
    createdAt: createdAt()
  },
  (table) => [unique().on(table.userId, table.normalizedName), index().on(table.userId), index().on(table.userId, table.normalizedName)]
)
