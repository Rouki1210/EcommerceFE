import React from "react";
import { tw } from "../theme";

/**
 * Section component: Đóng gói layout section chuẩn.
 * Props: children, className
 */
const Section = ({ children, className = "", ...props }) => (
  <section className={`${tw.section} ${className}`} {...props}>
    {children}
  </section>
);

export default Section;
