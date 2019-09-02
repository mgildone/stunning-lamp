const { resolveApp, resolveOwnApp } = require("../utils/paths");

module.exports = {
  appPackageFile: resolveApp("package.json"),
  ownPackageFile: resolveOwnApp("package.json"),
  templatePath: resolveOwnApp("templates"),
  webpackEntries: resolveApp("webpackEntries.js")
};
