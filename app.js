'use strict';

const Ajv = require('ajv');

module.exports = app => {
  /**
   * schemaValidator
   *
   * ```js
   * app.schemaValidator.validate({
   *   "type": "object",
   *   "properties": {
   *     "name": {
   *       "type": "string"
   *     },
   *     "info": {
   *       "type": "object"
   *     }
   *   },
   *   "required": [
   *     "name",
   *     "info"
   *   ],
   * }, {
   *   name: 'Egg',
   *   info: '{"foo": "bar"}',
   * });
   * ```
   */
  app.schemaValidator = new Ajv(app.config.validateSchema);
};
