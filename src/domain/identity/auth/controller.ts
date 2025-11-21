import {
  injectAuthorizationHeader,
  internalServerError,
  noContent,
  ok,
  removeAuthorizationHeader,
  unprocessableEntity
} from '@/domain/infra/http/utils/helpers'
import type { ProtectedController, PublicController } from '@/domain/infra/http/utils/types'
import { createUser, getUserByEmail, getUserByUsername } from '../user/repo'
import { signInDto, signUpDto } from './dtos'

export const sessionGet: ProtectedController = async (_, session) => ok({ session })

export const sessionDelete: ProtectedController = async () => {
  const headers = new Headers()
  removeAuthorizationHeader(headers)

  return noContent(headers)
}

export const signInPost: PublicController = async (req) => {
  const body = await req.json()
  const parse = signInDto.safeParse(body)
  if (!parse.success) return unprocessableEntity()

  const payload = parse.data
  const user = await getUserByEmail(payload.email)
  if (!user) return internalServerError()

  const isValidPassword = await Bun.password.verify(payload.password, user.password)
  if (!isValidPassword) return internalServerError()

  const headers = new Headers()
  injectAuthorizationHeader(user.id, headers)

  return ok({ session: { user } }, headers)
}

export const signUpPost: PublicController = async (req) => {
  const body = await req.json()
  const parse = signUpDto.safeParse(body)
  if (!parse.success) return internalServerError()

  const payload = parse.data

  const [byEmail, byUsername] = await Promise.all([getUserByEmail(payload.email), getUserByUsername(payload.username)])
  if (byEmail || byUsername) return internalServerError()

  const password = await Bun.password.hash(payload.password)
  const user = await createUser({ ...payload, password })

  const headers = new Headers()
  injectAuthorizationHeader(user.id, headers)

  return ok({ session: { user } }, headers)
}
