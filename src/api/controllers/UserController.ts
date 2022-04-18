import { wrap } from '@mikro-orm/core';
import {
  JsonController,
  Param,
  Get,
  Post,
  Put,
  Delete,
  NotFoundError,
  Body,
  OnNull,
} from 'routing-controllers';
import { User } from '../../database/entities/User';
import { UserPost, UserPut } from '../models/User';
import { Service } from 'typedi';
import { ResponseSchema } from 'routing-controllers-openapi';
import { AppService } from '../../core/services/AppService';

@JsonController('/users')
@Service()
export class UserController {
  constructor(public appService: AppService) {}
  @Get('/', { transformResponse: false })
  @ResponseSchema(User)
  async getAll(): Promise<User[]> {
    const em = this.appService.getEntityManager();
    const result = await (
      await em.getRepository<User>('User').findAll()
    ).sort((user1, user2) => user1.id - user2.id);
    return result;
  }

  @Get('/:id', { transformResponse: false })
  @OnNull(404)
  @ResponseSchema(User)
  async getOne(@Param('id') id: number): Promise<User | null> {
    const em = this.appService.getEntityManager();
    return await em.getRepository<User>('User').findOne({ id });
  }

  @Post('/', { transformResponse: false })
  @ResponseSchema(User)
  async post(@Body() user: UserPost): Promise<User> {
    const em = this.appService.getEntityManager();
    const userBdd = new User();
    wrap(userBdd).assign(user);
    await em.persistAndFlush(userBdd);
    return userBdd;
  }

  @Put('/:id', { transformResponse: false })
  @ResponseSchema(User)
  async put(@Param('id') id: number, @Body() user: UserPut): Promise<User> {
    const em = this.appService.getEntityManager();
    const result = await em
      .getRepository<User>('User')
      .findOneOrFail({ id }, { failHandler: () => new NotFoundError() });
    wrap(result).assign(user);
    await em.persistAndFlush(result);
    return result;
  }

  @Delete('/:id', { transformResponse: false })
  @ResponseSchema(User)
  async remove(@Param('id') id: number) {
    const em = this.appService.getEntityManager();
    const result = await em
      .getRepository<User>('User')
      .findOneOrFail({ id }, { failHandler: () => new NotFoundError() });
    em.removeAndFlush(result);
    return result;
  }
}
