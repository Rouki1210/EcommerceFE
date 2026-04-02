import React from "react";
import CardMui from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

/**
 * Base Card component using MUI, with Tailwind support via className prop.
 * Usage: <Card className="your-tailwind-class"><CardContent>...</CardContent></Card>
 */
const Card = ({ children, className = "", ...props }) => {
  return (
    <CardMui {...props} className={className}>
      {children}
    </CardMui>
  );
};

export { Card, CardContent };
