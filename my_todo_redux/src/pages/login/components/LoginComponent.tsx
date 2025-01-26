import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button } from "react-bootstrap";
import { LoginRequest } from "../../../models/auth/LoginRequest";

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// TypeScript type for form data
type LoginFormInputs = z.infer<typeof loginSchema>;

type LoginComponentProps = {
  onSubmitClick: (data: LoginRequest) => void;
};

const LoginComponent = ({ onSubmitClick }: LoginComponentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    onSubmitClick({
      email: data.email,
      password: data.password,
    } as LoginRequest);
  };

  return (
    <div className="form_wrapper">
      {/* Form */}
      <Form className="form_container" onSubmit={handleSubmit(onSubmit)}>
        <div className="h4 mb-2 text-center">Login</div>

        <Form.Group className="form_group" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form_group" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="mb-4" />
        <Button className="w-100" variant="primary" type="submit">
          LOGIN
        </Button>
      </Form>
    </div>
  );
};

export default LoginComponent;
