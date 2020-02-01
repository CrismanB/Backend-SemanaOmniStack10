module.exports = function parseStringAsArray(arrayAsString) {
  return arrayAsString.split(",").map(i => i.trim());
};
