import express, { NextFunction, Request, Response } from 'express';
import logger from './config/logger.js';
import createHttpError, { HttpError } from 'http-errors';
import authRouter from './routes/auth.js';

const app = express();


app.get('/', (req, res, next) => {

// for testing the global error handler, you can uncomment the following lines to simulate an error and see how it's handled:

  //const err = createHttpError(401, 'Unauthorized access to the auth service');
  //next(err);

  res.send('Welcome to the auth service Arindam Saha');
});


app.use("/auth", authRouter);



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