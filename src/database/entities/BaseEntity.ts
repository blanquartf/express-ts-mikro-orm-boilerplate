import { PrimaryKey, Property } from '@mikro-orm/core';
import { IsNumber } from 'class-validator';

export abstract class BaseEntity {
  @PrimaryKey()
  @IsNumber()
  id!: number;

  @Property({ hidden: true })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), hidden: true })
  updatedAt: Date = new Date();
}
