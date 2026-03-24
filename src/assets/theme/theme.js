/* ═══════════════════════════════════════════════════════════
   ECOMMERCE DESIGN TOKENS
   Import: import { colors, gradients, shadows, keyframes, tw } from "@/assets/theme/theme"
═══════════════════════════════════════════════════════════ */

/* ── Color Tokens ── */
export const colors = {
  // Backgrounds
  bg: "#0d0800", // primary background
  bgCard: "#f5f0eb", // card/panel background (light)
  bgInput: "#fafafa", // input background
  bgHover: "#ece7e0", // hovered element background
  bgDark: "#2c2c2c", // dark section background
  bgDeep: "#1a1a1a", // very dark background

  // Brands & Accents
  gold: "#c8a96e", // primary accent (warm gold)
  goldLight: "#e5d4b0", // light gold
  goldDark: "#8b7355", // dark gold
  orange: "#ff6b00", // secondary accent (warm)
  red: "#ff0040", // danger/alert color

  // Text Colors
  white: "#fff",
  text: "#2c2c2c", // primary text (dark)
  textMuted: "#999", // secondary text
  textDim: "#666", // tertiary text
  textLight: "#bbb", // footnotes, disabled
  textFaint: "#aaa", // very faint
  textSub: "#9a8c7e", // subtle brown

  // Borders
  border: "#e5e5e5", // default border
  borderSub: "#ece7e0", // subtle border
  borderDark: "#2a1500", // dark border (admin)

  // Status Colors
  success: "#27ae60", // success/positive
  error: "#c0392b", // error/negative
  warning: "#f39c12", // warning

  // Overlays
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayDark: "rgba(0, 0, 0, 0.8)",
  overlayLight: "rgba(0, 0, 0, 0.3)",
};

/* ── Gradient Tokens ── */
export const gradients = {
  // Brand gradients
  brandWarm: "linear-gradient(135deg, #c8a96e, #8b7355)",
  brandHorizontal: "linear-gradient(90deg, #c8a96e, #8b7355)",
  brandVertical: "linear-gradient(180deg, #c8a96e, #8b7355)",

  // Hero gradients
  heroDark: "linear-gradient(135deg, #2c2c2c 0%, #4a3f35 100%)",
  heroWarm: "linear-gradient(135deg, #3d2817 0%, #5a4a3a 100%)",

  // Special gradients
  cardHover:
    "linear-gradient(135deg, rgba(200, 169, 110, 0.1), rgba(139, 115, 85, 0.05))",

  // Text gradients (for background-clip: text effect)
  textGold: {
    background: "linear-gradient(90deg, #c8a96e, #8b7355)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  textWarm: {
    background: "linear-gradient(90deg, #d4a574, #a0805f)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
};

/* ── Shadow Tokens ── */
export const shadows = {
  // Subtle
  sm: "0 2px 8px rgba(0, 0, 0, 0.1)",
  base: "0 4px 12px rgba(0, 0, 0, 0.15)",
  md: "0 8px 20px rgba(0, 0, 0, 0.12)",

  // Cards & Panels
  card: "0 4px 16px rgba(200, 169, 110, 0.08)",
  cardHover: "0 8px 24px rgba(200, 169, 110, 0.12)",
  cardElevated: "0 12px 32px rgba(0, 0, 0, 0.15)",

  // Interactive
  button: "0 4px 12px rgba(200, 169, 110, 0.2)",
  buttonHover: "0 8px 20px rgba(200, 169, 110, 0.3)",

  // Modal & Overlays
  modal: "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 1px rgba(200, 169, 110, 0.1)",
  modalDark: "0 40px 100px rgba(0, 0, 0, 0.9)",

  // Admin
  adminPanel: "-8px 0 40px rgba(0, 0, 0, 0.3)",

  // Input focus
  inputFocus: "0 0 0 3px rgba(200, 169, 110, 0.1)",

  // Badge
  badge: "0 4px 12px rgba(200, 169, 110, 0.15)",

  // Navigation
  navbarGlow: "0 4px 16px rgba(200, 169, 110, 0.06)",
};

/* ── Keyframes Animation Strings ── */
export const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes modalIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(16px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes toastIn {
    0% {
      opacity: 0;
      transform: translateY(16px);
    }
    15% {
      opacity: 1;
      transform: translateY(0);
    }
    80% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-8px);
    }
  }
  
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 8px rgba(200, 169, 110, 0.3); }
    50% { box-shadow: 0 0 16px rgba(200, 169, 110, 0.5); }
  }
`;

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

/* ── Tailwind Utility Shorthands ── */
export const tw = {
  // ── Containers
  card: "bg-[#f5f0eb] border border-[#ece7e0] rounded-lg",
  cardPadded: "bg-[#f5f0eb] border border-[#ece7e0] rounded-lg p-6",
  cardDark: "bg-[#2c2c2c] border border-[#3a3a3a] rounded-lg",
  cardDarkPadded: "bg-[#2c2c2c] border border-[#3a3a3a] rounded-lg p-6",

  // ── Form Elements
  input:
    "w-full px-4 py-3 bg-[#fafafa] border border-[#e5e5e5] rounded-lg text-sm text-[#2c2c2c] outline-none transition-all focus:border-[#c8a96e] focus:ring-2 focus:ring-[#c8a96e]/10 placeholder-[#bbb]",
  inputDark:
    "w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg text-sm text-[#fff] outline-none transition-all focus:border-[#c8a96e] focus:ring-2 focus:ring-[#c8a96e]/10 placeholder-[#666]",
  label: "block text-xs font-medium text-[#666] uppercase tracking-wider mb-2",
  labelDark:
    "block text-xs font-medium text-[#aaa] uppercase tracking-wider mb-2",

  // ── Buttons
  btnPrimary:
    "px-6 py-3 bg-[#2c2c2c] text-white rounded-lg font-medium text-sm transition-all hover:bg-[#1a1a1a] active:scale-95 cursor-pointer border-none shadow-md",
  btnPrimaryGold:
    "px-6 py-3 bg-[#c8a96e] text-white rounded-lg font-medium text-sm transition-all hover:bg-[#8b7355] active:scale-95 cursor-pointer border-none shadow-md",
  btnSecondary:
    "px-6 py-3 bg-white border border-[#e5e5e5] text-[#2c2c2c] rounded-lg font-medium text-sm transition-all hover:border-[#c8a96e] hover:text-[#c8a96e] cursor-pointer",
  btnGhost:
    "px-6 py-3 bg-transparent border border-[#e5e5e5] text-[#2c2c2c] rounded-lg font-medium text-sm transition-all hover:border-[#c8a96e] hover:text-[#c8a96e] cursor-pointer",
  btnSmall:
    "px-4 py-2 rounded-md text-xs font-medium transition-all cursor-pointer",
  btnIcon:
    "w-10 h-10 flex items-center justify-center rounded-lg border border-[#e5e5e5] text-[#666] transition-all hover:border-[#c8a96e] hover:text-[#c8a96e] cursor-pointer",

  // ── Links
  link: "text-[#c8a96e] hover:text-[#8b7355] transition-colors cursor-pointer no-underline",
  linkHover: "hover:underline hover:text-[#8b7355] transition-colors",

  // ── Typography
  heading: "font-serif font-bold text-[#2c2c2c]",
  headingLarge: "font-serif font-bold text-4xl text-[#2c2c2c]",
  headingMedium: "font-serif font-semibold text-2xl text-[#2c2c2c]",
  body: "text-base text-[#666] leading-relaxed",
  caption: "text-sm text-[#999] leading-relaxed",
  muted: "text-xs text-[#aaa] uppercase tracking-wider",

  // ── Dividers
  divider: "border-t border-[#ece7e0]",
  dividerDark: "border-t border-[#3a3a3a]",

  // ── Badges
  badge:
    "inline-block px-3 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full transition-all",
  badgeAccent: "bg-[#c8a96e] text-white",
  badgeSuccess: "bg-[#27ae60] text-white",
  badgeError: "bg-[#c0392b] text-white",
  badgeNeutral: "bg-[#ece7e0] text-[#2c2c2c]",

  // ── Layout Helpers
  container: "max-w-6xl mx-auto px-6",
  pageWrapper: "max-w-6xl mx-auto px-6 py-12 sm:px-4",
  section: "py-12 sm:py-8",
  sectionPadded: "max-w-6xl mx-auto px-6 py-12",

  // ── Grid & Flex
  gridCards: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  gridProducts: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",

  // ── Overlays
  overlay: "fixed inset-0 bg-black/50 backdrop-blur-sm z-40",
  overlayDark: "fixed inset-0 bg-black/80 z-50",

  // ── Focus States
  focusRing:
    "focus:outline-none focus:ring-2 focus:ring-[#c8a96e] focus:ring-offset-2",
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

export default {
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
