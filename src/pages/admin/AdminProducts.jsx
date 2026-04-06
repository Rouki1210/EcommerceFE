import { useCallback, useMemo, useState } from "react";
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
import ProductTable from "../../components/feature/admin/ProductTable";
import ProductModal from "../../components/feature/admin/ProductModal";
import Header from "../../components/feature/admin/Header";
import { useNotification } from "../../context/useNotification";
import { useAdminAsyncList } from "../../hooks/useAdminAsyncList";
import {
  filterAdminItems,
  getAdminUniqueOptions,
  useAdminClearSearchAndFilter,
  useAdminSelectFilter,
  useAdminSearch,
} from "../../hooks/useAdminListFilters";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "../../api/productApi";
import {
  ADMIN_FILTER_CHIP_PRESETS,
  ADMIN_PRIMARY_ACTION_BUTTON_PRESETS,
  ADMIN_SEARCH_INPUT_PRESETS,
} from "../../components/feature/admin/adminToolbarPresets";

export default function AdminProducts() {
  const [editing, setEditing] = useState(null);
  const {
    filterValue: filterCat,
    setFilterValue: setFilterCat,
    clearFilter: clearFilterCat,
  } = useAdminSelectFilter("All");
  const { addNotification } = useNotification();
  const {
    items: products,
    setItems: setProducts,
    loading,
    error,
    reload,
  } = useAdminAsyncList(getProducts);
  const { search, setSearch, normalizedSearch, hasSearch, clearSearch } =
    useAdminSearch();
  const clearAllFilters = useAdminClearSearchAndFilter(
    clearSearch,
    clearFilterCat,
  );

  const categories = useMemo(
    () => getAdminUniqueOptions(products, (product) => product.category),
    [products],
  );

  const filtered = useMemo(
    () =>
      filterAdminItems(products, {
        query: normalizedSearch,
        searchSelectors: [
          (product) => product.name,
          (product) => product.category,
        ],
        predicate: (product) =>
          filterCat === "All" || product.category === filterCat,
      }),
    [products, normalizedSearch, filterCat],
  );

  const openAdd = useCallback(() => {
    setEditing({ name: "", price: "", stock: "", category: "" });
  }, []);

  const openEdit = useCallback((p) => {
    setEditing({ ...p });
  }, []);

  const closeModal = useCallback(() => {
    setEditing(null);
  }, []);

  const saveProduct = useCallback(
    async (form) => {
      const isNew = !form.id;
      try {
        let saved;
        if (isNew) {
          saved = await createProduct(form);
          if (form.imageFile && saved?.id) {
            const imgRes = await uploadProductImage(saved.id, form.imageFile);
            saved = { ...saved, image: imgRes.imageUrl };
          }
          setProducts((prev) => [...prev, saved]);
          addNotification({
            type: "product",
            title: "Product Added",
            message: `Admin just added "${saved.name}" to the store`,
            icon: "🛍",
          });
        } else {
          saved = await updateProduct(form.id, form);
          if (form.imageFile) {
            const imgRes = await uploadProductImage(form.id, form.imageFile);
            saved = { ...saved, image: imgRes.imageUrl };
          }
          setProducts((prev) =>
            prev.map((p) => (p.id === form.id ? saved : p)),
          );
          addNotification({
            type: "product",
            title: "Product Updated",
            message: `"${saved.name}" has been updated`,
            icon: "✏️",
          });
        }
      } catch (err) {
        alert("Error: " + err.message);
      }
      closeModal();
    },
    [addNotification, closeModal, setProducts],
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm("Delete this product?")) return;
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        alert("Error: " + err.message);
      }
    },
    [setProducts],
  );

  const headerActions = useMemo(() => {
    const actionPreset = ADMIN_PRIMARY_ACTION_BUTTON_PRESETS.addProduct;

    return (
      <button
        type="button"
        onClick={openAdd}
        className={actionPreset.className}
        style={actionPreset.style}
      >
        {actionPreset.label}
      </button>
    );
  }, [openAdd]);

  return (
    <div className="animate-[fadeSlideUp_0.5s_ease_both]">
      <Header title="Products" subtitle="Management" actions={headerActions} />

      {/* Search + Filter */}
      <div className="flex items-center gap-3 mb-5">
        <AdminSearchInput
          {...ADMIN_SEARCH_INPUT_PRESETS.products}
          value={search}
          onChange={setSearch}
          showClear={hasSearch}
          onClear={clearSearch}
        />
        <AdminFilterChips
          {...ADMIN_FILTER_CHIP_PRESETS.productsCategory}
          options={categories}
          activeValue={filterCat}
          onChange={setFilterCat}
        />
        <AdminListCounter
          filteredCount={filtered.length}
          totalCount={products.length}
          noun="products"
        />
      </div>

      {/* States */}
      {loading ? (
        <AdminLoadingState message="Loading products..." />
      ) : error ? (
        <AdminErrorState message={error} onRetry={reload} />
      ) : filtered.length === 0 ? (
        <AdminEmptyState
          icon="🔍"
          title="No products found"
          actionLabel="Clear filters"
          onAction={clearAllFilters}
        />
      ) : (
        <ProductTable
          products={filtered}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      {editing && (
        <ProductModal
          product={editing}
          onClose={closeModal}
          onSave={saveProduct}
        />
      )}
    </div>
  );
}
