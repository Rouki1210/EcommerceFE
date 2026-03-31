import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDropdown from "./userDropdown";
import { useProducts } from "../../hooks/useProducts";

function Highlight({ text, query }) {
  if (!query || !text) return <span>{text || ""}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="bg-[#c8a96e]/25 text-[#2c2c2c] rounded px-0.5 not-italic font-medium">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </span>
  );
}

export default function Navbar({
  cartCount,
  onCartOpen,
  onLogoClick,
  onSearch,
}) {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const NAV_LINKS = [
    { label: "New Arrivals", to: "/" },
    { label: "Women", to: "/women" },
    { label: "Men", to: "/men" },
    { label: "Sale", to: "/sale" },
  ];

  const q = query.trim().toLowerCase();
  const suggestions = q
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (typeof p.category === "object" ? p.category?.name : p.category)
              ?.toLowerCase()
              .includes(q) ||
            (p.variant || "").toLowerCase().includes(q),
        )
        .slice(0, 6)
    : [];

  const showDropdown = expanded && focused && query.trim().length > 0;

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFocused(false);
        setActiveIdx(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openSearch = () => {
    setExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // ...existing code...
}
