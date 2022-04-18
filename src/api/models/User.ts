import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';

export class UserPost {
  @IsAlphanumeric()
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UserPut {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
