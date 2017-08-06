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

基于 [ajv](http://epoberezkin.github.io/ajv/), 通过 `JSON Schema` 校验数据方法。

## 安装

```bash
$ npm i egg-validate-schema --save
```

## 使用

```js
// {app_root}/config/plugin.js
exports.validateSchema = {
  package: 'egg-validate-schema',
};
```

## 配置

完整支持 `ajv` 配置，[具体参考](http://epoberezkin.github.io/ajv/#options)

```js
// {app_root}/config/config.{env}.js
exports.validateSchema = {
  // allErrors: true,
  // v5: true,
};
```

## 使用方法

- `ctx.validateBySchema(jsonSchema[, data])`

### 默认验证请求 Body

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
  // 校验失败自动返回 422 响应
  this.validateBySchema(jsonSchema);
  // 可以传递自己处理过的数据，默认使用 this.request.body
  // this.validateBySchema(jsonSchema[, your_data]);
  // 校验通过
  this.body = this.request.body;
};
```

如果验证失败，会返回：

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
