'use strict';

// ===========================================================================
// Smoke-Test für app/ui.js — Lern-Trainer-Views (Phase 6.2–6.6) + Audio (7).
//
// Strategie (pragmatisch, KEIN npm-Paket):
//   - engine.js wird normal via require geladen (CommonJS-fähig).
//   - content.js und ui.js werden als Strings eingelesen und in EINER
//     vm-Sandbox ausgeführt, die einen MINIMALEN DOM-/Window-Stub bereitstellt.
//   - ui.js ist eine Browser-IIFE, die beim Laden start()->render() aufruft.
//     Der Stub liefert genau so viel DOM, dass dieser Bootstrap nicht wirft.
//   - ui.js exponiert über window.__uiTest die REINEN Logik-Bausteine und die
//     View-Builder (reine HTML-String-Erzeuger). DIESE werden getestet.
//
// Abgedeckt:
//   * reine Logik: mischeIndizes (deterministisch), reihenfolgeKorrekt,
//     parseZahl, numerischKorrekt (Komma/Punkt/Toleranz), mcKorrekt,
//     naechsteSrsKarte (schreibt state.srs via Engine korrekt fort),
//     faelligeErklaerItems, baueDiagnoseFragen, rechnenSortiert.
//   * Render-Bausteine: jede View liefert ohne Wurf einen nichtleeren String,
//     auch bei leeren/fehlenden Themen (defensiv).
// NICHT abgedeckt (DOM-Event-Verdrahtung, MediaRecorder) — bewusst, da der
// Browser-Eventfluss und getUserMedia im Node-Stub nicht sinnvoll simulierbar
// sind. Die Persistenz-Brücke wird über naechsteSrsKarte mitgetestet.
// ===========================================================================

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const Engine = require('../app/engine.js');

// --- minimaler DOM-/Window-Stub --------------------------------------------
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
    navigator: {},        // kein mediaDevices -> Audio "nicht unterstützt"
    setTimeout() {},
    URL: { createObjectURL() { return 'blob:x'; }, revokeObjectURL() {} },
    Date: Date,
    Math: Math,
    console: console
  };
  sandbox.globalThis = sandbox;
  return sandbox;
}

// engine.js + content.js + ui.js in eine Sandbox laden, __uiTest zurückgeben.
function ladeUi() {
  const sandbox = macheSandbox();
  const ctx = vm.createContext(sandbox);

  // Engine bereitstellen (require liefert die API; an window hängen).
  sandbox.window.Engine = Engine;

  // content.js definiert `const CONTENT = {...}; window.CONTENT = CONTENT;`
  const contentSrc = fs.readFileSync(
    path.join(__dirname, '..', 'app', 'content.js'), 'utf8');
  vm.runInContext(contentSrc, ctx, { filename: 'content.js' });

  const uiSrc = fs.readFileSync(
    path.join(__dirname, '..', 'app', 'ui.js'), 'utf8');
  vm.runInContext(uiSrc, ctx, { filename: 'ui.js' });

  return { ui: sandbox.window.__uiTest, content: sandbox.window.CONTENT };
}

// Einmal laden und überall wiederverwenden.
const { ui, content } = ladeUi();

// --- Bootstrap-Sanity -------------------------------------------------------

test('ui.js lädt im DOM-Stub ohne Wurf und exponiert __uiTest', () => {
  assert.ok(ui, '__uiTest sollte gesetzt sein');
  assert.equal(typeof ui.numerischKorrekt, 'function');
  assert.ok(content && Array.isArray(content.themen), 'CONTENT verfügbar');
});

// --- mischeIndizes: deterministisch + Permutation ---------------------------

test('mischeIndizes ist deterministisch bei gleichem Seed', () => {
  const a = ui.mischeIndizes(6, 12345);
  const b = ui.mischeIndizes(6, 12345);
  assert.deepEqual(a, b);
});

test('mischeIndizes liefert eine echte Permutation von 0..n-1', () => {
  const p = ui.mischeIndizes(7, 99);
  assert.equal(p.length, 7);
  assert.deepEqual([...p].sort((x, y) => x - y), [0, 1, 2, 3, 4, 5, 6]);
});

// --- reihenfolgeKorrekt -----------------------------------------------------

test('reihenfolgeKorrekt: [0,1,2] ist korrekt, [1,0,2] nicht', () => {
  assert.equal(ui.reihenfolgeKorrekt([0, 1, 2]), true);
  assert.equal(ui.reihenfolgeKorrekt([1, 0, 2]), false);
  assert.equal(ui.reihenfolgeKorrekt([]), true);
  assert.equal(ui.reihenfolgeKorrekt('nope'), false);
});

// --- parseZahl / numerischKorrekt ------------------------------------------

test('parseZahl akzeptiert Komma und Punkt', () => {
  assert.equal(ui.parseZahl('3,14'), 3.14);
  assert.equal(ui.parseZahl('3.14'), 3.14);
  assert.equal(ui.parseZahl('  -2 '), -2);
  assert.ok(Number.isNaN(ui.parseZahl('')));
  assert.ok(Number.isNaN(ui.parseZahl('abc')));
});

test('numerischKorrekt: exakte Lösung ohne Toleranz', () => {
  assert.equal(ui.numerischKorrekt('9', 9), true);
  assert.equal(ui.numerischKorrekt('9,0', 9), true);
  assert.equal(ui.numerischKorrekt('8', 9), false);
});

test('numerischKorrekt: innerhalb / außerhalb Toleranz', () => {
  assert.equal(ui.numerischKorrekt('6,16', 6.16, 0.01), true);
  assert.equal(ui.numerischKorrekt('6,15', 6.16, 0.01), true);  // genau am Rand
  assert.equal(ui.numerischKorrekt('6,10', 6.16, 0.01), false);
  // leere/ungültige Eingabe ist nie korrekt
  assert.equal(ui.numerischKorrekt('', 6.16, 0.01), false);
});

// --- mcKorrekt --------------------------------------------------------------

test('mcKorrekt: vergleicht gewählten Index mit item.korrekt', () => {
  const item = { korrekt: 2 };
  assert.equal(ui.mcKorrekt(item, 2), true);
  assert.equal(ui.mcKorrekt(item, 0), false);
  assert.equal(ui.mcKorrekt({}, 0), false);   // fehlendes korrekt -> false
  assert.equal(ui.mcKorrekt(null, 0), false);
});

// --- naechsteSrsKarte: Persistenz-Brücke zur Engine -------------------------

test('naechsteSrsKarte legt für neues Item eine Karte an und schreibt sie fort', () => {
  const state = Engine.NEUER_STATE();
  const karte = ui.naechsteSrsKarte(state, 'item-x', 'sicher', 0);
  // 'sicher' (Erfolg) -> erster Erfolg: intervall 1, wiederholungen 1
  assert.equal(karte.wiederholungen, 1);
  assert.equal(karte.intervall, 1);
  assert.equal(karte.faelligTag, 1);
  // in state.srs persistiert
  assert.deepEqual(state.srs['item-x'], karte);
});

test('naechsteSrsKarte baut auf bestehender Karte auf (zweiter Erfolg -> intervall 6)', () => {
  const state = Engine.NEUER_STATE();
  ui.naechsteSrsKarte(state, 'item-y', 'gut', 0);          // wdh 1, intervall 1
  const k2 = ui.naechsteSrsKarte(state, 'item-y', 'gut', 1); // wdh 2, intervall 6
  assert.equal(k2.wiederholungen, 2);
  assert.equal(k2.intervall, 6);
  assert.equal(k2.faelligTag, 7);
});

test("naechsteSrsKarte mit 'wiederholen' setzt Intervall zurück", () => {
  const state = Engine.NEUER_STATE();
  ui.naechsteSrsKarte(state, 'item-z', 'sicher', 0);
  ui.naechsteSrsKarte(state, 'item-z', 'sicher', 1);
  const k = ui.naechsteSrsKarte(state, 'item-z', 'wiederholen', 5);
  assert.equal(k.intervall, 0);
  assert.equal(k.wiederholungen, 0);
  assert.equal(k.faelligTag, 5);
});

// --- faelligeErklaerItems ---------------------------------------------------

test('faelligeErklaerItems: nur Items mit existierender, fälliger Karte', () => {
  const state = Engine.NEUER_STATE();
  const ersteErklaer = content.erklaeren[0];
  // Karte mit faelligTag 0 -> an Tag 5 fällig
  state.srs[ersteErklaer.id] = { intervall: 0, ef: 2.5, wiederholungen: 0, faelligTag: 0 };
  // Karte mit faelligTag 100 -> an Tag 5 NICHT fällig
  const zweiteErklaer = content.erklaeren[1];
  state.srs[zweiteErklaer.id] = { intervall: 50, ef: 2.5, wiederholungen: 3, faelligTag: 100 };

  const faellig = ui.faelligeErklaerItems(state, 5);
  const ids = faellig.map((it) => it.id);
  assert.ok(ids.includes(ersteErklaer.id), 'fällige Karte enthalten');
  assert.ok(!ids.includes(zweiteErklaer.id), 'nicht fällige Karte ausgeschlossen');
});

test('faelligeErklaerItems: leerer State -> leere Liste (kein Wurf)', () => {
  const state = Engine.NEUER_STATE();
  // Hinweis: Array stammt aus der vm-Sandbox -> Länge prüfen statt deepEqual([]).
  assert.equal(ui.faelligeErklaerItems(state, 0).length, 0);
});

// --- baueDiagnoseFragen -----------------------------------------------------

test('baueDiagnoseFragen: eine Frage je Thema, bevorzugt level<=2 rechnen', () => {
  const fragen = ui.baueDiagnoseFragen();
  assert.equal(fragen.length, content.themen.length);
  for (const f of fragen) {
    assert.ok(f.kind === 'rechnen' || f.kind === 'erklaeren');
    assert.ok(f.item && f.thema);
    if (f.kind === 'rechnen') assert.ok(Number(f.item.level) <= 2);
  }
});

// --- rechnenSortiert --------------------------------------------------------

test('rechnenSortiert: nach level aufsteigend sortiert', () => {
  const key = content.themen[0].key;
  const items = ui.rechnenSortiert(key);
  assert.ok(items.length > 0);
  for (let i = 1; i < items.length; i++) {
    assert.ok(Number(items[i - 1].level) <= Number(items[i].level),
      'levels nicht absteigend');
  }
});

test('rechnenSortiert: unbekanntes Thema -> leere Liste', () => {
  assert.equal(ui.rechnenSortiert('gibt-es-nicht').length, 0);
});

// --- View-Builder: liefern HTML ohne Wurf ----------------------------------

const themaKey = content.themen[0].key;

test('viewStufe1 liefert nichtleeren String', () => {
  ui.sitzungReset();
  const html = ui.viewStufe1(Engine.NEUER_STATE(), themaKey, 'thema/' + themaKey + '/1');
  assert.equal(typeof html, 'string');
  assert.ok(html.length > 0);
});

test('viewStufe2 liefert nichtleeren String', () => {
  ui.sitzungReset();
  const html = ui.viewStufe2(Engine.NEUER_STATE(), themaKey, 'thema/' + themaKey + '/2');
  assert.ok(html.length > 0);
  assert.ok(/Aufgabe 1/.test(html), 'zeigt erste Aufgabe');
});

test('viewStufe3 liefert nichtleeren String', () => {
  ui.sitzungReset();
  const html = ui.viewStufe3(Engine.NEUER_STATE(), themaKey, 'thema/' + themaKey + '/3');
  assert.ok(html.length > 0);
  assert.ok(/aufdecken/i.test(html), 'bietet Aufdecken an');
});

test('viewFaellig (nichts fällig) liefert freundlichen Hinweis ohne Wurf', () => {
  ui.sitzungReset();
  const html = ui.viewFaellig(Engine.NEUER_STATE(), 'faellig');
  assert.ok(html.length > 0);
});

test('viewDiagnose liefert erste Frage ohne Wurf', () => {
  ui.sitzungReset();
  const html = ui.viewDiagnose(Engine.NEUER_STATE(), 'diagnose');
  assert.ok(html.length > 0);
  assert.ok(/Frage 1/.test(html));
});

test('View-Builder werfen nicht bei unbekanntem Thema (defensiv)', () => {
  ui.sitzungReset();
  assert.doesNotThrow(() => ui.viewStufe1(Engine.NEUER_STATE(), 'kein-thema', 'thema/kein-thema/1'));
  ui.sitzungReset();
  assert.doesNotThrow(() => ui.viewStufe2(Engine.NEUER_STATE(), 'kein-thema', 'thema/kein-thema/2'));
  ui.sitzungReset();
  assert.doesNotThrow(() => ui.viewStufe3(Engine.NEUER_STATE(), 'kein-thema', 'thema/kein-thema/3'));
});
