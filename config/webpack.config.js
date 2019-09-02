const merge = require("webpack-merge");
const ManifestPlugin = require("webpack-manifest-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const tasks = require("./webpack.tasks");
const smp = new SpeedMeasurePlugin();

const commonConfig = isEnvDevelopment =>
  merge([
    {
      plugins: [
        new ManifestPlugin({
          fileName: "assets.json"
        })
      ],
      optimization: {
        usedExports: true,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\\/]node_modules[\\\/]/,
              name: "vendors",
              chunks: "all"
            }
          }
        }
      }
    },
    tasks.clean(),
    tasks.loadJavaScript(),
    tasks.lintJavaScript(),
    tasks.extractCSS(isEnvDevelopment),
    tasks.lintSass(),
    tasks.loadImages(isEnvDevelopment),
    tasks.loadFonts(isEnvDevelopment)
  ]);

const productionConfig = isEnvDevelopment =>
  merge([
    tasks.generateSourceMaps({ type: "source-map" }),
    //tasks.purifyCSS(folder.templates),
    tasks.minifyJavaScript(),
    tasks.minifyCSS()
  ]);

const developmentConfig = isEnvDevelopment => merge([]);

module.exports = (webpackEnv, { entry, output }) => {
  const isEnvDevelopment = webpackEnv === "development";
  const mode = webpackEnv;

  const config = mode === "production" ? productionConfig : developmentConfig;
  return merge([
    { entry },
    { output },
    commonConfig(isEnvDevelopment),
    config(isEnvDevelopment),
    { mode }
  ]);
  // return smp.wrap(
  //   merge([
  //     entries,
  //     commonConfig(isEnvDevelopment),
  //     config(isEnvDevelopment),
  //     { mode }
  //   ])
  // );
};
