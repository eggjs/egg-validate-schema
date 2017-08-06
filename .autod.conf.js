'use strict';

module.exports = {
  write: true,
  prefix: '^',
  test: [
    'test',
    'benchmark',
  ],
  devdep: [
    'egg',
    'egg-ci',
    'egg-bin',
    'egg-mock',
    'autod',
    'eslint',
    'eslint-config-egg'
  ],
  exclude: [
    './test/fixtures',
  ],
  registry: 'https://r.cnpmjs.org',
};
