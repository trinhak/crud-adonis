module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "semi": 0,
    "quotes": 0,
    "no-unused-vars": 0,
    "no-console": 0,
    "no-debugger": 1
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
