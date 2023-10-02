import express from 'express'
import cors from 'cors'
import modelRouter from './routes/models'
import projectRouter from './routes/projects'
import { validateJSON } from './middlewares/validateJSON'

import { errorHandler } from './middlewares/errorHandler'

export const app = express()

// Set port to environment variable or default to 3000
const PORT = process.env.PORT ?? 3000

// Disable x-powered-by header for security
app.disable('x-powered-by')

// CORS middleware for all routes (change to specific routes if needed)
app.use(cors())

// Body parser middleware
app.use(express.json())

// Custom middleware to validate JSON
app.use(validateJSON)

// Routes
app.use('/api/projects', projectRouter)
app.use('/api/models', modelRouter)

// Default error handler from express docs: https://expressjs.com/en/guide/error-handling.html
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
