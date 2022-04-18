/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import monitor from 'express-status-monitor';
import { RequestHandler } from 'express';

@Middleware({ type: 'before' })
@Service()
export class MonitorMiddleware implements ExpressMiddlewareInterface {
  private readonly handler: RequestHandler = monitor({
    path: process.env.MONITOR_ROUTE,
  });
  use(request: any, response: any, next?: (err?: any) => any): any {
    if (process.env.MONITOR_ROUTE && next) {
      this.handler(request, response, next);
    }
  }
}

export default MonitorMiddleware;
