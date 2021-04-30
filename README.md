# &empty; NoCSS (Gulp plugin)

Build fully functional design systems, web pages, and custom user interfaces without writing CSS.

## Documentation

For full documentation, visit [dcodestudios.com/nocss](http://dcodestudios.com/nocss).

## Installation

Install the npm package:

```javascript
npm i @dcodestudios/gulp-nocss
```

Create a gulpfile.js file in the root of your project directory and paste the code below:

```javascript
const { watch, src, dest, task } = require("gulp");
const nocss = require("./index.js");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const combine = require("postcss-combine-duplicated-selectors");
const duplicate = require("postcss-discard-duplicates");
const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");

const build = function () {
  const plugins = [combine(), duplicate(), autoprefixer(), mqpacker()];
  return src("./*.html")
    .pipe(nocss())
    .pipe(concat("style.min.css"))
    .pipe(postcss(plugins))
    .pipe(dest("./"));
};
build.displayName = "nocss";

task(build);

function watcher() {
  watch("./*.html", build);
}
watcher.displayName = "watch";

task(watcher);
```

In your package.json file, add the following scripts:

```javascript
"nocss": "gulp nocss",
"watch": "gulp watch"
```

Start the project by running:

```javascript
npm run watch
```

## Contributing

If you're interested in contributing to NoCSS, please send us an email at [devs.awais@gmail.com](mailto:devs.awais@gmail.com) before submitting a pull request.
