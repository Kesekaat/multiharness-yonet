'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');

const { DEFAULT_BOSS_NAME, resolveBossName } = loadTs('src/shared/bossIdentity.ts');

test('a persisted rename wins over the default', () => {
  assert.equal(resolveBossName('Savvas'), 'Savvas');
  assert.equal(resolveBossName('  Savvas  '), 'Savvas'); // trimmed, like renameAgent() trims on write
});

test('nothing persisted yet falls back to the default', () => {
  assert.equal(resolveBossName(undefined), DEFAULT_BOSS_NAME);
  assert.equal(resolveBossName(null), DEFAULT_BOSS_NAME);
  assert.equal(resolveBossName(''), DEFAULT_BOSS_NAME);
  assert.equal(resolveBossName('   '), DEFAULT_BOSS_NAME); // whitespace-only is not a real name
});
