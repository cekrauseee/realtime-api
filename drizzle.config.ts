import { defineConfig } from 'drizzle-kit'

const url = process.env.DATABASE_URL
if (!url) throw new Error('Missing `DATABASE_URL`')

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/domain/infra/db/schema.ts',
  dbCredentials: { url }
})
