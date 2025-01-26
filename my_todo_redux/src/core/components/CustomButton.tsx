import React from "react";
import { Button } from "react-bootstrap";
import "../styles/CustomButton.css";

interface CustomButtonProps {
  className?: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className = "custom_button",
  children,
}) => {
  return (
    <Button className={className} variant="primary" type="submit">
      {children}
    </Button>
  );
};

export default CustomButton;
