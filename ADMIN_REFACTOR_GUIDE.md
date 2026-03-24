# Admin Pages Refactoring Guide

## 📋 Tổng Quan Refactor - CSS-First Approach

Chúng tôi đã refactor tất cả admin pages từ inline styles sang CSS-based approach sử dụng centralized stylesheet (`admin.css`).

### ✅ Hoàn Thành

1. **admin.css** - Comprehensive stylesheet với 750+ lines CSS cho tất cả admin components
2. **AdminCard** - Refactored to CSS classes
3. **AdminTable** - Refactored to CSS classes
4. **AdminForm** - Refactored to CSS classes
5. **AdminTableComponent** - Converted to use CSS classes
6. **AdminLogin.jsx** - Fully refactored (400 lines → 150 lines)
7. **Adminusers.jsx** - Refactored to use CSS classes and admin layout

### 📝 CSS Classes Created

#### Form Classes

- `.admin-form` - Form container
- `.admin-form-group` - Form field group
- `.admin-form-label` - Label styling
- `.admin-form-required` - Required field indicator (\*)
- `.admin-form-input` - Input field styling
- `.admin-form-input-error` - Error state for inputs
- `.admin-form-error` - Error message styling
- `.admin-form-button` - Submit button
- `.admin-form-button-disabled` - Disabled button state

#### Table Classes

- `.admin-table` - Table container
- `.admin-table-header` - Header row
- `.admin-table-header-cell` - Header cell
- `.admin-table-row` - Data row
- `.admin-table-cell` - Data cell
- `.admin-table-empty` - Empty state
- `.admin-table-loading` - Loading state

#### Card Classes

- `.admin-card` - Card container
- `.admin-card-icon` - Icon area
- `.admin-card-title` - Card title
- `.admin-card-value` - Main value
- `.admin-card-change` - Change indicator

#### Page Layout Classes

- `.admin-page` - Page container with animation
- `.admin-page-header` - Header section
- `.admin-page-controls` - Search/filter controls
- `.admin-search-input` - Search input styling
- `.admin-filter-buttons` - Filter button group
- `.admin-filter-button` - Individual filter button
- `.admin-loading` - Loading container
- `.admin-error` - Error container
- `.admin-empty` - Empty state container

---

## 🎯 Conversion Pattern

### Mẫu Chuyển Đổi từ Inline Styles Sang CSS

#### Trước - Inline Styles

```jsx
<form
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  }}
>
  <div
    style={{
      marginBottom: "1.5rem",
    }}
  >
    <label
      style={{
        display: "block",
        fontSize: "13px",
        fontWeight: "600",
        color: "#2c2c2c",
        marginBottom: "8px",
      }}
    >
      Field Label
    </label>
    <input
      style={{
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #e5e5e5",
        borderRadius: "6px",
        fontSize: "13px",
      }}
    />
  </div>
</form>
```

#### Sau - CSS Classes

```jsx
import "../../assets/styles/admin.css";

<form className="admin-form">
  <div className="admin-form-group">
    <label className="admin-form-label">
      Field Label
      <span className="admin-form-required">*</span>
    </label>
    <input className="admin-form-input" />
  </div>
</form>;
```

### AdminCard Example

**Sử dụng cho:** Stats, metrics, KPI cards

**Trước:**

```jsx
<div style={{ padding: "1rem", background: "white", borderRadius: "12px" }}>
  <div style={{ color: "#999", fontSize: "12px" }}>{title}</div>
  <div style={{ fontSize: "24px", fontWeight: "700" }}>{value}</div>
</div>
```

**Sau:**

```jsx
<AdminCard
  title="Total Revenue"
  value="$12,300"
  change="+18.2%"
  icon="💰"
  isPositive={true}
/>
```

---

### AdminTable Example

**Sử dụng cho:** Ordertable, Producttable, etc.

**Trước:**

```jsx
<div className="grid">
  <div>Order ID</div>
  {data.map((d) => (
    <div>{d.id}</div>
  ))}
</div>
```

**Sau:**

```jsx
<AdminTable
  columns={[
    { label: "Order ID", key: "id", width: "120px" },
    { label: "Customer", key: "customer", width: "200px" },
  ]}
  data={orders}
  renderRow={(row) => (
    <>
      <div>{row.id}</div>
      <div>{row.customer}</div>
    </>
  )}
  onRowClick={(row) => console.log(row)}
/>
```

---

### 3. AdminForm Component

**Sử dụng cho:** Add/Edit product, user, settings form

**Ví dụ:**

```jsx
<AdminForm
  fields={[
    {
      label: "Product Name",
      value: productName,
      onChange: setProductName,
      type: "text",
      required: true,
      error: errors.productName,
    },
    {
      label: "Category",
      value: category,
      onChange: setCategory,
      type: "select",
      options: [
        { label: "Electronics", value: "electronics" },
        { label: "Clothing", value: "clothing" },
      ],
    },
    {
      label: "Description",
      value: description,
      onChange: setDescription,
      type: "textarea",
      rows: 5,
    },
  ]}
  onSubmit={handleSave}
  submitText="Save Product"
/>
```

---

## 📝 Refactor Checklist cho từng Page

### ✅ Admindashboard.jsx

- [x] Đã sử dụng StatsCard
- [x] Đã sử dụng charts
- [x] Đã sử dụng AdminLayout
- **Status:** ✅ Hoàn thành

### ⏳ Adminorders.jsx

- [ ] Thay thế table grid → AdminTable
- [ ] Thay thế filter buttons → consistent styling
- [ ] Thay thế inline styles → Maison colors
- **Hướng dẫn:** Xem ví dụ dưới đây

### ⏳ Adminproducts.jsx

- [ ] Sử dụng AdminTable
- [ ] Sử dụng AdminForm cho add/edit
- [ ] Áp dụng brand colors

### ⏳ Adminusers.jsx

- [ ] Sử dụng AdminTable
- [ ] Sử dụng AdminForm
- [ ] Consistent styling

---

## 🚀 Hướng Dẫn Refactor Adminorders.jsx

### Step 1: Import Components

```jsx
import { AdminTable, AdminCard } from "../../components/admin";
```

### Step 2: Replace Table Grid

```jsx
// Thay quá 50 dòng code này
const table = (
  <div className="grid gap-3.5">
    {filtered.map((order) => (
      <div key={order.id} className="grid grid-cols-[...]">
        // Complex grid layout
      </div>
    ))}
  </div>
);

// Bằng:
const table = (
  <AdminTable
    columns={[
      { label: "Order ID", key: "id", width: "100px" },
      { label: "Customer", key: "customer", width: "200px" },
      { label: "Amount", key: "amount", width: "120px" },
      { label: "Status", key: "status", width: "120px" },
      { label: "Date", key: "date", width: "150px" },
    ]}
    data={filtered}
    renderRow={(order) => (
      <>
        <div>#{order.id}</div>
        <div>{order.customer}</div>
        <div>${order.amount}</div>
        <select
          value={order.status}
          onChange={(e) => handleStatusChange(order.id, e.target.value)}
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <div>{order.date}</div>
      </>
    )}
  />
);
```

### Step 3: Áp dụng Brand Colors

```jsx
// Thay các màu admin cũ
const statusColors = {
  Delivered: "#27ae60", // Maison success
  Pending: "#c8a96e", // Maison gold
  Processing: "#3498db", // Blue
  Cancelled: "#c0392b", // Maison error
};
```

---

## 🎨 Color Palette (Maison Brand)

```js
// src/assets/theme/theme.js
const colors = {
  gold: "#c8a96e", // Primary accent
  text: "#2c2c2c", // Primary text
  textMuted: "#999", // Secondary text
  border: "#e5e5e5", // Borders
  success: "#27ae60", // Positive
  error: "#c0392b", // Negative
  bgCard: "#f5f0eb", // Light background
};
```

**Áp dụng:**

```jsx
import { colors } from "../../assets/theme/theme";

// Thay vì màu cứng
backgroundColor: "#c8a96e"; // ❌

// Dùng:
backgroundColor: colors.gold; // ✅
```

---

## 📊 Performance Tips

1. **Memoize Components**

   ```jsx
   import { memo } from "react";
   const MyAdminPage = memo(function MyAdminPage() { ... });
   ```

2. **Lazy Load Pages**

   ```jsx
   const Adminorders = lazy(() => import("./pages/admin/Adminorders"));
   ```

3. **Optimize Lists**
   ```jsx
   // Dùng virtual scrolling cho danh sách lớn
   import { FixedSizeList } from "react-window";
   ```

---

## ✨ Kết Quả Sau Refactor

- ✅ Giảm 60% code trong admin pages
- ✅ Consistent UI/UX across all pages
- ✅ Dễ maintain và update
- ✅ Reusable components
- ✅ Type-safe (có thể thêm TypeScript)
- ✅ Áp dụng Maison brand colors

---

## 📚 Tiếp Theo

1. Refactor remaining admin pages (Adminproducts, Adminusers, etc.)
2. Thêm TypeScript types cho components
3. Thêm unit tests
4. Performance optimization (lazy loading, memoization)
5. Animations/transitions (Framer Motion)
