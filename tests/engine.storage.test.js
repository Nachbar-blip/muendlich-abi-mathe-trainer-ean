'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const Engine = require('../app/engine.js');

// ---------------------------------------------------------------------------
// Task 4.1 — NEUER_STATE
// ---------------------------------------------------------------------------

test('NEUER_STATE: schemaVersion 1, leere srs/stufen/reflexionen, diagnoseGemacht false', () => {
  const s = Engine.NEUER_STATE();
  assert.equal(s.schemaVersion, 1);
  assert.deepEqual(s.srs, {});
  assert.deepEqual(s.stufen, {});
  assert.deepEqual(s.reflexionen, []);
  assert.equal(s.diagnoseGemacht, false);
});

test('NEUER_STATE: liefert jedes Mal frisches Objekt (keine geteilten Referenzen)', () => {
  const a = Engine.NEUER_STATE();
  const b = Engine.NEUER_STATE();
  assert.notEqual(a, b);
  assert.notEqual(a.srs, b.srs);
  assert.notEqual(a.stufen, b.stufen);
  assert.notEqual(a.reflexionen, b.reflexionen);

  // Mutation an a darf b nicht beeinflussen.
  a.srs.x = { intervall: 1, ef: 2.5, wiederholungen: 1, faelligTag: 1 };
  a.stufen.thema1 = { 1: true };
  a.reflexionen.push({ text: 'huhu' });
  a.diagnoseGemacht = true;
  assert.deepEqual(b.srs, {});
  assert.deepEqual(b.stufen, {});
  assert.deepEqual(b.reflexionen, []);
  assert.equal(b.diagnoseGemacht, false);
});

// ---------------------------------------------------------------------------
// Task 4.2 — serialisiere / deserialisiere
// ---------------------------------------------------------------------------

test('serialisiere: liefert JSON-String, der zum Original re-parsbar ist', () => {
  const s = Engine.NEUER_STATE();
  const json = Engine.serialisiere(s);
  assert.equal(typeof json, 'string');
  assert.deepEqual(JSON.parse(json), s);
});

test('Round-Trip: deserialisiere(serialisiere(s)) ist tief gleich zu s (befuellter State)', () => {
  const s = {
    schemaVersion: 1,
    srs: {
      'analysis-1': { intervall: 6, ef: 2.6, wiederholungen: 2, faelligTag: 7 },
      'geo-3': { intervall: 1, ef: 2.36, wiederholungen: 1, faelligTag: 1 },
    },
    stufen: {
      analysis: { 1: true, 2: true, 3: false },
      geometrie: { 1: true, 2: false, 3: false },
    },
    reflexionen: [
      { datum: 12345, fehlertyp: 'fluechtigkeit', notiz: 'Vorzeichen vergessen' },
      { datum: 12346, fehlertyp: 'konzept' },
    ],
    diagnoseGemacht: true,
  };
  const round = Engine.deserialisiere(Engine.serialisiere(s));
  assert.deepEqual(round, s);
});

test('deserialisiere: kaputtes JSON -> NEUER_STATE (kein Wurf)', () => {
  let result;
  assert.doesNotThrow(() => {
    result = Engine.deserialisiere('{kein json');
  });
  assert.deepEqual(result, Engine.NEUER_STATE());
});

test('deserialisiere: falsche schemaVersion -> NEUER_STATE', () => {
  const result = Engine.deserialisiere('{"schemaVersion":99,"srs":{"x":{}}}');
  assert.deepEqual(result, Engine.NEUER_STATE());
});

test('deserialisiere: fehlende schemaVersion ({}) -> NEUER_STATE', () => {
  const result = Engine.deserialisiere('{}');
  assert.deepEqual(result, Engine.NEUER_STATE());
});

test('deserialisiere: gueltige Version, fehlende Keys werden defensiv ergaenzt', () => {
  const result = Engine.deserialisiere('{"schemaVersion":1,"srs":{"x":{"intervall":3,"ef":2.5,"wiederholungen":1,"faelligTag":3}}}');
  // Vorhandener srs-Wert bleibt erhalten.
  assert.deepEqual(result.srs, { x: { intervall: 3, ef: 2.5, wiederholungen: 1, faelligTag: 3 } });
  // Fehlende Top-Level-Keys aus NEUER_STATE ergaenzt.
  assert.equal(result.schemaVersion, 1);
  assert.deepEqual(result.stufen, {});
  assert.deepEqual(result.reflexionen, []);
  assert.equal(result.diagnoseGemacht, false);
});

test('deserialisiere: Nicht-Objekt "123" -> NEUER_STATE', () => {
  const result = Engine.deserialisiere('123');
  assert.deepEqual(result, Engine.NEUER_STATE());
});

test('deserialisiere: "null" -> NEUER_STATE', () => {
  const result = Engine.deserialisiere('null');
  assert.deepEqual(result, Engine.NEUER_STATE());
});

test('deserialisiere: Array "[]" (Nicht-Objekt im Sinne von State) -> NEUER_STATE', () => {
  // Ein Array hat keine gueltige schemaVersion -> Fallback.
  const result = Engine.deserialisiere('[]');
  assert.deepEqual(result, Engine.NEUER_STATE());
});

test('deserialisiere: mutiert das zurueckgegebene Objekt nicht NEUER_STATE-Vorlage', () => {
  // Zwei Fallback-Resultate duerfen keine geteilten inneren Referenzen haben.
  const a = Engine.deserialisiere('null');
  const b = Engine.deserialisiere('null');
  a.srs.test = { intervall: 1 };
  assert.deepEqual(b.srs, {});
});
