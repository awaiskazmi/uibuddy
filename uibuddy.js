const chokidar = require("chokidar");
const uibuddy = require("./index.js");

// 1. build
module.exports.build = function () {
  uibuddy();
};

// 2. watcher
module.exports.watch = function () {
  chokidar
    .watch("*.html", { persistent: true, ignoreInitial: true })
    .on("all", (event, filePath) => {
      uibuddy();
    });
};
