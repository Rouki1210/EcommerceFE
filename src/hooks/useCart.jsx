import { useDispatch, useSelector } from "react-redux";
import {
  addToCart as addToCartRedux,
  updateQty as updateQtyRedux,
  removeItem as removeItemRedux,
  clearToast,
} from "../features/cart/cartSlice";
import {
  selectCartItems,
  selectCartCount,
  selectToastMsg,
} from "../features/cart/cartSlice";
import { useEffect } from "react";

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const toastMsg = useSelector(selectToastMsg);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toastMsg) dispatch(clearToast());
    }, 2200);
    return () => clearTimeout(timer);
  }, [toastMsg, dispatch]);

  const addToCart = (product) => {
    dispatch(addToCartRedux(product));
  };

  const updateQty = (cartItemId, delta) => {
    dispatch(updateQtyRedux({ cartItemId, delta }));
  };

  const removeItem = (cartItemId) => {
    dispatch(removeItemRedux(cartItemId));
  };

  return { cart, cartCount, addToCart, updateQty, removeItem, toastMsg };
}
