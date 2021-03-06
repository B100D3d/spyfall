module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    extends: [
        "plugin:vue/essential",
        "plugin:prettier/recommended",
        "eslint:recommended",
        "@vue/prettier",
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2020,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-unused-vars": 0,
    },
}
