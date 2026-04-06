import { createSlice } from "@reduxjs/toolkit";
import { getCartItemCount } from "../../lib/cartPricing";

const CART_STORAGE_KEY = "cart";

const readCartFromStorage = () => {
  if (typeof window === "undefined" || !window.localStorage) {
    return [];
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
};

const writeCartToStorage = (items) => {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage failures and keep runtime state consistent.
  }
};

const removeCartFromStorage = () => {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  } catch {
    // Ignore storage failures and keep runtime state consistent.
  }
};

// Khôi phục cart từ localStorage khi load trang
const initialState = {
  items: readCartFromStorage(),
  toastMsg: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      if (!product || product.id === undefined || product.id === null) {
        return;
      }

      const cartItemId = `${product.id}__${product.selectedSize ?? ""}`;
      const existing = state.items.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        existing.qty = Math.max(1, Number(existing.qty || 0) + 1);
      } else {
        state.items.push({ ...product, cartItemId, qty: 1 });
      }
      state.toastMsg = `${product.name} added to cart`;
      writeCartToStorage(state.items);
    },
    updateQty: (state, action) => {
      const { cartItemId, delta } = action.payload;
      const safeDelta = Number(delta);

      if (!cartItemId || !Number.isFinite(safeDelta) || safeDelta === 0) {
        return;
      }

      const item = state.items.find((i) => i.cartItemId === cartItemId);
      if (item) {
        item.qty = Math.max(1, Number(item.qty || 0) + safeDelta);
        writeCartToStorage(state.items);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.cartItemId !== action.payload);
      writeCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      removeCartFromStorage();
    },
    clearToast: (state) => {
      state.toastMsg = null;
    },
  },
});

export const { addToCart, updateQty, removeItem, clearCart, clearToast } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => getCartItemCount(state.cart.items);
export const selectToastMsg = (state) => state.cart.toastMsg;

export default cartSlice.reducer;
