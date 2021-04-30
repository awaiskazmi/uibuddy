const { watch, src, dest, task } = require("gulp");
const nocss = require("./index.js");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const combine = require("postcss-combine-duplicated-selectors");
const duplicate = require("postcss-discard-duplicates");
const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");
const pug = require("gulp-pug-3");

const build = function () {
  const plugins = [combine(), duplicate(), autoprefixer(), mqpacker()];
  return src("./pug/*.pug")
    .pipe(pug())
    .pipe(dest("./dist/"))
    .pipe(nocss())
    .pipe(concat("style.min.css"))
    .pipe(postcss(plugins))
    .pipe(dest("./"));
};
build.displayName = "nocss";

task(build);

function watcher() {
  watch("./pug/**/*.pug", build);
}
watcher.displayName = "watch";

task(watcher);
