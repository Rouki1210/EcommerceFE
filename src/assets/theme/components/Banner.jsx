import React from "react";
import { tw } from "../theme";

/**
 * Banner component: Hiển thị banner đầu trang với title, subtitle, children.
 * Props: title, subtitle, children, className
 */
const Banner = ({ title, subtitle, children, className = "", ...props }) => (
  <div className={`${tw.banner} ${className}`} {...props}>
    {title && <h1 className={tw.headingLg}>{title}</h1>}
    {subtitle && <div className={tw.subtitle}>{subtitle}</div>}
    {children}
  </div>
);

export default Banner;
