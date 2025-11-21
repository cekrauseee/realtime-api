import z from 'zod'

export const topicSchema = z.object({
  id: z.cuid2(),
  userId: z.cuid2(),
  name: z.string().trim().min(1),
  normalizedName: z.string().trim().min(1),
  createdAt: z.date()
})
