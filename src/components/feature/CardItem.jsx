import { tw } from "../../assets/theme/theme";
import { cx } from "@lib/cx";


function CartItem({ item, onUpdateQty, onRemove, isRemoving }) {
  const rowClassName = cx(tw.cartItemRoot, isRemoving && tw.cartItemRemoving);

  return (
    <div className={rowClassName}>
      <img src={item.image} alt={item.name} className={tw.cartItemImage} />

      <div className={tw.cartItemContent}>
        <div className={tw.cartItemTop}>
          <div>
            <p className={cx("heading", tw.cartItemName)}>{item.name}</p>
            <p className={tw.cartItemVariant}>{item.variant}</p>
          </div>
          <button
            onClick={() => onRemove(item.cartItemId)}
            className={tw.cartItemRemove}
            aria-label="Remove item"
          >
            ×
          </button>
        </div>

        <div className={tw.cartItemBottom}>
          <div className={tw.cartItemQty}>
            <button
              onClick={() => onUpdateQty(item.cartItemId, -1)}
              className={tw.cartItemQtyBtn}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className={tw.cartItemQtyValue}>{item.qty}</span>
            <button
              onClick={() => onUpdateQty(item.cartItemId, 1)}
              className={tw.cartItemQtyBtn}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <p className={cx("heading", tw.cartItemLineTotal)}>
            ${(item.price * item.qty).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
