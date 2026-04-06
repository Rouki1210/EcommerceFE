import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const normalizeCatalogText = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

export const getCatalogCategoryName = (category) =>
  typeof category === "object" ? category?.name : category;

export const getCatalogCategoriesFromProducts = (
  products,
  { includeAll = true, allLabel = "All" } = {},
) => {
  const safeProducts = Array.isArray(products) ? products : [];
  const uniqueCategories = [
    ...new Set(
      safeProducts
        .map((product) => getCatalogCategoryName(product?.category))
        .filter(Boolean),
    ),
  ];

  if (!includeAll) {
    return uniqueCategories;
  }

  return uniqueCategories.includes(allLabel)
    ? uniqueCategories
    : [allLabel, ...uniqueCategories];
};

export const matchesCatalogCategory = (product, activeCategory = "All") => {
  if (activeCategory === "All") {
    return true;
  }

  return getCatalogCategoryName(product?.category) === activeCategory;
};

export const matchesCatalogProductQuery = (product, normalizedQuery) => {
  if (!normalizedQuery) {
    return true;
  }

  const categoryName = getCatalogCategoryName(product?.category);

  return (
    normalizeCatalogText(product?.name).includes(normalizedQuery) ||
    normalizeCatalogText(categoryName).includes(normalizedQuery) ||
    normalizeCatalogText(product?.variant).includes(normalizedQuery)
  );
};

export const getCatalogSuggestions = (products, normalizedQuery, limit = 6) => {
  if (!normalizedQuery) {
    return [];
  }

  const safeProducts = Array.isArray(products) ? products : [];

  return safeProducts
    .filter((product) => matchesCatalogProductQuery(product, normalizedQuery))
    .slice(0, limit);
};

export const filterCatalogProducts = (
  products,
  { activeCategory = "All", normalizedQuery = "" } = {},
) => {
  const safeProducts = Array.isArray(products) ? products : [];

  return safeProducts.filter(
    (product) =>
      matchesCatalogCategory(product, activeCategory) &&
      matchesCatalogProductQuery(product, normalizedQuery),
  );
};

const withAllCategory = (categories) => {
  const safeCategories = Array.isArray(categories)
    ? categories.filter(Boolean)
    : [];

  return safeCategories.includes("All")
    ? safeCategories
    : ["All", ...safeCategories];
};

export function useCatalogSearchAndCategory({
  categories,
  initialCategory = "All",
  initialQuery = "",
  syncSearchWithUrl = true,
  syncCategoryWithUrl = true,
  searchParamKey = "q",
  categoryParamKey = "category",
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (mutateParams, options = { replace: true }) => {
      setSearchParams((currentSearchParams) => {
        const nextSearchParams = new URLSearchParams(currentSearchParams);
        mutateParams(nextSearchParams);
        return nextSearchParams;
      }, options);
    },
    [setSearchParams],
  );

  const categoriesWithAll = useMemo(
    () => withAllCategory(categories),
    [categories],
  );

  const resolveInitialCategory = useCallback(() => {
    const fallbackCategory = categoriesWithAll.includes(initialCategory)
      ? initialCategory
      : "All";

    if (!syncCategoryWithUrl) {
      return fallbackCategory;
    }

    const urlCategory = searchParams.get(categoryParamKey);
    return categoriesWithAll.includes(urlCategory)
      ? urlCategory
      : fallbackCategory;
  }, [
    categoriesWithAll,
    initialCategory,
    syncCategoryWithUrl,
    searchParams,
    categoryParamKey,
  ]);

  const [activeCategory, setActiveCategoryState] = useState(
    resolveInitialCategory,
  );

  useEffect(() => {
    if (!syncCategoryWithUrl) return;
    setActiveCategoryState(resolveInitialCategory());
  }, [resolveInitialCategory, syncCategoryWithUrl]);

  const [localQuery, setLocalQuery] = useState(() =>
    syncSearchWithUrl ? "" : String(initialQuery ?? ""),
  );

  useEffect(() => {
    if (syncSearchWithUrl) {
      return;
    }

    setLocalQuery(String(initialQuery ?? ""));
  }, [syncSearchWithUrl, initialQuery]);

  const query = syncSearchWithUrl
    ? (searchParams.get(searchParamKey) ?? "")
    : localQuery;
  const normalizedQuery = useMemo(() => normalizeCatalogText(query), [query]);

  const setActiveCategory = useCallback(
    (nextCategory, options = { replace: true }) => {
      setActiveCategoryState(nextCategory);

      if (!syncCategoryWithUrl) {
        return;
      }

      updateSearchParams((params) => {
        if (nextCategory === "All") {
          params.delete(categoryParamKey);
        } else {
          params.set(categoryParamKey, nextCategory);
        }
      }, options);
    },
    [syncCategoryWithUrl, categoryParamKey, updateSearchParams],
  );

  const setQuery = useCallback(
    (nextQuery, options = { replace: true }) => {
      if (!syncSearchWithUrl) {
        setLocalQuery(String(nextQuery ?? ""));
        return;
      }

      const trimmedQuery = String(nextQuery ?? "").trim();

      updateSearchParams((params) => {
        if (trimmedQuery) {
          params.set(searchParamKey, trimmedQuery);
        } else {
          params.delete(searchParamKey);
        }
      }, options);
    },
    [syncSearchWithUrl, searchParamKey, updateSearchParams],
  );

  return {
    searchParams,
    setSearchParams,
    categoriesWithAll,
    activeCategory,
    setActiveCategory,
    query,
    normalizedQuery,
    setQuery,
  };
}

export function useCatalogNumberParam({
  paramKey,
  allowedValues,
  fallback = null,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (mutateParams, options = { replace: true }) => {
      setSearchParams((currentSearchParams) => {
        const nextSearchParams = new URLSearchParams(currentSearchParams);
        mutateParams(nextSearchParams);
        return nextSearchParams;
      }, options);
    },
    [setSearchParams],
  );

  const safeAllowedValues = useMemo(
    () =>
      Array.isArray(allowedValues)
        ? allowedValues.filter((value) => Number.isFinite(value))
        : [],
    [allowedValues],
  );

  const rawValue = Number(searchParams.get(paramKey));
  const value =
    Number.isFinite(rawValue) &&
    (safeAllowedValues.length === 0 || safeAllowedValues.includes(rawValue))
      ? rawValue
      : fallback;

  const setValue = useCallback(
    (nextValue, options = { replace: true }) => {
      updateSearchParams((params) => {
        if (nextValue === null || nextValue === undefined || nextValue === "") {
          params.delete(paramKey);
        } else {
          params.set(paramKey, String(nextValue));
        }
      }, options);
    },
    [paramKey, updateSearchParams],
  );

  return {
    value,
    setValue,
    searchParams,
    setSearchParams,
  };
}
