'use strict';

exports.create = function* () {
  const jsonSchema = {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "info": {
        "type": "object"
      }
    },
    "required": [
      "name",
      "info"
    ],
  };
  this.validateBySchema(jsonSchema);
  this.body = this.request.body;
};

exports.invalidSchema = function* () {
  const jsonSchema = {
    "type": "object",
    "properties": {
      "name": {
        "type": "a"
      },
      "info": {
        "type": "object"
      }
    },
    "required": [
      "name",
      "info",
    ],
  };
  this.validateBySchema(jsonSchema);
  this.body = this.request.body;
};
