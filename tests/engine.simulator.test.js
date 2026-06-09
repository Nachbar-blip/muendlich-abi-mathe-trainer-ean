'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const Engine = require('../app/engine.js');

test("paarung('analysis') -> teil1 analysis, teil2 geometrie", () => {
  assert.deepEqual(Engine.paarung('analysis'), {
    teil1: 'analysis',
    teil2: 'geometrie',
  });
});

test("paarung('geometrie') -> teil1 geometrie, teil2 analysis", () => {
  assert.deepEqual(Engine.paarung('geometrie'), {
    teil1: 'geometrie',
    teil2: 'analysis',
  });
});

test('zieheGebiet ist deterministisch an der Grenze 0.5', () => {
  assert.equal(Engine.zieheGebiet(0), 'analysis');
  assert.equal(Engine.zieheGebiet(0.49), 'analysis');
  assert.equal(Engine.zieheGebiet(0.5), 'geometrie');
  assert.equal(Engine.zieheGebiet(0.99), 'geometrie');
});

test('zieheGebiet + paarung ergeben immer beide Gebiete genau einmal', () => {
  for (const r of [0, 0.25, 0.5, 0.75, 0.999]) {
    const p = Engine.paarung(Engine.zieheGebiet(r));
    const gebiete = [p.teil1, p.teil2].sort();
    assert.deepEqual(gebiete, ['analysis', 'geometrie']);
  }
});
