import { TOPIC_PATHNAMES } from '@/domain/communication/topic/utils/constants'
import { AUTH_PATHNAMES } from '@/domain/identity/auth/utils/constants'
import z from 'zod'
import { WEBSOCKET_PATHNAMES } from '../../ws/utils/constants'

export const pathnameSchema = z.enum([...AUTH_PATHNAMES, ...TOPIC_PATHNAMES, ...WEBSOCKET_PATHNAMES])

export const methodSchema = z.enum(['GET', 'POST', 'PUT', 'DELETE'])
