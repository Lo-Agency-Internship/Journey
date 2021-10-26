/**
 * Check if given inputs have values
 * @param {object} inputs - inputs for validating
 * @return {string[]}  error messages
 */
exports.hasValue = function (inputs) {
  let errors = [];
  if (!inputs || typeof inputs !== "object") throw new Error("Invalid input");
  for (let key in inputs) {
    if (!inputs[key]) errors.push(`${key} is required and must not be empty`);
  }
  return errors;
};
