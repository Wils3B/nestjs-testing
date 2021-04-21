import IUser from '../interfaces/users.interface';

export interface IUsersRepository {
  findAll(): Promise<Array<IUser>>,
  save(user: IUser): Promise<IUser>,
  findById(id: string): Promise<IUser>,
};
