import React from "react";
import { Form } from "react-bootstrap";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CustomFormGroupProps {
  controlId: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  type?: string;
}

const CustomFormGroup: React.FC<CustomFormGroupProps> = ({
  controlId,
  label,
  placeholder,
  register,
  error,
  className,
  type,
}) => {
  return (
    <Form.Group className={className} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...register}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default CustomFormGroup;
