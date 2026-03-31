import React from "react";
import BoxMui from "@mui/material/Box";

/**
 * Base Box component using MUI, with Tailwind support via className prop.
 * Usage: <Box className="p-4">...</Box>
 */
const Box = ({ className = "", ...props }) => {
  return <BoxMui {...props} className={className} />;
};

export default Box;
