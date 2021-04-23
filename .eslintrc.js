module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  extends: [
    "prettier",
    "react-app",
    "react-app/jest",
    'airbnb-typescript',
  ],
  rules: {
    "object-curly-newline": 0,
    "import/prefer-default-export": 0,
    "max-len": 0,
    "react/require-default-props": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "no-mixed-operators": 0,
    "operator-linebreak": 0,
  }
};
