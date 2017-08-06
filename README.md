# egg-validate-schema

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-validate-schema.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-validate-schema
[travis-image]: https://img.shields.io/travis/eggjs/egg-validate-schema.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-validate-schema
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-validate-schema.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-validate-schema?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-validate-schema.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-validate-schema
[snyk-image]: https://snyk.io/test/npm/egg-validate-schema/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-validate-schema
[download-image]: https://img.shields.io/npm/dm/egg-validate-schema.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-validate-schema

Validate with `JSON Schema` plugin for egg.

see [ajv](http://epoberezkin.github.io/ajv/) for more information.

## Install

```bash
$ npm i egg-validate-schema --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.validateSchema = {
  package: 'egg-validate-schema',
};
```

## Config

fully support `ajv` options, [see document](http://epoberezkin.github.io/ajv/#options)

```js
// {app_root}/config/config.{env}.js
exports.validateSchema = {
  // allErrors: true,
  // v5: true,
};
```

### Validate Request Body

```js
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

exports.create = function* () {
  // if validate fail will response 422 status code
  this.validateBySchema(jsonSchema);
  // pass your own data，default use `this.request.body`
  // this.validateBySchema(jsonSchema[, your_data]);
  // validate pass
  this.body = this.request.body;
};
```

validate fail response detail：

```js
HTTP/1.1 422 Unprocessable Entity

{
  "message": "Validation Failed",
  "errors": [
    {
      "keyword": "required",
      "dataPath": "",
      "schemaPath": "#/required",
      "params": { missingProperty: 'name' },
      "message": "should have required property 'name'",
    }
  ]
}
```


## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
