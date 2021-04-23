const ERROR = 2;
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:eslint-plugin-react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:unicorn/recommended",
    "plugin:promise/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react", "unicorn", "@typescript-eslint", "promise"],
  rules: {
    "import/extensions": [
      ERROR,
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
        json: "never",
        js: "never"
      }
    ],
    "no-var": "error",
    "no-use-before-define": "off",
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".ts"] }],
    "unicorn/prevent-abbreviations": "off",
    "comma-dangle": ["error", "never"],
    "import/no-unresolved": "error",
    "space-in-parens": "off",
    "spaced-comment": "off",
    "eol-last": "off",
    quotes: [0, "double"],
    semi: [2, "always"]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".tsx", ".ts", ".js", ".json"]
      },
      typescript: {}
    }
  }
};
