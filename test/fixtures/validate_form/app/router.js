'use strict';
module.exports = function (app) {
  app.get('/users.json', app.controller.user.create);
  app.post('/users.json', app.controller.user.create);
  app.get('/invalid_schema.json', app.controller.user.invalidSchema);
};
