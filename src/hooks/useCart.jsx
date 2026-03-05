import { useState } from "react";

export function useCart() {
    const [cart, setCart] = useState([]);
    const [toastMsg, setToastMsg] = useState(null);

    const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

    const addToCart = (product) => {
        const cartItemId = `${product.id}__${product.selectedSize ?? ""}`;
        setCart((prev) => {
            const existing = prev.find((i) => i.cartItemId === cartItemId);
            if (existing) {
                return prev.map((i) =>
                    i.cartItemId === cartItemId ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...prev, { ...product, cartItemId, qty: 1 }];
        });
        setToastMsg(`${product.name} added to cart`);
        setTimeout(() => setToastMsg(null), 2200);
    };

    const updateQty = (cartItemId, delta) => {
        setCart((prev) =>
            prev.map((i) =>
                i.cartItemId === cartItemId ? { ...i, qty: Math.max(1, i.qty + delta) } : i
            )
        );
    };

    const removeItem = (cartItemId) => {
        setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
    };

    return { cart, setCart, cartCount, addToCart, updateQty, removeItem, toastMsg };
}
