/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { RequestHandler } from 'express';
import helmet from 'helmet';

@Middleware({ type: 'before' })
@Service()
export class HelmetMiddleware implements ExpressMiddlewareInterface {
  private readonly handler: RequestHandler = helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? true : false,
  });
  use(request: any, response: any, next?: (err?: any) => any): any {
    if (next) {
      this.handler(request, response, next);
    }
  }
}

export default HelmetMiddleware;
