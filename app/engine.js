(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api; // Node-Tests
  root.Engine = api;                                                         // Browser
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Task 1.1 — Spaced Repetition (SM-2 light)
  // ---------------------------------------------------------------------------

  // Bewertung -> Qualitaet (SM-2 Skala)
  const QUALITAET = {
    wiederholen: 2,
    schwer: 3,
    gut: 4,
    sicher: 5,
  };

  function NEUE_KARTE() {
    return { intervall: 0, ef: 2.5, wiederholungen: 0, faelligTag: 0 };
  }

  function naechsteWiederholung(karte, bewertung, heuteTag = 0) {
    const q = QUALITAET[bewertung];
    if (typeof q !== 'number') {
      throw new Error('Unbekannte Bewertung: ' + bewertung);
    }

    let wiederholungen = karte.wiederholungen;
    let intervall = karte.intervall;

    // Easiness-Faktor neu berechnen (SM-2), Untergrenze 1.3.
    // Bewusst: EF wird AUCH bei 'wiederholen' (q<3) gesenkt — naeher am echten
    // SM-2 als der Plan (dort nur im Erfolgszweig). Schwere Karten kommen so
    // dauerhaft haeufiger; gewollt. Test in engine.srs.test.js nagelt das fest.
    let ef = karte.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (ef < 1.3) ef = 1.3;

    if (q < 3) {
      // 'wiederholen' -> Reset
      wiederholungen = 0;
      intervall = 0;
    } else {
      wiederholungen += 1;
      if (wiederholungen === 1) {
        intervall = 1;
      } else if (wiederholungen === 2) {
        intervall = 6;
      } else {
        intervall = Math.round(intervall * ef);
      }
    }

    return {
      intervall,
      ef,
      wiederholungen,
      faelligTag: heuteTag + intervall,
    };
  }

  function faellig(karte, heuteTag) {
    // Defensiver Default: eine Karte ohne faelligTag (z. B. aus altem/kaputtem
    // localStorage) gilt als sofort faellig statt stillschweigend verschluckt.
    return (karte.faelligTag ?? 0) <= heuteTag;
  }

  // ---------------------------------------------------------------------------
  // Task 1.2 — Tageszaehler
  // ---------------------------------------------------------------------------

  function tagNummer(ms) {
    return Math.floor(ms / 86400000);
  }

  // ---------------------------------------------------------------------------
  // Task 1.3 — Gebiets-Paarung (Simulator)
  // ---------------------------------------------------------------------------

  function paarung(teil1Gebiet) {
    const teil2 = teil1Gebiet === 'analysis' ? 'geometrie' : 'analysis';
    return { teil1: teil1Gebiet, teil2 };
  }

  function zieheGebiet(r) {
    return r < 0.5 ? 'analysis' : 'geometrie';
  }

  // ---------------------------------------------------------------------------
  // Task 1.4 — EAN-Scope-Guard
  // ---------------------------------------------------------------------------
  // WICHTIG: Diese Liste muss STRING-IDENTISCH zu scope_verbote.json sein
  // (Single Source der Verbotsmuster; ein Python-Test prueft die Gleichheit).
  // EAN-Niveau: Funktionen-/Ebenenscharen (f_a, E_k) und Hessesche Normalform/HNF
  // sind ERLAUBT (anders als im GAN-Trainer). Verboten bleiben e^x/ln, Ketten-/
  // Quotientenregel, windschiefe Geraden und Stochastik. Wortgrenzen/Lookbehinds
  // verhindern Substring-Falschtreffer (z. B. "Normalenvektor", "...koeln(", "the^2").
  const SCOPE_VERBOTE = [
    '(?<![a-zäöüß])e\\^',         // e-Funktion e^... (nicht mitten im Wort)
    '\\\\ln',                     // LaTeX \ln
    '(?<![a-zäöüß])ln\\(',        // ln( (nicht als Wortende wie "koeln(")
    'Kettenregel',
    'Quotientenregel',
    'windschief',
    'normalverteilt',
    'Normalverteilung',
    'Signifikanz',
    'Hypothesentest',
    'Binomialverteilung',
  ];

  // Aus der Verbotsliste eine kombinierte, case-insensitive RegExp bauen.
  // Liste einfrieren: Single-Source-Konstante darf zur Laufzeit nicht mutieren.
  Object.freeze(SCOPE_VERBOTE);
  const SCOPE_REGEX = new RegExp(SCOPE_VERBOTE.join('|'), 'i');

  function verstoesstGegenGK(text) {
    if (typeof text !== 'string' || text.length === 0) return false;
    return SCOPE_REGEX.test(text);
  }

  // ---------------------------------------------------------------------------
  // Task 4.1 / 4.2 — Persistenz (reine Serialisierung, Schema-Version)
  // ---------------------------------------------------------------------------
  // Reine Funktionen: KEINE DOM-/localStorage-Zugriffe. Das Lesen/Schreiben aus
  // dem Browser-Storage wickelt spaeter ui.js duenn um diese Funktionen.

  // Aktuelle Schema-Version des persistierten App-Zustands. Bei Aenderungen der
  // State-Struktur hochzaehlen — alte Versionen fallen in deserialisiere() auf
  // NEUER_STATE zurueck (bewusster Verlust statt Crash).
  const SCHEMA_VERSION = 1;

  function NEUER_STATE() {
    return {
      schemaVersion: SCHEMA_VERSION,
      srs: {},            // itemId -> SRS-Karte {intervall, ef, wiederholungen, faelligTag}
      stufen: {},         // themaKey -> { "1": bool, "2": bool, "3": bool }
      reflexionen: [],    // Liste von Reflexions-Objekten (Struktur offen; UI fuellt sie)
      diagnoseGemacht: false,
    };
  }

  function serialisiere(state) {
    return JSON.stringify(state);
  }

  function deserialisiere(json) {
    let geladen;
    try {
      geladen = JSON.parse(json);
    } catch (e) {
      return NEUER_STATE();
    }

    // Nur echte Objekte sind gueltige State-Container — null und Arrays nicht.
    const istObjekt =
      geladen !== null &&
      typeof geladen === 'object' &&
      !Array.isArray(geladen);
    if (!istObjekt || geladen.schemaVersion !== SCHEMA_VERSION) {
      return NEUER_STATE();
    }

    // Defensiver Merge: fehlende Top-Level-Keys aus frischem State ergaenzen,
    // vorhandene Werte des geladenen States behalten. So crasht ein alter oder
    // teilweiser State spaetere UI-Zugriffe nicht (z. B. state.srs[id]).
    return Object.assign(NEUER_STATE(), geladen);
  }

  return {
    NEUE_KARTE,
    naechsteWiederholung,
    faellig,
    tagNummer,
    paarung,
    zieheGebiet,
    verstoesstGegenGK,
    SCOPE_VERBOTE,
    NEUER_STATE,
    serialisiere,
    deserialisiere,
  };
});
