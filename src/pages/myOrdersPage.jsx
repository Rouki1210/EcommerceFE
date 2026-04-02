import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { useOrders } from "../hooks/useOrders";
import {
  Box,
  Button,
  EmptyState,
  OrderHistoryCard,
  OrderHistoryFilterBar,
  OrderMetricCard,
  Section,
  tw,
} from "../assets/theme/theme";

const ORDER_STATUS_FILTERS = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const STATUS_CLASS_BY_STATUS = {
  Pending: tw.myOrdersStatusPending,
  Processing: tw.myOrdersStatusProcessing,
  Shipped: tw.myOrdersStatusShipped,
  "Out for Delivery": tw.myOrdersStatusOutForDelivery,
  Delivered: tw.myOrdersStatusDelivered,
  Cancelled: tw.myOrdersStatusCancelled,
};

const TRACKING_STEP_BY_STATUS = {
  Pending: 0,
  Processing: 1,
  Shipped: 2,
  "Out for Delivery": 3,
  Delivered: 4,
  Cancelled: 1,
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const cx = (...classes) => classes.filter(Boolean).join(" ");

const formatCurrency = (amount) =>
  currencyFormatter.format(Number.isFinite(amount) ? amount : 0);

const buildOrderSearchText = (order) =>
  [order.code, order.productName, order.status]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const resolveShippingInfoFromOrder = (order) => {
  const raw = order?.raw ?? {};
  const shippingBlock =
    raw?.shippingInfo ??
    raw?.shippingAddress ??
    raw?.shipping ??
    raw?.deliveryAddress ??
    {};

  const fullName =
    raw?.fullName ??
    raw?.customerName ??
    raw?.customer?.fullName ??
    raw?.customer?.name ??
    shippingBlock?.fullName ??
    shippingBlock?.name ??
    "";

  const email =
    raw?.customerEmail ??
    raw?.email ??
    raw?.customer?.email ??
    shippingBlock?.email ??
    "";

  const phone =
    raw?.phone ??
    raw?.customer?.phone ??
    shippingBlock?.phone ??
    shippingBlock?.phoneNumber ??
    "";

  const address =
    shippingBlock?.address ??
    raw?.address ??
    raw?.street ??
    raw?.shippingAddressLine ??
    "";

  const city =
    shippingBlock?.city ?? raw?.city ?? raw?.district ?? raw?.province ?? "";

  const country = shippingBlock?.country ?? raw?.country ?? "";

  const hasAnyField = [fullName, email, phone, address, city, country].some(
    Boolean,
  );

  if (!hasAnyField) {
    return null;
  }

  return {
    fullName,
    email,
    phone,
    address,
    city,
    country,
  };
};

const buildTrackingNavigationState = (order) => ({
  currentStep: TRACKING_STEP_BY_STATUS[order.status] ?? 0,
  orderSummary: {
    id: order.id,
    code: order.code,
    status: order.status,
    productName: order.productName,
    itemsCount: order.itemsCount,
    total: order.total,
    placedAt: order.createdAtLabel,
  },
  shippingInfo: resolveShippingInfoFromOrder(order),
});

export default function MyOrdersPage() {
  usePageTitle("My Orders");

  const navigate = useNavigate();
  const { orders, loading, error, summary, reload } = useOrders();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const normalizedSearch = useMemo(() => search.trim().toLowerCase(), [search]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const statusMatched =
        statusFilter === "All" || order.status === statusFilter;
      if (!statusMatched) return false;

      if (!normalizedSearch) return true;

      return buildOrderSearchText(order).includes(normalizedSearch);
    });
  }, [orders, normalizedSearch, statusFilter]);

  const hasFilters = Boolean(normalizedSearch) || statusFilter !== "All";

  const handleTrackOrder = (order) => {
    navigate("/order-tracking", {
      state: buildTrackingNavigationState(order),
    });
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  const goToSalePage = () => navigate("/sale");

  return (
    <Box className={tw.myOrdersPage}>
      <header className={tw.myOrdersHeader}>
        <Box className={tw.myOrdersHeaderContent}>
          <p className={tw.myOrdersEyebrow}>Account</p>
          <h1 className={tw.myOrdersTitle}>My Orders</h1>
          <p className={tw.myOrdersSubtitle}>
            Review your order history and track the status of every purchase.
          </p>
        </Box>

        <Button
          type="button"
          onClick={goToSalePage}
          className={tw.myOrdersContinueBtn}
        >
          Continue shopping
        </Button>
      </header>

      <Section className={tw.myOrdersSummaryGrid}>
        <OrderMetricCard
          label="Total Orders"
          value={summary.count}
          className={tw.myOrdersMetricCard}
          labelClassName={tw.myOrdersMetricLabel}
          valueClassName={tw.myOrdersMetricValue}
        />
        <OrderMetricCard
          label="Active Orders"
          value={summary.activeOrders}
          className={tw.myOrdersMetricCard}
          labelClassName={tw.myOrdersMetricLabel}
          valueClassName={tw.myOrdersMetricValue}
        />
        <OrderMetricCard
          label="Total Spent"
          value={formatCurrency(summary.totalSpent)}
          className={tw.myOrdersMetricCard}
          labelClassName={tw.myOrdersMetricLabel}
          valueClassName={tw.myOrdersMetricValue}
        />
      </Section>

      <OrderHistoryFilterBar
        searchValue={search}
        onSearchValueChange={setSearch}
        searchPlaceholder="Search by order code, product, or status"
        statusOptions={ORDER_STATUS_FILTERS}
        activeStatus={statusFilter}
        onStatusChange={setStatusFilter}
        className={tw.myOrdersFilterBar}
        rowClassName={tw.myOrdersFilterRow}
        searchWrapClassName={tw.myOrdersSearchWrap}
        searchInputClassName={tw.myOrdersSearchInput}
        filtersClassName={tw.myOrdersFilterGroup}
        buttonClassName={tw.myOrdersFilterBtn}
        activeButtonClassName={tw.myOrdersFilterBtnActive}
        idleButtonClassName={tw.myOrdersFilterBtnIdle}
      />

      {loading ? (
        <Section className={tw.myOrdersStateCard}>
          <div className={tw.myOrdersLoadingSpinner} />
          <p className={tw.myOrdersStateText}>Loading your orders...</p>
        </Section>
      ) : error ? (
        <Section className={cx(tw.myOrdersStateCard, tw.myOrdersErrorCard)}>
          <p className={tw.myOrdersErrorText}>{error}</p>
          <Button
            type="button"
            onClick={reload}
            className={tw.myOrdersRetryBtn}
          >
            Retry
          </Button>
        </Section>
      ) : filteredOrders.length === 0 ? (
        <EmptyState className={tw.myOrdersStateCard}>
          <div className={tw.myOrdersEmptyIcon}>ORD</div>
          <h2 className={tw.myOrdersStateTitle}>
            {hasFilters ? "No matching orders" : "No orders yet"}
          </h2>
          <p className={tw.myOrdersStateText}>
            {hasFilters
              ? "Try a different keyword or status filter."
              : "Your future orders will appear here with full timeline and status."}
          </p>

          <Box className={tw.myOrdersStateActions}>
            {hasFilters ? (
              <Button
                type="button"
                onClick={resetFilters}
                className={tw.myOrdersGhostBtn}
              >
                Clear filters
              </Button>
            ) : null}

            <Button
              type="button"
              onClick={goToSalePage}
              className={tw.myOrdersPrimaryBtn}
            >
              Start shopping
            </Button>
          </Box>
        </EmptyState>
      ) : (
        <Section className={tw.myOrdersList}>
          {filteredOrders.map((order) => (
            <OrderHistoryCard
              key={order.id}
              code={order.code}
              placedAt={`Placed at ${order.createdAtLabel}`}
              status={order.status}
              fields={[
                { label: "Item", value: order.productName },
                { label: "Quantity", value: order.itemsCount },
                { label: "Total", value: formatCurrency(order.total) },
              ]}
              onTrack={() => handleTrackOrder(order)}
              className={tw.myOrdersCard}
              headerClassName={tw.myOrdersCardHeader}
              identityClassName={tw.myOrdersCardIdentity}
              codeClassName={tw.myOrdersCardCode}
              dateClassName={tw.myOrdersCardDate}
              statusBadgeClassName={cx(
                tw.myOrdersStatusBadge,
                STATUS_CLASS_BY_STATUS[order.status] ??
                  tw.myOrdersStatusUnknown,
              )}
              fieldsGridClassName={tw.myOrdersCardGrid}
              fieldClassName={tw.myOrdersCardField}
              fieldLabelClassName={tw.myOrdersCardFieldLabel}
              fieldValueClassName={tw.myOrdersCardFieldValue}
              actionsClassName={tw.myOrdersCardActions}
              trackButtonClassName={tw.myOrdersTrackBtn}
            />
          ))}
        </Section>
      )}
    </Box>
  );
}
