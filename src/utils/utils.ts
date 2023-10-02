import { Project, Model } from '../types'
import z from 'zod'

export const checkId = (id: any): boolean => {
  return z.string().uuid().safeParse(id).success
}

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
  })
})

const modelSchemaPartial = modelSchema.deepPartial()

export const validateModel = (model: Model): boolean => {
  return modelSchema.safeParse(model).success
}

export const validatePartialModel = (model: any): boolean => {
  return modelSchemaPartial.safeParse(model).success
}

const projectSchema = z.object({
  id: z.string({
    required_error: 'ID is required',
    invalid_type_error: 'ID must be a UUID'
  }).uuid(),
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string'
  }),
  status: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string'
  }),
  models: z.array(modelSchema)
})

const projectSchemaPartial = projectSchema.deepPartial()

export const validateProject = (project: Project): boolean => {
  return projectSchema.safeParse(project).success
}

export const validatePartialProject = (project: Project): boolean => {
  return projectSchemaPartial.safeParse(project).success
}
