import ROLE from './userRole';

export default interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  role?: ROLE;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
