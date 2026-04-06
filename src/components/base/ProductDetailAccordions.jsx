import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";
import AccordionItem from "./AccordionItem";
import { PRODUCT_UI_COPY, getShippingText } from "./productUiConfig";

const styles = sortCx({
  container: "space-y-1",
  sectionContent: "text-sm text-[#2c2c2c]",
});

const ProductDetailAccordions = forwardRef(function ProductDetailAccordions(
  {
    description,
    shippingThreshold,
    sections,
    defaultOpenKeys,
    openFirstSection = false,
    containerClassName,
    rootClassName,
    buttonClassName,
    iconClassName,
    bodyClassName,
    bodyInnerClassName,
    sectionContentClassName,
    accordionItemProps,
    useVariantStyles,
    ...props
  },
  ref,
) {
  const fallbackSections = [
    {
      key: "description",
      title: PRODUCT_UI_COPY.accordionDescription,
      content: <p>{description || PRODUCT_UI_COPY.defaultDescription}</p>,
    },
    {
      key: "specifications",
      title: PRODUCT_UI_COPY.accordionSpecifications,
      content: (
        <ul>
          {PRODUCT_UI_COPY.specifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "shipping",
      title: PRODUCT_UI_COPY.accordionShipping,
      content: <p>{getShippingText(shippingThreshold)}</p>,
    },
  ];

  const safeSections =
    Array.isArray(sections) && sections.length ? sections : fallbackSections;
  const openKeySet = new Set(
    Array.isArray(defaultOpenKeys) ? defaultOpenKeys : [],
  );
  const shouldUseVariants =
    typeof useVariantStyles === "boolean"
      ? useVariantStyles
      : !containerClassName;

  return (
    <div
      {...props}
      ref={ref}
      className={cx(shouldUseVariants && styles.container, containerClassName)}
    >
      {safeSections.map((section, index) => {
        const key = section?.key ?? `section-${index}`;
        const shouldBeOpen =
          openKeySet.has(key) || (openFirstSection && index === 0);

        return (
          <AccordionItem
            key={key}
            title={section?.title}
            defaultOpen={shouldBeOpen}
            rootClassName={rootClassName}
            buttonClassName={buttonClassName}
            iconClassName={iconClassName}
            bodyClassName={bodyClassName}
            bodyInnerClassName={bodyInnerClassName}
            {...accordionItemProps}
          >
            <div
              className={cx(
                shouldUseVariants && styles.sectionContent,
                sectionContentClassName,
              )}
            >
              {section?.content}
            </div>
          </AccordionItem>
        );
      })}
    </div>
  );
});

export default ProductDetailAccordions;
