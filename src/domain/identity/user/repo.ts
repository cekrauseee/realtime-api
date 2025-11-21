import { eq } from 'drizzle-orm'
import { database } from '../../infra/db'
import { userModel } from './model'
import type { User } from './utils/types'

export const getUser = async (id: string): Promise<User | null> => {
  const [user] = await database.select().from(userModel).where(eq(userModel.id, id))
  return user ?? null
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const [user] = await database.select().from(userModel).where(eq(userModel.email, email))
  return user ?? null
}

export const getUserByUsername = async (username: string): Promise<User | null> => {
  const [user] = await database.select().from(userModel).where(eq(userModel.username, username))
  return user ?? null
}

type CreateUser = typeof userModel.$inferInsert

export const createUser = async (data: CreateUser): Promise<User> => {
  const [user] = await database.insert(userModel).values(data).returning()
  if (!user) throw new Error('User creation failed')
  return user
}
