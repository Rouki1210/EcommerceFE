import { forwardRef } from "react";
import Button from "./Button";
import FilterBar from "./FilterBar";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  root: "rounded-2xl border border-[#ece7e0] bg-white p-3",
  row: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
  searchWrap: "flex-1",
  searchInput:
    "w-full rounded-xl border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-[#2c2c2c] outline-none transition focus:border-[#c8a96e]",
  filters: "flex flex-wrap items-center gap-2",
  filterButton: "rounded-full px-3 py-1.5 text-xs font-medium",
  filterButtonActive: "bg-[#2c2c2c] text-white",
  filterButtonIdle: "bg-[#f5f0eb] text-[#2c2c2c]",
});

const OrderHistoryFilterBar = forwardRef(function OrderHistoryFilterBar(
  {
    searchValue,
    onSearchValueChange,
    searchPlaceholder,
    searchAriaLabel = "Search orders",
    statusOptions,
    activeStatus,
    onStatusChange,
    className,
    rowClassName,
    searchWrapClassName,
    searchInputClassName,
    filtersClassName,
    buttonClassName,
    activeButtonClassName,
    idleButtonClassName,
    showStatusFilters = true,
    useVariantStyles,
    ...props
  },
  ref,
) {
  const safeStatusOptions = Array.isArray(statusOptions) ? statusOptions : [];
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;

  return (
    <FilterBar
      {...props}
      ref={ref}
      className={cx(shouldUseVariants && styles.root, className)}
    >
      <div className={cx(shouldUseVariants && styles.row, rowClassName)}>
        <div
          className={cx(
            shouldUseVariants && styles.searchWrap,
            searchWrapClassName,
          )}
        >
          <input
            type="search"
            value={searchValue ?? ""}
            onChange={(event) => onSearchValueChange?.(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchAriaLabel}
            className={cx(
              shouldUseVariants && styles.searchInput,
              searchInputClassName,
            )}
          />
        </div>

        {showStatusFilters ? (
          <div
            className={cx(
              shouldUseVariants && styles.filters,
              filtersClassName,
            )}
          >
            {safeStatusOptions.map((status) => {
              const isActive = status === activeStatus;

              return (
                <Button
                  key={status}
                  type="button"
                  onClick={() => onStatusChange?.(status)}
                  className={cx(
                    shouldUseVariants && styles.filterButton,
                    shouldUseVariants &&
                      (isActive
                        ? styles.filterButtonActive
                        : styles.filterButtonIdle),
                    buttonClassName,
                    isActive ? activeButtonClassName : idleButtonClassName,
                  )}
                >
                  {status}
                </Button>
              );
            })}
          </div>
        ) : null}
      </div>
    </FilterBar>
  );
});

export default OrderHistoryFilterBar;
