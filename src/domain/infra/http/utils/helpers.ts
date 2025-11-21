import { getSession } from '@/domain/identity/auth/service'
import type { Session } from '@/domain/identity/auth/utils/types'
import { sign, verify } from 'jsonwebtoken'
import z from 'zod'
import { addCorsHeaders } from '../cors'

export const ok = (data: unknown) => Response.json(data)

export const created = (data: unknown) => Response.json(data, { status: 201 })

export const noContent = (headers?: Headers) => Response.json(null, { status: 203, headers })

export const unauthorized = () => Response.json({ message: 'Unauthorized' }, { status: 401 })

export const notFound = () => Response.json({ message: 'Not Found' }, { status: 404 })

export const methodNotAllowed = () => Response.json({ message: 'Method Not Allowed' }, { status: 405 })

export const conflict = (message: string) => Response.json({ message }, { status: 409 })

export const unprocessableEntity = () => Response.json({ message: 'Unprocessable Entity' }, { status: 422 })

export const internalServerError = () => Response.json({ message: 'Internal Server Error' }, { status: 500 })

export const respond = (res: Response) => addCorsHeaders(res)

export const injectAuthorizationHeader = (userId: string, headers: Headers) => {
  const token = signSessionToken(userId)
  const sevenDays = 60 * 60 * 24 * 7

  const cookieValue = [`session_token=${token}`, 'HttpOnly', 'Path=/', `SameSite=Lax`, `Max-Age=${sevenDays}`, Bun.env.NODE_ENV !== 'development' && 'Secure']
    .filter(Boolean)
    .join('; ')

  headers.set('Set-Cookie', cookieValue)
}

export const removeAuthorizationHeader = (headers: Headers) => headers.set('Set-Cookie', 'session_token=; HttpOnly; Path=/; Max-Age=0')

const signSessionToken = (userId: string) => {
  const secret = Bun.env.JWT_SECRET
  if (!secret) throw new Error('Missing `JWT_SECRET`')

  return sign({ user_id: userId }, secret)
}

export const getSessionTokenFromRequest = (req: Request): string | null => {
  const header = req.headers.get('Cookie')
  const cookies: Record<string, string> = {}

  header?.split(';').forEach((cookie) => {
    const [key, ...rest] = cookie.split('=')
    if (key) cookies[key.trim()] = decodeURIComponent(rest.join('='))
  })

  return cookies['session_token']?.replace('Bearer ', '') ?? null
}

export const getSessionFromToken = async (token: string): Promise<Session | null> => {
  const secret = Bun.env.JWT_SECRET
  if (!secret) throw new Error('Missing `JWT_SECRET`')

  try {
    const verified = verifySessionToken(token)
    const session = await getSession(verified.user_id)
    return session
  } catch (err) {
    console.error(err)
    return null
  }
}

const verifySessionToken = (token: string) => {
  const secret = Bun.env.JWT_SECRET
  if (!secret) throw new Error('Missing `JWT_SECRET`')

  const verified = verify(token, secret)
  return z.object({ user_id: z.cuid2() }).parse(verified)
}
