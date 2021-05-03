# UI Buddy

Build fully functional design systems, web pages, and custom user interfaces without writing CSS.

## Documentation

For full documentation, visit [dcodestudios.com/uibuddy](http://dcodestudios.com/uibuddy).

## Installation

```javascript
npm install uibuddy
```

## Basic Usage

Create a uibuddy.js file in the root of your project directory and paste the code below:

```javascript
const chokidar = require("chokidar");
const uibuddy = require("uibuddy");

module.exports.watch = function () {
  chokidar
    .watch("*.html", { persistent: true, ignoreInitial: true })
    .on("all", (event, filePath) => {
      uibuddy();
    });
};
```

In your package.json file, add the following scripts:

```javascript
"watch": "run-func uibuddy.js watch"
```

Start the project by running:

```javascript
npm run watch
```

## Contributing

If you're interested in contributing to UI Buddy, please send us an email at [devs.awais@gmail.com](mailto:devs.awais@gmail.com) before submitting a pull request.
