import { useCallback, useMemo, useState } from "react";

export const normalizeAdminText = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const resolveSelectorValue = (item, selector) => {
  if (typeof selector === "function") {
    return selector(item);
  }

  return item?.[selector];
};

export const matchesAdminSearchFields = (
  item,
  normalizedQuery,
  searchSelectors = [],
) => {
  if (!normalizedQuery) {
    return true;
  }

  return searchSelectors.some((selector) =>
    normalizeAdminText(resolveSelectorValue(item, selector)).includes(
      normalizedQuery,
    ),
  );
};

export const filterAdminItems = (
  items,
  { query = "", searchSelectors = [], predicate = () => true } = {},
) => {
  const safeItems = Array.isArray(items) ? items : [];
  const normalizedQuery = normalizeAdminText(query);

  return safeItems.filter(
    (item) =>
      predicate(item) &&
      matchesAdminSearchFields(item, normalizedQuery, searchSelectors),
  );
};

export const getAdminUniqueOptions = (
  items,
  selector,
  { includeAll = true, allLabel = "All" } = {},
) => {
  const safeItems = Array.isArray(items) ? items : [];
  const uniqueValues = [
    ...new Set(
      safeItems
        .map((item) => resolveSelectorValue(item, selector))
        .filter(Boolean),
    ),
  ];

  if (!includeAll) {
    return uniqueValues;
  }

  return uniqueValues.includes(allLabel)
    ? uniqueValues
    : [allLabel, ...uniqueValues];
};

export function useAdminSelectFilter(initialValue = "All") {
  const [filterValue, setFilterValue] = useState(initialValue);
  const clearFilter = useCallback(() => {
    setFilterValue(initialValue);
  }, [initialValue]);

  return {
    filterValue,
    setFilterValue,
    clearFilter,
  };
}

export function useAdminClearSearchAndFilter(clearSearch, clearFilter) {
  return useCallback(() => {
    clearSearch?.();
    clearFilter?.();
  }, [clearSearch, clearFilter]);
}

export function useAdminSearch(initialValue = "") {
  const [search, setSearch] = useState(initialValue);
  const normalizedSearch = useMemo(() => normalizeAdminText(search), [search]);
  const clearSearch = useCallback(() => {
    setSearch("");
  }, []);

  return {
    search,
    setSearch,
    normalizedSearch,
    hasSearch: Boolean(normalizedSearch),
    clearSearch,
  };
}
