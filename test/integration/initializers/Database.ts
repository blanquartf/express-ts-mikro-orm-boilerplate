import { init, DI } from '../../../src/index';
import { before } from 'mocha';
import { UserSeeder } from './UserSeeder';

before(async () => {
  await init;
  const generator = DI.orm.getSchemaGenerator();
  const seeder = DI.orm.getSeeder();
  await generator.dropSchema({ wrap: false });
  await generator.createSchema({ wrap: false });
  await seeder.seed(UserSeeder);
});
