import { createdAt } from '@/domain/infra/db/utils/helpers'
import { createId } from '@paralleldrive/cuid2'
import { index, pgTable, text } from 'drizzle-orm/pg-core'

export const userModel = pgTable(
  'users',
  {
    id: text().primaryKey().$defaultFn(createId),
    email: text().notNull().unique(),
    username: text().notNull().unique(),
    password: text().notNull(),
    createdAt: createdAt()
  },
  (table) => [index().on(table.email), index().on(table.username)]
)
