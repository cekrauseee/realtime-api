import type { PathnamesDeclaration } from '@/domain/infra/http/utils/constants'
import type { EventsDeclaration } from '@/domain/infra/ws/utils/types'
import { topicsGet, topicsPost } from '../controller'
import { joinListener } from '../listeners'
import type { TopicEvent, TopicPathname } from './types'

export const TOPIC_PATHNAMES = ['/topics'] as const

export const TOPIC_PATHNAMES_DECLARATION: PathnamesDeclaration<TopicPathname> = {
  '/topics': {
    public: false,
    controllers: {
      GET: topicsGet,
      POST: topicsPost
    }
  }
}

export const TOPIC_EVENTS = ['topic:join'] as const

export const TOPIC_EVENTS_DECLARATION: EventsDeclaration<TopicEvent> = { 'topic:join': { listener: joinListener } }
