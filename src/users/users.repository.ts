import IUser from "./interfaces/users.interface";
import { IUsersRepository } from "./interfaces/users.repository.interface";
import { nanoid } from 'nanoid';
import db from '../db';

export class UsersRepository implements IUsersRepository {
  async findAll(): Promise<IUser[]> {
    return Promise.resolve(db.get('users').value());
  }
  save(user: IUser): Promise<IUser> {
    const userToAdd = {
      id: nanoid(10),
      ...user
    };
    db.get('users').push(userToAdd);
    db.save();
    return Promise.resolve(userToAdd);
  }
  findById(id: string): Promise<IUser> {
    return Promise.resolve(db.get('users').filter(user => user.id === id).value());
  }
}