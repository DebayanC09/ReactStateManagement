import {TodoModel} from './TodoModel';

export interface TodoListResponse {
  statusCode: number;
  status: number;
  message: string;
  data: TodoModel[];
}
