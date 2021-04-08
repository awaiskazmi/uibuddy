var exports = (module.exports = {});
exports.Unit = function(string) {
  // if no unit specified
  if (!string.includes(":")) {
    return "";
  } else {
    return string.split(":")[1];
  }
};
