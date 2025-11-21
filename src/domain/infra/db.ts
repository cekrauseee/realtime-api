import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../identity/user/model'

const url = process.env.DATABASE_URL
if (!url) throw new Error('Missing `DATABASE_URL`')

export const database = drizzle(process.env.DATABASE_URL!, { schema })
