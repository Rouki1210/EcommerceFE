import { useState } from "react";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
  rootClassName,
  buttonClassName,
  iconClassName,
  bodyClassName,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={rootClassName}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={buttonClassName}
      >
        <span>{title}</span>
        <span
          className={cx(iconClassName)}
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>

      <div
        className={bodyClassName}
        style={{ maxHeight: open ? "1000px" : "0" }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
