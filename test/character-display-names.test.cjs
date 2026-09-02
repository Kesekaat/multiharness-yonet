'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const cast = fs.readFileSync(path.join(root, 'src/renderer/src/scene/office/cast.ts'), 'utf8');

const expected = {
  michael: 'Hakan', jim: 'Caner', pam: 'Selin', dwight: 'Batur', kevin: 'Kartal',
  angela: 'Deniz', oscar: 'Bora', stanley: 'Polat', phyllis: 'Soner', andy: 'Timur',
  kelly: 'Pelin', ryan: 'Yaman', toby: 'Berkin', creed: 'Ertan', meredith: 'Ayman'
};

test('every stable sprite id exposes its new display name', () => {
  for (const [id, displayName] of Object.entries(expected)) {
    assert.match(
      cast,
      new RegExp(`name: '${id}'[^\\n]+displayName: '${displayName}'`),
      `${id} should display as ${displayName}`
    );
  }
});

test('stable sprite ids remain unchanged for saved agents', () => {
  assert.match(cast, /export type OfficeCharacterName[\s\S]*'michael'[\s\S]*'meredith'/);
  assert.match(cast, /DEFAULT_CHARACTER: OfficeCharacterName = 'jim'/);
});
