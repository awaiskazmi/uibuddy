const chokidar = require("chokidar");
const uibuddy = require("./index.js");
const fileExtension = 'html';

// 1. build
module.exports.build = function () {
  uibuddy(fileExtension);
};

// 2. watcher
module.exports.watch = function () {
  console.log("watch started...");
  chokidar
    .watch(`*.${fileExtension}`, { persistent: true, ignoreInitial: true })
    .on("all", (event, filePath) => {
      console.log(filePath + " changed, processing");
      uibuddy(fileExtension);
    });
};
