# &empty; NoCSS

Build fully functional design systems, web pages, and custom user interfaces without writing CSS.

## Documentation

For full documentation, visit [dcodestudios.com/nocss](http://dcodestudios.com/nocss).

## Installation

```javascript
npm install @dcodestudios/nocss
```

## Basic Usage

Create a nocss.js file in the root of your project directory and paste the code below:

```javascript
const chokidar = require("chokidar");
const nocss = require("@dcodestudios/nocss");

module.exports.watch = function() {
  chokidar
    .watch("*.html", { persistent: true, ignoreInitial: true })
    .on("all", (event, filePath) => {
      nocss();
    });
};
```

In your package.json file, add the following scripts:

```javascript
"watch": "run-func nocss.js watch"
```

Start the project by running:

```javascript
npm run watch
```

## Contributing

If you're interested in contributing to NoCSS, please send us an email at [devs.awais@gmail.com](mailto:devs.awais@gmail.com) before submitting a pull request.
