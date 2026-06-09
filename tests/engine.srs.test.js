'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const Engine = require('../app/engine.js');

test('NEUE_KARTE liefert Startwerte: intervall 0, ef 2.5, wiederholungen 0, faelligTag 0', () => {
  const k = Engine.NEUE_KARTE();
  assert.equal(k.intervall, 0);
  assert.equal(k.ef, 2.5);
  assert.equal(k.wiederholungen, 0);
  assert.equal(k.faelligTag, 0);
});

test('NEUE_KARTE liefert jedes Mal ein frisches Objekt (keine geteilte Referenz)', () => {
  const a = Engine.NEUE_KARTE();
  const b = Engine.NEUE_KARTE();
  assert.notEqual(a, b);
  a.ef = 9;
  assert.equal(b.ef, 2.5);
});

test("'sicher' (q=5): intervall 1 beim ersten, 6 beim zweiten Erfolg", () => {
  let k = Engine.NEUE_KARTE();
  k = Engine.naechsteWiederholung(k, 'sicher', 0);
  assert.equal(k.wiederholungen, 1);
  assert.equal(k.intervall, 1);
  assert.equal(k.faelligTag, 1);

  k = Engine.naechsteWiederholung(k, 'sicher', 1);
  assert.equal(k.wiederholungen, 2);
  assert.equal(k.intervall, 6);
  assert.equal(k.faelligTag, 7);
});

test("ab dem dritten Erfolg: intervall = round(intervall * ef)", () => {
  let k = Engine.NEUE_KARTE();
  k = Engine.naechsteWiederholung(k, 'gut', 0); // q=4, wdh 1 -> intervall 1
  k = Engine.naechsteWiederholung(k, 'gut', 0); // wdh 2 -> intervall 6
  const efVor = k.ef;
  const intervallVor = k.intervall; // 6
  k = Engine.naechsteWiederholung(k, 'gut', 10); // wdh 3 -> round(6 * ef)
  assert.equal(k.wiederholungen, 3);
  assert.equal(k.intervall, Math.round(intervallVor * efVor));
  assert.equal(k.faelligTag, 10 + k.intervall);
});

test("'wiederholen' (q=2) resettet wiederholungen und intervall auf 0, ef bleibt >= 1.3", () => {
  let k = Engine.NEUE_KARTE();
  k = Engine.naechsteWiederholung(k, 'sicher', 0);
  k = Engine.naechsteWiederholung(k, 'sicher', 1); // intervall 6, wdh 2
  k = Engine.naechsteWiederholung(k, 'wiederholen', 5);
  assert.equal(k.wiederholungen, 0);
  assert.equal(k.intervall, 0);
  assert.ok(k.ef >= 1.3, `ef sollte >= 1.3 sein, war ${k.ef}`);
  assert.equal(k.faelligTag, 5); // heuteTag + intervall(0)
});

test('ef sinkt nicht unter die Untergrenze 1.3 bei wiederholtem schlechten Bewerten', () => {
  let k = Engine.NEUE_KARTE();
  for (let i = 0; i < 20; i++) {
    k = Engine.naechsteWiederholung(k, 'wiederholen', i);
  }
  assert.ok(k.ef >= 1.3, `ef war ${k.ef}`);
});

test("ef steigt bei 'sicher' (q=5) gegenueber Startwert", () => {
  let k = Engine.NEUE_KARTE();
  k = Engine.naechsteWiederholung(k, 'sicher', 0);
  assert.ok(k.ef > 2.5, `ef sollte > 2.5 sein, war ${k.ef}`);
});

test("ef bleibt bei 'gut' (q=4) konstant 2.5", () => {
  let k = Engine.NEUE_KARTE();
  k = Engine.naechsteWiederholung(k, 'gut', 0);
  assert.ok(Math.abs(k.ef - 2.5) < 1e-9, `ef sollte ~2.5 sein, war ${k.ef}`);
});

test('naechsteWiederholung mutiert die Eingabekarte nicht', () => {
  const k = Engine.NEUE_KARTE();
  const kopie = { ...k };
  Engine.naechsteWiederholung(k, 'gut', 0);
  assert.deepEqual(k, kopie, 'Eingabekarte darf nicht veraendert werden');
});

test('heuteTag default 0', () => {
  let k = Engine.NEUE_KARTE();
  k = Engine.naechsteWiederholung(k, 'gut');
  assert.equal(k.faelligTag, 1);
});

// --- Code-Review I-2: EF sinkt bewusst auch bei 'wiederholen' ---

test("'wiederholen' (q=2) senkt den EF unter den Startwert 2.5 (bewusst, SM-2)", () => {
  let k = Engine.NEUE_KARTE();
  k = Engine.naechsteWiederholung(k, 'wiederholen', 0);
  assert.ok(k.ef < 2.5, `ef sollte < 2.5 sein (gesenkt), war ${k.ef}`);
  assert.ok(Math.abs(k.ef - 2.18) < 1e-9, `erwartet ~2.18, war ${k.ef}`);
});

// --- Code-Review M-5: mittlere Stufe 'schwer' (q=3) ---

test("'schwer' (q=3) zaehlt als Erfolg (intervall 1) und senkt EF leicht", () => {
  let k = Engine.NEUE_KARTE();
  k = Engine.naechsteWiederholung(k, 'schwer', 0);
  assert.equal(k.wiederholungen, 1);
  assert.equal(k.intervall, 1);
  assert.ok(Math.abs(k.ef - 2.36) < 1e-9, `erwartet ~2.36, war ${k.ef}`);
});
