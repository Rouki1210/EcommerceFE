import { useEffect, useState } from "react";
import { tw } from "../../assets/theme/theme";
import ProductPriceRow from "../base/ProductPriceRow";
import ProductSizeSelector from "../base/ProductSizeSelector";
import {
  PRODUCT_UI_COPY,
  buildVariantWithSize,
  getCategoryLabel,
} from "../base/productUiConfig";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product?.sizes?.length) setSelectedSize(product.sizes[0]);
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, product]);

  if (!product) return null;

  const careSteps = product.care ? product.care.split(" · ") : [];

  const handleAddToCart = () => {
    const updatedVariant = buildVariantWithSize(product, selectedSize);
    onAddToCart({ ...product, variant: updatedVariant, selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryLabel = getCategoryLabel(product.category);

  const sizeChart = product.sizeChart;

  return (
    <div className={tw.productModalBackdrop} onClick={onClose}>
      <div
        className={tw.productModalDialog}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={tw.productModalClose}
          onClick={onClose}
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
          <h2 className={cx("heading", tw.productModalTitle)}>
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

          <p className={tw.productModalDesc}>{product.description}</p>

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
              className={tw.productModalActionGhost}
              onClick={() => setSizeChartOpen((prev) => !prev)}
            >
              {sizeChartOpen ? "Hide size chart" : "Size chart"}
            </button>
            <button
              className={tw.productModalActionPrimary}
              onClick={handleAddToCart}
            >
              {added
                ? PRODUCT_UI_COPY.addedToCartModal
                : PRODUCT_UI_COPY.addToCartModal}
            </button>
          </div>

          {added && (
            <div className={tw.productModalNotice}>
              Item has been added to your cart.
            </div>
          )}

          <div className={tw.productModalAccordions}>
            <div className={tw.productModalAccordion}>
              <button
                className={tw.productModalAccordionHead}
                onClick={() => setSizeChartOpen((prev) => !prev)}
              >
                <span>Size chart</span>
                <span>{sizeChartOpen ? "−" : "+"}</span>
              </button>
              {sizeChartOpen && (
                <div className={tw.productModalAccordionBody}>
                  {sizeChart?.headers?.length ? (
                    <div className={tw.productModalTableWrap}>
                      <table className={tw.productModalTable}>
                        <thead className={tw.productModalTableHead}>
                          <tr>
                            {sizeChart.headers.map((header) => (
                              <th
                                key={header}
                                className={tw.productModalTableCell}
                              >
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
                </div>
              )}
            </div>

            <div className={tw.productModalAccordion}>
              <button
                className={tw.productModalAccordionHead}
                onClick={() => setCareOpen((prev) => !prev)}
              >
                <span>Care instructions</span>
                <span>{careOpen ? "−" : "+"}</span>
              </button>
              {careOpen && (
                <div className={tw.productModalAccordionBody}>
                  {careSteps.length > 0 ? (
                    <ul>
                      {careSteps.map((step) => (
                        <li key={step}>• {step}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No care notes available.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
