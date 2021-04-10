var exports = (module.exports = {});
exports.ParseHTML = function (html) {
  var classes = []; // empty array

  html.replace(/class=['"][^'"]+/g, function (m) {
    // https://regex101.com/r/jD0wX1/1
    classes = classes.concat(m.match(/[^'"]+$/)[0].split(" ")); // https://regex101.com/r/jD0wX1/2
  }); // take all classes

  classes = classes.filter(function (item, pos) {
    return classes.indexOf(item) == pos;
  }); // return unique classes

  return classes;
};
