import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserCommand } from './commands/create-user.command';
import { TYPES } from './interfaces/users.types';
import { GetUserQuery } from './queries/get-user.query';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import usersMockData from './users.mock';
import { CreateUserDTO } from './dto/create-user-dto';
import ROLE from './interfaces/userRole';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        UsersService,
        GetUserQuery,
        CreateUserCommand,
        {
          provide: TYPES.IUsersRepository,
          useValue: {
            findAll: jest.fn().mockImplementation(() => Promise.resolve(usersMockData)),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(TYPES.IUsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should find all users', () => {
    expect(service.getUsers()).resolves.toStrictEqual(usersMockData);
  });

  it('should find one user by her id', () => {
    const randomIndex = Math.floor(usersMockData.length * Math.random());
    const userToFind = usersMockData[randomIndex];

    expect(service.getUser(userToFind.id)).resolves.toStrictEqual([userToFind]);
  });

  it('should add new user', () => {
    const userToAdd: CreateUserDTO = {
      firstName: 'Nobie',
      lastName: 'Uridge',
      email: 'nuridge1@ebay.co.uk',
      password: 'L1uV77xNbKE',
      phone: '635-729-7813',
      username: 'Nobie Uridge',
      role: ROLE.ADMIN,
    };

    expect(service.createUser(userToAdd)).resolves.toContain(userToAdd);
  });
});
