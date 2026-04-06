import { useMemo } from "react";
import AdminTableComponent from "./AdminTableComponent";
import { createOrderColumns } from "./adminTableColumnFactories";

export default function OrderTable({ orders = [], onStatusChange }) {
  const columns = useMemo(
    () => createOrderColumns({ onStatusChange }),
    [onStatusChange],
  );

  return (
    <AdminTableComponent
      columns={columns}
      rows={orders}
      rowKey={(order, index) =>
        order.id ?? `${order.customer || "order"}-${index}`
      }
      emptyMessage="No orders found"
    />
  );
}
