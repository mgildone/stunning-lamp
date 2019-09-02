const path = require("path");
const glob = require("glob");
module.exports = isEnvDevelopment => ({
  entry: {
    scripts: glob.sync("./src/**/*.js"),
    styles: glob.sync("./src/**/*.scss")
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: isEnvDevelopment
      ? "[name]-bundle.js"
      : "[name]-bundle-[contenthash].js",
    chunkFilename: isEnvDevelopment
      ? "[name]-bundle.js"
      : "[name]-bundle-[chunkhash].js"
  }
});
