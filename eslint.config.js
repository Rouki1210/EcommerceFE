import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginBoundaries from "eslint-plugin-boundaries";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
      boundaries: pluginBoundaries,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      eqeqeq: "error",
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "routes",
              allow: [
                "routes",
                "pages",
                "components",
                "hooks",
                "context",
                "assets",
              ],
            },
            {
              from: "pages",
              allow: [
                "pages",
                "components",
                "hooks",
                "features",
                "api",
                "data",
                "context",
                "assets",
              ],
            },
            {
              from: "components",
              allow: [
                "components",
                "hooks",
                "features",
                "api",
                "data",
                "context",
                "assets",
              ],
            },
            {
              from: "hooks",
              allow: ["hooks", "features", "api", "data", "context", "assets"],
            },
            {
              from: "features",
              allow: ["features", "api", "data", "assets"],
            },
            {
              from: "context",
              allow: ["context", "features", "hooks", "api", "data", "assets"],
            },
            {
              from: "app",
              allow: ["app", "features", "hooks", "context", "api", "assets"],
            },
            {
              from: "data",
              allow: ["data", "assets"],
            },
            {
              from: "api",
              allow: ["api", "assets"],
            },
            {
              from: "assets",
              allow: ["assets", "components"],
            },
          ],
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "routes", pattern: "src/routes/**" },
        { type: "pages", pattern: "src/pages/**" },
        { type: "components", pattern: "src/components/**" },
        { type: "features", pattern: "src/features/**" },
        { type: "hooks", pattern: "src/hooks/**" },
        { type: "context", pattern: "src/context/**" },
        { type: "api", pattern: "src/api/**" },
        { type: "data", pattern: "src/data/**" },
        { type: "assets", pattern: "src/assets/**" },
      ],
    },
  },
]);
