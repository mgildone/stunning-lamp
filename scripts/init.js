"use strict";

process.on("unhandledRejection", err => {
  throw err;
});

const spawn = require("cross-spawn");
const path = require("path");
const fs = require("fs-extra");
const os = require("os");
const chalk = require("chalk");
const { appDirectory, resolveApp } = require("../utils/paths");
const {
  appPackageFile,
  ownPackageFile,
  templatePath,
  webpackEntries
} = require("../config/paths");

const appPackage = require(appPackageFile);
const ownPackage = require(ownPackageFile);
const webpackEntriesExist = fs.existsSync(webpackEntries);

appPackage.scripts = Object.assign({}, appPackage.scripts, {
  init: "stunning-lamp init",
  build: "stunning-lamp build --env production",
  dev: "stunning-lamp build --env development"
});

//TODO: add @springernature/eslint-config to this list
appPackage.dependencies = Object.assign(
  {},
  appPackage.dependencies,
  ownPackage.dependencies
);

fs.writeFileSync(
  resolveApp("package.json"),
  JSON.stringify(appPackage, null, 2) + os.EOL
);

if (webpackEntriesExist) {
  fs.renameSync(
    resolveApp("webpackEntries.js"),
    resolveApp("webpackEntries.old.js")
  );
}

console.log(templatePath, appDirectory);

if (fs.existsSync(templatePath)) {
  fs.copySync(templatePath, appDirectory);
} else {
  console.error(
    `Could not locate supplied template: ${chalk.green(templatePath)}`
  );
  return;
}

const proc = spawn.sync("npm", ["install", "--save", "--verbose"], {
  stdio: "inherit"
});

if (proc.status !== 0) {
  console.error(`\`${command} ${args.join(" ")}\` failed`);
  return;
}

console.log();
console.log(chalk.green(`Success!`));
console.log("Inside this directory, you can run several commands:");
console.log();
console.log(chalk.cyan(`npm run build`));
console.log("    Bundles the app into static files for production.");
console.log();
console.log(chalk.cyan(`npm run dev`));
console.log("    Bundles the app into static files for development.");
console.log();
console.log("Happy hacking!");
