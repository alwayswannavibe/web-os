module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    "react-app",
    "react-app/jest",
    'airbnb-typescript',
  ],
  rules: {
  }
};
