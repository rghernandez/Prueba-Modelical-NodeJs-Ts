import { Model, NewModel } from '../types'
import modelsData from '../data/models.json'
import { checkId } from '../utils/utilFunctions'
import { validateModel, validatePartialModel } from '../utils/modelUtils'
import { randomUUID } from 'node:crypto'

// Import data from JSON file and cast to Model type
const models: Model[] = modelsData as Model[]

// Get all models
export const getAllModels = (): Model[] => {
  return models
}

// Get a single character by id
export const getModelById = (id: any): Model | undefined => {
  if (!checkId(id)) {
    throw new Error('Invalid ID')
  }
  return models.find((model) => model.id === id)
}

// Create a new model
export const createModel = (model: NewModel): Model => {
  const newModel: Model = {
    id: randomUUID(),
    ...model
  }
  const validation = validateModel(newModel)
  if (!(validation.success)) {
    throw new Error(validation.error.message)
  }

  models.push(newModel)
  return newModel
}

// Update an existing model
export const updateModel = (model: Model): Model => {
  const validation = validatePartialModel(model)

  if (!(validation.success)) {
    throw new Error(validation.error.message)
  }
  const index = models.findIndex((p) => p.id === model.id)
  if (index < 0) {
    throw new Error('Model not found')
  }
  models[index] = {
    ...models[index],
    ...model
  }
  return models[index]
}

// Delete an existing model
export const deleteModel = (id: any): void => {
  if (checkId(id)) {
    const index = models.findIndex((m) => m.id === id)

    if (index < 0) {
      throw new Error('Model not found')
    }
    models.splice(index, 1)
  } else {
    throw new Error('Invalid ID')
  }
}
