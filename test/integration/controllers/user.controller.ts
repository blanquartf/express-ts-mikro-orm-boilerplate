import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import { User } from '../../../src/database/entities/User';
import { DI } from '../../../src/index';
import '../../../src/core/initializers/env';

describe('Users', () => {
  describe('list', () => {
    it('should get all users', () =>
      request(DI.server)
        .get(process.env.API_ROUTE_PREFIX + '/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.be.equal(4);
          expect(res.body[0].login).to.be.equal('raz');
          expect(res.body[1].login).to.be.equal('flo');
          expect(res.body[2].login).to.be.equal('yataa');
          expect(res.body[3].login).to.be.equal('gaby');
        }));
  });

  describe('get', () => {
    it('should get user flo', () =>
      request(DI.server)
        .get(process.env.API_ROUTE_PREFIX + '/users/2')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.login).to.be.equal('flo');
        }));

    it('should get no user', () =>
      request(DI.server)
        .get(process.env.API_ROUTE_PREFIX + '/users/42')
        .expect('Content-Type', /json/)
        .expect(404));
  });

  describe('post', () => {
    it('should add user anton', () =>
      request(DI.server)
        .post(process.env.API_ROUTE_PREFIX + '/users')
        .send({ login: 'anton', password: 'test', email: 'anton@test.com' })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(async () => {
          const userAdded = await DI.orm.em
            .fork()
            .getRepository<User>('User')
            .findOne({ login: 'anton' });
          expect(userAdded).to.be.not.be.undefined;
          expect(userAdded).to.be.not.be.null;
        }));

    it('should not add user with invalid mail', () =>
      request(DI.server)
        .post(process.env.API_ROUTE_PREFIX + '/users')
        .send({ login: 'seb', password: 'test', email: 'seb@test' })
        .expect(400)
        .then(async () => {
          const userNotAdded = await DI.orm.em
            .fork()
            .getRepository<User>('User')
            .findOne({ login: 'seb' });
          expect(userNotAdded).to.be.null;
        }));

    it('should not add user with empty mail', () =>
      request(DI.server)
        .post(process.env.API_ROUTE_PREFIX + '/users')
        .send({ login: 'seb', password: 'test', email: '' })
        .expect(400)
        .then(async () => {
          const userNotAdded = await DI.orm.em
            .fork()
            .getRepository<User>('User')
            .findOne({ login: 'seb' });
          expect(userNotAdded).to.be.null;
        }));

    it('should not add user with invalid login', () =>
      request(DI.server)
        .post(process.env.API_ROUTE_PREFIX + '/users')
        .send({ login: 'ben,', password: 'test', email: 'ben@test.com' })
        .expect(400)
        .then(async () => {
          const userNotAdded = await DI.orm.em
            .fork()
            .getRepository<User>('User')
            .findOne({ login: 'ben' });
          expect(userNotAdded).to.be.null;
        }));

    it('should not add user with empty login', () =>
      request(DI.server)
        .post(process.env.API_ROUTE_PREFIX + '/users')
        .send({ login: '', password: 'test', email: 'ben@test.com' })
        .expect(400)
        .then(async () => {
          const userNotAdded = await DI.orm.em
            .fork()
            .getRepository<User>('User')
            .findOne({ login: '' });
          expect(userNotAdded).to.be.null;
        }));

    it('should not add user with empty password', () =>
      request(DI.server)
        .post(process.env.API_ROUTE_PREFIX + '/users')
        .send({ login: 'ben', password: '', email: 'ben@test.com' })
        .expect(400)
        .then(async () => {
          const userNotAdded = await DI.orm.em
            .fork()
            .getRepository<User>('User')
            .findOne({ login: 'ben' });
          expect(userNotAdded).to.be.null;
        }));
  });

  describe('put', () => {
    it('should modify user flo mail', () =>
      request(DI.server)
        .put(process.env.API_ROUTE_PREFIX + '/users/2')
        .send({ email: 'floflo@test.com' })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(async () => {
          const userModified = await DI.orm.em
            .fork()
            .getRepository<User>('User')
            .findOne({ id: 2 });
          expect(userModified?.email).to.be.equal('floflo@test.com');
        }));
    it('should not modify user with invalid mail', () =>
      request(DI.server)
        .put(process.env.API_ROUTE_PREFIX + '/users/2')
        .send({ email: 'flo@test' })
        .expect(400)
        .then(async () => {
          const userNotModified = await DI.orm.em
            .fork()
            .getRepository<User>('User')
            .findOne({ id: 2 });
          expect(userNotModified?.email).to.be.equal('floflo@test.com');
        }));
    it('should not modify user with empty mail', () =>
      request(DI.server)
        .put(process.env.API_ROUTE_PREFIX + '/users/2')
        .send({ email: '' })
        .expect(400)
        .then(async () => {
          const userNotModified = await DI.orm.em
            .fork()
            .getRepository<User>('User')
            .findOne({ id: 2 });
          expect(userNotModified?.email).to.be.equal('floflo@test.com');
        }));
  });
  describe('delete', () => {
    it('should delete user test', () =>
      request(DI.server)
        .delete(process.env.API_ROUTE_PREFIX + '/users/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(async () => {
          const userDeleted = await DI.orm.em
            .fork()
            .getRepository<User>('User')
            .findOne({ id: 1 });
          expect(userDeleted).to.be.null;
        }));

    it('should not delete an user', () =>
      request(DI.server)
        .delete(process.env.API_ROUTE_PREFIX + '/users/42')
        .expect('Content-Type', /json/)
        .expect(404));
  });
});
