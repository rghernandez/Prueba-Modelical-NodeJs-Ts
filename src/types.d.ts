// Type definitions for models
export interface Model {
  id: uuid
  name: string
  description: string
}
export type NewModel = Omit<Model, 'id'>

// Type definitions for projects
export interface Project {
  id: uuid
  name: string
  description: string
  status: string
  models: Model[]
}

export type NewProject = Omit<Project, 'id'>
