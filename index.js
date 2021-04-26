/**
 * 1. watch folder for changes
 * 2. get changed file path
 * 3. read file at changed path
 * 4. generate css for that file in a temp folder
 * 5. concat all generated css files
 * 6. run postcss on (5)
 * 7. generate single style.min.css file
 */

// DIRECTORY TO WATCH
const pathtoWatch = __dirname + "/";

const fs = require("fs");
const mkdirp = require("mkdirp");
const chokidar = require("chokidar");
const parser = require("./parseHTML.js");
const magic = require("./magic.js");
const glob = require("glob");
const concat = require("concat");
const postcss = require("postcss");

// 1. watch folder for changes
chokidar
  .watch("*.html", { persistent: true, ignoreInitial: true, cwd: pathtoWatch })
  .on("all", (event, filePath) => {
    console.log(filePath + " changed...");
    // 1. read all html files
    glob(__dirname + "/*.html", {}, function(err, files) {
      // 2. join all html files
      concat(files).then(html => {
        // 3. parse and generate css
        css = magic.Magic(
          parser.cssClasses(html),
          parser.componentClasses(html)
        );
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
  });

/*

// 1. watch folder for changes
chokidar
  .watch("*.html", { persistent: true, ignoreInitial: true, cwd: pathtoWatch })
  .on("all", (event, filePath) => {
    desinationFilename = filePath.split(".")[0];
    console.log("\x1b[36m%s\x1b[0m", filePath + " changed...");

    // 2 & 3. get changed file path and read file
    fs.readFile(filePath, "utf-8", function(err, data) {
      if (err) throw err;

      finalOutput = magic.Magic(
        parser.cssClasses(data),
        parser.componentClasses(data)
      );

      // 4. generate css for that file in a temp folder
      mkdirp(__dirname + "/tmp").then(made => {
        var written = fs.writeFile(
          __dirname + "/tmp/" + desinationFilename + ".css",
          finalOutput,
          "utf8",
          function(err, data) {
            if (err) throw err;
            glob(__dirname + "/tmp/*.css", {}, function(err, files) {
              // 5. concat all generated css files
              concat(files).then(css => {
                // console.log("\x1b[33m%s\x1b[0m", "...concatenating files...");
                // 6. run postcss on (5)
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
                    // console.log("\x1b[33m%s\x1b[0m", "...applying postcss...");
                    // 7. generate single style.min.css file
                    finalCss = fs.writeFile(
                      __dirname + "/style.min.css",
                      result.css,
                      "utf8",
                      function(err, data) {
                        if (err) throw err;
                        console.log(
                          "\x1b[32m%s\x1b[0m",
                          "nocss build complete!"
                        );
                      }
                    );
                  });
              });
            });
          }
        );
      });
    });
  });

  */
