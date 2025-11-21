import z from 'zod'

export const userSchema = z.object({
  id: z.cuid2(),
  email: z.email(),
  username: z.string().trim().min(1),
  password: z.string().trim().min(1),
  createdAt: z.date()
})
