import { User } from "./UserModel";

export interface ProfileResponse {
  statusCode: number;
  message: string;
  status: number;
  data: User;
}
