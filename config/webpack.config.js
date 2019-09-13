const merge = require("webpack-merge");
const ManifestPlugin = require("webpack-manifest-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const tasks = require("./webpack.tasks");
const { tasksConfig, myFunc } = require("../utils/tasks");
const { uniqueArray } = require("../utils/array");
const { pipe } = require("../utils/fn");
const smp = new SpeedMeasurePlugin();

// const commonConfig = isEnvDevelopment =>
//   merge([
//     {
//       plugins: [
//         new ManifestPlugin({
//           fileName: "assets.json"
//         })
//       ],
//       optimization: {
//         usedExports: true,
//         splitChunks: {
//           chunks: "all",
//           cacheGroups: {
//             vendor: {
//               test: /[\\\/]node_modules[\\\/]/,
//               name: "vendors",
//               chunks: "all"
//             }
//           }
//         }
//       }
//     },
//     tasks.clean(),
//     tasks.loadJavaScript(),
//     tasks.lintJavaScript(),
//     tasks.extractCSS(isEnvDevelopment),
//     tasks.lintSass(),
//     tasks.loadImages(isEnvDevelopment),
//     tasks.loadFonts(isEnvDevelopment)
//   ]);

module.exports = (
  webpackEnv,
  { entry, output, commonConfig, developmentConfig, productionConfig }
) => {
  const isEnvDevelopment = webpackEnv === "development";
  const mode = webpackEnv;

  const taskListFactory = pipe(
    uniqueArray,
    tasksConfig,
    myFunc(isEnvDevelopment, tasks)
  );

  const commonTasks = merge(
    taskListFactory(
      [
        "clean",
        "loadJavaScript",
        "lintJavaScript",
        "extractCSS",
        "lintSass",
        "loadImages",
        "loadFonts"
      ].concat(commonConfig)
    )
  );

  const developmentTasks = merge(taskListFactory([].concat(developmentConfig)));

  const productionTasks = merge(
    taskListFactory(
      ["generateSourceMaps", "minifyJavaScript", "minifyCSS"].concat(
        productionConfig
      )
    )
  );

  const config = mode === "production" ? productionTasks : developmentTasks;

  return merge([{ entry }, { output }, commonTasks, config, { mode }]);
  // return smp.wrap(
  //   merge([
  //     entries,
  //     commonConfig(isEnvDevelopment),
  //     config(isEnvDevelopment),
  //     { mode }
  //   ])
  // );
};
