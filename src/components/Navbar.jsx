import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDropdown from "./userDropdown";
import { useProducts } from "../hooks/useProducts";

/* ── highlight matched substring ── */
function Highlight({ text, query }) {
  if (!query) return <span>{text}</span>;
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

  /* ── Filter suggestions from PRODUCTS ── */
  const q = query.trim().toLowerCase();
  const suggestions = q
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (typeof p.category === "object" ? p.category?.name : p.category)?.toLowerCase().includes(q) ||
            p.variant.toLowerCase().includes(q),
        )
        .slice(0, 6)
    : [];

  const showDropdown = expanded && focused && query.trim().length > 0;

  /* ── Close when clicking outside ── */
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

  const closeSearch = () => {
    setExpanded(false);
    setQuery("");
    setFocused(false);
    setActiveIdx(-1);
    onSearch?.("");
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setActiveIdx(-1);
    onSearch?.(e.target.value);
  };

  const selectSuggestion = (product) => {
    setQuery("");
    setFocused(false);
    navigate(`/product/${product.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeSearch();
      return;
    }
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[activeIdx]);
    }
  };

  return (
    <nav className="sticky top-0 z-30 bg-[#f5f0eb]/90 backdrop-blur-md border-b border-[#e8e2db]">
      <style>{`
        .search-bar {
          width: 0; opacity: 0; padding: 0;
          transition: width 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease, padding 0.3s ease;
          pointer-events: none;
        }
        .search-bar.open {
          width: 240px; opacity: 1; padding: 0 12px; pointer-events: all;
        }
        @media (max-width: 640px) { .search-bar.open { width: 150px; } }

        .dropdown-enter {
          animation: dropIn 0.2s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity flex-shrink-0"
        >
          <span className="w-5 h-5 rounded-full bg-[#c8a96e] inline-block" />
          <span className="heading text-xl text-[#2c2c2c]">Maison</span>
        </button>

        {/* Nav links */}
        <div
          className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase"
          style={{
            opacity: expanded ? 0.3 : 1,
            transition: "opacity 0.2s ease",
            pointerEvents: expanded ? "none" : "auto",
          }}
        >
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = pathname === to;
            const isSale = label === "Sale";
            return (
              <Link
                key={label}
                to={to}
                className="transition-colors"
                style={{
                  color: isSale ? "#c0392b" : isActive ? "#2c2c2c" : "#888",
                  borderBottom: isActive
                    ? `1px solid ${isSale ? "#c0392b" : "#2c2c2c"}`
                    : "1px solid transparent",
                  paddingBottom: 2,
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* ── Search wrapper (input + dropdown) ── */}
          <div className="relative" ref={wrapperRef}>
            {/* Input pill */}
            <div
              className="flex items-center rounded-full transition-all"
              style={{
                border: expanded
                  ? "1px solid #d8d2cb"
                  : "1px solid transparent",
                background: expanded ? "white" : "transparent",
                transition: "border-color 0.3s, background 0.3s",
              }}
            >
              <button
                onClick={expanded ? closeSearch : openSearch}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#2c2c2c] transition-colors"
                aria-label={expanded ? "Close search" : "Open search"}
              >
                {expanded ? (
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    width="17"
                    height="17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                )}
              </button>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocused(true)}
                placeholder="Search products…"
                className={`search-bar ${expanded ? "open" : ""} bg-transparent text-sm text-[#2c2c2c] placeholder-[#bbb] focus:outline-none`}
                autoComplete="off"
              />
            </div>

            {/* ── Dropdown ── */}
            {showDropdown && (
              <div className="dropdown-enter absolute right-0 top-[calc(100%+10px)] w-80 bg-white rounded-2xl shadow-xl border border-[#ece7e0] overflow-hidden z-50">
                {suggestions.length > 0 ? (
                  <>
                    <div className="px-4 pt-3 pb-1.5 flex items-center justify-between">
                      <p className="text-[10px] tracking-widest uppercase text-[#aaa]">
                        {suggestions.length} result
                        {suggestions.length !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <ul>
                      {suggestions.map((product, i) => (
                        <li key={product.id}>
                          <button
                            onMouseDown={() => selectSuggestion(product)}
                            onMouseEnter={() => setActiveIdx(i)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors"
                            style={{
                              background:
                                activeIdx === i ? "#f5f0eb" : "transparent",
                            }}
                          >
                            {/* Thumbnail */}
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-xl flex-shrink-0"
                            />

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] text-[#2c2c2c] leading-snug truncate">
                                <Highlight text={product.name} query={query} />
                              </p>
                              <p className="text-[11px] text-[#aaa] mt-0.5">
                                <Highlight
                                  text={typeof product.category === "object" ? product.category?.name : product.category}
                                  query={query}
                                />
                                {" · "}
                                <Highlight
                                  text={product.variant}
                                  query={query}
                                />
                              </p>
                            </div>

                            {/* Price */}
                            <p className="heading text-[13px] text-[#2c2c2c] flex-shrink-0">
                              ${product.price}
                            </p>
                          </button>

                          {i < suggestions.length - 1 && (
                            <div className="mx-3 h-px bg-[#f5f0eb]" />
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* Footer hint */}
                    <div className="px-4 py-2.5 border-t border-[#f5f0eb] flex items-center justify-between">
                      <p className="text-[10px] text-[#bbb]">
                        ↑↓ navigate · Enter to select · Esc to close
                      </p>
                    </div>
                  </>
                ) : (
                  /* No results */
                  <div className="px-5 py-8 text-center">
                    <p className="text-2xl mb-2">🔍</p>
                    <p className="text-sm text-[#888]">
                      No results for{" "}
                      <span className="text-[#2c2c2c] font-medium">
                        "{query}"
                      </span>
                    </p>
                    <p className="text-xs text-[#bbb] mt-1">
                      Try a different keyword
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Account button */}
          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <Link
              to="/login"
              className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#2c2c2c] transition-colors flex-shrink-0"
              aria-label="Account"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          )}

          {/* Cart button */}
          <button
            onClick={onCartOpen}
            className="relative flex items-center gap-2 bg-[#2c2c2c] text-white rounded-full px-4 py-2 text-xs tracking-widest uppercase hover:bg-[#111] transition-all flex-shrink-0"
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Cart
            {cartCount > 0 && (
              <span className="cart-badge w-5 h-5 rounded-full bg-[#c8a96e] text-[#2c2c2c] text-[10px] font-medium flex items-center justify-center -ml-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
