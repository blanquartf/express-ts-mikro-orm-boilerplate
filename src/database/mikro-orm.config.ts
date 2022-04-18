import { Options, ReflectMetadataProvider } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import path from 'path';
import '../core/initializers/env';

const options: Options<PostgreSqlDriver> = {
  metadataProvider: ReflectMetadataProvider,
  entities: ['./dist/src/database/entities'], // path to our JS entities (dist), relative to `baseDir`
  type: 'postgresql',
  dbName: process.env.PG_DB_NAME,
  password: process.env.PG_PASSWORD,
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || '5432'),
  migrations: {
    tableName: 'mikro_orm_migrations',
    allOrNothing: true,
    path: path.join(process.cwd(), 'dist/src/database/migrations'),
    pathTs: path.join(process.cwd(), 'src/database/migrations'),
  },
};

export default options;
