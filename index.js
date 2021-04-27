"use strict";

const PLUGIN_NAME = "nocss";

const parser = require("./parseHTML.js"),
  magic = require("./magic.js"),
  through = require("through2"),
  gutil = require("gulp-util"),
  pluginError = gutil.PluginError,
  replaceExtension = require("replace-ext"),
  postcss = require("postcss"),
  path = require("path");

const nocss = function() {
  // read single file
  return through.obj(function(file, enc, callback) {
    // ERROR HANDLING
    if (file.isNull()) {
      return cb(null, file);
    }
    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, "Streaming not supported"));
    }
    if (path.basename(file.path).indexOf("_") === 0) {
      return cb();
    }
    if (!file.contents.length) {
      file.path = replaceExtension(file.path, ".css"); // eslint-disable-line no-param-reassign
      return cb(null, file);
    }

    // IF NO ERRORS
    var isBuffer = false,
      string = "",
      css = "";

    // convert single file to buffer
    isBuffer = file.isBuffer();

    if (isBuffer) {
      // convert single file buffer to string
      string = new String(file.contents);
      // generate css from string
      css += magic.Magic(
        parser.cssClasses(string),
        parser.componentClasses(string)
      );
      // run postcss on single file
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
          // generate single .css file
          var x = result.css;
          var outBuffer = Buffer.from(x);
          var aFile = new gutil.File();
          aFile.contents = outBuffer;
          aFile.path = replaceExtension(file.path, ".css");

          callback(null, aFile);
        });
    }
  });
};

module.exports = nocss;
