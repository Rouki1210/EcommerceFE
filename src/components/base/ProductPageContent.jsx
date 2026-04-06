import { forwardRef, useEffect, useRef, useState } from "react";
import { tw } from "../../assets/theme/theme";
import { cx } from "@lib/cx";
import Button from "./Button";
import ProductPriceRow from "./ProductPriceRow";
import ProductSizeSelector from "./ProductSizeSelector";
import ProductDetailAccordions from "./ProductDetailAccordions";
import {
  PRODUCT_UI_COPY,
  buildVariantWithSize,
  getCategoryLabel,
} from "./productUiConfig";

const ProductPageContent = forwardRef(function ProductPageContent(
  {
    loading,
    product,
    shippingThreshold,
    onBack,
    onGoHome,
    onAddToCart,
    onSizeChange,
    addToCartNoticeTimeout = 2000,
  },
  ref,
) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const addNoticeTimeoutRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(product?.sizes) && product.sizes.length) {
      setSelectedSize(product.sizes[0]);
      return;
    }

    setSelectedSize(null);
  }, [product?.id, product?.sizes]);

  useEffect(() => {
    return () => {
      if (addNoticeTimeoutRef.current) {
        clearTimeout(addNoticeTimeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className={tw.saleEmpty}>
        <p>{PRODUCT_UI_COPY.loading}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={tw.saleEmpty}>
        <div className={tw.collectionEmpty}>
          <h1 className={cx("heading", tw.collectionEmptyTitle)}>
            {PRODUCT_UI_COPY.notFoundTitle}
          </h1>
          <p className={tw.collectionEmptyText}>
            {PRODUCT_UI_COPY.notFoundMessage}
          </p>
          <Button
            type="button"
            onClick={() => onGoHome?.()}
            className={tw.productGridMoreBtn}
          >
            {PRODUCT_UI_COPY.backToHome}
          </Button>
        </div>
      </div>
    );
  }

  const hasSizeOptions =
    Array.isArray(product.sizes) && product.sizes.length > 0;

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    onSizeChange?.(size);
  };

  const handleAddToCart = () => {
    if (typeof onAddToCart !== "function") return;

    const updatedVariant = buildVariantWithSize(product, selectedSize);
    onAddToCart({ ...product, variant: updatedVariant, selectedSize });

    if (addNoticeTimeoutRef.current) {
      clearTimeout(addNoticeTimeoutRef.current);
    }

    setAdded(true);
    addNoticeTimeoutRef.current = setTimeout(() => {
      setAdded(false);
    }, addToCartNoticeTimeout);
  };

  return (
    <section ref={ref} className={tw.pageSection}>
      <Button
        type="button"
        onClick={() => onBack?.()}
        className={cx("btn-link", tw.productPageBack)}
      >
        {PRODUCT_UI_COPY.back}
      </Button>

      <div className={tw.productPageLayout}>
        <div className={tw.productPageImageWrap}>
          <img
            src={product.image}
            alt={product.name || "Product image"}
            className={tw.productPageImage}
          />
        </div>

        <div className={tw.productPageInfo}>
          <p className={tw.productPageCategory}>
            {getCategoryLabel(product.category)}
          </p>
          <h1 className={cx("heading", tw.productPageTitle)}>
            {product.name || "Untitled product"}
          </h1>

          <ProductPriceRow
            price={product.price}
            originalPrice={product.originalPrice}
            rowClassName={tw.productPagePriceRow}
            priceClassName={tw.productPagePrice}
            oldPriceClassName={tw.productPageOldPrice}
            discountClassName={tw.productPageDiscount}
          />

          <p className={tw.productPageDesc}>
            {product.description || PRODUCT_UI_COPY.defaultDescription}
          </p>

          <ProductSizeSelector
            label={PRODUCT_UI_COPY.sizeLabel}
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={handleSelectSize}
            wrapperClassName={tw.productPageSizeBlock}
            labelClassName={tw.productPageSizeLabel}
            listClassName={tw.productPageSizeList}
            buttonClassName={tw.productPageSizeBtn}
            activeButtonClassName={tw.productPageSizeBtnActive}
          />

          <Button
            type="button"
            disabled={hasSizeOptions && !selectedSize}
            onClick={handleAddToCart}
            className={tw.productPageAddBtn}
          >
            {added
              ? PRODUCT_UI_COPY.addedToCartPage
              : PRODUCT_UI_COPY.addToCartPage}
          </Button>

          {added ? (
            <p className={tw.productPageAdded}>
              {PRODUCT_UI_COPY.addedNoticePage}
            </p>
          ) : null}

          <ProductDetailAccordions
            description={product.description}
            shippingThreshold={shippingThreshold}
            containerClassName={tw.productPageDetails}
            rootClassName={tw.productPageAcc}
            buttonClassName={tw.productPageAccBtn}
            iconClassName={tw.productPageAccIcon}
            bodyClassName={tw.productPageAccBody}
          />
        </div>
      </div>
    </section>
  );
});

export default ProductPageContent;
