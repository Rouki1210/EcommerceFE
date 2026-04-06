import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { tw } from "../../assets/theme/theme";
import AccordionItem from "../base/AccordionItem";
import ProductPriceRow from "../base/ProductPriceRow";
import ProductSizeSelector from "../base/ProductSizeSelector";
import { cx } from "@lib/cx";
import { useDismissibleLayer } from "../../hooks/useDismissibleLayer";
import {
  PRODUCT_UI_COPY,
  buildVariantWithSize,
  getCategoryLabel,
} from "../base/productUiConfig";

const ProductModal = forwardRef(function ProductModal(
  {
    product,
    onClose,
    onAddToCart,
    isOpen = true,
    closeOnBackdrop = true,
    closeOnEscape = true,
    closeOnAddToCart = false,
    addToCartNoticeTimeout = 2000,
  },
  ref,
) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const dialogRef = useRef(null);
  const addNoticeTimeoutRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  const requestClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const setDialogRefs = useCallback(
    (node) => {
      dialogRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref && typeof ref === "object") {
        ref.current = node;
      }
    },
    [ref],
  );

  useDismissibleLayer({
    isOpen: isOpen && Boolean(product),
    onDismiss: requestClose,
    closeOnEscape,
    closeOnOutsidePress: closeOnBackdrop,
    outsidePressRef: dialogRef,
    lockBodyScroll: true,
    initialFocusRef: closeButtonRef,
  });

  useEffect(() => {
    if (Array.isArray(product?.sizes) && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
      return;
    }

    setSelectedSize(null);
  }, [product?.id, product?.sizes]);

  useEffect(() => {
    setSizeChartOpen(false);
    setCareOpen(false);
    setAdded(false);
  }, [product?.id]);

  useEffect(() => {
    return () => {
      if (addNoticeTimeoutRef.current) {
        clearTimeout(addNoticeTimeoutRef.current);
      }
    };
  }, []);

  if (!isOpen || !product) return null;

  const careSteps = product.care ? product.care.split(" · ") : [];

  const handleAddToCart = () => {
    if (typeof onAddToCart !== "function") return;

    const updatedVariant = buildVariantWithSize(product, selectedSize);
    onAddToCart({ ...product, variant: updatedVariant, selectedSize });

    if (addNoticeTimeoutRef.current) {
      clearTimeout(addNoticeTimeoutRef.current);
    }

    setAdded(true);
    addNoticeTimeoutRef.current = setTimeout(
      () => setAdded(false),
      addToCartNoticeTimeout,
    );

    if (closeOnAddToCart) {
      requestClose();
    }
  };

  const categoryLabel = getCategoryLabel(product.category);

  const sizeChart = product.sizeChart;

  return (
    <div className={tw.productModalBackdrop} aria-hidden="true">
      <div
        ref={setDialogRefs}
        className={tw.productModalDialog}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={tw.productModalClose}
          onClick={requestClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className={tw.productModalMedia}>
          <img
            src={product.image}
            alt={product.name}
            className={tw.productModalImage}
          />
        </div>

        <div className={tw.productModalContent}>
          <p className={tw.productModalCategory}>{categoryLabel}</p>
          <h2 id={titleId} className={cx("heading", tw.productModalTitle)}>
            {product.name}
          </h2>

          <ProductPriceRow
            price={product.price}
            originalPrice={product.originalPrice}
            rowClassName={tw.productModalPriceRow}
            priceClassName={tw.productModalPrice}
            oldPriceClassName={tw.productModalPriceOld}
            discountClassName={tw.productModalDiscount}
            currentFirst
          />

          <p id={descriptionId} className={tw.productModalDesc}>
            {product.description}
          </p>

          <ProductSizeSelector
            label={PRODUCT_UI_COPY.selectSizeLabel}
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
            labelClassName={tw.productModalSizeLabel}
            listClassName={tw.productModalSizeList}
            buttonClassName={tw.productModalSizeBtn}
            activeButtonClassName={tw.productModalSizeBtnActive}
          />

          <div className={tw.productModalActions}>
            <button
              type="button"
              className={tw.productModalActionGhost}
              onClick={() => setSizeChartOpen((prev) => !prev)}
            >
              {sizeChartOpen ? "Hide size chart" : "Size chart"}
            </button>
            <button
              type="button"
              className={tw.productModalActionPrimary}
              onClick={handleAddToCart}
            >
              {added
                ? PRODUCT_UI_COPY.addedToCartModal
                : PRODUCT_UI_COPY.addToCartModal}
            </button>
          </div>

          {added && (
            <div
              className={tw.productModalNotice}
              role="status"
              aria-live="polite"
            >
              Item has been added to your cart.
            </div>
          )}

          <div className={tw.productModalAccordions}>
            <AccordionItem
              title="Size chart"
              isOpen={sizeChartOpen}
              onOpenChange={setSizeChartOpen}
              rootClassName={tw.productModalAccordion}
              buttonClassName={tw.productModalAccordionHead}
              bodyClassName={tw.productModalAccordionBody}
            >
              {sizeChart?.headers?.length ? (
                <div className={tw.productModalTableWrap}>
                  <table className={tw.productModalTable}>
                    <thead className={tw.productModalTableHead}>
                      <tr>
                        {sizeChart.headers.map((header) => (
                          <th key={header} className={tw.productModalTableCell}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChart.rows?.map((row, idx) => (
                        <tr key={`${row[0]}-${idx}`}>
                          {row.map((cell) => (
                            <td
                              key={`${row[0]}-${cell}`}
                              className={tw.productModalTableCell}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Size details are currently unavailable.</p>
              )}
            </AccordionItem>

            <AccordionItem
              title="Care instructions"
              isOpen={careOpen}
              onOpenChange={setCareOpen}
              rootClassName={tw.productModalAccordion}
              buttonClassName={tw.productModalAccordionHead}
              bodyClassName={tw.productModalAccordionBody}
            >
              {careSteps.length > 0 ? (
                <ul>
                  {careSteps.map((step) => (
                    <li key={step}>• {step}</li>
                  ))}
                </ul>
              ) : (
                <p>No care notes available.</p>
              )}
            </AccordionItem>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductModal;
