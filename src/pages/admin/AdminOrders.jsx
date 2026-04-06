import { useCallback, useMemo } from "react";
import {
  AdminEmptyState,
  AdminErrorState,
  AdminLoadingState,
} from "../../components/feature/admin/AdminListStates";
import {
  AdminFilterChips,
  AdminListCounter,
  AdminSearchInput,
} from "../../components/feature/admin/AdminListToolbar";
import OrderTable from "../../components/feature/admin/OrderTable";
import Header from "../../components/feature/admin/Header";
import { useNotification } from "../../context/useNotification";
import { useAdminAsyncList } from "../../hooks/useAdminAsyncList";
import {
  filterAdminItems,
  useAdminClearSearchAndFilter,
  useAdminSelectFilter,
  useAdminSearch,
} from "../../hooks/useAdminListFilters";
import { getOrders, updateOrderStatus } from "../../api/orderApi";
import { ORDER_STATUS_FILTER_OPTIONS } from "../../components/feature/admin/adminStyleConstants";
import {
  ADMIN_SEARCH_INPUT_PRESETS,
  getOrderStatusFilterChipActiveClassName,
  renderOrderStatusFilterChipLabel,
} from "../../components/feature/admin/adminToolbarPresets";

export default function AdminOrders() {
  const {
    filterValue: filterStatus,
    setFilterValue: setFilterStatus,
    clearFilter: clearFilterStatus,
  } = useAdminSelectFilter("All");
  const { addNotification } = useNotification();
  const {
    items: orders,
    setItems: setOrders,
    loading,
    error,
    reload,
  } = useAdminAsyncList(getOrders);
  const { search, setSearch, normalizedSearch, hasSearch, clearSearch } =
    useAdminSearch();
  const clearAllFilters = useAdminClearSearchAndFilter(
    clearSearch,
    clearFilterStatus,
  );

  const filtered = useMemo(
    () =>
      filterAdminItems(orders, {
        query: normalizedSearch,
        searchSelectors: [
          (order) => order.id,
          (order) => order.customer,
          (order) => order.product,
        ],
        predicate: (order) =>
          filterStatus === "All" || order.status === filterStatus,
      }),
    [orders, normalizedSearch, filterStatus],
  );

  const handleStatusChange = useCallback(
    async (id, status) => {
      try {
        await updateOrderStatus(id, status);
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status } : o)),
        );
        addNotification({
          type: "order",
          title: "Order Updated",
          message: `Order #${id} status changed to ${status}`,
          icon: "📦",
        });
      } catch (err) {
        alert("Error: " + err.message);
      }
    },
    [addNotification, setOrders],
  );

  return (
    <div className="animate-[fadeSlideUp_0.5s_ease_both]">
      <Header title="Orders" subtitle="Management" />

      {/* Search + Filter */}
      <div className="flex items-center gap-3 mb-5 -mt-2">
        <AdminSearchInput
          {...ADMIN_SEARCH_INPUT_PRESETS.orders}
          value={search}
          onChange={setSearch}
          showClear={hasSearch}
          onClear={clearSearch}
        />
        <AdminFilterChips
          options={ORDER_STATUS_FILTER_OPTIONS}
          activeValue={filterStatus}
          onChange={setFilterStatus}
          getActiveClassName={getOrderStatusFilterChipActiveClassName}
          renderOptionLabel={renderOrderStatusFilterChipLabel}
        />
        <AdminListCounter
          filteredCount={filtered.length}
          totalCount={orders.length}
          noun="orders"
        />
      </div>

      {loading ? (
        <AdminLoadingState message="Loading orders..." />
      ) : error ? (
        <AdminErrorState message={error} onRetry={reload} />
      ) : filtered.length === 0 ? (
        <AdminEmptyState
          icon="🔍"
          title="No orders found"
          actionLabel="Clear filters"
          onAction={clearAllFilters}
        />
      ) : (
        <OrderTable orders={filtered} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
}
