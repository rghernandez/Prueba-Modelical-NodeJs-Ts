import { z } from 'zod'
import { Project } from '../types'

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
  location: z.string({
    required_error: 'Location is required',
    invalid_type_error: 'Location must be a string'
  }).url(),
  models: z.array(z.string().uuid())
})

const projectSchemaPartial = projectSchema.deepPartial()

export const validateProject = (project: Project): boolean => {
  return projectSchema.safeParse(project).success
}

export const validatePartialProject = (project: Project): boolean => {
  return projectSchemaPartial.safeParse(project).success
}
