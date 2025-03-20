import React, { useCallback } from "react";
import AddUpdateTodoComponent from "./components/AddUpdateTodoComponent";
import { useAddUpdateTodoHelper } from "./helpers/AddUpdateTodoHelper";
import { TodoModel } from "../../models/todo/TodoModel";
import { showToast } from "../../utils/CustomToast";
import { TodoType } from "../../utils/Constants";
import Loader from "../../core/components/Loader";
import EmptyPlaceHolder from "../../core/components/EmptyPlaceHolder";

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
            navigate(`/todo`);
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
            navigate(`/todo`);
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
    <div className="page-container">
      {type === TodoType.ADD || (type === TodoType.UPDATE && todoDetails) ? (
        <AddUpdateTodoComponent
          type={type}
          title={title}
          buttonText={buttonText}
          todoDetails={todoDetails}
          onSubmitClick={handleSubmitCLick}
        />
      ) : null}
      {type === TodoType.UPDATE && !todoDetails && !isLoading ? (
        <EmptyPlaceHolder />
      ) : null}
      {isLoading ? <Loader /> : null}
    </div>
  );
};

export default AddUpdateTodoPage;
