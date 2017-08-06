'use strict';

module.exports = {
  /**
   * validate data with JSON Schema
   *
   * @param  {Object} jsonSchema  - JSON Schema object, see [ajv](http://epoberezkin.github.io/ajv/)
   * @param  {Object} [data] - validate target, default to `this.request.body`
   */
  validateBySchema(jsonSchema, data) {
    // validate the schema is valid or invalid first!
    const schemaValid = this.app.schemaValidator.validateSchema(jsonSchema);
    if (!schemaValid) {
      this.throw(422, 'Validation Failed', {
        code: 'invalid_schema',
        errors: this.app.schemaValidator.errors,
      });
    }

    // then check the data match jsonSchema
    data = data || this.request.body;
    const valid = this.app.schemaValidator.validate(jsonSchema, data);
    if (!valid) {
      this.throw(422, 'Validation Failed', {
        code: 'invalid_param',
        errors: this.app.schemaValidator.errors,
      });
    }
  },
};
