import React from "react";
import { Container, Row } from "react-bootstrap";
import TodoItemComponent from "./TodoItemComponent";
import { TodoModel } from "../../../models/todo/TodoModel";

interface TodoListComponentProps {
  todoList: TodoModel[];
  onEditClick: (item: TodoModel) => void;
  onDeleteClick: (item: TodoModel) => void;
}

const TodoListComponent = ({
  todoList,
  onEditClick,
  onDeleteClick,
}: TodoListComponentProps) => {
  return (
    <Container>
      <Row>
        {todoList.map((item) => (
          <TodoItemComponent
            item={item}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </Row>
    </Container>
  );
};

export default TodoListComponent;
