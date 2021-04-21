import { ICommand } from '@nestjs/cqrs';
import { CreateUserDTO } from '../dto/create-user-dto';

export class CreateUserCommand implements ICommand {
  constructor(public readonly data: CreateUserDTO) {}
}
