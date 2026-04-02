import React from "react";
import TypographyMui from "@mui/material/Typography";

/**
 * Base Typography component using MUI, with Tailwind support via className prop.
 * Usage: <Typography variant="h4" className="your-tailwind-class">Text</Typography>
 */
const Typography = ({ className = "", ...props }) => {
  return <TypographyMui {...props} className={className} />;
};

export default Typography;
