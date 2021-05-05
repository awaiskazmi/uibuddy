var v = require("./variables.js");

var exports = (module.exports = {});
exports.Magic = function (simpleClasses, componentClasses, parentStateClasses) {
  // classes = array of unique css classes
  // componentClasses = JSON object with className:classList
  // parentStateClasses = JSON array with componentName, componentParent, and componentClasses
  /**
   * 1. Loop through all classes
   * 2. Match with variables
   * 3. Prepare CSS
   * 4. Join all lines of CSS
   * 5. Return as string
   */

  var cssValue = function (value) {
    return value.split("_").join(" ");
  };

  var className = function (string) {
    let symbols = ["#", "(", ")", ",", "%", ".", "'"];

    symbols.forEach(function (value, index) {
      string = string.split(value).join("\\" + value);
    });

    return string;
  };

  var makeClass = function (classString) {
    var css = "";
    let classArr = classString.split(":");

    // random class
    if (classArr.length <= 1) {
      return;
    } else {
      // if both media query & state added
      if (classArr.length == 4) {
        property = v[classArr[2]];
        value = cssValue(classArr[3]);

        // if no parent-state class present
        if (classArr[0].indexOf("parent") < 0) {
          css += `@media (min-width: ${v[classArr[1]]}px) {`;
          css += `.${classArr[0]}\\:${classArr[1]}\\:${
            classArr[2]
          }\\:${className(classArr[3])}:${classArr[0]}:${
            classArr[0]
          } { ${property}: ${value}!important; }`;
          css += "}";
        } else {
          css += `@media (min-width: ${v[classArr[1]]}px) {`;
          css += `.parent:${classArr[0].split("-")[1]} .${classArr[0]}\\:${
            classArr[1]
          }\\:${classArr[2]}\\:${className(
            classArr[3]
          )} { ${property}: ${value}!important; }`;
          css += "}";
        }
      }

      // if media query/state added
      if (classArr.length == 3) {
        property = v[classArr[1]];
        value = cssValue(classArr[2]);

        // if media query
        if (
          classArr[0] == "xs" ||
          classArr[0] == "sm" ||
          classArr[0] == "md" ||
          classArr[0] == "lg" ||
          classArr[0] == "xl"
        ) {
          css += `@media (min-width: ${v[classArr[0]]}px) {`;
          css += `.${classArr[0]}\\:${classArr[1]}\\:${className(
            classArr[2]
          )} { ${property}: ${value}!important; }`;
          css += "}";
        }

        // if state
        if (
          classArr[0] == "hover" ||
          classArr[0] == "focus" ||
          classArr[0] == "active" ||
          classArr[0] == "visited" ||
          classArr[0] == "disabled" ||
          classArr[0] == "checked"
        ) {
          css += `.${classArr[0]}\\:${classArr[1]}\\:${className(
            classArr[2]
          )}:${classArr[0]} { ${property}: ${value}!important; }`;
        }

        // if group state
        if (
          classArr[0] == "parent-hover" ||
          classArr[0] == "parent-focus" ||
          classArr[0] == "parent-active" ||
          classArr[0] == "parent-visited" ||
          classArr[0] == "parent-disabled" ||
          classArr[0] == "parent-checked"
        ) {
          css += `.parent:${classArr[0].split("-")[1]} .${classArr[0]}\\:${
            classArr[1]
          }\\:${className(classArr[2])} { ${property}: ${value}!important; }`;
        }
      }

      // if no media query added
      if (classArr.length == 2) {
        property = v[classArr[0]];
        value = cssValue(classArr[1]);
        css += `.${classArr[0]}\\:${className(
          classArr[1]
        )} { ${property}: ${value}!important; }`;
      }
    }

    return css;
  };

  var makeCss = function (componentClass, classArray) {
    var css = "";
    for (i = 0; i < classArray.length; i++) {
      let classArr = classArray[i].split(":");

      // naming class only
      if (classArr.length <= 1) {
        continue;
      } else {
        // if both media query & state added
        // && classArr[0].indexOf("parent") < 0
        if (classArr.length == 4 && classArr[0].indexOf("parent") < 0) {
          property = v[classArr[2]];
          value = cssValue(classArr[3]);

          css += `@media (min-width: ${v[classArr[1]]}px) {`;
          css += `.${componentClass}:${classArr[0]} { ${property}: ${value}; }`;
          css += "}";
        }

        // if media query/state added
        if (classArr.length == 3) {
          property = v[classArr[1]];
          value = cssValue(classArr[2]);

          // if media query
          if (
            classArr[0] == "xs" ||
            classArr[0] == "sm" ||
            classArr[0] == "md" ||
            classArr[0] == "lg" ||
            classArr[0] == "xl"
          ) {
            css += `@media (min-width: ${v[classArr[0]]}px) {`;
            css += `.${componentClass} { ${property}: ${value}; }`;
            css += "}";
          }

          // if state
          if (
            classArr[0] == "hover" ||
            classArr[0] == "focus" ||
            classArr[0] == "active" ||
            classArr[0] == "visited" ||
            classArr[0] == "disabled" ||
            classArr[0] == "checked"
          ) {
            css += `.${componentClass}:${classArr[0]} { ${property}: ${value}; }`;
          }

          // if group state
          if (
            classArr[0] == "parent-hover" ||
            classArr[0] == "parent-focus" ||
            classArr[0] == "parent-active" ||
            classArr[0] == "parent-visited" ||
            classArr[0] == "parent-disabled" ||
            classArr[0] == "parent-checked"
          ) {
            css += `.parent:${classArr[0].split("-")[1]} .${classArr[0]}\\:${
              classArr[1]
            }\\:${className(classArr[2])} { ${property}: ${value}!important; }`;
          }
        }

        // if no media query added
        if (classArr.length == 2) {
          property = v[classArr[0]];
          value = cssValue(classArr[1]);
          css += `.${componentClass} { ${property}: ${value}; }`;
        }
      }
    }

    return css;
  };

  var makeParentStateCss = function (parentStateClassesObject) {
    let css = "";
    // 1. get all classes
    let classes = parentStateClassesObject.componentClasses;

    // 2. loop through all classes
    for (var i = 0; i < classes.length; i++) {
      // 3. split class
      let itemClass, state;
      itemClass = classes[i].split(":");
      state = itemClass[0].split("-")[1];

      // if media breakpoint added
      if (itemClass.length == 4) {
        media = itemClass[1];
        property = itemClass[2];
        value = itemClass[3];

        // 4. prepare css according to state
        css += `@media(min-width: ${v[media]}px) {`;
        css += `.${parentStateClassesObject.componentParent}:${state} .${parentStateClassesObject.componentName}{${v[property]}:${value};}`;
        css += `}`;
      } else {
        property = itemClass[1];
        value = itemClass[2];
        // 4. prepare css according to state
        css += `.${parentStateClassesObject.componentParent}:${state} .${parentStateClassesObject.componentName}{${v[property]}:${value};}`;
      }
    }

    return css;
  };

  // SIMPLE CSS CLASSES
  var simpleCss = "";

  for (i = 0; i < simpleClasses.length; i++) {
    simpleCss += makeClass(simpleClasses[i]);
  }

  // COMPONENT CLASSES
  var componentCss = "";

  for (var key in componentClasses) {
    let cClasses = componentClasses[key].split(" ");

    componentCss += makeCss(key, cClasses);
  }

  // PARENT STATE CLASSES
  var parentStateCss = "";

  for (var i = 0; i < parentStateClasses.length; i++) {
    parentStateCss += makeParentStateCss(parentStateClasses[i]);
  }

  return simpleCss + " " + componentCss + " " + parentStateCss;
};
