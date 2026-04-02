import React from "react";
import { tw } from "../theme";

/**
 * FilterBar: Thanh filter với các button preset.
 * Props: options [{label, value}], selected, onSelect, className
 */
const FilterBar = ({
  options,
  selected,
  onSelect,
  className = "",
  ...props
}) => (
  <div
    className={`flex gap-3 flex-wrap justify-center ${className}`}
    {...props}
  >
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        className={
          selected === opt.value
            ? "filter-button-active"
            : "filter-button-inactive"
        }
        onClick={() => onSelect(opt.value)}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

export default FilterBar;
