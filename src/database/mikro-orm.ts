import { MikroORM } from '@mikro-orm/core';
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'; // or any other driver package
import config from './mikro-orm.config';

const init = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>(config);
  if (process.env.NODE_ENV !== 'test') {
    const migrator = orm.getMigrator();
    await migrator.up();
  }
  return orm;
};

export default init;
