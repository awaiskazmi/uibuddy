# &empty; nocss

#### Write CSS without writing CSS!

Build websites just by writing HTML in an intuitive way and let us take care of the CSS for you!

## Installation

#### Install the npm package

`npm i @syawais/nocss`

#### Create a nocss.js file in the root of your project directory and paste the following lines of code

```javascript
const chokidar = require("chokidar");
const nocss = require("./index.js");

module.exports.watch = function() {
  chokidar
    .watch("*.html", { persistent: true, ignoreInitial: true })
    .on("all", (event, filePath) => {
      nocss();
    });
};
```

#### Run the project

`npm run watch`

## What is nocss?

**nocss** monitors your html files, watches for any changes, and generates css automatically based on the classes that you give to your elements, making this the first ever framework of its kind!

#### Properties, Media Queries, and Pseudo-Classes!

**nocss** supports all css properties, along with the addition of media queries and pseudo-classes making it extremely powerful, giving you the freedom to design absolutely anything!

#### Components

**nocss** also provides you a very simple and easy-to-use interface to build re-usable components, which you can use across multiple HTML files. Not only this, any changes made to the master component will automatically be translated to all its instances across the entire project. All within a split-second!

## Examples

#### 12px font size, red color

`<div class="fs:12px clr:#ff0000"></div>`

#### Bold font weight, 4px letter spacing

`<div class="fw:bold ls:4px"></div>`

#### Responsive border radius

`<div class="br:4px md:br:16px"></div>`

#### Button with hover state

`<div class="d:inline-block p:24px bgc:#000 clr:#fff hover:bgc:#ddd hover:clr:#000">Button/div>`
