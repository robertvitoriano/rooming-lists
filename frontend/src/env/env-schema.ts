import { z } from "zod";

export const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_API_TOKEN: z.string(),
});
