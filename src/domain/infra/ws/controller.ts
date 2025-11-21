import { internalServerError } from '../http/utils/helpers'
import type { ProtectedController } from '../http/utils/types'

export const signalGet: ProtectedController = async (req, session, server) => {
  const upgraded = server.upgrade(req, { data: { session } })
  if (!upgraded) return internalServerError()
  return Response.json({ message: 'WebSocket connection established' }, { status: 101 })
}
