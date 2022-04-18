import './core/initializers/env';
import 'reflect-metadata';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import initDb from './database/mikro-orm';
import { MikroORM } from '@mikro-orm/core';
import express from 'express';
useContainer(Container);
let app: express.Express = express();
app = useExpressServer(app, {
  routePrefix: process.env.API_ROUTE_PREFIX,
  defaultErrorHandler: true,
  controllers: [path.join(__dirname, '/api/controllers/*.js')],
  middlewares: [
    path.join(__dirname, '/api/middlewares/*.js'),
    path.join(__dirname, '/core/middlewares/*.js'),
  ],
  interceptors: [path.join(__dirname, '/api/interceptors/*.js')],
});
import swaggerSchema from './core/initializers/swagger';
if (process.env.SWAGGER_ROUTE) {
  app.use(`${process.env.SWAGGER_ROUTE}`, swaggerUi.serve);
  app.get(`${process.env.SWAGGER_ROUTE}`, swaggerUi.setup(swaggerSchema));
}

const port = parseInt(process.env.PORT ?? '3000');

export const DI = {} as {
  orm: MikroORM;
  server: express.Express;
};

export const init = (async () => {
  const orm = await initDb();
  app.listen(port);
  DI.orm = orm;
  DI.server = app;
})();
