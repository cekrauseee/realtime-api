import z from 'zod'

export const signInDto = z.object({
  email: z.email(),
  password: z.string()
})

export const signUpDto = z.object({
  email: z.email(),
  username: z.string(),
  password: z.string()
})
