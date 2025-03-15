import { DeleteRequest } from "../../../models/todo/DeleteRequest";
import { TodoModel } from "../../../models/todo/TodoModel";
import { Endpoints } from "../../../utils/EndPoints";
import { AxiosClient } from "../AxiosClient";

const todoList = async () => {
  const response = await AxiosClient.get(Endpoints.todoList, {
    withAuth: true,
  });
  return response.data;
};
const todoDetails = async (id: string) => {
  const response = await AxiosClient.get(`${Endpoints.todoDetails}/${id}`, {
    withAuth: true,
    params: {
      id: id,
    },
  });
  return response.data;
};

const addTodo = async ({
  title,
  description,
  dateTime,
  priority,
}: TodoModel) => {
  const response = await AxiosClient.post(
    Endpoints.addTodo,
    {
      title,
      description,
      dateTime,
      priority,
    },
    {
      withAuth: true,
    }
  );
  return response.data;
};

const updateTodo = async (todoModel: TodoModel) => {
  const response = await AxiosClient.post(
    Endpoints.updateTodo,
    {
      todoId: todoModel._id,
      title: todoModel.title,
      description: todoModel.description,
      dateTime: todoModel.dateTime,
      priority: todoModel.priority,
    },
    {
      withAuth: true,
    }
  );
  return response.data;
};

const deleteTodo = async (deleteRequest: DeleteRequest) => {
  const response = await AxiosClient.post(
    Endpoints.deleteTodo,
    {
      todoId: deleteRequest.todoId,
    },
    {
      withAuth: true,
    }
  );
  return response.data;
};

export const TodoService = {
  todoList: todoList,
  todoDetails: todoDetails,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
