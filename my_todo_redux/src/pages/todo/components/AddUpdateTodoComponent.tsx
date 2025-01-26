import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { TodoModel } from "../../../models/todo/TodoModel";
import { TodoType } from "../../../utils/Constants";
import { TodoFormInputs } from "../schema/TodoSchema";
import { useAddUpdateTodoComponentHelper } from "../helpers/AddUpdateTodoComponentHelper";
import CustomFormGroup from "../../../core/components/CustomFormGroup";
import CustomButton from "../../../core/components/CustomButton";

type AddUpdateTodoComponentProps = {
  type: TodoType;
  title: string;
  buttonText: string;
  todoDetails?: TodoModel;
  onSubmitClick: (data: TodoModel) => void;
};

const AddUpdateTodoComponent = ({
  type,
  title,
  buttonText,
  todoDetails,
  onSubmitClick,
}: AddUpdateTodoComponentProps) => {
  const { register, handleSubmit, errors, updateFields } =
    useAddUpdateTodoComponentHelper();

  const onSubmit = (data: TodoFormInputs) => {
    if (type === TodoType.ADD) {
      onSubmitClick({
        title: data.title,
        description: data.description,
        dateTime: data.dateTime,
        priority: data.priority,
      });
    } else if (type === TodoType.UPDATE) {
      onSubmitClick({
        _id: todoDetails?._id,
        title: data.title,
        description: data.description,
        dateTime: data.dateTime,
        priority: data.priority,
      });
    }
  };

  useEffect(() => {
    if (todoDetails) {
      updateFields(todoDetails);
    }
  }, [todoDetails, updateFields]);

  return (
    <div className="form_wrapper">
      {/* Form */}
      <Form className="form_container" onSubmit={handleSubmit(onSubmit)}>
        <div className="title">{title}</div>

        <CustomFormGroup
          controlId="title"
          className="form_group"
          label="Title"
          placeholder="Title"
          register={register("title")}
          error={errors.title}
        />

        <CustomFormGroup
          controlId="description"
          className="form_group"
          label="Description"
          placeholder="Description"
          register={register("description")}
          error={errors.description}
        />

        <CustomFormGroup
          controlId="dateTime"
          className="form_group"
          label="Date Time"
          placeholder="Date Time"
          register={register("dateTime")}
          error={errors.dateTime}
        />

        <CustomFormGroup
          controlId="priority"
          className="form_group"
          label="Priority"
          placeholder="Priority"
          register={register("priority")}
          error={errors.priority}
        />

        <div className="mb-4" />

        <CustomButton>{buttonText}</CustomButton>
      </Form>
    </div>
  );
};

export default AddUpdateTodoComponent;
