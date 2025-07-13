import z from 'zod'

const _env = z.object({
  JWT_SECRET: z.string({ required_error: 'JWT_SECRET is required' }),
})

const { success, data, error } = _env.safeParse(process.env)

if (!success) {
  throw new Error(`Environment variables validation failed: ${error.format()}`)
}

export const env = data
