import express from 'express'

// Custom middleware to validate JSON
export const validateJSON = (req: express.Request, res: express.Response, next: express.NextFunction): any => {
  if ((req.method === 'POST' || req.method === 'PATCH') && req.headers['content-type'] !== 'application/json') {
    res.status(400).json({ error: 'Invalid Content-Type. Only JSON is supported.' })
  }
  next()
}
