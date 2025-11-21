import { handlePreflight } from './http/cors'
import { PATHNAMES_DECLARATION } from './http/utils/constants'
import { getSessionFromToken, getSessionTokenFromRequest, internalServerError, methodNotAllowed, notFound, respond, unauthorized } from './http/utils/helpers'
import { methodSchema, pathnameSchema } from './http/utils/schemas'
import type { Fetch, ProtectedController, PublicController } from './http/utils/types'

export const fetch: Fetch = async (req, server) => {
  if (req.method === 'OPTIONS') return handlePreflight()

  const url = new URL(req.url)
  const parse = pathnameSchema.safeParse(url.pathname)

  if (!parse.success) return respond(notFound())
  const pathname = parse.data

  const methodParse = methodSchema.safeParse(req.method)
  if (!methodParse.success) return respond(methodNotAllowed())

  const method = methodParse.data
  const declaration = PATHNAMES_DECLARATION[pathname]

  const controller = declaration.controllers[method]
  if (!controller) return respond(methodNotAllowed())

  try {
    if (declaration.public) {
      const res = await (controller as PublicController)(req)
      return respond(res)
    }

    const token = getSessionTokenFromRequest(req)
    if (!token) return respond(unauthorized())

    const session = await getSessionFromToken(token)
    if (!session) return respond(unauthorized())

    const res = await (controller as ProtectedController)(req, session, server)
    return respond(res)
  } catch (err) {
    console.error(err)
    return respond(internalServerError())
  }
}
