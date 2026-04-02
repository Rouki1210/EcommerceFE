import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserDropdown } from "./user";
import { useProducts } from "../../hooks/useProducts";
import { tw } from "../../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

function Highlight({ text, query }) {
  if (!query || !text) return <span>{text || ""}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark className={tw.navbarHighlight}>
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

  const navClassName = cx(tw.navbarNav, expanded && tw.navbarNavDimmed);

  const getNavLinkClassName = (isActive, isSale) =>
    cx(
      tw.navbarNavLink,
      isSale && tw.navbarNavLinkSale,
      isActive &&
        (isSale ? tw.navbarNavLinkSaleActive : tw.navbarNavLinkActive),
    );

  const searchShellClassName = cx(
    tw.navbarSearchShell,
    expanded && tw.navbarSearchShellOpen,
  );

  const searchInputClassName = cx(
    tw.navbarSearchInput,
    expanded && tw.navbarSearchInputOpen,
  );

  return (
    <nav className={tw.navbar}>
      <div className={tw.navbarContainer}>
        <button onClick={onLogoClick} className={tw.navbarLogoLink}>
          <span className={tw.navbarLogoDot} />
          <span className={cx("heading", tw.navbarLogoText)}>Maison</span>
        </button>

        <div className={navClassName}>
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = pathname === to;
            const isSale = label === "Sale";
            return (
              <Link
                key={label}
                to={to}
                className={getNavLinkClassName(isActive, isSale)}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className={tw.navbarActions}>
          <div className={tw.navbarSearchWrap} ref={wrapperRef}>
            <div className={searchShellClassName}>
              <button
                onClick={expanded ? closeSearch : openSearch}
                className={tw.navbarIconBtn}
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
                placeholder="Search products..."
                className={searchInputClassName}
                autoComplete="off"
              />
            </div>

            {showDropdown && (
              <div className={tw.navbarDropdown}>
                {suggestions.length > 0 ? (
                  <>
                    <div className={tw.navbarDropdownHeader}>
                      <p className={tw.navbarDropdownMeta}>
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
                            className={cx(
                              tw.navbarSuggestionItem,
                              activeIdx === i && tw.navbarSuggestionItemActive,
                            )}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className={tw.navbarSuggestionImage}
                            />

                            <div className={tw.navbarSuggestionInfo}>
                              <p className={tw.navbarSuggestionName}>
                                <Highlight text={product.name} query={query} />
                              </p>
                              <p className={tw.navbarSuggestionMeta}>
                                <Highlight
                                  text={
                                    typeof product.category === "object"
                                      ? product.category?.name
                                      : product.category
                                  }
                                  query={query}
                                />
                                {" · "}
                                <Highlight
                                  text={product.variant || ""}
                                  query={query}
                                />
                              </p>
                            </div>

                            <p
                              className={cx(
                                "heading",
                                tw.navbarSuggestionPrice,
                              )}
                            >
                              ${product.price}
                            </p>
                          </button>

                          {i < suggestions.length - 1 && (
                            <div className={tw.navbarSuggestionDivider} />
                          )}
                        </li>
                      ))}
                    </ul>

                    <div className={tw.navbarDropdownFooter}>
                      <p>↑↓ navigate · Enter to select · Esc to close</p>
                    </div>
                  </>
                ) : (
                  <div className={tw.navbarNoResults}>
                    <p className={tw.navbarNoResultsTitle}>Search</p>
                    <p className={tw.navbarNoResultsText}>
                      No results for{" "}
                      <span className={tw.navbarNoResultsQuery}>"{query}"</span>
                    </p>
                    <p className={tw.navbarNoResultsHint}>
                      Try a different keyword
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <Link
              to="/register"
              className={tw.navbarAccountBtn}
              aria-label="Account"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          )}

          <button onClick={onCartOpen} className={tw.navbarCartBtn}>
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
              <span className={cx("cart-badge", tw.navbarCartBadge)}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
