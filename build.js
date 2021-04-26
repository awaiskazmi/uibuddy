/**
 * 1. read all html files
 * 2. join all html files
 * 3. parse and generate css
 * 4. run postcss
 * 5. generate style.min.css
 */

const fs = require("fs");
const parser = require("./parseHTML.js");
const magic = require("./magic.js");
const glob = require("glob");
const concat = require("concat");
const postcss = require("postcss");

// 1. read all html files
glob(__dirname + "/*.html", {}, function(err, files) {
  // 2. join all html files
  concat(files).then(html => {
    // 3. parse and generate css
    css = magic.Magic(parser.cssClasses(html), parser.componentClasses(html));
    // 4. run postcss
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
        // 5. generate style.min.css
        finalCss = fs.writeFile(
          __dirname + "/style.min.css",
          result.css,
          "utf8",
          function(err, data) {
            if (err) throw err;
            console.log("\x1b[32m%s\x1b[0m", "nocss build complete!");
          }
        );
      });
  });
});
