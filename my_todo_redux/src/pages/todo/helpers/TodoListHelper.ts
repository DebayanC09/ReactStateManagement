import React, { useEffect, useState } from "react";
import { TodoQuery } from "../../../customquery/todo/TodoQuery";
import { TodoModel } from "../../../models/todo/TodoModel";
import { DeleteResponse } from "../../../models/todo/DeleteResponse";
import { useNavigate } from "react-router-dom";

export const useTodoListHelper = () => {
  const { callTodoList, isTodoListLoading, todoListData } =
    TodoQuery.useTodoListQuery();
  const { callDeleteTodo, isDeleteTodoLoading } = TodoQuery.useDeleteMutation();
  const [todoList, setTodoList] = useState<TodoModel[]>(
    todoListData?.data || []
  );

  const navigate = useNavigate();

  const callDeleteTodoApi = React.useCallback(
    (
      todoId: string,
      options?: {
        onSuccess?: (response: DeleteResponse) => void;
        onError?: (error: Error) => void;
      }
    ) => {
      callDeleteTodo(
        { todoId: todoId },
        {
          onSuccess: (response: DeleteResponse) => {
            setTodoList(todoList.filter((todo) => todo._id !== todoId));
            options?.onSuccess && options.onSuccess(response);
          },
          onError: (error: Error) => {
            options?.onError && options.onError(error);
          },
        }
      );
    },
    [callDeleteTodo, todoList]
  );

  const isLoading = React.useMemo(() => {
    return isTodoListLoading || isDeleteTodoLoading;
  }, [isTodoListLoading, isDeleteTodoLoading]);

  useEffect(() => {
    setTodoList(todoListData?.data || []);
  }, [todoListData?.data]);

  return {
    navigate,
    isLoading,
    callTodoListApi: callTodoList,
    todoList,
    callDeleteTodoApi,
  };
};
