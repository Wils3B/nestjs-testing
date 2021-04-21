import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { IUsersService } from './interfaces/users.service.interface';
import { TYPES } from './interfaces/users.types';

@Controller('users')
export class UsersController {
  constructor(@Inject(TYPES.IUsersService) private readonly usersService: IUsersService) {}

  @Get('/')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Post('/')
  saveUser(@Body() user: CreateUserDTO) {
    return this.usersService.createUser(user);
  }
}
