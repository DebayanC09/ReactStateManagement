import {User} from './UserModel';

export interface LoginResponse {
  statusCode: number;
  message: string;
  status: number;
  user: User;
}
