#!/usr/bin/env node
var fs = require("fs");
var parser = require("./parseHTML.js");
var magic = require("./magic.js");
var mqpacker = require("css-mqpacker");

var source = process.argv.splice(2)[0];
var target = source.substring(0, source.lastIndexOf(".")) + ".css";
var filename = "style.css";
var output = "";

fs.readFile(source, "utf-8", function(err, data) {
  if (err) throw err;

  output = magic.Magic(parser.ParseHTML(data));

  // fs.writeFile(target, data, function(err) {
  // fs.writeFile(filename, output, function(err) {
  //   if (err) throw err;
  //
  //   console.log("\x1b[32m", "Wrote " + target + "!");
  // });

  var result = mqpacker.pack(output, {
    from: output,
    map: {
      inline: false
    },
    sort: true,
    to: "style.min.css"
  });

  fs.writeFileSync("style.min.css", result.css);
  fs.writeFileSync("style.min.css.map", result.map);
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
