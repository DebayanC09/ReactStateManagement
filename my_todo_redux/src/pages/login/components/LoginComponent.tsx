import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "react-bootstrap";
import { LoginRequest } from "../../../models/auth/LoginRequest";
import CustomFormGroup from "../../../core/components/CustomFormGroup";
import CustomButton from "../../../core/components/CustomButton";
import { LoginFormInputs, loginSchema } from "../schema/LoginSchema";

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
      <Form className="form_container" onSubmit={handleSubmit(onSubmit)}>
        <div className="title">Login</div>

        <CustomFormGroup
          controlId="email"
          className="form_group"
          label="Email"
          placeholder="Email"
          register={register("email")}
          error={errors.email}
        />

        <CustomFormGroup
          controlId="password"
          className="form_group"
          label="Password"
          type="password"
          placeholder="Password"
          register={register("password")}
          error={errors.password}
        />

        <div className="mb-4" />

        <CustomButton>{"LOGIN"}</CustomButton>
      </Form>
    </div>
  );
};

export default LoginComponent;
