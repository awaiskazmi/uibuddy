const { watch, src, dest, task } = require("gulp");
const nocss = require("./index.js");

const build = function(cb) {
  return src("./*.html")
    .pipe(nocss())
    .pipe(dest("dist/"));
  cb();
};
build.displayName = "nocss";

task(build);

function watcher() {
  watch("./*.html", build);
}
watcher.displayName = "watch";

task(watcher);
