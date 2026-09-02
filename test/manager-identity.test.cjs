'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');

const { DEFAULT_MANAGER_NAME, resolveManagerName } = loadTs('src/shared/managerIdentity.ts');

test('Hakan is the built-in manager name', () => {
  assert.equal(DEFAULT_MANAGER_NAME, 'Hakan');
  assert.equal(resolveManagerName(undefined), 'Hakan');
  assert.equal(resolveManagerName('   '), 'Hakan');
});

test('the former built-in name migrates while user names remain untouched', () => {
  assert.equal(resolveManagerName('Michael'), 'Hakan');
  assert.equal(resolveManagerName('  Michael  '), 'Hakan');
  assert.equal(resolveManagerName('Özel Ad'), 'Özel Ad');
});
