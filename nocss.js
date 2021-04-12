#!/usr/bin/env node

/**
 * NOCSS
 * Started 8th, April 2021
 * Author: Awais Kazmi
 */

// "watch:nocss": "nodemon -e html,js -x \"npm run nocss\" ",

// "postnocss": "concat-glob-cli -f \"*.css\" -o build.css.src && mqpacker build.css.src > style.css && css-minify -f style.css -o css && del \"*.css\" ",

// css-minify -f style.css -o css

var fs = require("fs");
var glob = require("glob");
var parser = require("./parseHTML.js");
var magic = require("./magic.js");
var concat = require("concat");

// var mqpacker = require("css-mqpacker");
// var source = process.argv.splice(2)[0];
// var target = source.substring(0, source.lastIndexOf(".")) + ".css";
// var filename = "style.css";
// var output = "";

var finalOutput = "";

glob("*.html", {}, function(err, files) {
  // concat all html files for reading
  concat(files).then(result => {
    // parse concatenated html file, parse all classes, and generate css
    finalOutput = magic.Magic(parser.ParseHTML(result));
    // write to build.css and later optimize
    fs.writeFile("build.css", finalOutput, function(err) {
      if (err) throw err;
    });
  });
});

/*

// ======================================================
// ======================================================
// ORIGINAL CODE BELOW
// ======================================================
// ======================================================

fs.readFile(source, "utf-8", function (err, data) {
  if (err) throw err;

  output = magic.Magic(parser.ParseHTML(data));

  // fs.writeFile(filename, output, function(err) {
  fs.writeFile(target, output, function (err) {
    if (err) throw err;
  });

  // clear style.css
  fs.writeFile("style.css", "", function (err) {
    if (err) throw err;
  });

  // var result = mqpacker.pack(output, {
  //   from: output,
  //   map: {
  //     inline: false,
  //   },
  //   sort: true,
  //   // to: "style.min.css",
  //   to: target,
  // });

  // fs.writeFileSync(target, result.css.toString());
  // fs.writeFileSync("style.min.css", result.css.toString());
  // fs.writeFileSync("style.min.css.map", result.map.toString());
});

// var result = mqpacker.pack(fs.readFileSync(filename, "utf8"), {
//   from: filename,
//   map: {
//     inline: false
//   },
//   sort: true,
//   to: "style.min.css"
// });
//
// fs.writeFileSync("style.min.css", result.css);
// fs.writeFileSync("style.min.css.map", result.map);

*/
