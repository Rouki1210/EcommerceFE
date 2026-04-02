import Box from "./Box";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const toValidStep = (value, totalSteps) => {
  const rawStep = Number.isFinite(value) ? value : 0;
  if (totalSteps <= 1) return 0;
  return Math.min(Math.max(rawStep, 0), totalSteps - 1);
};

export default function OrderTrackingTimeline({
  steps,
  currentStep,
  className,
  lineBgClassName,
  lineProgressClassName,
  stepListClassName,
  stepItemClassName,
  stepDotClassName,
  stepDotDoneClassName,
  stepDotActiveClassName,
  stepDotIdleClassName,
  stepTextClassName,
  stepLabelClassName,
  stepSubClassName,
}) {
  const totalSteps = Array.isArray(steps) ? steps.length : 0;

  if (!totalSteps) {
    return null;
  }

  const safeCurrentStep = toValidStep(currentStep, totalSteps);
  const progressHeight = `${(safeCurrentStep / (totalSteps - 1 || 1)) * 100}%`;

  return (
    <Box className={className}>
      <div className={lineBgClassName} />

      <div
        className={lineProgressClassName}
        style={{ height: progressHeight }}
      />

      <Box className={stepListClassName}>
        {steps.map((step, index) => {
          const isDone = index < safeCurrentStep;
          const isActive = index === safeCurrentStep;

          return (
            <Box key={step.label} className={stepItemClassName}>
              <Box
                className={cx(
                  stepDotClassName,
                  isDone
                    ? stepDotDoneClassName
                    : isActive
                      ? stepDotActiveClassName
                      : stepDotIdleClassName,
                )}
              >
                {isDone ? "✓" : step.icon}
              </Box>

              <Box className={stepTextClassName}>
                <div className={stepLabelClassName}>{step.label}</div>
                <div className={stepSubClassName}>{step.sub}</div>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
