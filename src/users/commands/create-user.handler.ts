import * as bcrypt from 'bcrypt';
import { ICommandHandler, EventBus, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TYPES } from '../interfaces/users.types';
import { IUsersRepository } from '../interfaces/users.repository.interface';
import { CreateUserCommand } from './create-user.command';
import ROLE from '../interfaces/userRole';
import { SALT_ROUNDS } from '../constants';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(TYPES.IUsersRepository)
    private readonly usersRepository: IUsersRepository,
    public readonly eventBus: EventBus,
  ) {}

  async encryptPassword(password: string) {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async execute(command: CreateUserCommand) {
    const { password, role = ROLE.MEMBER } = command.data;
    const user = { ...command.data, role, password: await this.encryptPassword(password) };
    try {
      return this.usersRepository.save(user);
    } catch (err) {
      throw err;
    }
  }
}
