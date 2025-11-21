import { TOPIC_EVENTS } from '@/domain/communication/topic/utils/constants'
import z from 'zod'

export const eventSchema = z.enum([...TOPIC_EVENTS])
