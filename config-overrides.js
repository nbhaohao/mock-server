const path = require("path");
const { override, fixBabelImports, addWebpackAlias } = require("customize-cra");

module.exports = override(
  //do stuff with the webpack config...
  // config.resolve.alias = {
  //   "@": resolve("src")
  // };
  // return config;
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  }),
  addWebpackAlias({
    ["@"]: path.join(__dirname, ".", "src")
  })
);
