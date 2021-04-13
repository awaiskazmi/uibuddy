var jsdom = require("jsdom");
var exports = (module.exports = {});

exports.cssClasses = function(html) {
  var classes = []; // empty array

  html.replace(/class=['"][^'"]+/g, function(m) {
    // https://regex101.com/r/jD0wX1/1
    classes = classes.concat(m.match(/[^'"]+$/)[0].split(" ")); // https://regex101.com/r/jD0wX1/2
  }); // take all classes

  classes = classes.filter(function(item, pos) {
    return classes.indexOf(item) == pos;
  }); // return unique classes

  return classes;
};

exports.componentClasses = function(html) {
  var componentClasses = {};
  var dom = new jsdom.JSDOM(html);
  var components = dom.window.document.querySelectorAll("[component]");

  if (components.length > 0) {
    components.forEach(component => {
      componentClasses[`component-${component.getAttribute("component")}`] =
        component.classList.value;
    });
  }

  return componentClasses;
};
