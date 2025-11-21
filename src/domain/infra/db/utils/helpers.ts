import { createId } from '@paralleldrive/cuid2'
import { text, timestamp } from 'drizzle-orm/pg-core'

export const id = () => text().primaryKey().$defaultFn(createId)

export const createdAt = () => timestamp('created_at').notNull().defaultNow()

export const normalizeResourceName = (name: string): string => name.trim().toLowerCase().replace(/\s+/g, '-')
