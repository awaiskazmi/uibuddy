var v = require("./variables.js");
var u = require("./unit.js");
var p = require("./property.js");

var exports = (module.exports = {});
exports.Magic = function(classes, componentClasses) {
  // classes = array of unique css classes
  // componentClasses = JSON object with className:classList
  /**
   * 1. Loop through all classes
   * 2. Match with variables
   * 3. Prepare CSS
   * 4. Join all lines of CSS
   * 5. Return as string
   */

  var unitValue = function(value, unit) {
    // modify values to correct css
    value = value.split("_").join(" ");

    // if no unit specified
    if (!unit) {
      return value;
    } else {
      let unitVal = unit.split("-")[0];
      let unitPosition = unit.split("-")[1];

      // prefix the unit
      if (unitPosition == "p") {
        return unitVal + value;
      }
      // suffix the unit
      if (unitPosition == "s") {
        return value + unitVal;
      }
    }
  };

  var className = function(string) {
    let symbols = ["#", "(", ")", ",", "%", ".", "'"];

    symbols.forEach(function(value, index) {
      string = string.split(value).join("\\" + value);
    });

    return string;
  };

  var makeClass = function(classArray) {
    var css = "";
    for (i = 0; i < classArray.length; i++) {
      let classArr = classArray[i].split(":");

      // naming class only
      if (classArr.length == 1) {
        continue;
      } else {
        // if both media query & state added
        if (classArr.length == 4) {
          unit = u.Unit(v[classArr[2]]);
          property = p.Property(v[classArr[2]]);

          css += `@media (min-width: ${v[classArr[1]]}px) {`;
          css += `.${classArr[0]}\\:${classArr[1]}\\:${
            classArr[2]
          }\\:${className(classArr[3])}:${
            classArr[0]
          } { ${property}: ${unitValue(classArr[3], unit)}!important; }`;
          css += "}";
        }

        // if media query/state added
        if (classArr.length == 3) {
          unit = u.Unit(v[classArr[1]]);
          property = p.Property(v[classArr[1]]);

          // if media query
          if (
            classArr[0] == "sm" ||
            classArr[0] == "md" ||
            classArr[0] == "lg" ||
            classArr[0] == "xl"
          ) {
            css += `@media (min-width: ${v[classArr[0]]}px) {`;
            css += `.${classArr[0]}\\:${classArr[1]}\\:${className(
              classArr[2]
            )} { ${property}: ${unitValue(classArr[2], unit)}!important; }`;
            css += "}";
          }

          // if state
          if (
            classArr[0] == "hover" ||
            classArr[0] == "focus" ||
            classArr[0] == "active"
          ) {
            css += `.${classArr[0]}\\:${classArr[1]}\\:${className(
              classArr[2]
            )}:${classArr[0]} { ${property}: ${unitValue(
              classArr[2],
              unit
            )}!important; }`;
          }
        }

        // if no media query added
        if (classArr.length == 2) {
          unit = u.Unit(v[classArr[0]]);
          property = p.Property(v[classArr[0]]);
          css += `.${classArr[0]}\\:${className(
            classArr[1]
          )} { ${property}: ${unitValue(classArr[1], unit)}!important; }`;
        }
      }
    }

    return css;
  };

  var makeCss = function(componentClass, classArray) {
    var css = "";
    for (i = 0; i < classArray.length; i++) {
      let classArr = classArray[i].split(":");

      // naming class only
      if (classArr.length == 1) {
        continue;
      } else {
        // if both media query & state added
        if (classArr.length == 4) {
          unit = u.Unit(v[classArr[2]]);
          property = p.Property(v[classArr[2]]);

          css += `@media (min-width: ${v[classArr[1]]}px) {`;
          css += `.${componentClass}:${classArr[0]} { ${property}: ${unitValue(
            classArr[3],
            unit
          )}; }`;
          css += "}";
        }

        // if media query/state added
        if (classArr.length == 3) {
          unit = u.Unit(v[classArr[1]]);
          property = p.Property(v[classArr[1]]);

          // if media query
          if (
            classArr[0] == "sm" ||
            classArr[0] == "md" ||
            classArr[0] == "lg" ||
            classArr[0] == "xl"
          ) {
            css += `@media (min-width: ${v[classArr[0]]}px) {`;
            css += `.${componentClass} { ${property}: ${unitValue(
              classArr[2],
              unit
            )}; }`;
            css += "}";
          }

          // if state
          if (
            classArr[0] == "hover" ||
            classArr[0] == "focus" ||
            classArr[0] == "active"
          ) {
            css += `.${componentClass}:${
              classArr[0]
            } { ${property}: ${unitValue(classArr[2], unit)}; }`;
          }
        }

        // if no media query added
        if (classArr.length == 2) {
          unit = u.Unit(v[classArr[0]]);
          property = p.Property(v[classArr[0]]);
          css += `.${componentClass} { ${property}: ${unitValue(
            classArr[1],
            unit
          )}; }`;
        }
      }
    }

    return css;
  };

  var css = makeClass(classes);
  var componentCss = "";

  for (var key in componentClasses) {
    let cClasses = componentClasses[key].split(" ");

    componentCss += makeCss(key, cClasses);
  }

  return css + " " + componentCss;
};
