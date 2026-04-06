import { useMemo } from "react";
import AdminTableComponent from "./AdminTableComponent";
import { createProductColumns } from "./adminTableColumnFactories";

export default function ProductTable({ products = [], onEdit, onDelete }) {
  const columns = useMemo(
    () => createProductColumns({ onEdit, onDelete }),
    [onEdit, onDelete],
  );

  return (
    <AdminTableComponent
      columns={columns}
      rows={products}
      rowKey={(product, index) =>
        product.id ?? `${product.name || "product"}-${index}`
      }
      emptyMessage="No products available"
    />
  );
}
