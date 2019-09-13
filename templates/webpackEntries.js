const path = require("path");
const glob = require("glob");
module.exports = env => ({
  commonConfig: [],
  developmentConfig: [],
  productionConfig: [],
  entry: {
    scripts: glob.sync("./src/**/*.js"),
    styles: glob.sync("./src/**/*.scss")
  },
  output: {
    path: path.join(__dirname, "public"),
    filename:
      env === "development"
        ? "[name]-bundle.js"
        : "[name]-bundle-[contenthash].js",
    chunkFilename:
      env === "development"
        ? "[name]-bundle.js"
        : "[name]-bundle-[chunkhash].js"
  }
});
