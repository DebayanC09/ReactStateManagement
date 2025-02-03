import { useMutation, useQuery } from "@tanstack/react-query";
import { TodoService } from "../../services/network/todo/TodoService";
import { TodoListResponse } from "../../models/todo/TodoListResponse";
import { AddUpdateTodoResponse } from "../../models/todo/AddUpdateTodoResponse";
import { TodoModel } from "../../models/todo/TodoModel";
import { DeleteResponse } from "../../models/todo/DeleteResponse";
import { DeleteRequest } from "../../models/todo/DeleteRequest";
import { TodoDetailsResponse } from "../../models/todo/TodoDetailsResponse";
import { useCallback, useState } from "react";

const useTodoListQuery = () => {
  const todoListQuery = useQuery<TodoListResponse, Error>({
    queryKey: ["todoList"],
    queryFn: () => TodoService.todoList(),
    enabled: true,
  });

  return {
    callTodoList: todoListQuery.refetch,
    isTodoListLoading: todoListQuery.isPending,
    todoListData: todoListQuery.data,
    todoListError: todoListQuery.error,
  };
};

const useTodoDetailsQuery = () => {
  const [todoId, setTodoId] = useState<string>("");
  const { isLoading, data, error } = useQuery<TodoDetailsResponse, Error>({
    queryKey: ["todoDetails", todoId],
    queryFn: () => TodoService.todoDetails(todoId),
    enabled: todoId !== "",
  });

  const refetchApi = useCallback(
    (
      id: string,
      options?: {
        onSuccess?: (response: AddUpdateTodoResponse) => void;
        onError?: (error: Error) => void;
      }
    ) => {
      setTodoId(id);
      data && options?.onSuccess && options.onSuccess(data);
      error && options?.onError && options.onError(error);
    },
    [data, error]
  );

  return {
    callTodoDetails: refetchApi,
    isTodoDetailsLoading: isLoading,
    todoDetailsData: data,
    todoDetailsError: error,
  };
};

const useAddTodoMutation = () => {
  const addTodoMutation = useMutation<AddUpdateTodoResponse, Error, TodoModel>({
    mutationFn: ({ title, description, dateTime, priority }: TodoModel) =>
      TodoService.addTodo({
        title: title,
        description: description,
        dateTime: dateTime,
        priority: priority,
      }),
  });
  return {
    callAddTodo: addTodoMutation.mutate,
    isAddTodoLoading: addTodoMutation.isPending,
    logiaddTodoData: addTodoMutation.data,
    addTodoError: addTodoMutation.error,
  };
};

const useUpdateTodoMutation = () => {
  const mutation = useMutation<AddUpdateTodoResponse, Error, TodoModel>({
    mutationFn: (todoModel: TodoModel) => TodoService.updateTodo(todoModel),
  });
  return {
    callUpdateTodo: mutation.mutate,
    isUpdateTodoLoading: mutation.isPending,
    updateTodoData: mutation.data,
    updateTodoError: mutation.error,
  };
};

const useDeleteMutation = () => {
  const mutation = useMutation<DeleteResponse, Error, DeleteRequest>({
    mutationFn: (deleteRequest: DeleteRequest) =>
      TodoService.deleteTodo(deleteRequest),
  });
  return {
    callDeleteTodo: mutation.mutate,
    isDeleteTodoLoading: mutation.isPending,
    deleteTodoData: mutation.data,
    deleteTodoError: mutation.error,
  };
};

export const TodoQuery = {
  useTodoListQuery: useTodoListQuery,
  useTodoDetailsQuery: useTodoDetailsQuery,
  useAddTodoMutation: useAddTodoMutation,
  useUpdateTodoMutation: useUpdateTodoMutation,
  useDeleteMutation: useDeleteMutation,
};
