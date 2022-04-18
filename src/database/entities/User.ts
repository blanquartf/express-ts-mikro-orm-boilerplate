import { Entity, Property, Unique } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';

import { IsAlpha, IsEmail } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @Property({ nullable: false })
  @Unique()
  @IsAlpha()
  login: string;

  @Property({ nullable: false, hidden: true })
  password: string;

  @Property({ nullable: false })
  @Unique()
  @IsEmail()
  email: string;

  constructor() {
    super();
  }
}
