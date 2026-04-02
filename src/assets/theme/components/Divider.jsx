import React from "react";
import DividerMui from "@mui/material/Divider";

/**
 * Base Divider component using MUI, with Tailwind support via className prop.
 * Usage: <Divider className="my-4" />
 */
const Divider = ({ className = "", ...props }) => {
  return <DividerMui {...props} className={className} />;
};

export default Divider;
