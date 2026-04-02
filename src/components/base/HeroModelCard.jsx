import { tw } from "../../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function HeroModelCard({
  src,
  alt = "model",
  variant = "primary",
}) {
  const variantClass = variant === "secondary" ? tw.heroImageCardSecondary : "";

  return (
    <div className={cx(tw.heroImageCard, variantClass)}>
      <img src={src} alt={alt} className={tw.heroImage} />
    </div>
  );
}
