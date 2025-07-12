import { z } from 'zod'
import 'dotenv/config';

const envSchema = z.object({
  POSTGRES_HOST: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z.string().transform((value)=>Number(value)),
  JWT_SECRET: z.string(),
  JWT_PAYLOAD: z.string(),
  PORT:z.string().transform((value)=>Number(value))
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
