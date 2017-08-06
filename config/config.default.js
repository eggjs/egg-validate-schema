'use strict';

module.exports = {
  /**
   * same with ajv options: http://epoberezkin.github.io/ajv/#options
   * default just set below object:
   * {
   *   allErrors: true,
   *   v5: true,
   * }
   */
  validateSchema: {
    // check all errors
    allErrors: true,
    // json-schema v5 version
    v5: true,
  },
};
