/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from 'routing-controllers';
import { Service } from 'typedi';
import logger from '../initializers/logger';

@Middleware({ type: 'after' })
@Service()
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, _request: any, _res: any, next: (err: any) => any) {
    if (error instanceof HttpError) {
      logger.error(`Status:${error.httpCode}, message:${error.message}`);
    } else {
      logger.error(`message:${JSON.stringify(error)}`);
    }

    next(error);
  }
}

export default ErrorMiddleware;
