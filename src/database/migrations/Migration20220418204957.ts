import { Migration } from '@mikro-orm/migrations';

export class Migration20220418204957 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "login" varchar(255) not null, "password" varchar(255) not null, "email" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_login_unique" unique ("login");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
