import type { SerializedUser, User } from './types'

export const serializeUser = (user: User): SerializedUser => ({
  id: user.id.toString(),
  email: user.email.toString(),
  username: user.username.toString(),
  password: user.password.toString(),
  createdAt: user.createdAt.toISOString()
})
