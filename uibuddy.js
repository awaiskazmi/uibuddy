const chokidar = require("chokidar");
const uibuddy = require("./index.js");

// 1. build
module.exports.build = function () {
  uibuddy();
};

// 2. watcher
module.exports.watch = function () {
  console.log("watch started...");
  chokidar
    .watch("*.html", { persistent: true, ignoreInitial: true })
    .on("all", (event, filePath) => {
      console.log(filePath + " changed, processing");
      uibuddy();
    });
};
