import { createSlice } from "@reduxjs/toolkit";

// Khôi phục cart từ localStorage khi load trang
const savedCart = localStorage.getItem("cart");
const initialState = {
  items: savedCart ? JSON.parse(savedCart) : [],
  toastMsg: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const cartItemId = `${product.id}__${product.selectedSize ?? ""}`;
      const existing = state.items.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...product, cartItemId, qty: 1 });
      }
      state.toastMsg = `${product.name} added to cart`;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQty: (state, action) => {
      const { cartItemId, delta } = action.payload;
      const item = state.items.find((i) => i.cartItemId === cartItemId);
      if (item) item.qty = Math.max(1, item.qty + delta);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.cartItemId !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    clearToast: (state) => {
      state.toastMsg = null;
    },
  },
});

export const { addToCart, updateQty, removeItem, clearCart, clearToast } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0);
export const selectToastMsg = (state) => state.cart.toastMsg;

export default cartSlice.reducer;