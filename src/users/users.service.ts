import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { CreateUserDTO } from './dto/create-user-dto';
import IUser from './interfaces/users.interface';
import { IUsersService } from './interfaces/users.service.interface';
import { TYPES } from './interfaces/users.types';
import { GetUserQuery } from './queries/get-user.query';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, @Inject(TYPES.IUsersRepository) private usersRepository: UsersRepository) {

  }
  createUser(user: CreateUserDTO): Promise<IUser> {
    return this.commandBus.execute(new CreateUserCommand(user));
  }
  getUser(id: string): Promise<IUser> {
    return this.queryBus.execute(new GetUserQuery(id))
  }
  getUsers(): Promise<IUser[]> {
    return this.usersRepository.findAll();
    throw new NotImplementedException();
  }
}
