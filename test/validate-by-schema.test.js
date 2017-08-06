'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/validate-by-schema.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'validate_form',
    });
    return app.ready();
  });

  after(() => app.close());

  describe('get', () => {
    it('should return invalid_param when body empty', () => {
      return app.httpRequest()
        .get('/users.json')
        .type('json')
        .expect(422)
        .expect(res => {
          assert(res.body.code === 'invalid_param');
          assert(res.body.message === 'Validation Failed');

          assert(res.body.errors[0].keyword === 'required');
          assert(res.body.errors[0].message === 'should have required property \'name\'');
          assert(res.body.errors[1].keyword === 'required');
          assert(res.body.errors[1].message === 'should have required property \'info\'');
        });
    });

    it('should return invalid_schema when schema invalid', () => {
      return app.httpRequest()
        .get('/invalid_schema.json')
        .type('json')
        .expect(422)
        .expect(res => {
          // just assert the code
          assert(res.body.code === 'invalid_schema');
          assert(res.body.message === 'Validation Failed');
        });
    });

    it('should all pass', () => {
      return app.httpRequest()
        .get('/users.json')
        .send({
          name: 'foo',
          info: {
            email: 'foo@gmail.com',
          },
        })
        .expect({
          name: 'foo',
          info: {
            email: 'foo@gmail.com',
          },
        })
        .expect(200);
    });
  });


  describe('post', () => {
    it('should return invalid_param when body empty', () => {
      return app.httpRequest()
        .post('/users.json')
        .type('json')
        .expect(422)
        .expect(res => {
          assert(res.body.code === 'invalid_param');
          assert(res.body.message === 'Validation Failed');

          assert(res.body.errors[0].keyword === 'required');
          assert(res.body.errors[0].message === 'should have required property \'name\'');
          assert(res.body.errors[1].keyword === 'required');
          assert(res.body.errors[1].message === 'should have required property \'info\'');
        });
    });

    it('should all pass', () => {
      return app.httpRequest()
        .post('/users.json')
        .send({
          name: 'foo',
          info: {
            email: 'foo@gmail.com',
          },
        })
        .expect({
          name: 'foo',
          info: {
            email: 'foo@gmail.com',
          },
        })
        .expect(200);
    });

    it('should return invalid_param when body not match schema', () => {
      return app.httpRequest()
        .post('/users.json')
        .send({
          name: 123,
          info: 'info',
        })
        .expect(422)
        .expect(res => {
          assert(res.body.code === 'invalid_param');
          assert(res.body.message === 'Validation Failed');

          assert(res.body.errors[0].keyword === 'type');
          assert(res.body.errors[0].dataPath === '.name');
          assert(res.body.errors[0].message === 'should be string');
          assert(res.body.errors[1].keyword === 'type');
          assert(res.body.errors[1].dataPath === '.info');
          assert(res.body.errors[1].message === 'should be object');
        });
    });
  });
});
