import IUser from './users.interface';
import { CreateUserDTO } from '../dto/create-user-dto';

export interface IUsersService {
  createUser(user: CreateUserDTO): Promise<IUser>;
  getUser(id: string): Promise<IUser>;
  getUsers(): Promise<IUser[] | void>;
}
