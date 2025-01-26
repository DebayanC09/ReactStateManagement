import {TodoModel} from './TodoModel';

export interface AddUpdateTodoResponse {
  statusCode: number;
  status: number;
  message: string;
  data: TodoModel;
}
