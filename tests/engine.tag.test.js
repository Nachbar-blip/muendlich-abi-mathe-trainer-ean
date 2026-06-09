'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const Engine = require('../app/engine.js');

test('tagNummer(0) === 0 (Epoch)', () => {
  assert.equal(Engine.tagNummer(0), 0);
});

test('tagNummer einen Tag nach Epoch (86400000 ms) === 1', () => {
  assert.equal(Engine.tagNummer(86400000), 1);
});

test('tagNummer rundet innerhalb eines Tages ab (floor)', () => {
  assert.equal(Engine.tagNummer(86400000 - 1), 0);
  assert.equal(Engine.tagNummer(86400000 + 1), 1);
  assert.equal(Engine.tagNummer(2 * 86400000 - 1), 1);
});

test('tagNummer fuer ein konkretes Datum', () => {
  // 2026-06-08 12:00 UTC -> Date.UTC liefert ms seit Epoch
  const ms = Date.UTC(2026, 5, 8, 12, 0, 0);
  assert.equal(Engine.tagNummer(ms), Math.floor(ms / 86400000));
});

test('faellig: faelligTag <= heuteTag -> true', () => {
  assert.equal(Engine.faellig({ faelligTag: 5 }, 5), true);
  assert.equal(Engine.faellig({ faelligTag: 3 }, 5), true);
});

test('faellig: faelligTag > heuteTag -> false', () => {
  assert.equal(Engine.faellig({ faelligTag: 6 }, 5), false);
});

test('faellig: neue Karte (faelligTag 0) ist an Tag 0 faellig', () => {
  const k = Engine.NEUE_KARTE();
  assert.equal(Engine.faellig(k, 0), true);
});
