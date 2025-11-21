import { getUser } from '../user/repo'
import type { Session } from './utils/types'

export const getSession = async (userId: string): Promise<Session | null> => {
  const user = await getUser(userId)
  return user ? { user } : null
}
