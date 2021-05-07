var jsdom = require("jsdom");
var exports = (module.exports = {});

exports.cssClasses = function(html) {
  var classes = []; // empty array

  html.replace(/class=['"][^'"]+/g, function(m) {
    // https://regex101.com/r/jD0wX1/1
    classes = classes.concat(m.match(/[^'"]+$/)[0].split(" ")); // https://regex101.com/r/jD0wX1/2
  }); // take all classes

  classes = classes.filter(function(item, pos) {
    if (item.indexOf(":") > 0) {
      // means it is ui buddy unique class
      return classes.indexOf(item) == pos;
    } else {
      return "";
    }
  }); // return unique classes

  return classes;
};

exports.componentClasses = function(html) {
  var componentClasses = {};
  var dom = new jsdom.JSDOM(html);
  var components = dom.window.document.querySelectorAll("[component]");
  var tags = dom.window.document.querySelectorAll("[tag]");

  if (components.length > 0) {
    components.forEach(component => {
      componentClasses[`component:${component.getAttribute("component")}`] =
        component.classList.value;
    });
  }

  if (tags.length > 0) {
    tags.forEach(tag => {
      componentClasses[`tag:${tag.getAttribute("tag")}`] = tag.classList.value;
    });
  }

  return componentClasses;
};

exports.parentStateClasses = function(html) {
  // get a specific class from an array
  var getParentClasses = function(classList) {
    return classList.split(" ").filter(function(item, index) {
      return item.indexOf("parent") == 0;
    });
  };
  // to generate class object
  var getComponentParent = function(el) {
    let classes = {};
    let parentNode = el.closest(".parent");
    classes["componentName"] = el.getAttribute("component");
    classes["componentParent"] = parentNode.getAttribute("component");
    classes["componentClasses"] = getParentClasses(el.classList.value);

    return classes;
  };

  var componentClasses = [];
  var dom = new jsdom.JSDOM(html);
  var components = dom.window.document.querySelectorAll(
    `[component][class^="parent-"`
  );

  if (components.length > 0) {
    components.forEach(component => {
      componentClasses.push(getComponentParent(component));
    });
  }

  return componentClasses;
};
