const path = require("path");
const fs = require("fs-extra");

const ownPath = path.dirname(
  require.resolve(path.join(__dirname, "..", "package.json"))
);
const appDirectory = fs.realpathSync(process.cwd());
const resolveOwnApp = relativePath => path.resolve(ownPath, relativePath);
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  ownPath,
  appDirectory,
  resolveOwnApp,
  resolveApp
};
