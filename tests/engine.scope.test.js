'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Engine = require('../app/engine.js');

// --- EAN: weiterhin VERBOTEN (ganzrational only, keine windschiefen Geraden, keine Stochastik) ---

test("e-Funktion e^{-x} verstoesst (EAN: ganzrational only)", () => {
  assert.equal(Engine.verstoesstGegenGK('e^{-x}'), true);
});

test("e^ (ohne Klammer) verstoesst", () => {
  assert.equal(Engine.verstoesstGegenGK('y = e^x'), true);
});

test("ln verstoesst (LaTeX \\ln)", () => {
  assert.equal(Engine.verstoesstGegenGK('\\ln(x)'), true);
});

test("ln( als Wort verstoesst", () => {
  assert.equal(Engine.verstoesstGegenGK('Berechne ln(2).'), true);
});

test("Kettenregel verstoesst", () => {
  assert.equal(Engine.verstoesstGegenGK('Hier brauchst du die Kettenregel.'), true);
});

test("Quotientenregel verstoesst", () => {
  assert.equal(Engine.verstoesstGegenGK('Quotientenregel anwenden'), true);
});

test("windschief verstoesst (EAN: bewusst ausgeschlossen)", () => {
  assert.equal(Engine.verstoesstGegenGK('Die Geraden sind windschief.'), true);
});

test("normalverteilt verstoesst", () => {
  assert.equal(Engine.verstoesstGegenGK('normalverteilt'), true);
});

test("Normalverteilung verstoesst", () => {
  assert.equal(Engine.verstoesstGegenGK('Die Normalverteilung ...'), true);
});

test("Signifikanz verstoesst", () => {
  assert.equal(Engine.verstoesstGegenGK('Signifikanzniveau 5%'), true);
});

test("Hypothesentest verstoesst", () => {
  assert.equal(Engine.verstoesstGegenGK('Fuehre einen Hypothesentest durch.'), true);
});

test("Binomialverteilung verstoesst", () => {
  assert.equal(Engine.verstoesstGegenGK('Binomialverteilung B(n,p)'), true);
});

test("Gross-/Kleinschreibung egal: KETTENREGEL", () => {
  assert.equal(Engine.verstoesstGegenGK('KETTENREGEL'), true);
});

// --- EAN-Delta: jetzt ERLAUBT (im GAN-Trainer noch verboten) ---

test("Funktionsschar f_a(x) ist im EAN erlaubt", () => {
  assert.equal(Engine.verstoesstGegenGK('f_a(x)=x^2+a'), false);
});

test("Funktionsschar f_k( ist im EAN erlaubt", () => {
  assert.equal(Engine.verstoesstGegenGK('Betrachte f_k(x).'), false);
});

test("LaTeX-Schar f_{a} ist im EAN erlaubt", () => {
  assert.equal(Engine.verstoesstGegenGK('Die Schar f_{a} hat...'), false);
});

test("Ebenenschar E_k ist im EAN erlaubt", () => {
  assert.equal(Engine.verstoesstGegenGK('Ebenenschar E_k: x+ky+2z-5=0'), false);
});

test("HESSEsche Normalform ist im EAN erlaubt", () => {
  assert.equal(Engine.verstoesstGegenGK('Hessesche Normalform'), false);
});

test("HNF ist im EAN erlaubt", () => {
  assert.equal(Engine.verstoesstGegenGK('Setze die HNF an.'), false);
});

// --- ganzrational / harmlos bleibt erlaubt ---

test("ganzrationale Funktion f(x)=x^3-3x ist erlaubt", () => {
  assert.equal(Engine.verstoesstGegenGK('f(x)=x^3-3x'), false);
});

test("Normalenvektor verstoesst NICHT (nur 'Normalverteilung' ist verboten)", () => {
  assert.equal(Engine.verstoesstGegenGK('Der Normalenvektor der Ebene ist n.'), false);
});

test("harmlose Geometrie ist erlaubt", () => {
  assert.equal(Engine.verstoesstGegenGK('Bestimme den Schnittpunkt der Geraden g und h.'), false);
});

test("Potenz x^2 allein ist erlaubt (nur e^ verboten)", () => {
  assert.equal(Engine.verstoesstGegenGK('Die Parabel y=x^2 hat den Scheitel im Ursprung.'), false);
});

test("Wort mit 'ln' im Inneren matcht NICHT faelschlich (z.B. 'Vielleicht')", () => {
  assert.equal(Engine.verstoesstGegenGK('Vielleicht ist das so.'), false);
});

test("Wort, das auf 'ln(' endet, verstoesst NICHT (z.B. 'koeln(')", () => {
  assert.equal(Engine.verstoesstGegenGK('Notiz: koeln(West) ist eine Schreibweise.'), false);
});

test("'e^' mitten im Wort (z.B. 'the^2') verstoesst NICHT", () => {
  assert.equal(Engine.verstoesstGegenGK('the^2 ist kein e-Term'), false);
});

test("leerer String ist erlaubt", () => {
  assert.equal(Engine.verstoesstGegenGK(''), false);
});

// --- Single Source: scope_verbote.json == SCOPE_VERBOTE ---

test("SCOPE_VERBOTE entspricht exakt scope_verbote.json", () => {
  const jsonPfad = path.join(__dirname, '..', 'scope_verbote.json');
  const datei = JSON.parse(fs.readFileSync(jsonPfad, 'utf8'));
  assert.ok(Array.isArray(datei.verbote), 'scope_verbote.json muss { verbote: [...] } enthalten');
  assert.deepEqual(Engine.SCOPE_VERBOTE, datei.verbote);
});
