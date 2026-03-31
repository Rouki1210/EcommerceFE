import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginBoundaries from "eslint-plugin-boundaries";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, boundaries: pluginBoundaries },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "error",
      eqeqeq: "error",
      "boundaries/element-types": [
        2,
        {
          default: "disallow",
          rules: [
            { from: "components", allow: ["utils", "assets"] },
            { from: "pages", allow: ["components", "utils"] },
            { from: "utils", allow: ["assets"] },
          ],
        },
      ],
    },
    settings: {
      "boundaries/elements": [
        { type: "components", pattern: "src/components/*" },
        { type: "pages", pattern: "src/pages/*" },
        { type: "utils", pattern: "src/utils/*" },
        { type: "assets", pattern: "src/assets/*" },
      ],
    },
  },
  pluginReact.configs.flat.recommended,
]);
