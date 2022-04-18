import { EntityManager, wrap } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../../../src/database/entities/User';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user1 = new User();
    wrap(user1).assign({
      login: 'raz',
      password: 'raz',
      email: 'raz@test.com',
    });
    em.persistAndFlush(user1);
    const user2 = new User();
    wrap(user2).assign({
      login: 'flo',
      password: 'flo',
      email: 'flo@test.com',
    });
    em.persistAndFlush(user2);
    const user3 = new User();
    wrap(user3).assign({
      login: 'yataa',
      password: 'yataa',
      email: 'yataa@test.com',
    });
    em.persistAndFlush(user3);
    const user4 = new User();
    wrap(user4).assign({
      login: 'gaby',
      password: 'gaby',
      email: 'gaby@test.com',
    });
    em.persistAndFlush(user4);
  }
}
