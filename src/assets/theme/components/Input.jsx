import React from "react";
import TextField from "@mui/material/TextField";

/**
 * Base Input component using MUI TextField, with Tailwind support via className prop.
 * Usage: <Input label="Name" className="your-tailwind-class" />
 */
const Input = ({ className = "", ...props }) => {
  return <TextField {...props} className={className} fullWidth />;
};

export default Input;
