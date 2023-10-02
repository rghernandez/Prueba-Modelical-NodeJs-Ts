import express from 'express'

// Default error handler
export function errorHandler (err: Error, _req: express.Request, res: express.Response, next: express.NextFunction): void {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

/*
export function logErrors (err: Error, _req: express.Request, _res: express.Response, next: express.NextFunction): void {
  console.error(err.stack)
  next(err)
}

export function clientErrorHandler (err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

 export function errorHandler (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction): void {
  res.status(500)
  res.render('error', { error: err })
}
*/
