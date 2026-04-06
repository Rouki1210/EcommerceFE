import { forwardRef } from "react";
import Box from "./Box";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  root: "relative",
  lineBg: "absolute left-4 top-2 bottom-2 w-px bg-[#ece7e0]",
  lineProgress: "absolute left-4 top-2 w-px bg-[#c8a96e] transition-[height]",
  stepList: "relative flex flex-col gap-5",
  stepItem: "flex items-start gap-3",
  stepDot:
    "relative z-[1] flex h-8 w-8 items-center justify-center rounded-full text-sm",
  stepDotDone: "bg-[#2c2c2c] text-white",
  stepDotActive: "bg-[#c8a96e] text-white",
  stepDotIdle: "border border-[#d7d0c8] bg-white text-[#999]",
  stepText: "pt-0.5",
  stepLabel: "text-sm font-semibold text-[#2c2c2c]",
  stepSub: "text-xs text-[#666]",
});

const toValidStep = (value, totalSteps) => {
  const rawStep = Number.isFinite(value) ? value : 0;
  if (totalSteps <= 1) return 0;
  return Math.min(Math.max(rawStep, 0), totalSteps - 1);
};

const fallbackLabelByIndex = (index) => `Step ${index + 1}`;

const OrderTrackingTimeline = forwardRef(function OrderTrackingTimeline(
  {
    steps,
    currentStep,
    className,
    lineBgClassName,
    lineProgressClassName,
    lineProgressStyle,
    stepListClassName,
    stepItemClassName,
    stepDotClassName,
    stepDotDoneClassName,
    stepDotActiveClassName,
    stepDotIdleClassName,
    stepTextClassName,
    stepLabelClassName,
    stepSubClassName,
    doneIcon = "✓",
    renderStepIcon,
    useVariantStyles,
    ...props
  },
  ref,
) {
  const safeSteps = Array.isArray(steps) ? steps.filter(Boolean) : [];
  const totalSteps = safeSteps.length;

  if (!totalSteps) {
    return null;
  }

  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;
  const safeCurrentStep = toValidStep(currentStep, totalSteps);
  const progressHeight = `${(safeCurrentStep / (totalSteps - 1 || 1)) * 100}%`;

  return (
    <Box
      {...props}
      ref={ref}
      className={cx(shouldUseVariants && styles.root, className)}
    >
      <div
        className={cx(shouldUseVariants && styles.lineBg, lineBgClassName)}
      />

      <div
        className={cx(
          shouldUseVariants && styles.lineProgress,
          lineProgressClassName,
        )}
        style={{ height: progressHeight, ...lineProgressStyle }}
      />

      <Box
        className={cx(shouldUseVariants && styles.stepList, stepListClassName)}
      >
        {safeSteps.map((step, index) => {
          const isDone = index < safeCurrentStep;
          const isActive = index === safeCurrentStep;
          const label = step?.label ?? fallbackLabelByIndex(index);
          const icon = step?.icon ?? String(index + 1);
          const sub = step?.sub ?? "";
          const key = step?.id ?? step?.key ?? `${label}-${index}`;
          const resolvedIcon =
            typeof renderStepIcon === "function"
              ? renderStepIcon({ step, index, isDone, isActive, doneIcon })
              : isDone
                ? doneIcon
                : icon;

          return (
            <Box
              key={key}
              className={cx(
                shouldUseVariants && styles.stepItem,
                stepItemClassName,
              )}
            >
              <Box
                className={cx(
                  shouldUseVariants && styles.stepDot,
                  shouldUseVariants &&
                    (isDone
                      ? styles.stepDotDone
                      : isActive
                        ? styles.stepDotActive
                        : styles.stepDotIdle),
                  stepDotClassName,
                  isDone
                    ? stepDotDoneClassName
                    : isActive
                      ? stepDotActiveClassName
                      : stepDotIdleClassName,
                )}
              >
                {resolvedIcon}
              </Box>

              <Box
                className={cx(
                  shouldUseVariants && styles.stepText,
                  stepTextClassName,
                )}
              >
                <div
                  className={cx(
                    shouldUseVariants && styles.stepLabel,
                    stepLabelClassName,
                  )}
                >
                  {label}
                </div>
                <div
                  className={cx(
                    shouldUseVariants && styles.stepSub,
                    stepSubClassName,
                  )}
                >
                  {sub}
                </div>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

export default OrderTrackingTimeline;
