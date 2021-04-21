import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/create-user.handler';
import { TYPES } from './interfaces/users.types';
import { GetUserHandler } from './queries/get-user.handler';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    {
      provide: TYPES.IUsersService,
      useClass: UsersService,
    },
    {
      provide: TYPES.IUsersRepository,
      useClass: UsersRepository,
    },
    CreateUserHandler,
    GetUserHandler,
  ],
})
export class UsersModule {}
