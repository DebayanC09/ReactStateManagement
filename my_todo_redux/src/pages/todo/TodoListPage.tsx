import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useTodoListHelper } from "./helpers/TodoListHelper";
import TodoListComponent from "./components/TodoListComponent";
import { TodoModel } from "../../models/todo/TodoModel";
import { showToast } from "../../utils/CustomToast";
import { DeleteResponse } from "../../models/todo/DeleteResponse";
import Loader from "../../core/components/Loader";
import "./styles/TodoListPage.css";

const TodoListPage: React.FC = () => {
  const { navigate, isLoading, todoList, callDeleteTodoApi } =
    useTodoListHelper();

  const handleDeleteTodo = useCallback(
    (item: TodoModel) => {
      callDeleteTodoApi(item._id || "", {
        onSuccess: (response: DeleteResponse) => {
          showToast(response.message);
        },
        onError: (error: Error) => {
          showToast(error.message);
        },
      });
    },
    [callDeleteTodoApi]
  );

  return (
    <div>
      <div className="add-todo-container">
        <Link to="/todo/new" className="add-todo-button">
          Add Todo
        </Link>
      </div>
      <TodoListComponent
        todoList={todoList}
        onEditClick={(todo: TodoModel) => {
          navigate(`/todo/edit/${todo._id}`);
        }}
        onDeleteClick={handleDeleteTodo}
      />
      {isLoading ? <Loader /> : null}
    </div>
  );
};

export default TodoListPage;
