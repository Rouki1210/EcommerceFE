import { tw } from "../../assets/theme/theme";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div key={message} className={tw.toast}>
      ✦ {message}
    </div>
  );
}
