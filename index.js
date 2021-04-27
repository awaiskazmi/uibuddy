"use strict";

const PLUGIN_NAME = "nocss";

const parser = require("./parseHTML.js"),
  magic = require("./magic.js"),
  through = require("through2"),
  gutil = require("gulp-util"),
  pluginError = gutil.PluginError,
  postcss = require("postcss"),
  fs = require("fs");

var nocss = function() {
  // read file
  return through.obj(function(file, enc, callback) {
    var isBuffer = false,
      string = "",
      css = "";

    // file to buffer
    isBuffer = file.isBuffer();

    if (isBuffer) {
      // convert file buffer to string
      string = new String(file.contents);
      // generate css from string
      css += magic.Magic(
        parser.cssClasses(string),
        parser.componentClasses(string)
      );
      // run postcss
      postcss([
        require("postcss-combine-duplicated-selectors"),
        require("postcss-discard-duplicates"),
        require("autoprefixer"),
        require("css-mqpacker")
      ])
        .process(css, {
          from: "style.css",
          to: "style.min.css"
        })
        .then(result => {
          // generate style.min.css
          fs.writeFile(
            __dirname + "/style.min.css",
            result.css,
            "utf8",
            function(err, data) {
              if (err) throw err;
              console.log("\x1b[32m%s\x1b[0m", "nocss build complete!");
            }
          );
        });
    }
    callback();
  });
};

module.exports = nocss;
