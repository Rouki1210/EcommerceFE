// Base UI Components mở rộng (Banner, Section, EmptyState, Badge, Grid, TypographyBase, FilterBar)
import Banner from "../../components/base/Banner";
import Section from "../../components/base/Section";
import EmptyState from "../../components/base/EmptyState";
import Badge from "../../components/base/Badge";
import Grid from "../../components/base/Grid";
import TypographyBase from "../../components/base/TypographyBase";
import FilterBar from "../../components/base/FilterBar";
/* ═══════════════════════════════════════════════════════════
  ECOMMERCE DESIGN TOKENS & MUI THEME
  Import: import { theme, colors, gradients, shadows, ... } from "@/assets/theme/theme"
════════════════════════════════════════════════════════════ */

// ---- TOKENS & PRESETS ----
// (Đặt tất cả token lên đầu file)

export const colors = {
  // ...existing code...
  bg: "#0d0800",
  bgCard: "#f5f0eb",
  bgInput: "#fafafa",
  bgHover: "#ece7e0",
  bgDark: "#2c2c2c",
  bgDeep: "#1a1a1a",
  gold: "#c8a96e",
  goldLight: "#e5d4b0",
  goldDark: "#8b7355",
  orange: "#ff6b00",
  red: "#ff0040",
  white: "#fff",
  text: "#2c2c2c",
  textMuted: "#999",
  textDim: "#666",
  textLight: "#bbb",
  textFaint: "#aaa",
  textSub: "#9a8c7e",
  border: "#e5e5e5",
  borderSub: "#ece7e0",
  borderDark: "#2a1500",
  success: "#27ae60",
  error: "#c0392b",
  warning: "#f39c12",
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayDark: "rgba(0, 0, 0, 0.8)",
};

// Base UI Components (MUI + Tailwind wrappers)
import Button from "../../components/base/Button.jsx";
import Card, { CardContent } from "../../components/base/Card.jsx";
import Input from "../../components/base/Input.jsx";
import Typography from "../../components/base/Typography.jsx";
import Modal, {
  DialogTitle,
  DialogContent,
  DialogActions,
} from "../../components/base/Modal.jsx";
import Divider from "../../components/base/Divider.jsx";
import Box from "../../components/base/Box.jsx";

export {
  Button,
  Card,
  CardContent,
  Input,
  Typography,
  Modal,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Box,
  Banner,
  Section,
  EmptyState,
  Badge,
  Grid,
  TypographyBase,
  FilterBar,
};

/* ── Gradients ── */
export const gradients = {
  gold: "linear-gradient(90deg, #c8a96e 0%, #e5d4b0 100%)",
  orange: "linear-gradient(90deg, #ff6b00 0%, #ffb347 100%)",
  dark: "linear-gradient(90deg, #2c2c2c 0%, #1a1a1a 100%)",
  white: "linear-gradient(90deg, #fff 0%, #fafafa 100%)",
};

/* ── Shadows ── */
export const shadows = {
  xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
  sm: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
  md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
  lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
  xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
  "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  outline: "0 0 0 3px rgba(200,169,110,0.5)",
  none: "none",
};

/* ── Keyframes (for animation) ── */
export const keyframes = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  slideUp: {
    from: { transform: "translateY(20px)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
  slideDown: {
    from: { transform: "translateY(-20px)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
};

/* ── Animation Duration & Timing ── */
export const animations = {
  transitions: {
    fast: "0.15s ease",
    base: "0.3s ease",
    smooth: "0.5s ease",
    slow: "0.7s ease",
  },
  durations: {
    fast: 150,
    base: 300,
    smooth: 500,
    slow: 700,
  },
};

/* ── Typography Tokens ── */
export const typography = {
  fonts: {
    serif: '"Playfair Display", serif',
    sans: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  sizes: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "48px",
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
};

/* ── Spacing Scale ── */
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "32px",
  "3xl": "48px",
  "4xl": "64px",
};

/* ── Border Radius ── */
export const radii = {
  none: "0",
  sm: "4px",
  base: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  full: "9999px",
};

/* ── Responsive Breakpoints ── */
export const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/* ── Tailwind Utility Shorthands (đồng bộ với components.css) ── */
export const tw = {
  banner: "banner",
  section: "section",
  emptyState: "empty-state",
  headingLg: "heading-lg",
  headingMd: "heading-md",
  headingSm: "heading-sm",
  subtitle: "subtitle",
  caption: "caption",
  label: "label",
  badge: "badge",
  badgeSuccess: "badge-success",
  badgeError: "badge-error",
  badgeNeutral: "badge-neutral",
  gridCards: "grid-cards",
  card: "card",
  cardDark: "card-dark",
  cardPadded: "card-padded",
  btnGhost: "btn-ghost",
  btnSecondary: "btn-secondary",
  // ... giữ lại các preset cũ nếu cần
};

/* ── Composite Component Styles ── */
export const components = {
  // Form Input with Label
  formField: {
    container: "mb-4",
    label:
      "block text-xs font-medium text-[#666] uppercase tracking-wider mb-2",
    input:
      "w-full px-4 py-3 bg-[#fafafa] border border-[#e5e5e5] rounded-lg text-sm text-[#2c2c2c] outline-none transition-all focus:border-[#c8a96e] focus:ring-2 focus:ring-[#c8a96e]/10",
    error: "text-[#c0392b] text-xs mt-1",
  },

  // Card Component
  card: {
    container:
      "bg-[#f5f0eb] border border-[#ece7e0] rounded-lg overflow-hidden",
    header: "px-6 py-4 border-b border-[#ece7e0]",
    body: "p-6",
    footer: "px-6 py-4 border-t border-[#ece7e0] bg-[#faf8f5]",
  },

  // Modal Component
  modal: {
    overlay:
      "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center",
    container: "bg-white rounded-xl shadow-2xl max-w-md w-full mx-4",
    header: "px-6 py-4 border-b border-[#ece7e0]",
    body: "p-6",
    footer: "px-6 py-4 border-t border-[#ece7e0] flex gap-3 justify-end",
  },

  // Button Component
  button: {
    base: "px-6 py-3 rounded-lg font-medium text-sm transition-all border-none cursor-pointer",
    primary: "bg-[#2c2c2c] text-white hover:bg-[#1a1a1a]",
    secondary:
      "bg-white border border-[#e5e5e5] text-[#2c2c2c] hover:border-[#c8a96e] hover:text-[#c8a96e]",
    ghost:
      "bg-transparent border border-[#e5e5e5] text-[#2c2c2c] hover:border-[#c8a96e]",
    disabled: "opacity-50 cursor-not-allowed",
  },
};

export const theme = {
  colors,
  gradients,
  shadows,
  keyframes,
  animations,
  typography,
  spacing,
  radii,
  breakpoints,
  tw,
  components,
};

export default theme;
