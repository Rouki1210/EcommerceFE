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
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: { type: "routes" },
              allow: {
                to: {
                  type: [
                    "routes",
                    "pages",
                    "components",
                    "hooks",
                    "context",
                    "assets",
                    "lib",
                  ],
                },
              },
            },
            {
              from: { type: "pages" },
              allow: {
                to: {
                  type: [
                    "pages",
                    "components",
                    "hooks",
                    "features",
                    "api",
                    "data",
                    "context",
                    "assets",
                    "lib",
                  ],
                },
              },
            },
            {
              from: { type: "components" },
              allow: {
                to: {
                  type: [
                    "components",
                    "hooks",
                    "features",
                    "api",
                    "data",
                    "context",
                    "assets",
                    "lib",
                  ],
                },
              },
            },
            {
              from: { type: "hooks" },
              allow: {
                to: {
                  type: [
                    "hooks",
                    "features",
                    "api",
                    "data",
                    "context",
                    "assets",
                    "lib",
                  ],
                },
              },
            },
            {
              from: { type: "features" },
              allow: {
                to: {
                  type: ["features", "api", "data", "assets", "lib"],
                },
              },
            },
            {
              from: { type: "context" },
              allow: {
                to: {
                  type: [
                    "context",
                    "features",
                    "hooks",
                    "api",
                    "data",
                    "assets",
                    "lib",
                  ],
                },
              },
            },
            {
              from: { type: "app" },
              allow: {
                to: {
                  type: [
                    "app",
                    "features",
                    "hooks",
                    "context",
                    "api",
                    "assets",
                    "lib",
                  ],
                },
              },
            },
            {
              from: { type: "data" },
              allow: {
                to: {
                  type: ["data", "assets", "lib"],
                },
              },
            },
            {
              from: { type: "api" },
              allow: {
                to: {
                  type: ["api", "assets", "lib"],
                },
              },
            },
            {
              from: { type: "assets" },
              allow: {
                to: {
                  type: ["assets", "components", "lib"],
                },
              },
            },
            {
              from: { type: "lib" },
              allow: {
                to: {
                  type: ["lib", "assets"],
                },
              },
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
        { type: "lib", pattern: "src/lib/**" },
        { type: "context", pattern: "src/context/**" },
        { type: "api", pattern: "src/api/**" },
        { type: "data", pattern: "src/data/**" },
        { type: "assets", pattern: "src/assets/**" },
      ],
    },
  },
]);
