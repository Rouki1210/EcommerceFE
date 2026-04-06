import { useCallback, useEffect, useState } from "react";

export function useAdminAsyncList(fetcher, initialItems = []) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetcher();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    items,
    setItems,
    loading,
    error,
    setError,
    reload,
  };
}
