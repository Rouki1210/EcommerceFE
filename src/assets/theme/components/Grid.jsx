import React from "react";
import { tw } from "../theme";

/**
 * Grid component: Đóng gói grid responsive cho card/sản phẩm.
 * Props: children, className
 */
const Grid = ({ children, className = "", ...props }) => (
  <div className={`${tw.gridCards} ${className}`} {...props}>
    {children}
  </div>
);

export default Grid;
