import ROLE from '../interfaces/userRole';

export class CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  role: ROLE;
}
