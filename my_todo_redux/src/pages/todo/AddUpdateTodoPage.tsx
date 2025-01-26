import React, { useCallback } from "react";
import AddUpdateTodoComponent from "./components/AddUpdateTodoComponent";
import { useAddUpdateTodoHelper } from "./helpers/AddUpdateTodoHelper";
import { TodoModel } from "../../models/todo/TodoModel";
import { showToast } from "../../utils/CustomToast";
import { TodoType } from "../../utils/Constants";
import Loader from "../../core/components/Loader";

const AddUpdateTodoPage: React.FC = () => {
  const {
    type,
    title,
    todoDetails,
    buttonText,
    navigate,
    callAddTodoApi,
    callUpdateTodoApi,
    isLoading,
  } = useAddUpdateTodoHelper();

  const handleSubmitCLick = useCallback(
    (request: TodoModel) => {
      if (type === TodoType.ADD) {
        callAddTodoApi(request, {
          onSuccess: (response) => {
            showToast(response.message);
            navigate(-1);
          },
          onError: (error) => {
            showToast(error.message);
          },
        });
      }
      if (type === TodoType.UPDATE) {
        callUpdateTodoApi(request, {
          onSuccess: (response) => {
            showToast(response.message);
            navigate(-1);
          },
          onError: (error) => {
            showToast(error.message);
          },
        });
      }
    },
    [callAddTodoApi, callUpdateTodoApi, navigate, type]
  );

  return (
    <>
      <AddUpdateTodoComponent
        type={type}
        title={title}
        buttonText={buttonText}
        todoDetails={todoDetails}
        onSubmitClick={handleSubmitCLick}
      />
      {isLoading ? <Loader /> : null}
    </>
  );
};

export default AddUpdateTodoPage;
