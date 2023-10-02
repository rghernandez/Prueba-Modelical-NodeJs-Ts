import { Model } from '../types'
import z from 'zod'

const modelSchema = z.object({
  id: z.string({
    invalid_type_error: 'ID must be a UUID',
    required_error: 'ID is required'
  }).uuid(),
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string'
  }),
  format: z.enum(['STP', 'OBJ', 'FBX'], {
    required_error: 'Format is required',
    invalid_type_error: 'Format must be a string'
  }),
  size: z.number({
    required_error: 'Size is required',
    invalid_type_error: 'Size must be a number'
  }).min(0).positive(),
  created: z.string({
    required_error: 'Created is required',
    invalid_type_error: 'Created must be a date'
  }).datetime(),
  lastModified: z.string({
    required_error: 'Last Modified is required',
    invalid_type_error: 'Last Modified must be a date'
  }).datetime(),
  preview: z.string({
    required_error: 'Preview is required',
    invalid_type_error: 'Preview must be a string and a valid URL'
  }).url(),
  finished: z.boolean({
    required_error: 'Finished is required',
    invalid_type_error: 'Finished must be a boolean'
  })
})

const modelSchemaPartial = modelSchema.deepPartial()

export const validateModel = (model: Model): any => {
  return modelSchema.safeParse(model)
}

export const validatePartialModel = (model: any): any => {
  return modelSchemaPartial.safeParse(model)
}
