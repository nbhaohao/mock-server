const path = require("path");
function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.alias = {
    "@": resolve("src")
  };
  return config;
};
