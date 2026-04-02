import AccordionItem from "./AccordionItem";
import { PRODUCT_UI_COPY, getShippingText } from "./productUiConfig";

export default function ProductDetailAccordions({
  description,
  shippingThreshold,
  containerClassName,
  rootClassName,
  buttonClassName,
  iconClassName,
  bodyClassName,
}) {
  const sections = [
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

  return (
    <div className={containerClassName}>
      {sections.map((section) => (
        <AccordionItem
          key={section.key}
          title={section.title}
          rootClassName={rootClassName}
          buttonClassName={buttonClassName}
          iconClassName={iconClassName}
          bodyClassName={bodyClassName}
        >
          {section.content}
        </AccordionItem>
      ))}
    </div>
  );
}
