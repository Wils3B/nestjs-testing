import { Test, TestingModule } from '@nestjs/testing';
import { TYPES } from './interfaces/users.types';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import usersMockData from './users.mock';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: TYPES.IUsersService,
        useValue: {
          getUsers: jest.fn().mockImplementation(() => Promise.resolve(usersMockData))
        },
      }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(TYPES.IUsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
