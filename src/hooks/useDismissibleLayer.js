import { useEffect, useRef } from "react";

const toRefList = (outsidePressRef) => {
  if (!outsidePressRef) {
    return [];
  }

  return (
    Array.isArray(outsidePressRef) ? outsidePressRef : [outsidePressRef]
  ).filter(Boolean);
};

export function useDismissibleLayer({
  isOpen = true,
  onDismiss,
  closeOnEscape = true,
  closeOnOutsidePress = false,
  outsidePressRef,
  outsidePressEvent = "mousedown",
  lockBodyScroll = false,
  initialFocusRef,
}) {
  const dismissRef = useRef(onDismiss);

  useEffect(() => {
    dismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    if (typeof document === "undefined") {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const refs = toRefList(outsidePressRef);

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && closeOnEscape) {
        dismissRef.current?.();
      }
    };

    const handleOutsidePress = (event) => {
      if (!closeOnOutsidePress || refs.length === 0) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      const eventPath =
        typeof event.composedPath === "function" ? event.composedPath() : null;

      const clickedInside = refs.some((ref) => {
        const node = ref?.current;
        if (!(node instanceof Node)) {
          return false;
        }

        if (eventPath) {
          return eventPath.includes(node);
        }

        return node.contains(target);
      });

      if (!clickedInside) {
        dismissRef.current?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    if (closeOnOutsidePress) {
      document.addEventListener(outsidePressEvent, handleOutsidePress);
    }

    if (lockBodyScroll) {
      document.body.style.overflow = "hidden";
    }

    initialFocusRef?.current?.focus?.();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (closeOnOutsidePress) {
        document.removeEventListener(outsidePressEvent, handleOutsidePress);
      }

      if (lockBodyScroll) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [
    isOpen,
    closeOnEscape,
    closeOnOutsidePress,
    outsidePressEvent,
    outsidePressRef,
    lockBodyScroll,
    initialFocusRef,
  ]);
}
