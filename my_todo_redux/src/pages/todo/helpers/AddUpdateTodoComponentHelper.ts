import { useForm } from "react-hook-form";
import { TodoFormInputs, todoSchema } from "../schema/TodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoModel } from "../../../models/todo/TodoModel";
import { useCallback } from "react";

export const useAddUpdateTodoComponentHelper = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormInputs>({
    resolver: zodResolver(todoSchema),
  });

  const updateFields = useCallback(
    (todoDetails: TodoModel) => {
      setValue("title", todoDetails.title);
      setValue("description", todoDetails.description);
      setValue("dateTime", todoDetails.dateTime);
      setValue("priority", todoDetails.priority);
    },
    [setValue]
  );

  return {
    register,
    handleSubmit,
    errors,
    updateFields,
  };
};
