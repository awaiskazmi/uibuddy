var v = require("./variables.js");
var u = require("./unit.js");
var p = require("./property.js");

var exports = (module.exports = {});
exports.Magic = function(classes) {
  // classes = array of unique css classes
  /**
   * 1. Loop through all classes
   * 2. Match with variables
   * 3. Prepare CSS
   * 4. Join all lines of CSS
   * 5. Return as string
   */

  var css = "";

  var unitValue = function(value, unit) {
    // modify values to correct css
    value = value
      .replace("_hex_", "#")
      .replace("_comma_", ",")
      .replace("_hyphen_", "-")
      .replace("_open_", "(")
      .replace("_close_", ")")
      .split("_")
      .join(" ");

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

  for (i = 0; i < classes.length; i++) {
    let classArr = classes[i].split("-");
    let unit = u.Unit(v[classArr[0]]);
    let property = p.Property(v[classArr[0]]);

    // if media query added
    if (classArr.length == 3) {
      css += `@media (min-width: ${classArr[1]}px) {`;
      css += `.${classArr[0]}-${classArr[1]}-${
        classArr[2]
      } { ${property}: ${unitValue(classArr[2], unit)}!important; }`;
      css += "}";
      css += "\n";
    }

    // if no media query added
    if (classArr.length == 2) {
      css += `.${classArr[0]}-${classArr[1]} { ${property}: ${unitValue(
        classArr[1],
        unit
      )}; }`;
      css += "\n";
    }
  }

  return css;
};
