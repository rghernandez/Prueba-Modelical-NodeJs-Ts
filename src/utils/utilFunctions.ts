import { z } from 'zod'

export const checkId = (id: any): boolean => {
  return z.string().uuid().safeParse(id).success
}
