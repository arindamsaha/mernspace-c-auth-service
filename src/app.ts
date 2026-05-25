import express, { NextFunction, Request, Response } from 'express';
import logger from './config/logger';
import createHttpError, { HttpError } from 'http-errors';

const app = express();


app.get('/', (req, res, next) => {
  const err = createHttpError(401, 'Unauthorized access to the auth service');
  next(err);

  //res.send('Welcome to the auth service');
});



// global error handler. and it should be the last middleware in the chain
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err:HttpError, req:Request, res:Response, next:NextFunction) => {
  logger.error({ message: err.message });


  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
      type: err.name,
      status: statusCode,
      path: '',
      location: '',
    },
  });
});



export default app;