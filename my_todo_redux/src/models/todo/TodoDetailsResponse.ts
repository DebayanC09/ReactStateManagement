import { TodoModel } from "./TodoModel";

export interface TodoDetailsResponse {
  statusCode: number;
  status: number;
  message: string;
  data: TodoModel;
}
