import { useCallback, useMemo } from "react";
import {
  AdminEmptyState,
  AdminErrorState,
  AdminLoadingState,
} from "../../components/feature/admin/AdminListStates";
import { createUserColumns } from "../../components/feature/admin/adminTableColumnFactories";
import AdminTableComponent from "../../components/feature/admin/AdminTableComponent";
import { AdminSearchInput } from "../../components/feature/admin/AdminListToolbar";
import { ADMIN_SEARCH_INPUT_PRESETS } from "../../components/feature/admin/adminToolbarPresets";
import Header from "../../components/feature/admin/Header";
import { getUsers, updateUserStatus, deleteUser } from "../../api/userApi";
import { useAdminAsyncList } from "../../hooks/useAdminAsyncList";
import {
  filterAdminItems,
  useAdminSearch,
} from "../../hooks/useAdminListFilters";

export default function AdminUsers() {
  const {
    items: users,
    setItems: setUsers,
    loading,
    error,
    reload,
  } = useAdminAsyncList(getUsers);
  const { search, setSearch, normalizedSearch, hasSearch, clearSearch } =
    useAdminSearch();

  const filtered = useMemo(
    () =>
      filterAdminItems(users, {
        query: normalizedSearch,
        searchSelectors: [(user) => user.name, (user) => user.email],
      }),
    [users, normalizedSearch],
  );

  const handleToggleStatus = useCallback(
    async (user) => {
      try {
        await updateUserStatus(user.id, !user.active);
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u)),
        );
      } catch (err) {
        alert("Error: " + err.message);
      }
    },
    [setUsers],
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm("Delete this user?")) return;
      try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } catch (err) {
        alert("Error: " + err.message);
      }
    },
    [setUsers],
  );

  const userColumns = useMemo(
    () =>
      createUserColumns({
        onToggleStatus: handleToggleStatus,
        onDelete: handleDelete,
      }),
    [handleToggleStatus, handleDelete],
  );

  const getRowProps = useCallback((_, index) => {
    return {
      className: "hover:bg-slate-50 transition-colors",
      style: { animation: `fadeSlideUp 0.4s ease ${index * 0.07}s both` },
    };
  }, []);

  return (
    <div className="animate-[fadeSlideUp_0.5s_ease_both]">
      <Header title="Users" subtitle="Management" />

      {/* Search */}
      <div className="flex justify-end mb-5 -mt-2">
        <AdminSearchInput
          {...ADMIN_SEARCH_INPUT_PRESETS.users}
          value={search}
          onChange={setSearch}
          showClear={hasSearch}
          onClear={clearSearch}
        />
      </div>

      {loading ? (
        <AdminLoadingState message="Loading users..." />
      ) : error ? (
        <AdminErrorState message={error} onRetry={reload} />
      ) : filtered.length === 0 ? (
        <AdminEmptyState
          icon="🔍"
          title="No users found"
          actionLabel={hasSearch ? "Clear search" : undefined}
          onAction={hasSearch ? clearSearch : undefined}
        />
      ) : (
        <AdminTableComponent
          columns={userColumns}
          rows={filtered}
          rowKey="id"
          getRowProps={getRowProps}
        />
      )}
    </div>
  );
}
