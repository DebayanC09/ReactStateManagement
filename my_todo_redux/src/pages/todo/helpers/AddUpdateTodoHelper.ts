import { useNavigate, useParams } from "react-router-dom";
import { TodoQuery } from "../../../customquery/todo/TodoQuery";
import { AddUpdateTodoParams } from "../params/AddUpdateTodoParams";
import React, { useEffect, useState } from "react";
import { TodoModel } from "../../../models/todo/TodoModel";
import { AddUpdateTodoResponse } from "../../../models/todo/AddUpdateTodoResponse";
import { TodoDetailsResponse } from "../../../models/todo/TodoDetailsResponse";
import { TodoType } from "../../../utils/Constants";

export const useAddUpdateTodoHelper = () => {
  const { id } = useParams<AddUpdateTodoParams>();
  const navigate = useNavigate();

  const { callAddTodo, isAddTodoLoading } = TodoQuery.useAddTodoMutation();
  const { callUpdateTodo, isUpdateTodoLoading } =
    TodoQuery.useUpdateTodoMutation();
  const { callTodoDetails, isTodoDetailsLoading } =
    TodoQuery.useTodoDetailsQuery();

  const [todoDetails, setTodoDetails] = useState<TodoModel | undefined>();

  const title = React.useMemo(() => (id ? "Update Todo" : "Add Todo"), [id]);
  const buttonText = React.useMemo(() => (id ? "UPDATE" : "ADD"), [id]);
  const type = React.useMemo(() => (id ? TodoType.UPDATE : TodoType.ADD), [id]);

  const callAddTodoApi = React.useCallback(
    (
      request: TodoModel,
      options?: {
        onSuccess?: (response: AddUpdateTodoResponse) => void;
        onError?: (error: Error) => void;
      }
    ) => {
      callAddTodo(request, {
        onSuccess: options?.onSuccess,
        onError: options?.onError,
      });
    },
    [callAddTodo]
  );

  const callUpdateTodoApi = React.useCallback(
    (
      request: TodoModel,
      options?: {
        onSuccess?: (response: AddUpdateTodoResponse) => void;
        onError?: (error: Error) => void;
      }
    ) => {
      callUpdateTodo(request, {
        onSuccess: options?.onSuccess,
        onError: options?.onError,
      });
    },
    [callUpdateTodo]
  );

  const callTodoDetailsApi = React.useCallback(
    (
      id: string,
      options?: {
        onSuccess?: (response: TodoDetailsResponse) => void;
        onError?: (error: Error) => void;
      }
    ) => {
      callTodoDetails(id, {
        onSuccess: (response: TodoDetailsResponse) => {
          setTodoDetails(response.data);
          options?.onSuccess && options.onSuccess(response);
        },
        onError: options?.onError,
      });
    },
    [callTodoDetails]
  );

  const isLoading = React.useMemo(() => {
    return isAddTodoLoading || isUpdateTodoLoading || isTodoDetailsLoading;
  }, [isAddTodoLoading, isUpdateTodoLoading, isTodoDetailsLoading]);

  useEffect(() => {
    if (id && id !== "") {
      callTodoDetailsApi(id);
    }
  }, [id, callTodoDetailsApi]);

  return {
    type,
    title,
    todoDetails,
    buttonText,
    navigate,
    callAddTodoApi,
    callUpdateTodoApi,
    callTodoDetails,
    isLoading,
  };
};
