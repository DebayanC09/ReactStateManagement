import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { TodoModel } from "../../../models/todo/TodoModel";

interface TodoItemProps {
  item: TodoModel;
  onEditClick: (item: TodoModel) => void;
  onDeleteClick: (item: TodoModel) => void;
}

const TodoItemComponent = ({
  item,
  onEditClick,
  onDeleteClick,
}: TodoItemProps) => {
  return (
    <Col key={item._id} sm={12} md={4} className="mb-4">
      <Card className="mb-3">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            {/* Title */}
            <Card.Title className="mb-0">{item.title}</Card.Title>

            {/* Edit and Delete Buttons */}
            <div>
              <Link
                to={`/todo/edit/${item._id}`}
                className="text-primary me-3"
                style={{ fontSize: "1.5rem" }}
              >
                <MdEdit />
              </Link>
              <MdDelete
                className="text-danger"
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
                onClick={() => onDeleteClick(item)}
              />
            </div>
          </div>

          {/* Description */}
          <Card.Text>{item.description}</Card.Text>
          <hr />
          <div className="d-flex justify-content-between">
            <Card.Text className="mb-0">{item.dateTime}</Card.Text>
            <Card.Text className="mb-0">{item.priority}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TodoItemComponent;
