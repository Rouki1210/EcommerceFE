import React from "react";
import ButtonMui from "@mui/material/Button";

/**
 * Base Button component using MUI, with Tailwind support via className prop.
 * Usage: <Button color="primary" className="your-tailwind-class">Text</Button>
 */
const Button = ({ children, className = "", ...props }) => {
  return (
    <ButtonMui
      variant={props.variant || "contained"}
      disableElevation
      {...props}
      className={className}
    >
      {children}
    </ButtonMui>
  );
};

export default Button;
