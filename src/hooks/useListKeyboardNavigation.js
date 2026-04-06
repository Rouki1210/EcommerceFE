import { useCallback, useEffect, useMemo, useState } from "react";

const clampIndex = (index, maxIndex) => {
  if (maxIndex < 0) {
    return -1;
  }

  return Math.max(-1, Math.min(index, maxIndex));
};

export function useListKeyboardNavigation({
  itemCount = 0,
  initialIndex = -1,
} = {}) {
  const safeCount = Number.isFinite(itemCount)
    ? Math.max(0, Math.floor(itemCount))
    : 0;
  const maxIndex = safeCount > 0 ? safeCount - 1 : -1;

  const [activeIndex, setActiveIndexState] = useState(() =>
    clampIndex(initialIndex, maxIndex),
  );

  useEffect(() => {
    setActiveIndexState((current) => clampIndex(current, maxIndex));
  }, [maxIndex]);

  const setActiveIndex = useCallback(
    (nextIndex) => {
      setActiveIndexState(clampIndex(nextIndex, maxIndex));
    },
    [maxIndex],
  );

  const resetActiveIndex = useCallback(() => {
    setActiveIndexState(-1);
  }, []);

  const moveNext = useCallback(() => {
    setActiveIndexState((current) => clampIndex(current + 1, maxIndex));
  }, [maxIndex]);

  const movePrev = useCallback(() => {
    setActiveIndexState((current) => clampIndex(current - 1, maxIndex));
  }, [maxIndex]);

  const handleArrowNavigation = useCallback(
    (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveNext();
        return true;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        movePrev();
        return true;
      }

      return false;
    },
    [moveNext, movePrev],
  );

  const jumpToFirst = useCallback(() => {
    setActiveIndexState(maxIndex < 0 ? -1 : 0);
  }, [maxIndex]);

  const jumpToLast = useCallback(() => {
    setActiveIndexState(maxIndex);
  }, [maxIndex]);

  return useMemo(
    () => ({
      activeIndex,
      maxIndex,
      setActiveIndex,
      resetActiveIndex,
      moveNext,
      movePrev,
      handleArrowNavigation,
      jumpToFirst,
      jumpToLast,
    }),
    [
      activeIndex,
      maxIndex,
      setActiveIndex,
      resetActiveIndex,
      moveNext,
      movePrev,
      handleArrowNavigation,
      jumpToFirst,
      jumpToLast,
    ],
  );
}
