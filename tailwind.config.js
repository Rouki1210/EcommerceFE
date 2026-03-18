export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        gold: "#c8a96e",
        darkText: "#2c2c2c",
        lightBg: "#f5f0eb",
        bgCard: "#f5f0eb",
        bgInput: "#fafafa",
        error: "#c0392b",
        success: "#27ae60",
        warning: "#f39c12",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      boxShadow: {
        "card-hover": "0 8px 24px rgba(200, 169, 110, 0.12)",
      },
      animation: {
        slideUp: "slideUp 0.5s ease both",
      },
      keyframes: {
        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
