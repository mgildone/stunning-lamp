const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const webpack = require("webpack");

const configFactory = require("../config/webpack.config");
const { webpackEntries } = require("../config/paths");
const webpackEnt = require(webpackEntries);
const { env } = yargs.argv;
const config = configFactory(env, webpackEnt(env));

console.log(
  boxen(chalk`{bold {cyan Building for: ${env}}}`, {
    padding: 1,
    margin: 1,
    borderStyle: "double"
  })
);

const compiler = webpack(config);

compiler.run((err, stats) => {
  // Stats Object
  const { errors, warnings } = stats.toJson({
    all: true,
    warnings: true,
    errors: true
  });

  if (errors.length > 0) {
    console.log(chalk`{bold {white Errors: }}`);
    errors.forEach(error => {
      console.log(chalk`{bold {white ${error}}}`);
    });
  }
  if (warnings.length > 0) {
    console.log(chalk`{bold {white Warnings: }}`);
    warnings.forEach(warning => {
      console.log(chalk`{bold {yellow ${warning}}}`);
    });
  }
});
