import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserQuery } from './get-user.query';
import { TYPES } from '../interfaces/users.types';
import { IUsersRepository } from '../interfaces/users.repository.interface';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject(TYPES.IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(query: GetUserQuery) {
    const { userId } = query;
    return this.usersRepository.findById(userId);
  }
}
