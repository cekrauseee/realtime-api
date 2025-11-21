import type { Session } from '@/domain/identity/auth/utils/types'
import type z from 'zod'
import type { methodSchema, pathnameSchema } from './schemas'

export type Pathname = z.infer<typeof pathnameSchema>

export type Method = z.infer<typeof methodSchema>

export type ServerData = { session: Session }

type Server = Bun.Server<ServerData>

export type Fetch = (req: Request, server: Server) => Promise<Response>

type ControllerResponse = Promise<Response> | Response

export type PublicController = (req: Request) => ControllerResponse

export type ProtectedController = (req: Request, session: Session, server: Server) => ControllerResponse
