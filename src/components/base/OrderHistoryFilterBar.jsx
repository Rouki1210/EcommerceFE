import Button from "./Button";
import FilterBar from "./FilterBar";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function OrderHistoryFilterBar({
  searchValue,
  onSearchValueChange,
  searchPlaceholder,
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
}) {
  return (
    <FilterBar className={className}>
      <div className={rowClassName}>
        <div className={searchWrapClassName}>
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchValueChange(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label="Search orders"
            className={searchInputClassName}
          />
        </div>

        <div className={filtersClassName}>
          {statusOptions.map((status) => {
            const isActive = status === activeStatus;

            return (
              <Button
                key={status}
                type="button"
                onClick={() => onStatusChange(status)}
                className={cx(
                  buttonClassName,
                  isActive ? activeButtonClassName : idleButtonClassName,
                )}
              >
                {status}
              </Button>
            );
          })}
        </div>
      </div>
    </FilterBar>
  );
}
