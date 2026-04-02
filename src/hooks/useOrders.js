import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../api/orderApi";

const ORDER_STATUS_LABELS = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELED: "Cancelled",
  CANCELLED: "Cancelled",
};

const toNumber = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^\d.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const unwrapOrdersPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.orders)) return payload.orders;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.orders)) return payload.data.orders;
  if (Array.isArray(payload?.data?.content)) return payload.data.content;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
};

const normalizeStatus = (rawStatus) => {
  const normalized = String(rawStatus ?? "")
    .trim()
    .replace(/\s+/g, "_")
    .toUpperCase();
  return ORDER_STATUS_LABELS[normalized] ?? "Pending";
};

const resolveDate = (order) =>
  order?.createdAt ??
  order?.created_at ??
  order?.orderDate ??
  order?.order_date ??
  order?.date ??
  null;

const formatDate = (rawDate) => {
  if (!rawDate) return "--";
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return String(rawDate);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const resolveItems = (order) => {
  if (Array.isArray(order?.items)) return order.items;
  if (Array.isArray(order?.orderItems)) return order.orderItems;
  if (Array.isArray(order?.products)) return order.products;
  return [];
};

const resolveProductName = (order, items) => {
  return (
    order?.productName ??
    order?.product ??
    items[0]?.productName ??
    items[0]?.name ??
    items[0]?.product?.name ??
    "Items"
  );
};

const resolveTotal = (order) => {
  return (
    toNumber(order?.totalAmount) ||
    toNumber(order?.total) ||
    toNumber(order?.amount) ||
    toNumber(order?.grandTotal) ||
    toNumber(order?.finalAmount) ||
    0
  );
};

const normalizeOrder = (order, index) => {
  const items = resolveItems(order);
  const rawId =
    order?.id ??
    order?.orderId ??
    order?.orderID ??
    order?.code ??
    order?.number ??
    `TMP-${index + 1}`;
  const id = String(rawId);
  const createdAt = resolveDate(order);

  return {
    id,
    code: id.startsWith("#") ? id : `#${id}`,
    status: normalizeStatus(order?.status),
    total: resolveTotal(order),
    createdAt,
    createdAtLabel: formatDate(createdAt),
    itemsCount: Number(
      order?.itemCount ?? order?.quantity ?? items.length ?? 0,
    ),
    productName: resolveProductName(order, items),
    customerEmail:
      order?.customerEmail ??
      order?.email ??
      order?.userEmail ??
      order?.customer?.email ??
      null,
    raw: order,
  };
};

const filterByCurrentUser = (orders, userEmail) => {
  if (!userEmail) return orders;

  const lowerEmail = userEmail.toLowerCase();
  const hasAnyEmail = orders.some(
    (order) =>
      typeof order.customerEmail === "string" && order.customerEmail.trim(),
  );

  if (!hasAnyEmail) {
    // Some APIs already scope /orders by authenticated user and do not include email.
    return orders;
  }

  return orders.filter(
    (order) =>
      String(order.customerEmail ?? "")
        .toLowerCase()
        .trim() === lowerEmail,
  );
};

export function useOrders() {
  const userEmail = useSelector((state) => state.auth?.user?.email);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const payload = await getOrders();
      const list = unwrapOrdersPayload(payload);
      const normalized = list.map(normalizeOrder);
      setOrders(filterByCurrentUser(normalized, userEmail));
    } catch (err) {
      setOrders([]);
      setError(
        err?.response?.data?.message ??
          err?.message ??
          "Unable to load your orders right now.",
      );
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const summary = useMemo(() => {
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const activeOrders = orders.filter(
      (order) => order.status !== "Delivered" && order.status !== "Cancelled",
    ).length;

    return {
      count: orders.length,
      totalSpent,
      activeOrders,
    };
  }, [orders]);

  return {
    orders,
    loading,
    error,
    summary,
    reload: loadOrders,
  };
}
