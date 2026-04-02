import React from "react";
import { tw } from "../theme";

/**
 * TypographyBase: Heading, Subtitle, Caption, Label, Body
 * Props: variant (headingLg, headingMd, headingSm, subtitle, caption, label), children, className
 */
const TypographyBase = ({
  variant = "body",
  children,
  className = "",
  ...props
}) => {
  const variantClass = tw[variant] || "";
  return (
    <span className={`${variantClass} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default TypographyBase;
