require("./scripts/.babelrc");

module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"],
    process.env.NODE_ENV === "production" && ["babel-preset-minify"]
  ].filter(Boolean),
  plugins: [
    ["babel-plugin-transform-inline-environment-variables"],
    ["babel-plugin-macros"],
    ["babel-plugin-inline-import", { extensions: [".ftl"] }],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-numeric-separator"],
    ["@babel/plugin-proposal-optional-catch-binding"],
    ["@babel/plugin-proposal-nullish-coalescing-operator"],
    ["@babel/plugin-proposal-throw-expressions"],
    ["@babel/plugin-proposal-optional-chaining"]
  ]
};
