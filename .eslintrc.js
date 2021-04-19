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
  }
};
