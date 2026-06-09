'use strict';

// ===========================================================================
// Reine-Logik-Tests für den Prüfungs-Simulator (Phase 8) in app/ui.js.
//
// Strategie (wie tests/ui.dom.test.js, pragmatisch, KEIN npm-Paket):
//   - engine.js via require, content.js + ui.js als Strings in EINER
//     vm-Sandbox mit minimalem DOM-/Window-Stub ausgeführt.
//   - Getestet werden die über window.__uiTest exponierten REINEN Funktionen:
//       * simulatorZiehen(r): korrekte Gebietspaarung, Vortragsaufgabe aus
//         teil1-Gebiet, Gesprächsfragen aus teil2-Gebiet.
//       * formatZeit(sekunden) -> "MM:SS".
//       * empfehlungsThemen(gebiet) / themenKeysFuerGebiet(gebiet).
//       * waehleGespraechFragen(gebiet, seed, maxN): Begrenzung + Gebiet.
//   - viewSimulator (reiner HTML-String) wird als Smoke-Test geprüft.
//
// NICHT abgedeckt (bewusst, Browser-Sache): Timer-Lifecycle (setInterval /
// clearInterval), Phasen-Eventfluss, MediaRecorder. Der DOM-Event-Stub kann
// diese nicht sinnvoll simulieren; die Verdrahtung wird manuell verifiziert.
// ===========================================================================

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const Engine = require('../app/engine.js');

function elementStub() {
  const el = {
    _html: '',
    children: [],
    attrs: {},
    style: {},
    classList: { add() {}, remove() {}, contains() { return false; } },
    set innerHTML(v) { this._html = String(v); },
    get innerHTML() { return this._html; },
    setAttribute(k, v) { this.attrs[k] = String(v); },
    getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; },
    appendChild(c) { this.children.push(c); return c; },
    removeChild() {},
    remove() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    addEventListener() {},
    set textContent(v) { this._text = String(v); },
    get textContent() { return this._text || ''; }
  };
  return el;
}

function macheSandbox() {
  const appEl = elementStub();
  const doc = {
    readyState: 'complete',
    getElementById(id) { return id === 'app' ? appEl : null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    addEventListener() {},
    createElement() { return elementStub(); },
    body: elementStub()
  };
  const win = {
    location: { hash: '#/start', replace() {} },
    addEventListener() {},
    localStorage: {
      _s: {},
      getItem(k) { return k in this._s ? this._s[k] : null; },
      setItem(k, v) { this._s[k] = String(v); },
      removeItem(k) { delete this._s[k]; }
    }
  };
  const sandbox = {
    window: win,
    document: doc,
    navigator: {},
    setTimeout() {},
    // Timer-Stubs: die reinen Funktionen rufen sie nicht auf; vorhanden,
    // damit ein versehentlicher Aufruf nicht mit ReferenceError abbricht.
    setInterval() { return 0; },
    clearInterval() {},
    URL: { createObjectURL() { return 'blob:x'; }, revokeObjectURL() {} },
    Date: Date,
    Math: Math,
    console: console
  };
  sandbox.globalThis = sandbox;
  return sandbox;
}

function ladeUi() {
  const sandbox = macheSandbox();
  const ctx = vm.createContext(sandbox);
  sandbox.window.Engine = Engine;
  const contentSrc = fs.readFileSync(
    path.join(__dirname, '..', 'app', 'content.js'), 'utf8');
  vm.runInContext(contentSrc, ctx, { filename: 'content.js' });
  const uiSrc = fs.readFileSync(
    path.join(__dirname, '..', 'app', 'ui.js'), 'utf8');
  vm.runInContext(uiSrc, ctx, { filename: 'ui.js' });
  return { ui: sandbox.window.__uiTest, content: sandbox.window.CONTENT };
}

const { ui, content } = ladeUi();

// Themen-Schlüssel je Gebiet (aus CONTENT) für Erwartungswerte.
function keysVon(gebiet) {
  return content.themen
    .filter((t) => t.gebiet === gebiet)
    .map((t) => t.key);
}

// --- Bootstrap-Sanity -------------------------------------------------------

test('Simulator-Logik ist exponiert', () => {
  assert.equal(typeof ui.simulatorZiehen, 'function');
  assert.equal(typeof ui.formatZeit, 'function');
  assert.equal(typeof ui.empfehlungsThemen, 'function');
});

// --- formatZeit -------------------------------------------------------------

test('formatZeit liefert MM:SS, zweistellig, nicht-negativ', () => {
  assert.equal(ui.formatZeit(0), '00:00');
  assert.equal(ui.formatZeit(9), '00:09');
  assert.equal(ui.formatZeit(65), '01:05');
  assert.equal(ui.formatZeit(20 * 60), '20:00');     // Vorbereitung
  assert.equal(ui.formatZeit(10 * 60), '10:00');     // Vortrag / Gespräch
  assert.equal(ui.formatZeit(59 * 60 + 59), '59:59');
  // defensiv: negativ / NaN -> 00:00
  assert.equal(ui.formatZeit(-5), '00:00');
  assert.equal(ui.formatZeit('abc'), '00:00');
  // Sekundenbruchteile werden abgeschnitten
  assert.equal(ui.formatZeit(61.9), '01:01');
});

// --- simulatorZiehen: Gebietspaarung + gekoppelte Inhalte -------------------

test('simulatorZiehen(0) -> Teil 1 Analysis, Teil 2 Geometrie', () => {
  const z = ui.simulatorZiehen(0);
  assert.equal(z.teil1Gebiet, 'analysis');
  assert.equal(z.teil2Gebiet, 'geometrie');
  // Vortragsaufgabe stammt aus Teil-1-Gebiet (analysis).
  assert.ok(z.vortragsAufgabe, 'Vortragsaufgabe vorhanden');
  assert.equal(z.vortragsAufgabe.gebiet, 'analysis');
  assert.equal(z.vortragsAufgabe.id, 'sim-ana-1');
  // Gesprächsfragen stammen aus Teil-2-Gebiet (geometrie).
  const geoKeys = keysVon('geometrie');
  assert.ok(z.gespraechFragen.length > 0, 'Gesprächsfragen vorhanden');
  for (const f of z.gespraechFragen) {
    assert.ok(geoKeys.includes(f.thema),
      'Gesprächsfrage ' + f.id + ' gehört zu Geometrie');
  }
});

test('simulatorZiehen(0.9) -> Teil 1 Geometrie, Teil 2 Analysis', () => {
  const z = ui.simulatorZiehen(0.9);
  assert.equal(z.teil1Gebiet, 'geometrie');
  assert.equal(z.teil2Gebiet, 'analysis');
  assert.equal(z.vortragsAufgabe.gebiet, 'geometrie');
  assert.equal(z.vortragsAufgabe.id, 'sim-geo-1');
  const anaKeys = keysVon('analysis');
  for (const f of z.gespraechFragen) {
    assert.ok(anaKeys.includes(f.thema),
      'Gesprächsfrage ' + f.id + ' gehört zu Analysis');
  }
});

test('simulatorZiehen koppelt Gebiete IMMER gegensätzlich', () => {
  for (const r of [0, 0.25, 0.49, 0.5, 0.75, 0.999]) {
    const z = ui.simulatorZiehen(r);
    assert.notEqual(z.teil1Gebiet, z.teil2Gebiet);
    const beide = [z.teil1Gebiet, z.teil2Gebiet].sort();
    assert.deepEqual(beide, ['analysis', 'geometrie']);
  }
});

test('simulatorZiehen begrenzt die Gesprächsfragen auf maximal 4', () => {
  for (const r of [0, 0.9]) {
    const z = ui.simulatorZiehen(r);
    assert.ok(z.gespraechFragen.length <= 4,
      'höchstens 4 Gesprächsfragen (war ' + z.gespraechFragen.length + ')');
  }
});

test('simulatorZiehen ist deterministisch für gleiches r', () => {
  const a = ui.simulatorZiehen(0.3);
  const b = ui.simulatorZiehen(0.3);
  assert.deepEqual(a.gespraechFragen.map((f) => f.id),
    b.gespraechFragen.map((f) => f.id));
});

// --- waehleGespraechFragen --------------------------------------------------

test('waehleGespraechFragen: nur Items des Gebiets, auf maxN begrenzt', () => {
  const fragen = ui.waehleGespraechFragen('geometrie', 12345, 3);
  assert.ok(fragen.length <= 3);
  const geoKeys = keysVon('geometrie');
  for (const f of fragen) assert.ok(geoKeys.includes(f.thema));
});

test('waehleGespraechFragen: ohne maxN gibt es den ganzen Pool (gemischt)', () => {
  const fragen = ui.waehleGespraechFragen('analysis', 42, 0);
  const anaKeys = keysVon('analysis');
  const poolGroesse = content.erklaeren
    .filter((e) => anaKeys.includes(e.thema)).length;
  assert.equal(fragen.length, poolGroesse);
});

// --- Empfehlungs-Themen / Rücklinks -----------------------------------------

test('empfehlungsThemen liefert genau die Themen eines Gebiets', () => {
  const ana = ui.empfehlungsThemen('analysis').map((t) => t.key).sort();
  assert.deepEqual(ana, keysVon('analysis').sort());
  const geo = ui.empfehlungsThemen('geometrie').map((t) => t.key).sort();
  assert.deepEqual(geo, keysVon('geometrie').sort());
});

test('empfehlungsThemen für unbekanntes Gebiet -> leer', () => {
  assert.equal(ui.empfehlungsThemen('gibt-es-nicht').length, 0);
});

test('themenKeysFuerGebiet entspricht den Keys aus CONTENT', () => {
  assert.deepEqual(ui.themenKeysFuerGebiet('geometrie').sort(),
    keysVon('geometrie').sort());
});

// --- viewSimulator: Smoke-Test (reiner HTML-String, kein Timer) -------------

test('viewSimulator (Intro) liefert nichtleeren String mit Zieh-Button', () => {
  ui.sitzungReset();
  const html = ui.viewSimulator(Engine.NEUER_STATE(), 'simulator');
  assert.equal(typeof html, 'string');
  assert.ok(html.length > 0);
  assert.ok(/Prüfung ziehen/.test(html), 'bietet Prüfung ziehen an');
  assert.ok(/id="btn-ziehen"/.test(html));
});

test('viewSimulator wirft nicht (defensiv) und enthält Phasen-Erklärung', () => {
  ui.sitzungReset();
  assert.doesNotThrow(() =>
    ui.viewSimulator(Engine.NEUER_STATE(), 'simulator'));
  const html = ui.viewSimulator(Engine.NEUER_STATE(), 'simulator');
  assert.ok(/Teil 1/.test(html) && /Teil 2/.test(html));
});
