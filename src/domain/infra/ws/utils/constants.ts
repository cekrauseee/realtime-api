import { TOPIC_EVENTS_DECLARATION } from '@/domain/communication/topic/utils/constants'
import type { PathnamesDeclaration } from '../../http/utils/constants'
import { signalGet } from '../controller'
import type { Event, EventsDeclaration, WebSocketPathname } from './types'

export const WEBSOCKET_PATHNAMES = ['/signal'] as const

export const WEBSOCKET_PATHNAMES_DECLARATION: PathnamesDeclaration<WebSocketPathname> = {
  '/signal': {
    public: false,
    controllers: { GET: signalGet }
  }
}

export const EVENTS_DECLARATION: EventsDeclaration<Event> = { ...TOPIC_EVENTS_DECLARATION }
