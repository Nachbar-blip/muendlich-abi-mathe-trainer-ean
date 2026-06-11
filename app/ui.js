/* ===========================================================================
   ui.js — UI-Unterbau (Phase 5 + 6.1)
   Klassisches Script. Nutzt window.Engine und window.CONTENT.
   Aufgaben: Storage-Wrapper, KaTeX-Render, Hash-Routing, Startbildschirm,
   navigierbare Stub-Views. file://-tauglich, kein Build, keine Module.
   =========================================================================== */
(function () {
  'use strict';

  // Engine ist Pflicht; ohne sie kann die App nicht arbeiten.
  var Engine = window.Engine;
  // CONTENT kann theoretisch fehlen/leer sein — defensiv mit Defaults arbeiten.
  var CONTENT = window.CONTENT || {};

  var STORAGE_KEY = 'muendlich-abi-v1';

  // ---------------------------------------------------------------------------
  // 1) Storage-Wrapper — robust gegen fehlenden/blockierten localStorage
  // ---------------------------------------------------------------------------

  // Merker: ist localStorage nutzbar? Bei Privatmodus/Sandbox wirft der Zugriff.
  var storageOk = true;
  var speicherWarnungGezeigt = false;
  // In-Memory-Fallback, falls localStorage nicht verfügbar ist.
  var memoryStore = null;

  // Einmaliger, schonender Funktionstest auf localStorage.
  (function pruefeStorage() {
    try {
      var probe = '__probe_muendlich__';
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      storageOk = true;
    } catch (e) {
      storageOk = false;
    }
  })();

  function ladeState() {
    var roh = null;
    if (storageOk) {
      try {
        roh = window.localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        // Lesen fehlgeschlagen -> ab jetzt In-Memory.
        storageOk = false;
      }
    }
    if (!storageOk) roh = memoryStore;

    if (roh == null) return Engine.NEUER_STATE();
    // deserialisiere() fängt kaputtes JSON selbst ab (-> NEUER_STATE).
    return Engine.deserialisiere(roh);
  }

  function speichereState(state) {
    var json = Engine.serialisiere(state);
    if (storageOk) {
      try {
        window.localStorage.setItem(STORAGE_KEY, json);
        return;
      } catch (e) {
        // Schreiben fehlgeschlagen (z. B. Quota/Privatmodus) -> Fallback.
        storageOk = false;
      }
    }
    memoryStore = json;
    zeigeSpeicherWarnung();
  }

  // Dezente, einmalige Warnung, dass nicht persistiert wird.
  function zeigeSpeicherWarnung() {
    if (speicherWarnungGezeigt) return;
    speicherWarnungGezeigt = true;
    // Wird beim nächsten render() oben eingeblendet (Flag steuert das).
  }

  // ---------------------------------------------------------------------------
  // 2) KaTeX-Render — nie crashen lassen
  // ---------------------------------------------------------------------------

  function rendereMathe(rootEl) {
    if (!rootEl || typeof window.renderMathInElement !== 'function') return;
    try {
      window.renderMathInElement(rootEl, {
        delimiters: [
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    } catch (e) {
      // Bei Fehler bleibt der Rohtext stehen — kein App-Crash.
    }
  }

  // ---------------------------------------------------------------------------
  // Hilfsfunktionen
  // ---------------------------------------------------------------------------

  // Kleiner HTML-Escaper für eingebetteten Text (Themennamen etc.).
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Sicher eine Array-Liste aus CONTENT holen (auch wenn Key fehlt).
  function liste(name) {
    var l = CONTENT[name];
    return Array.isArray(l) ? l : [];
  }

  // Heutiger Tag als Tagesnummer (für Fälligkeit).
  function heuteTag() {
    return Engine.tagNummer(Date.now());
  }

  // Anzahl heute fälliger SRS-Karten.
  function anzahlFaellig(state) {
    var heute = heuteTag();
    var srs = (state && state.srs) || {};
    var n = 0;
    for (var id in srs) {
      if (!Object.prototype.hasOwnProperty.call(srs, id)) continue;
      if (Engine.faellig(srs[id], heute)) n++;
    }
    return n;
  }

  // Stufen-Status eines Themas defensiv lesen.
  function stufenVon(state, key) {
    var s = (state && state.stufen && state.stufen[key]) || {};
    return { '1': !!s['1'], '2': !!s['2'], '3': !!s['3'] };
  }

  // Thema-Objekt zu einem Key finden (oder undefined).
  function themaVon(key) {
    return liste('themen').filter(function (t) { return t && t.key === key; })[0];
  }

  // Items einer Content-Liste, die zu einem Thema gehoeren.
  function itemsVon(name, key) {
    return liste(name).filter(function (it) { return it && it.thema === key; });
  }

  // Ein erklaeren-Item per id finden (fuer den eingefrorenen Fällig-/Stufe-3-Snapshot).
  function erklaerItemById(id) {
    var arr = liste('erklaeren');
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] && arr[i].id === id) return arr[i];
    }
    return null;
  }

  // rechnen-Items eines Themas, stabil nach level sortiert (gleiches level: Reihenfolge bleibt).
  function rechnenSortiert(key) {
    var items = itemsVon('rechnen', key).slice();
    return items
      .map(function (it, i) { return { it: it, i: i }; })
      .sort(function (a, b) {
        var la = Number(a.it.level) || 0;
        var lb = Number(b.it.level) || 0;
        if (la !== lb) return la - lb;
        return a.i - b.i; // stabil
      })
      .map(function (x) { return x.it; });
  }

  // ---------------------------------------------------------------------------
  // Reine, testbare Logik-Bausteine
  // ---------------------------------------------------------------------------

  // Deterministische Mischung einer 0..n-1-Indexliste anhand eines Zahlen-Seeds.
  // Fisher-Yates mit einem kleinen LCG-PRNG — kein Math.random im Modulscope,
  // damit dieselbe Sitzung reproduzierbar bleibt und Tests stabil sind.
  function mischeIndizes(n, seed) {
    var idx = [];
    for (var i = 0; i < n; i++) idx.push(i);
    var s = (seed >>> 0) || 1;
    for (var j = n - 1; j > 0; j--) {
      // LCG (Numerical Recipes-Konstanten)
      s = (1664525 * s + 1013904223) >>> 0;
      var k = s % (j + 1);
      var tmp = idx[j];
      idx[j] = idx[k];
      idx[k] = tmp;
    }
    return idx;
  }

  // Prueft, ob die aktuelle Reihenfolge (Array von Original-Indizes) der
  // natuerlichen Reihenfolge 0,1,2,... entspricht.
  function reihenfolgeKorrekt(reihenfolge) {
    if (!Array.isArray(reihenfolge)) return false;
    for (var i = 0; i < reihenfolge.length; i++) {
      if (reihenfolge[i] !== i) return false;
    }
    return true;
  }

  // Wandelt eine Nutzereingabe ("3,14" oder "3.14") in eine Zahl um (oder NaN).
  function parseZahl(eingabe) {
    if (eingabe == null) return NaN;
    var s = String(eingabe).trim().replace(/\s+/g, '').replace(',', '.');
    if (s === '') return NaN;
    var z = Number(s);
    return z;
  }

  // numerisch korrekt: |eingabe - loesung| <= toleranz (toleranz default 0).
  function numerischKorrekt(eingabe, loesung, toleranz) {
    var z = parseZahl(eingabe);
    if (isNaN(z) || typeof loesung !== 'number' || isNaN(loesung)) return false;
    var tol = typeof toleranz === 'number' && toleranz >= 0 ? toleranz : 0;
    return Math.abs(z - loesung) <= tol + 1e-9;
  }

  // mc korrekt: gewaehlter Index === item.korrekt.
  function mcKorrekt(item, gewaehlt) {
    return !!item && typeof item.korrekt === 'number' && gewaehlt === item.korrekt;
  }

  // Fortschreibung einer SRS-Karte fuer ein Item nach einer Selbsteinschaetzung.
  // Liest die bestehende Karte (oder NEUE_KARTE) und schreibt sie via Engine fort.
  // Mutiert state.srs (gewollt). Gibt die neue Karte zurueck.
  function naechsteSrsKarte(state, itemId, bewertung, heute) {
    if (!state.srs) state.srs = {};
    var alt = state.srs[itemId] || Engine.NEUE_KARTE();
    var neu = Engine.naechsteWiederholung(alt, bewertung, heute);
    state.srs[itemId] = neu;
    return neu;
  }

  // Alle erklaeren-Items, deren Karte existiert UND heute faellig ist.
  function faelligeErklaerItems(state, heute) {
    var srs = (state && state.srs) || {};
    return liste('erklaeren').filter(function (it) {
      if (!it || !it.id) return false;
      var k = srs[it.id];
      return !!k && Engine.faellig(k, heute);
    });
  }

  // Diagnose: bis zu einer Frage je Thema, moeglichst level-1/2 rechnen,
  // sonst erklaeren. Liefert eine Liste {kind:"rechnen"|"erklaeren", item, thema}.
  function baueDiagnoseFragen() {
    var themen = liste('themen');
    var fragen = [];
    for (var i = 0; i < themen.length; i++) {
      var key = themen[i].key;
      var r = rechnenSortiert(key).filter(function (it) {
        return Number(it.level) <= 2;
      })[0];
      if (r) {
        fragen.push({ kind: 'rechnen', item: r, thema: themen[i] });
        continue;
      }
      var e = itemsVon('erklaeren', key)[0];
      if (e) fragen.push({ kind: 'erklaeren', item: e, thema: themen[i] });
    }
    return fragen;
  }

  var BEWERTUNGEN = ['wiederholen', 'schwer', 'gut', 'sicher'];
  var BEWERTUNG_LABELS = {
    wiederholen: 'Wiederholen',
    schwer: 'Schwer',
    gut: 'Gut',
    sicher: 'Sicher'
  };
  var FEHLERTYPEN = [
    { id: 'fluechtigkeit', label: 'Flüchtigkeit' },
    { id: 'verfahren', label: 'Verfahren unklar' },
    { id: 'begriff', label: 'Begriff vergessen' }
  ];

  // Fehlertypen speziell für die Simulator-Reflexion (mündliche Prüfung).
  var SIM_FEHLERTYPEN = [
    { id: 'verfahren', label: 'Verfahren unklar' },
    { id: 'begriff', label: 'Begriff vergessen' },
    { id: 'zeitdruck', label: 'Zeitdruck' },
    { id: 'rechenfehler', label: 'Rechenfehler' }
  ];

  // ---------------------------------------------------------------------------
  // Reine, testbare Logik-Bausteine — Prüfungs-Simulator (Phase 8)
  // ---------------------------------------------------------------------------

  // Sekunden -> "MM:SS" (zweistellig, nicht-negativ). Reine Funktion.
  function formatZeit(sekunden) {
    var s = Math.max(0, Math.floor(Number(sekunden) || 0));
    var min = Math.floor(s / 60);
    var sek = s % 60;
    function zwei(n) { return (n < 10 ? '0' : '') + n; }
    return zwei(min) + ':' + zwei(sek);
  }

  // Themen-Schlüssel eines Gebiets (für Empfehlungs-Rücklinks).
  function themenKeysFuerGebiet(gebiet) {
    return liste('themen')
      .filter(function (t) { return t && t.gebiet === gebiet; })
      .map(function (t) { return t.key; });
  }

  // Empfehlungs-Themen (volle Thema-Objekte) eines Gebiets — reine Funktion.
  function empfehlungsThemen(gebiet) {
    return liste('themen').filter(function (t) {
      return t && t.gebiet === gebiet;
    });
  }

  // Vortrags-Aufgabe (simulator-Item) eines Gebiets oder undefined.
  function vortragsAufgabeVon(gebiet) {
    return liste('simulator').filter(function (s) {
      return s && s.gebiet === gebiet;
    })[0];
  }

  // Gesprächsfragen (erklaeren-Items) eines Gebiets, deterministisch gemischt
  // anhand eines Seeds, auf maxN begrenzt. Reine Funktion (kein Math.random).
  function waehleGespraechFragen(gebiet, seed, maxN) {
    var keys = {};
    liste('themen').forEach(function (t) {
      if (t && t.gebiet === gebiet) keys[t.key] = true;
    });
    var pool = liste('erklaeren').filter(function (e) {
      return e && keys[e.thema];
    });
    var perm = mischeIndizes(pool.length, seed);
    var grenze = typeof maxN === 'number' && maxN > 0 ? maxN : pool.length;
    var ausgewaehlt = [];
    for (var i = 0; i < perm.length && ausgewaehlt.length < grenze; i++) {
      ausgewaehlt.push(pool[perm[i]]);
    }
    return ausgewaehlt;
  }

  // Eine vollständige Prüfung ziehen — REINE Funktion (r aus [0,1)).
  // Liefert {teil1Gebiet, teil2Gebiet, vortragsAufgabe, gespraechFragen}.
  // Die Gebiete sind über Engine.paarung gekoppelt; die Vortragsaufgabe stammt
  // aus teil1, die Gesprächsfragen aus teil2.
  function simulatorZiehen(r) {
    var teil1Gebiet = Engine.zieheGebiet(r);
    var paar = Engine.paarung(teil1Gebiet);
    var seed = Math.floor((Number(r) || 0) * 1e9) >>> 0;
    return {
      teil1Gebiet: paar.teil1,
      teil2Gebiet: paar.teil2,
      vortragsAufgabe: vortragsAufgabeVon(paar.teil1) || null,
      gespraechFragen: waehleGespraechFragen(paar.teil2, seed, 4)
    };
  }

  // ---------------------------------------------------------------------------
  // 3) Hash-Routing
  // ---------------------------------------------------------------------------
  // Routen:
  //   #/start (Default)
  //   #/thema/<key>/<stufe>
  //   #/faellig
  //   #/simulator
  //   #/diagnose

  function parseHash() {
    var h = window.location.hash || '';
    // führendes '#' entfernen, dann an '/' trennen.
    var teile = h.replace(/^#\/?/, '').split('/').filter(function (t) {
      return t.length > 0;
    });
    return teile; // z. B. ['thema','geo-vektoren','2']
  }

  function navigiere(route) {
    window.location.hash = route;
  }

  // ---------------------------------------------------------------------------
  // View-Bausteine
  // ---------------------------------------------------------------------------

  function speicherWarnungHtml() {
    if (!speicherWarnungGezeigt) return '';
    return '<div class="hinweis" role="status">Fortschritt wird in diesem ' +
      'Modus nicht gespeichert.</div>';
  }

  function flashHtml() {
    if (!flashNachricht) return '';
    var klasse = flashIstFehler ? 'hinweis fehler' : 'hinweis';
    var html = '<div class="' + klasse + '" role="status">' +
      esc(flashNachricht) + '</div>';
    // Flash ist einmalig: nach dem Rendern zurücksetzen.
    flashNachricht = null;
    flashIstFehler = false;
    return html;
  }

  // Eine Gebiets-Sektion (Analysis oder Geometrie) mit Themenliste.
  function gebietHtml(state, gebiet, titel, modifier) {
    var themen = liste('themen').filter(function (t) {
      return t && t.gebiet === gebiet;
    });

    var items;
    if (themen.length === 0) {
      items = '<li class="leer">Noch keine Themen hinterlegt.</li>';
    } else {
      items = themen.map(function (t) {
        var st = stufenVon(state, t.key);
        var marker = ['1', '2', '3'].map(function (nr) {
          var fertig = st[nr] ? ' stufe--erledigt' : '';
          return '<span class="stufe' + fertig + '" aria-label="Stufe ' + nr +
            (st[nr] ? ' erledigt' : '') + '">' + nr + '</span>';
        }).join('');
        return '<li><a class="thema" href="#/thema/' + esc(t.key) + '/1">' +
          '<span class="thema-name">' + esc(t.name) + '</span>' +
          '<span class="stufen">' + marker + '</span>' +
          '</a></li>';
      }).join('');
    }

    return '<section class="gebiet gebiet--' + modifier + '">' +
      '<h2>' + esc(titel) + '</h2>' +
      '<ul class="themen-liste">' + items + '</ul>' +
      '</section>';
  }

  // Gemeinsamer Kopf einer Trainer-View: Zurück-Link + optionale Fortschrittszeile.
  function trainerKopf(zurueck, titel, fortschritt) {
    return '' +
      flashHtml() +
      speicherWarnungHtml() +
      '<a class="zurueck" href="' + esc(zurueck) + '">&larr; Zurück</a>' +
      '<h1>' + esc(titel) + '</h1>' +
      (fortschritt ? '<div class="fortschritt">' + fortschritt + '</div>' : '');
  }

  // Tipp/Lösungsweg/Erwartungsbild-Box (LaTeX bleibt erhalten -> nicht escapen).
  function hilfeBox(titel, inhaltHtml) {
    return '<div class="hilfe-box"><h3>' + esc(titel) + '</h3>' + inhaltHtml + '</div>';
  }

  // ---------------------------------------------------------------------------
  // Transiente Sitzung — wird bei JEDEM Routenwechsel zurueckgesetzt.
  // Haelt fluechtigen UI-Zustand (Index, aufgedeckt, gemischte Reihenfolge …),
  // der NICHT persistiert wird.
  // ---------------------------------------------------------------------------
  var sitzung = null;

  // Routen-Signatur: identifiziert eine View eindeutig, damit wir die Sitzung
  // nur bei echtem Wechsel neu aufsetzen (nicht bei jedem Re-Render derselben View).
  function routenSignatur(teile) {
    return teile.join('/');
  }

  // Sitzung fuer die aktuelle Route sicherstellen. setup() baut den Startzustand.
  function sitzungFuer(signatur, setup) {
    if (!sitzung || sitzung.signatur !== signatur) {
      sitzung = setup();
      sitzung.signatur = signatur;
    }
    return sitzung;
  }

  // ---------------------------------------------------------------------------
  // Timer-Lifecycle (Simulator) — genau EIN Interval pro Sitzung.
  // Die Interval-ID liegt in sitzung.timerId. timerStop() wird beim
  // Phasenwechsel, beim Re-Render UND beim Verlassen der Route aufgerufen, damit
  // kein Timer leakt oder doppelt läuft.
  // ---------------------------------------------------------------------------

  // Laufenden Timer (falls vorhanden) stoppen und ID löschen.
  function timerStop() {
    if (sitzung && sitzung.timerId != null) {
      clearInterval(sitzung.timerId);
      sitzung.timerId = null;
    }
  }

  // Sekündlichen Countdown starten. Idempotent: ein evtl. laufender Timer wird
  // zuerst gestoppt, damit ein erneutes render() nie zwei Timer parallel hält.
  function timerStart() {
    if (!sitzung) return;
    timerStop();
    sitzung.laeuft = true;
    sitzung.timerId = setInterval(function () {
      if (!sitzung || !sitzung.laeuft) return;
      if (sitzung.rest > 0) {
        sitzung.rest -= 1;
        if (sitzung.rest === 0) {
          // Ablauf: Timer anhalten (kein Hard-Stop der Phase) und EINMAL neu
          // rendern, damit der dezente Hinweis + Button-Status erscheint.
          sitzung.laeuft = false;
          timerStop();
          render();
          return;
        }
        // Normaler Tick: NUR die Uhr-Anzeige aktualisieren — KEIN voller
        // render(), sonst Fokusverlust/Flicker und Abbruch einer laufenden
        // Audio-Aufnahme jede Sekunde.
        var uhr = document.querySelector('.sim-uhr');
        if (uhr) uhr.textContent = formatZeit(sitzung.rest);
      }
    }, 1000);
  }

  // ---------------------------------------------------------------------------
  // Views
  // ---------------------------------------------------------------------------

  function viewStart(state) {
    var faelligN = anzahlFaellig(state);
    var diagnoseKlasse = state.diagnoseGemacht ? 'btn' : 'btn btn-hervor';

    return '' +
      flashHtml() +
      speicherWarnungHtml() +
      '<h1>Übersicht</h1>' +
      '<p>Wähle ein Thema oder starte deine tägliche Wiederholung.</p>' +
      '<div class="aktionen">' +
        '<a class="btn btn-primaer" href="#/faellig">Heute fällig (' +
          faelligN + ')</a>' +
        '<a class="btn" href="#/simulator">Prüfungs-Simulator</a>' +
        '<a class="' + diagnoseKlasse + '" href="#/diagnose">Diagnose</a>' +
      '</div>' +
      '<div class="gebiete">' +
        gebietHtml(state, 'analysis', 'Analysis', 'analysis') +
        gebietHtml(state, 'geometrie', 'Geometrie', 'geometrie') +
      '</div>' +
      '<div class="aktionen">' +
        '<button type="button" class="btn" id="btn-sichern">Sichern</button>' +
        '<button type="button" class="btn" id="btn-laden">Laden</button>' +
        '<input type="file" id="datei-laden" class="datei-input" accept="application/json,.json">' +
      '</div>';
  }

  // Generischer Stub: Überschrift + Zurück-Link + Platzhalter.
  function viewStub(titel, untertitel) {
    return '' +
      flashHtml() +
      speicherWarnungHtml() +
      '<a class="zurueck" href="#/start">&larr; Zurück zur Übersicht</a>' +
      '<h1>' + esc(titel) + '</h1>' +
      (untertitel ? '<p>' + untertitel + '</p>' : '') +
      '<div class="platzhalter">(wird in einem späteren Schritt gebaut)</div>';
  }

  // === Stufe 1 — Verfahren ordnen ==========================================
  function viewStufe1(state, key, signatur) {
    var thema = themaVon(key);
    var name = thema ? thema.name : key;
    var verf = itemsVon('verfahren', key)[0];

    if (!verf || !Array.isArray(verf.schritte) || verf.schritte.length === 0) {
      return trainerKopf('#/start', name + ' — Stufe 1: Verfahren', null) +
        '<div class="platzhalter">Für dieses Thema ist kein Verfahren ' +
        'hinterlegt.</div>' +
        '<div class="aktionen"><a class="btn btn-primaer" href="#/thema/' +
        esc(key) + '/2">Weiter zu Stufe 2 &rarr;</a></div>';
    }

    var s = sitzungFuer(signatur, function () {
      // Seed deterministisch aus Tag + Key: pro Sitzung stabil gemischt.
      var seed = (heuteTag() * 2654435761) ^ hashStr(key);
      var perm = mischeIndizes(verf.schritte.length, seed);
      // Falls die Mischung zufaellig schon korrekt ist: einmal rotieren.
      if (reihenfolgeKorrekt(perm) && perm.length > 1) {
        perm.push(perm.shift());
      }
      return { reihenfolge: perm, geprueft: false, korrekt: false };
    });

    var n = verf.schritte.length;
    var listeHtml = s.reihenfolge.map(function (origIdx, pos) {
      var rauf = pos === 0 ? ' disabled' : '';
      var runter = pos === n - 1 ? ' disabled' : '';
      return '<li class="schritt">' +
        '<span class="schritt-nr">' + (pos + 1) + '</span>' +
        '<span class="schritt-text">' + esc(verf.schritte[origIdx]) + '</span>' +
        '<span class="schritt-pfeile">' +
          '<button type="button" class="pfeil-btn" data-richtung="rauf" ' +
            'data-pos="' + pos + '" aria-label="nach oben"' + rauf + '>&uarr;</button>' +
          '<button type="button" class="pfeil-btn" data-richtung="runter" ' +
            'data-pos="' + pos + '" aria-label="nach unten"' + runter + '>&darr;</button>' +
        '</span>' +
      '</li>';
    }).join('');

    var rueck = '';
    if (s.geprueft && s.korrekt) {
      rueck = '<div role="status" class="rueckmeldung rueckmeldung--ok">Richtig sortiert! ' +
        'Stufe 1 geschafft.</div>' +
        '<div class="aktionen"><a class="btn btn-primaer" href="#/thema/' +
        esc(key) + '/2">Weiter zu Stufe 2 &rarr;</a></div>';
    } else if (s.geprueft) {
      rueck = '<div role="status" class="rueckmeldung rueckmeldung--nope">Noch nicht ganz. ' +
        'Sortiere die Schritte um und prüfe erneut.</div>';
    }

    var aktion = s.korrekt ? '' :
      '<div class="aktionen"><button type="button" class="btn btn-primaer" ' +
      'id="btn-pruefen">Prüfen</button></div>';

    return trainerKopf('#/start', name + ' — Stufe 1: Verfahren ordnen',
        'Bringe die Schritte in die richtige Reihenfolge.') +
      '<p class="frage">' + esc(verf.frage) + '</p>' +
      '<ol class="schritt-liste">' + listeHtml + '</ol>' +
      rueck + aktion;
  }

  // === Stufe 2 — Selbst rechnen ============================================
  function viewStufe2(state, key, signatur) {
    var thema = themaVon(key);
    var name = thema ? thema.name : key;
    var items = rechnenSortiert(key);

    if (items.length === 0) {
      return trainerKopf('#/start', name + ' — Stufe 2: Rechnen', null) +
        '<div class="platzhalter">Für dieses Thema sind keine ' +
        'Rechenaufgaben hinterlegt.</div>' +
        '<div class="aktionen"><a class="btn btn-primaer" href="#/thema/' +
        esc(key) + '/3">Weiter zu Stufe 3 &rarr;</a></div>';
    }

    var s = sitzungFuer(signatur, function () {
      return {
        index: 0, beantwortet: false, korrekt: false, gewaehlt: null,
        tippAuf: false, wegAuf: false, reflexionGesetzt: false, fertig: false
      };
    });

    if (s.fertig) {
      return trainerKopf('#/start', name + ' — Stufe 2: Rechnen', null) +
        '<div role="status" class="rueckmeldung rueckmeldung--ok">Alle Aufgaben ' +
        'durchgearbeitet — Stufe 2 geschafft!</div>' +
        '<div class="aktionen"><a class="btn btn-primaer" href="#/thema/' +
        esc(key) + '/3">Weiter zu Stufe 3 &rarr;</a></div>';
    }

    var item = items[s.index];
    var fort = '<span class="schritt-zahl">Aufgabe ' + (s.index + 1) + ' / ' +
      items.length + '</span><span>Level ' + esc(String(item.level || '?')) + '</span>';

    var html = trainerKopf('#/start', name + ' — Stufe 2: Rechnen', fort);
    html += '<p class="frage">' + esc(item.frage) + '</p>';

    // Eingabe-Bereich (numerisch / mc)
    if (item.typ === 'mc') {
      var opts = Array.isArray(item.optionen) ? item.optionen : [];
      html += '<ul class="optionen-liste">' + opts.map(function (opt, i) {
        var klasse = 'option-btn';
        var dis = '';
        if (s.beantwortet) {
          dis = ' disabled';
          if (i === item.korrekt) klasse += ' richtig';
          else if (i === s.gewaehlt) klasse += ' falsch';
        }
        return '<li><button type="button" class="' + klasse + '" ' +
          'data-opt="' + i + '"' + dis + '>' + esc(opt) + '</button></li>';
      }).join('') + '</ul>';
    } else {
      var disAttr = s.beantwortet ? ' disabled' : '';
      html += '<input type="text" inputmode="decimal" class="antwort-feld" ' +
        'id="antwort" placeholder="Antwort eingeben"' + disAttr + '>';
      if (!s.beantwortet) {
        html += '<div class="aktionen"><button type="button" ' +
          'class="btn btn-primaer" id="btn-pruefen">Prüfen</button></div>';
      }
    }

    // Rückmeldung
    if (s.beantwortet) {
      if (s.korrekt) {
        html += '<div role="status" class="rueckmeldung rueckmeldung--ok">Richtig!</div>';
      } else {
        html += '<div role="status" class="rueckmeldung rueckmeldung--nope">Leider nicht ' +
          'richtig.</div>';
        // Fehlertyp-Reflexion (optional/überspringbar)
        if (!s.reflexionGesetzt) {
          html += '<div class="reflexion"><p>Woran lag es? (optional)</p>' +
            '<div class="reflexion-knoepfe">' +
            FEHLERTYPEN.map(function (f) {
              return '<button type="button" class="chip" data-fehlertyp="' +
                esc(f.id) + '">' + esc(f.label) + '</button>';
            }).join('') +
            '</div></div>';
        } else {
          html += '<div class="reflexion"><p>Notiert. Danke für die ' +
            'Einschätzung.</p></div>';
        }
      }
    }

    // Hilfen: Tipp + Lösungsweg
    if (s.tippAuf && item.tipp) {
      html += hilfeBox('Tipp', '<p>' + esc(item.tipp) + '</p>');
    }
    if (s.wegAuf && item.loesungsweg) {
      html += hilfeBox('Lösungsweg', '<p>' + esc(item.loesungsweg) + '</p>');
    }

    // Aktionsleiste: Tipp / Lösungsweg / weiter
    var aktionen = [];
    if (item.tipp && !s.tippAuf) {
      aktionen.push('<button type="button" class="btn" id="btn-tipp">Tipp</button>');
    }
    if (item.loesungsweg && !s.wegAuf) {
      aktionen.push('<button type="button" class="btn" id="btn-weg">Lösungsweg zeigen</button>');
    }
    if (s.beantwortet) {
      var letzte = s.index >= items.length - 1;
      aktionen.push('<button type="button" class="btn btn-primaer" id="btn-weiter">' +
        (letzte ? 'Abschließen' : 'Weiter') + '</button>');
    }
    if (aktionen.length) {
      html += '<div class="aktionen">' + aktionen.join('') + '</div>';
    }

    return html;
  }

  // === Stufe 3 — Frei erklären + SRS =======================================
  function viewStufe3(state, key, signatur) {
    var thema = themaVon(key);
    var name = thema ? thema.name : key;
    var items = itemsVon('erklaeren', key);
    return erklaerFlow({
      titel: name + ' — Stufe 3: Erklären',
      hinweis: 'Erkläre laut, decke dann das Erwartungsbild auf und schätze ' +
        'dich ein.',
      items: items,
      signatur: signatur,
      leerText: 'Für dieses Thema sind keine Erklär-Aufgaben hinterlegt.',
      zurueck: '#/start',
      abschlussHtml: '<div role="status" class="rueckmeldung rueckmeldung--ok">Stufe 3 ' +
        'geschafft! Die Karten kommen über „Heute fällig" zur Wiederholung.</div>' +
        '<div class="aktionen"><a class="btn btn-primaer" href="#/start">' +
        'Zurück zur Übersicht</a></div>',
      onAbschluss: function (st) {
        if (!st.stufen) st.stufen = {};
        if (!st.stufen[key]) st.stufen[key] = {};
        st.stufen[key]['3'] = true;
      }
    });
  }

  // === Heute fällig ========================================================
  function viewFaellig(state, signatur) {
    // items werden nur beim Sitzungsstart fuer den ID-Snapshot ausgewertet
    // (erklaerFlow friert sie ein); spaetere Renders nutzen den Snapshot.
    return erklaerFlow({
      titel: 'Heute fällig',
      hinweis: 'Wiederhole die fälligen Erklärungen.',
      items: faelligeErklaerItems(state, heuteTag()),
      signatur: signatur,
      leerText: 'Aktuell ist nichts fällig. Komm später wieder oder arbeite ' +
        'ein Thema durch.',
      zurueck: '#/start',
      abschlussHtml: '<div role="status" class="rueckmeldung rueckmeldung--ok">Alle fälligen ' +
        'Karten wiederholt. Stark!</div>' +
        '<div class="aktionen"><a class="btn btn-primaer" href="#/start">' +
        'Zurück zur Übersicht</a></div>',
      onAbschluss: null
    });
  }

  // Gemeinsamer Erklär-/SRS-Flow (Stufe 3 + Heute fällig).
  // cfg.items: Liste erklaeren-Items. Selbsteinschätzung -> SRS. Optional Audio.
  function erklaerFlow(cfg) {
    // Die durchzuarbeitende Liste wird beim Sitzungsstart als ID-Snapshot
    // EINGEFROREN. Wichtig fuer "Heute fällig": dort schrumpft die live aus
    // state.srs abgeleitete Liste mit jeder Bewertung — ohne Snapshot würde der
    // lineare Index Karten überspringen.
    var s = sitzungFuer(cfg.signatur, function () {
      return {
        index: 0, aufgedeckt: false, fertig: false,
        ids: (cfg.items || []).map(function (it) { return it.id; })
      };
    });
    var ids = s.ids || [];

    if (ids.length === 0) {
      return trainerKopf(cfg.zurueck, cfg.titel, null) +
        '<div class="platzhalter">' + esc(cfg.leerText) + '</div>' +
        '<div class="aktionen"><a class="btn btn-primaer" href="#/start">' +
        'Zurück zur Übersicht</a></div>';
    }

    if (s.fertig) {
      return trainerKopf(cfg.zurueck, cfg.titel, null) + cfg.abschlussHtml;
    }

    var item = erklaerItemById(ids[s.index]);
    if (!item) {
      // Veralteter Snapshot (Item nicht mehr im Content) -> Flow abschliessen.
      return trainerKopf(cfg.zurueck, cfg.titel, null) + cfg.abschlussHtml;
    }
    var fort = '<span class="schritt-zahl">Karte ' + (s.index + 1) + ' / ' +
      ids.length + '</span>';

    var html = trainerKopf(cfg.zurueck, cfg.titel, fort);
    html += '<p>' + esc(cfg.hinweis) + '</p>';
    html += '<p class="frage">' + esc(item.frage) + '</p>';

    // Audio-Aufnahme (wird per Handler an den Container gebunden).
    html += '<div class="audio-box" id="audio-box"></div>';

    if (!s.aufgedeckt) {
      html += '<div class="aktionen"><button type="button" ' +
        'class="btn btn-primaer" id="btn-aufdecken">Ich hab\'s erklärt – ' +
        'aufdecken</button></div>';
    } else {
      var eb = Array.isArray(item.erwartungsbild) ? item.erwartungsbild : [];
      html += hilfeBox('Erwartungsbild',
        '<ul class="erwartung-liste">' +
        eb.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') +
        '</ul>');
      html += '<p>Wie sicher warst du?</p>';
      html += '<div class="bewertung">' +
        BEWERTUNGEN.map(function (b) {
          return '<button type="button" class="btn bew--' + b + '" ' +
            'data-bewertung="' + b + '">' + esc(BEWERTUNG_LABELS[b]) +
            '</button>';
        }).join('') +
        '</div>';
    }
    return html;
  }

  // === Diagnose ============================================================
  function viewDiagnose(state, signatur) {
    var fragen = baueDiagnoseFragen();

    if (fragen.length === 0) {
      return trainerKopf('#/start', 'Diagnose', null) +
        '<div class="platzhalter">Keine Diagnose-Fragen verfügbar.</div>' +
        '<div class="aktionen"><a class="btn btn-primaer" href="#/start">' +
        'Zurück</a></div>';
    }

    var s = sitzungFuer(signatur, function () {
      return { index: 0, aufgedeckt: false, gewaehlt: null, fertig: false,
        ergebnisse: [] };
    });

    // Auswertung am Ende
    if (s.fertig) {
      var zeilen = s.ergebnisse.map(function (e) {
        var sicher = e.sicher;
        var marke = sicher
          ? '<span class="bewertungs-marke marke--sicher">sicher</span>'
          : '<span class="bewertungs-marke marke--luft">Luft nach oben</span>';
        var link = '<a href="#/thema/' + esc(e.key) + '/2">üben</a>';
        return '<li class="diagnose-zeile"><span>' + esc(e.name) + '</span>' +
          '<span>' + marke + ' ' + link + '</span></li>';
      }).join('');
      return trainerKopf('#/start', 'Diagnose — Auswertung', null) +
        '<p>Empfehlung: Beginne mit den Themen mit „Luft nach oben".</p>' +
        '<ul class="diagnose-ergebnis">' + zeilen + '</ul>' +
        '<div class="aktionen"><a class="btn btn-primaer" href="#/start">' +
        'Zur Übersicht</a></div>';
    }

    var f = fragen[s.index];
    var item = f.item;
    var fort = '<span class="schritt-zahl">Frage ' + (s.index + 1) + ' / ' +
      fragen.length + '</span><span><a href="#/start">Abbrechen</a></span>';

    var html = trainerKopf('#/start', 'Diagnose-Einstieg', fort);
    html += '<p class="frage">' + esc(item.frage) + '</p>';

    if (f.kind === 'rechnen') {
      if (item.typ === 'mc') {
        var opts = Array.isArray(item.optionen) ? item.optionen : [];
        html += '<ul class="optionen-liste">' + opts.map(function (opt, i) {
          var klasse = 'option-btn';
          var dis = '';
          if (s.gewaehlt !== null) {
            dis = ' disabled';
            if (i === item.korrekt) klasse += ' richtig';
            else if (i === s.gewaehlt) klasse += ' falsch';
          }
          return '<li><button type="button" class="' + klasse + '" ' +
            'data-opt="' + i + '"' + dis + '>' + esc(opt) + '</button></li>';
        }).join('') + '</ul>';
      } else {
        var dis2 = s.gewaehlt !== null ? ' disabled' : '';
        html += '<input type="text" inputmode="decimal" class="antwort-feld" ' +
          'id="antwort" placeholder="Antwort"' + dis2 + '>';
        if (s.gewaehlt === null) {
          html += '<div class="aktionen"><button type="button" ' +
            'class="btn btn-primaer" id="btn-pruefen">Prüfen</button></div>';
        }
      }
      if (s.gewaehlt !== null) {
        html += s.korrekt
          ? '<div role="status" class="rueckmeldung rueckmeldung--ok">Richtig!</div>'
          : '<div role="status" class="rueckmeldung rueckmeldung--nope">Leider nicht.</div>';
        html += '<div class="aktionen"><button type="button" ' +
          'class="btn btn-primaer" id="btn-weiter">Weiter</button></div>';
      }
    } else {
      // erklaeren: aufdecken + Selbsteinschätzung (sicher/Luft)
      if (!s.aufgedeckt) {
        html += '<div class="aktionen"><button type="button" ' +
          'class="btn btn-primaer" id="btn-aufdecken">Aufdecken</button></div>';
      } else {
        var eb = Array.isArray(item.erwartungsbild) ? item.erwartungsbild : [];
        html += hilfeBox('Erwartungsbild',
          '<ul class="erwartung-liste">' +
          eb.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') +
          '</ul>');
        html += '<p>Konntest du das sicher erklären?</p>' +
          '<div class="bewertung">' +
          '<button type="button" class="btn bew--sicher" data-diag="sicher">' +
            'Sicher</button>' +
          '<button type="button" class="btn bew--schwer" data-diag="luft">' +
            'Luft nach oben</button>' +
          '</div>';
      }
    }
    return html;
  }

  // === Prüfungs-Simulator (Phase 8) ========================================
  // Zustandsmaschine im sitzung-Objekt:
  //   phase ∈ "intro" | "vorbereitung" | "vortrag" | "gespraech" | "reflexion"
  // sitzung trägt zusätzlich: teil1Gebiet, teil2Gebiet, vortragsAufgabe,
  // gespraechFragen, gespraechIndex, aufgedeckt{}, rest (Sekunden), laeuft,
  // timerId, fehlertypen{}, notiz, reflexionGespeichert.

  var GEBIET_LABEL = { analysis: 'Analysis', geometrie: 'Geometrie' };
  var SIM_VORBEREITUNG_SEK = 20 * 60; // 20:00
  var SIM_VORTRAG_SEK = 10 * 60;      // 10:00
  var SIM_GESPRAECH_SEK = 10 * 60;    // 10:00

  function gebietLabel(g) { return GEBIET_LABEL[g] || esc(g || ''); }

  // Countdown-Block mit Start/Pause-Button + optionalem Ablauf-Hinweis.
  function timerHtml(s) {
    var abgelaufen = s.rest === 0;
    var klasse = 'sim-timer' + (abgelaufen ? ' sim-timer--aus' : '') +
      (s.laeuft ? ' sim-timer--laeuft' : '');
    var btn = abgelaufen ? '' :
      '<button type="button" class="btn" id="btn-timer">' +
      (s.laeuft ? 'Pause' : 'Start') + '</button>';
    var hinweis = abgelaufen
      ? '<span class="sim-timer-hinweis">' +
        (s.phase === 'vorbereitung' ? 'Vorbereitungszeit vorbei' : 'Zeit vorbei') +
        '</span>'
      : '';
    return '<div class="' + klasse + '">' +
      '<span class="sim-uhr" aria-live="polite">' + formatZeit(s.rest) + '</span>' +
      btn + hinweis +
      '</div>';
  }

  // Eine Vortrags-Teilaufgabe rendern. mitErwartung=true blendet das
  // Erwartungsbild + AFB ein (nur im Vortrag, NIE in der Vorbereitung).
  function teilaufgabeHtml(ta, pos, mitErwartung, aufgedeckt) {
    var nr = String.fromCharCode(97 + pos) + ')'; // a) b) c) d)
    var afb = ta.afb
      ? '<span class="afb-badge" title="Anforderungsbereich">AFB ' + esc(ta.afb) +
        '</span>'
      : '';
    var html = '<li class="sim-teilaufgabe">' +
      '<div class="sim-ta-kopf"><span class="sim-ta-nr">' + nr + '</span>' + afb +
      '</div>' +
      '<p class="frage">' + esc(ta.frage) + '</p>';
    if (mitErwartung) {
      if (aufgedeckt) {
        var eb = Array.isArray(ta.erwartungsbild) ? ta.erwartungsbild : [];
        html += hilfeBox('Erwartungsbild (zum Selbstabgleich)',
          '<ul class="erwartung-liste">' +
          eb.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') +
          '</ul>' +
          (ta.afb ? '<p class="afb-hinweis">Anforderungsbereich: ' +
            esc(ta.afb) + '</p>' : ''));
      } else {
        html += '<div class="aktionen"><button type="button" class="btn" ' +
          'data-aufdecken="' + pos + '">Erwartungsbild aufdecken</button></div>';
      }
    }
    html += '</li>';
    return html;
  }

  // Haupt-View des Simulators — dispatcht nach sitzung.phase.
  function viewSimulator(state, signatur) {
    var hatSim = liste('simulator').length > 0;
    var s = sitzungFuer(signatur, function () {
      return { phase: 'intro' };
    });

    var kopf = trainerKopf('#/start', 'Prüfungs-Simulator', null);

    if (s.phase === 'intro' || !s.phase) {
      var warnung = hatSim ? '' :
        '<div class="hinweis">Aktuell sind keine Simulator-Aufgaben ' +
        'hinterlegt — der Simulator ist nicht verfügbar.</div>';
      return kopf +
        '<p>Stelle die echte mündliche Prüfung nach: <strong>Teil 1</strong> ' +
        '(20 min Vorbereitung, 10 min Vortrag — eine vollständige Aufgabe aus ' +
        'einem Gebiet) und <strong>Teil 2</strong> (10 min Prüfungsgespräch aus ' +
        'dem anderen Gebiet). Die Gebiete werden gekoppelt gezogen.</p>' +
        warnung +
        '<div class="aktionen">' +
        (hatSim
          ? '<button type="button" class="btn btn-primaer" id="btn-ziehen">' +
            'Prüfung ziehen</button>'
          : '') +
        '</div>';
    }

    // Ab hier ist eine Prüfung gezogen. Defensiv: fehlt die Vortragsaufgabe?
    if (!s.vortragsAufgabe) {
      return kopf +
        '<div class="hinweis">Für das Gebiet ' + gebietLabel(s.teil1Gebiet) +
        ' ist keine Vortrags-Aufgabe hinterlegt.</div>' +
        '<div class="aktionen"><button type="button" class="btn btn-primaer" ' +
        'id="btn-neu">Neue Prüfung ziehen</button></div>';
    }

    var teile = Array.isArray(s.vortragsAufgabe.teilaufgaben)
      ? s.vortragsAufgabe.teilaufgaben : [];

    if (s.phase === 'vorbereitung') {
      // WICHTIG (Didaktik): KEINE Erwartungsbilder/Hilfen in der Vorbereitung.
      var listeVorb = '<ol class="sim-teilaufgaben">' +
        teile.map(function (ta, i) {
          return teilaufgabeHtml(ta, i, false, false);
        }).join('') + '</ol>';
      return kopf +
        '<div class="sim-leiste">' +
        '<span class="sim-phase">Teil 1 · Vorbereitung</span>' +
        '<span class="sim-gebiet sim-gebiet--' + esc(s.teil1Gebiet) + '">' +
        gebietLabel(s.teil1Gebiet) + '</span></div>' +
        timerHtml(s) +
        '<p class="sim-hinweis">Rechne auf Papier. Die Erwartungsbilder werden ' +
        'erst im Vortrag sichtbar.</p>' +
        listeVorb +
        '<div class="aktionen"><button type="button" class="btn btn-primaer" ' +
        'id="btn-zu-vortrag">Vortrag starten</button></div>';
    }

    if (s.phase === 'vortrag') {
      var listeVor = '<ol class="sim-teilaufgaben">' +
        teile.map(function (ta, i) {
          return teilaufgabeHtml(ta, i, true, !!(s.aufgedeckt && s.aufgedeckt[i]));
        }).join('') + '</ol>';
      return kopf +
        '<div class="sim-leiste">' +
        '<span class="sim-phase">Teil 1 · Vortrag</span>' +
        '<span class="sim-gebiet sim-gebiet--' + esc(s.teil1Gebiet) + '">' +
        gebietLabel(s.teil1Gebiet) + '</span></div>' +
        timerHtml(s) +
        '<p class="sim-hinweis">Trage deine Lösung laut vor. Decke pro ' +
        'Teilaufgabe das Erwartungsbild zum Selbstabgleich auf.</p>' +
        '<div class="audio-box" id="audio-box"></div>' +
        listeVor +
        '<div class="aktionen"><button type="button" class="btn btn-primaer" ' +
        'id="btn-zu-gespraech">Weiter zum Prüfungsgespräch &rarr;</button></div>';
    }

    if (s.phase === 'gespraech') {
      var fragen = Array.isArray(s.gespraechFragen) ? s.gespraechFragen : [];
      if (fragen.length === 0) {
        return kopf +
          '<div class="sim-leiste">' +
          '<span class="sim-phase">Teil 2 · Gespräch</span>' +
          '<span class="sim-gebiet sim-gebiet--' + esc(s.teil2Gebiet) + '">' +
          gebietLabel(s.teil2Gebiet) + '</span></div>' +
          '<div class="hinweis">Für das Gebiet ' + gebietLabel(s.teil2Gebiet) +
          ' sind keine Gesprächsfragen hinterlegt.</div>' +
          '<div class="aktionen"><button type="button" class="btn btn-primaer" ' +
          'id="btn-zu-reflexion">Zur Auswertung &rarr;</button></div>';
      }
      var idx = Math.min(s.gespraechIndex || 0, fragen.length - 1);
      var frage = fragen[idx];
      var letzte = idx >= fragen.length - 1;
      var html = kopf +
        '<div class="sim-leiste">' +
        '<span class="sim-phase">Teil 2 · Gespräch</span>' +
        '<span class="sim-gebiet sim-gebiet--' + esc(s.teil2Gebiet) + '">' +
        gebietLabel(s.teil2Gebiet) + '</span></div>' +
        timerHtml(s) +
        '<div class="fortschritt"><span class="schritt-zahl">Frage ' +
        (idx + 1) + ' / ' + fragen.length + '</span></div>' +
        '<p class="frage">' + esc(frage.frage) + '</p>' +
        '<div class="audio-box" id="audio-box"></div>';
      if (s.aufgedeckt && s.aufgedeckt['g' + idx]) {
        var eb = Array.isArray(frage.erwartungsbild) ? frage.erwartungsbild : [];
        html += hilfeBox('Erwartungsbild (zum Selbstabgleich)',
          '<ul class="erwartung-liste">' +
          eb.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') +
          '</ul>');
        html += '<div class="aktionen"><button type="button" ' +
          'class="btn btn-primaer" id="btn-naechste-frage">' +
          (letzte ? 'Zur Auswertung &rarr;' : 'Nächste Frage &rarr;') +
          '</button></div>';
      } else {
        html += '<div class="aktionen"><button type="button" class="btn" ' +
          'id="btn-frage-aufdecken">Erwartungsbild aufdecken</button></div>';
      }
      return html;
    }

    if (s.phase === 'reflexion') {
      if (s.reflexionGespeichert) {
        return viewSimulatorAuswertung(s);
      }
      var chips = SIM_FEHLERTYPEN.map(function (f) {
        var gew = s.fehlertypen && s.fehlertypen[f.id] ? ' gewaehlt' : '';
        return '<button type="button" class="chip' + gew + '" ' +
          'data-sim-fehlertyp="' + esc(f.id) + '" aria-pressed="' +
          (gew ? 'true' : 'false') + '">' + esc(f.label) + '</button>';
      }).join('');
      return kopf +
        '<h2>Abschluss-Reflexion</h2>' +
        '<p class="sim-hinweis">Teil 1: ' + gebietLabel(s.teil1Gebiet) +
        ' · Teil 2: ' + gebietLabel(s.teil2Gebiet) + '</p>' +
        '<p>Wo hakte es? (Mehrfachauswahl möglich)</p>' +
        '<div class="reflexion-knoepfe">' + chips + '</div>' +
        '<p>Notiz: Was lief gut? Wo hakte es? (optional)</p>' +
        '<textarea class="sim-notiz" id="sim-notiz" rows="3" ' +
        'placeholder="Freitext …">' + esc(s.notiz || '') + '</textarea>' +
        '<div class="aktionen"><button type="button" class="btn btn-primaer" ' +
        'id="btn-reflexion-speichern">Auswertung anzeigen</button></div>';
    }

    // Unbekannte Phase -> zurück auf Intro (defensiv).
    return kopf +
      '<div class="aktionen"><button type="button" class="btn btn-primaer" ' +
      'id="btn-neu">Neue Prüfung ziehen</button></div>';
  }

  // Auswertungs-Ansicht nach gespeicherter Reflexion: Empfehlungen + Rücklinks.
  function viewSimulatorAuswertung(s) {
    var kopf = trainerKopf('#/start', 'Prüfungs-Simulator', null);
    var gewaehlte = SIM_FEHLERTYPEN.filter(function (f) {
      return s.fehlertypen && s.fehlertypen[f.id];
    });

    // Schwachpunkt-Gebiete: wurden Fehlertypen angekreuzt, empfehlen wir beide
    // geprüften Gebiete; sonst eine knappe Bestätigung. Pro Gebiet Rücklinks
    // auf Stufe 2/3 der zugehörigen Themen.
    var blockHtml = function (gebiet) {
      var themen = empfehlungsThemen(gebiet);
      if (themen.length === 0) return '';
      var zeilen = themen.map(function (t) {
        return '<li class="sim-empf-zeile"><span>' + esc(t.name) + '</span>' +
          '<span class="sim-empf-links">' +
          '<a href="#/thema/' + esc(t.key) + '/2">Rechnen (St. 2)</a>' +
          '<a href="#/thema/' + esc(t.key) + '/3">Erklären (St. 3)</a>' +
          '</span></li>';
      }).join('');
      return '<section class="sim-empf sim-empf--' + esc(gebiet) + '">' +
        '<h3>' + gebietLabel(gebiet) + '</h3>' +
        '<ul class="sim-empf-liste">' + zeilen + '</ul></section>';
    };

    var fehlerText = gewaehlte.length
      ? '<p>Notierte Schwachpunkte: ' +
        gewaehlte.map(function (f) { return esc(f.label); }).join(', ') + '.</p>'
      : '<p>Keine Schwachpunkte angekreuzt — gute Generalprobe!</p>';
    var notizText = s.notiz
      ? '<div class="hilfe-box"><h3>Deine Notiz</h3><p>' + esc(s.notiz) +
        '</p></div>'
      : '';

    return kopf +
      '<div role="status" class="rueckmeldung rueckmeldung--ok">Prüfung abgeschlossen. ' +
      'Reflexion gespeichert.</div>' +
      fehlerText + notizText +
      '<h2>Empfehlungen zum Weiterüben</h2>' +
      blockHtml(s.teil1Gebiet) +
      blockHtml(s.teil2Gebiet) +
      '<div class="aktionen">' +
      '<button type="button" class="btn btn-primaer" id="btn-neu">Neue ' +
      'Prüfung ziehen</button>' +
      '<a class="btn" href="#/start">Zur Übersicht</a>' +
      '</div>';
  }

  // Kleiner String-Hash (für deterministische Seeds).
  function hashStr(str) {
    var h = 2166136261;
    var s = String(str == null ? '' : str);
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    return h >>> 0;
  }

  // ---------------------------------------------------------------------------
  // Render-Steuerung
  // ---------------------------------------------------------------------------

  // Flash: einmalige Statusmeldung (z. B. Lade-Fehler) für den nächsten Render.
  var flashNachricht = null;
  var flashIstFehler = false;

  function setzeFlash(text, istFehler) {
    flashNachricht = text;
    flashIstFehler = !!istFehler;
  }

  function render() {
    var app = document.getElementById('app');
    if (!app) return;

    // Ohne Engine geht nichts — klare Fehlermeldung statt stillem Crash.
    if (!Engine) {
      app.innerHTML = '<div class="hinweis fehler">Engine konnte nicht ' +
        'geladen werden (engine.js).</div>';
      return;
    }

    var state = ladeState();
    var teile = parseHash();
    var view = teile[0] || 'start';
    var signatur = routenSignatur(teile);
    var html;

    // Timer-Lifecycle: verlässt man die Simulator-Route (oder wechselt die
    // konkrete Signatur), muss ein laufender Countdown gestoppt werden, BEVOR
    // die Sitzung ersetzt/genullt wird — sonst leakt das Interval.
    if (sitzung && sitzung.timerId != null &&
        (view !== 'simulator' || sitzung.signatur !== signatur)) {
      timerStop();
    }

    switch (view) {
      case 'thema':
        var key = teile[1];
        var stufe = teile[2] || '1';
        if (stufe === '2') html = viewStufe2(state, key, signatur);
        else if (stufe === '3') html = viewStufe3(state, key, signatur);
        else html = viewStufe1(state, key, signatur);
        break;
      case 'faellig':
        html = viewFaellig(state, signatur);
        break;
      case 'simulator':
        html = viewSimulator(state, signatur);
        break;
      case 'diagnose':
        html = viewDiagnose(state, signatur);
        break;
      case 'start':
      default:
        // Auf der Startseite gibt es keine laufende Sitzung.
        sitzung = null;
        html = viewStart(state);
        break;
    }

    // Vor dem DOM-Austausch eine evtl. laufende Aufnahme beenden: ihr Button
    // wird gleich ersetzt — sonst liefe der Recorder unsichtbar weiter und das
    // Mikrofon bliebe an, ohne Stopp-Möglichkeit.
    stoppeAktiveAufnahme();

    app.innerHTML = html;

    // Nach jedem Render: Event-Handler binden und Mathe rendern.
    bindeHandler(view, teile, state);
    rendereMathe(app);
  }

  // ---------------------------------------------------------------------------
  // Handler-Dispatch — bindet pro View die passenden Event-Handler.
  // ---------------------------------------------------------------------------
  function bindeHandler(view, teile, state) {
    switch (view) {
      case 'start':
        bindeStartHandler(state);
        break;
      case 'thema':
        var stufe = teile[2] || '1';
        if (stufe === '2') bindeStufe2(state, teile[1]);
        else if (stufe === '3') bindeStufe3(state, teile[1]);
        else bindeStufe1(state, teile[1]);
        break;
      case 'faellig':
        bindeFaellig(state);
        break;
      case 'simulator':
        bindeSimulator(state);
        break;
      case 'diagnose':
        bindeDiagnose(state);
        break;
      default:
        break;
    }
  }

  // Hilfsfunktion: einen Klick-Handler an ein Element-ID binden.
  function aufKlick(id, fn) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', fn);
  }
  // Alle Elemente mit Selektor durchgehen und Klick-Handler binden.
  function aufKlickAlle(selektor, fn) {
    var els = document.querySelectorAll(selektor);
    for (var i = 0; i < els.length; i++) {
      (function (el) { el.addEventListener('click', function (ev) { fn(el, ev); }); })(els[i]);
    }
  }

  // --- Stufe 1 ---
  function bindeStufe1(state, key) {
    if (!sitzung) return;
    aufKlickAlle('.pfeil-btn', function (el) {
      if (el.disabled) return;
      var pos = parseInt(el.getAttribute('data-pos'), 10);
      var richtung = el.getAttribute('data-richtung');
      var r = sitzung.reihenfolge;
      var ziel = richtung === 'rauf' ? pos - 1 : pos + 1;
      if (ziel < 0 || ziel >= r.length) return;
      var tmp = r[pos]; r[pos] = r[ziel]; r[ziel] = tmp;
      // Umsortieren setzt eine alte Prüfung VOLLSTÄNDIG zurück. Bliebe korrekt
      // auf true, verschwänden Prüfen-Button UND Weiter-Link gleichzeitig.
      sitzung.geprueft = false;
      sitzung.korrekt = false;
      render();
    });
    aufKlick('btn-pruefen', function () {
      sitzung.geprueft = true;
      sitzung.korrekt = reihenfolgeKorrekt(sitzung.reihenfolge);
      if (sitzung.korrekt) {
        if (!state.stufen) state.stufen = {};
        if (!state.stufen[key]) state.stufen[key] = {};
        state.stufen[key]['1'] = true;
        speichereState(state);
      }
      render();
    });
  }

  // --- Stufe 2 ---
  function bindeStufe2(state, key) {
    if (!sitzung) return;
    var items = rechnenSortiert(key);
    var item = items[sitzung.index];
    if (!item) return;

    function beantworte(korrekt, gewaehlt) {
      sitzung.beantwortet = true;
      sitzung.korrekt = korrekt;
      sitzung.gewaehlt = gewaehlt;
      render();
    }

    aufKlick('btn-pruefen', function () {
      var feld = document.getElementById('antwort');
      var korrekt = numerischKorrekt(feld ? feld.value : '', item.loesung, item.toleranz);
      beantworte(korrekt, null);
    });
    aufKlickAlle('.option-btn', function (el) {
      if (el.disabled) return;
      var i = parseInt(el.getAttribute('data-opt'), 10);
      beantworte(mcKorrekt(item, i), i);
    });
    aufKlick('btn-tipp', function () { sitzung.tippAuf = true; render(); });
    aufKlick('btn-weg', function () { sitzung.wegAuf = true; render(); });
    aufKlickAlle('.chip', function (el) {
      if (sitzung.reflexionGesetzt) return;
      var typ = el.getAttribute('data-fehlertyp');
      if (!state.reflexionen) state.reflexionen = [];
      var thema = themaVon(key);
      state.reflexionen.push({
        ts: Date.now(),
        itemId: item.id,
        fehlertyp: typ,
        gebiet: thema ? thema.gebiet : null
      });
      sitzung.reflexionGesetzt = true;
      speichereState(state);
      render();
    });
    aufKlick('btn-weiter', function () {
      if (sitzung.index >= items.length - 1) {
        sitzung.fertig = true;
        if (!state.stufen) state.stufen = {};
        if (!state.stufen[key]) state.stufen[key] = {};
        state.stufen[key]['2'] = true;
        speichereState(state);
      } else {
        sitzung.index += 1;
        sitzung.beantwortet = false;
        sitzung.korrekt = false;
        sitzung.gewaehlt = null;
        sitzung.tippAuf = false;
        sitzung.wegAuf = false;
        sitzung.reflexionGesetzt = false;
      }
      render();
    });
  }

  // --- Stufe 3 (erklaeren + SRS) ---
  function bindeStufe3(state, key) {
    bindeErklaerFlow(state, function () {
      if (!state.stufen) state.stufen = {};
      if (!state.stufen[key]) state.stufen[key] = {};
      state.stufen[key]['3'] = true;
    });
  }

  // --- Heute fällig ---
  function bindeFaellig(state) {
    bindeErklaerFlow(state, null);
  }

  // Gemeinsame Handler-Bindung für den Erklär-/SRS-Flow.
  // Iteriert über den in der Sitzung EINGEFRORENEN ID-Snapshot (sitzung.ids) —
  // nicht über eine live aus state.srs abgeleitete Liste (sonst Karten-Skip).
  function bindeErklaerFlow(state, onAbschluss) {
    if (!sitzung || !sitzung.ids || sitzung.ids.length === 0) return;
    var ids = sitzung.ids;
    var item = erklaerItemById(ids[sitzung.index]);
    if (!item) return;

    // Audio-Control an den Container binden (robust, optional).
    var box = document.getElementById('audio-box');
    if (box) aufnahmeControl(box);

    aufKlick('btn-aufdecken', function () {
      sitzung.aufgedeckt = true;
      render();
    });

    aufKlickAlle('.bewertung [data-bewertung]', function (el) {
      var bewertung = el.getAttribute('data-bewertung');
      naechsteSrsKarte(state, item.id, bewertung, heuteTag());
      if (sitzung.index >= ids.length - 1) {
        sitzung.fertig = true;
        if (typeof onAbschluss === 'function') onAbschluss();
      } else {
        sitzung.index += 1;
        sitzung.aufgedeckt = false;
      }
      speichereState(state);
      render();
    });
  }

  // --- Diagnose ---
  function bindeDiagnose(state) {
    if (!sitzung) return;
    var fragen = baueDiagnoseFragen();
    var f = fragen[sitzung.index];
    if (!f) return;
    var item = f.item;

    function naechste(sicher) {
      var th = f.thema || {};
      sitzung.ergebnisse.push({ key: th.key || '', name: th.name || 'Thema', sicher: sicher });
      if (sitzung.index >= fragen.length - 1) {
        sitzung.fertig = true;
        state.diagnoseGemacht = true;
        speichereState(state);
      } else {
        sitzung.index += 1;
        sitzung.aufgedeckt = false;
        sitzung.gewaehlt = null;
        sitzung.korrekt = false;
      }
      render();
    }

    // rechnen
    aufKlick('btn-pruefen', function () {
      var feld = document.getElementById('antwort');
      sitzung.korrekt = numerischKorrekt(feld ? feld.value : '', item.loesung, item.toleranz);
      sitzung.gewaehlt = -1; // markiert "beantwortet"
      render();
    });
    aufKlickAlle('.option-btn', function (el) {
      if (el.disabled) return;
      var i = parseInt(el.getAttribute('data-opt'), 10);
      sitzung.gewaehlt = i;
      sitzung.korrekt = mcKorrekt(item, i);
      render();
    });
    aufKlick('btn-weiter', function () { naechste(!!sitzung.korrekt); });

    // erklaeren
    aufKlick('btn-aufdecken', function () { sitzung.aufgedeckt = true; render(); });
    aufKlickAlle('[data-diag]', function (el) {
      naechste(el.getAttribute('data-diag') === 'sicher');
    });
  }

  // --- Prüfungs-Simulator (Phase 8) ---

  // In eine Phase mit Countdown wechseln: Timer stoppen, Phase + Restzeit
  // setzen (pausiert), aufgedeckt-Zustand zurücksetzen, dann rendern.
  function simWechsel(phase, sekunden) {
    timerStop();
    sitzung.phase = phase;
    sitzung.rest = sekunden;
    sitzung.laeuft = false;
    sitzung.aufgedeckt = {};
    render();
  }

  function bindeSimulator(state) {
    if (!sitzung) return;
    var s = sitzung;

    // Intro: Prüfung ziehen.
    aufKlick('btn-ziehen', function () {
      var gezogen = simulatorZiehen(Math.random());
      s.teil1Gebiet = gezogen.teil1Gebiet;
      s.teil2Gebiet = gezogen.teil2Gebiet;
      s.vortragsAufgabe = gezogen.vortragsAufgabe;
      s.gespraechFragen = gezogen.gespraechFragen;
      s.gespraechIndex = 0;
      s.fehlertypen = {};
      s.notiz = '';
      s.reflexionGespeichert = false;
      simWechsel('vorbereitung', SIM_VORBEREITUNG_SEK);
    });

    // „Neue Prüfung ziehen" (aus Auswertung / Fehlerzustand) -> zurück zu Intro.
    aufKlick('btn-neu', function () {
      timerStop();
      sitzung = { phase: 'intro', signatur: s.signatur };
      render();
    });

    // Start/Pause des aktuellen Countdowns.
    aufKlick('btn-timer', function () {
      if (s.rest <= 0) return;
      if (s.laeuft) { s.laeuft = false; timerStop(); }
      else { timerStart(); }
      render();
    });

    // Phasenübergänge.
    aufKlick('btn-zu-vortrag', function () {
      simWechsel('vortrag', SIM_VORTRAG_SEK);
    });
    aufKlick('btn-zu-gespraech', function () {
      s.gespraechIndex = 0;
      simWechsel('gespraech', SIM_GESPRAECH_SEK);
    });
    aufKlick('btn-zu-reflexion', function () {
      timerStop();
      s.phase = 'reflexion';
      s.laeuft = false;
      render();
    });

    // Vortrag: Erwartungsbild pro Teilaufgabe aufdecken.
    aufKlickAlle('[data-aufdecken]', function (el) {
      var i = parseInt(el.getAttribute('data-aufdecken'), 10);
      if (!s.aufgedeckt) s.aufgedeckt = {};
      s.aufgedeckt[i] = true;
      render();
    });

    // Vortrag + Gespräch: Audio-Aufnahme an den Container binden.
    var box = document.getElementById('audio-box');
    if (box) aufnahmeControl(box);

    // Gespräch: Frage aufdecken / nächste Frage.
    aufKlick('btn-frage-aufdecken', function () {
      var idx = Math.min(s.gespraechIndex || 0,
        (s.gespraechFragen || []).length - 1);
      if (!s.aufgedeckt) s.aufgedeckt = {};
      s.aufgedeckt['g' + idx] = true;
      render();
    });
    aufKlick('btn-naechste-frage', function () {
      var fragen = s.gespraechFragen || [];
      if ((s.gespraechIndex || 0) >= fragen.length - 1) {
        timerStop();
        s.phase = 'reflexion';
        s.laeuft = false;
      } else {
        s.gespraechIndex = (s.gespraechIndex || 0) + 1;
      }
      render();
    });

    // Reflexion: Fehlertyp-Chips (toggle), Notiz, speichern.
    aufKlickAlle('[data-sim-fehlertyp]', function (el) {
      var id = el.getAttribute('data-sim-fehlertyp');
      if (!s.fehlertypen) s.fehlertypen = {};
      s.fehlertypen[id] = !s.fehlertypen[id];
      render();
    });
    aufKlick('btn-reflexion-speichern', function () {
      var feld = document.getElementById('sim-notiz');
      s.notiz = feld ? String(feld.value || '').trim() : '';
      var typen = SIM_FEHLERTYPEN
        .filter(function (f) { return s.fehlertypen && s.fehlertypen[f.id]; })
        .map(function (f) { return f.id; });
      if (!state.reflexionen) state.reflexionen = [];
      state.reflexionen.push({
        ts: Date.now(),
        art: 'simulator',
        teil1Gebiet: s.teil1Gebiet,
        teil2Gebiet: s.teil2Gebiet,
        fehlertypen: typen,
        notiz: s.notiz
      });
      speichereState(state);
      s.reflexionGespeichert = true;
      render();
    });
  }

  // ---------------------------------------------------------------------------
  // Audio-Aufnahme (Phase 7) — wiederverwendbar, robust, optional.
  // Bindet Aufnahme-Steuerung an einen Container. Nimmt NICHT persistierend auf;
  // erzeugt nach Stopp ein <audio>-Element zum Zurückhören. Bei fehlendem
  // API / abgelehnter Erlaubnis: deaktivierter Knopf + dezenter Hinweis.
  // ---------------------------------------------------------------------------
  // Aktive Aufnahme (Stream + Recorder) modulweit merken: Ein Re-Render ersetzt
  // den Aufnahme-Container im DOM — ohne diesen Merker liefe der Recorder
  // unsichtbar weiter und das Mikrofon bliebe bis zum Reload an.
  var aktiveAufnahme = null;

  function stoppeAktiveAufnahme() {
    if (!aktiveAufnahme) return;
    var a = aktiveAufnahme;
    aktiveAufnahme = null;
    try {
      if (a.recorder && a.recorder.state !== 'inactive') a.recorder.stop();
    } catch (e) { /* egal */ }
    try {
      if (a.stream) a.stream.getTracks().forEach(function (t) { t.stop(); });
    } catch (e) { /* egal */ }
  }

  function aufnahmeControl(containerEl) {
    if (!containerEl) return;
    // Doppelte Initialisierung vermeiden (Re-Render bindet erneut).
    if (containerEl.getAttribute('data-audio-init') === '1') return;
    containerEl.setAttribute('data-audio-init', '1');

    var unterstuetzt = !!(navigator && navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function' &&
      typeof window.MediaRecorder === 'function');

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn';
    btn.textContent = '● Aufnahme starten';

    var hinweis = document.createElement('p');
    hinweis.className = 'audio-hinweis';

    containerEl.appendChild(btn);
    containerEl.appendChild(hinweis);

    if (!unterstuetzt) {
      btn.disabled = true;
      btn.textContent = '● Aufnahme';
      hinweis.textContent = 'Audio-Aufnahme wird hier nicht unterstützt — ' +
        'die App funktioniert ohne.';
      return;
    }

    hinweis.textContent = 'Optional: Nimm deine Erklärung auf und höre sie ' +
      'dir an (wird nicht gespeichert).';

    var recorder = null;
    var stream = null;
    var chunks = [];
    var laeuft = false;

    function aufraeumen() {
      // Globalen Merker nur löschen, wenn er noch auf DIESE Aufnahme zeigt
      // (inzwischen könnte ein neues Control eine neue Aufnahme halten).
      if (aktiveAufnahme && aktiveAufnahme.stream === stream) aktiveAufnahme = null;
      try {
        if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
      } catch (e) { /* egal */ }
      stream = null;
      recorder = null;
    }

    btn.addEventListener('click', function () {
      if (laeuft) {
        // Stoppen
        try { if (recorder && recorder.state !== 'inactive') recorder.stop(); }
        catch (e) { aufraeumen(); laeuft = false; }
        return;
      }
      // Starten
      btn.disabled = true;
      hinweis.textContent = 'Frage Mikrofon-Erlaubnis an …';
      var p;
      try {
        p = navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (e) {
        p = Promise.reject(e);
      }
      Promise.resolve(p).then(function (s) {
        stream = s;
        chunks = [];
        try {
          recorder = new window.MediaRecorder(stream);
        } catch (e) {
          // z. B. nicht unterstützter MIME-Typ
          aufraeumen();
          btn.disabled = false;
          hinweis.textContent = 'Aufnahme konnte nicht gestartet werden.';
          return;
        }
        recorder.ondataavailable = function (ev) {
          if (ev.data && ev.data.size > 0) chunks.push(ev.data);
        };
        recorder.onstop = function () {
          laeuft = false;
          btn.classList.remove('aufnahme-laeuft');
          btn.textContent = '● Aufnahme starten';
          btn.disabled = false;
          // Container kann durch ein Re-Render bereits ersetzt sein — dann gibt
          // es nichts mehr anzuzeigen, nur noch Mikro/Stream freigeben.
          if (!document.contains(containerEl)) { aufraeumen(); return; }
          try {
            var blob = new Blob(chunks, { type: recorder && recorder.mimeType ? recorder.mimeType : 'audio/webm' });
            var url = URL.createObjectURL(blob);
            // altes Audio entfernen
            var alt = containerEl.querySelector('audio');
            if (alt) {
              if (alt.src) { try { URL.revokeObjectURL(alt.src); } catch (e) {} }
              alt.remove();
            }
            var audio = document.createElement('audio');
            audio.controls = true;
            audio.src = url;
            containerEl.appendChild(audio);
            hinweis.textContent = 'Aufnahme bereit zum Anhören.';
          } catch (e) {
            hinweis.textContent = 'Wiedergabe konnte nicht erstellt werden.';
          }
          aufraeumen();
        };
        recorder.start();
        aktiveAufnahme = { recorder: recorder, stream: stream };
        laeuft = true;
        btn.disabled = false;
        btn.classList.add('aufnahme-laeuft');
        btn.textContent = '■ Aufnahme stoppen';
        hinweis.textContent = 'Aufnahme läuft …';
      }).catch(function () {
        aufraeumen();
        laeuft = false;
        btn.disabled = false;
        btn.textContent = '● Aufnahme starten';
        hinweis.textContent = 'Kein Mikrofon-Zugriff — die App läuft normal ' +
          'weiter.';
      });
    });
  }

  // Handler für die Sichern/Laden-Buttons (nur auf dem Startbildschirm vorhanden).
  function bindeStartHandler(state) {
    var btnSichern = document.getElementById('btn-sichern');
    if (btnSichern) {
      btnSichern.addEventListener('click', function () {
        sichereDatei(state);
      });
    }

    var btnLaden = document.getElementById('btn-laden');
    var input = document.getElementById('datei-laden');
    if (btnLaden && input) {
      btnLaden.addEventListener('click', function () {
        input.value = ''; // erneutes Laden derselben Datei ermöglichen
        input.click();
      });
      input.addEventListener('change', function () {
        var datei = input.files && input.files[0];
        if (datei) ladeAusDatei(datei);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // Sichern / Laden als Datei
  // ---------------------------------------------------------------------------

  function sichereDatei(state) {
    try {
      var json = Engine.serialisiere(state);
      var blob = new Blob([json], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'muendlich-abi-fortschritt.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // URL nach kurzer Zeit freigeben.
      setTimeout(function () { URL.revokeObjectURL(url); }, 0);
    } catch (e) {
      setzeFlash('Sichern fehlgeschlagen.', true);
      render();
    }
  }

  function ladeAusDatei(datei) {
    var reader = new FileReader();
    reader.onload = function () {
      var text = String(reader.result || '');
      // deserialisiere() fängt kaputtes JSON ab -> NEUER_STATE.
      // Um echte Fehler zu erkennen, prüfen wir JSON.parse separat.
      var gueltig = true;
      try { JSON.parse(text); } catch (e) { gueltig = false; }

      if (!gueltig) {
        setzeFlash('Datei konnte nicht gelesen werden (kein gültiges JSON).', true);
        render();
        return;
      }

      var neu = Engine.deserialisiere(text);
      speichereState(neu);
      setzeFlash('Fortschritt geladen.', false);
      // Auf den Startbildschirm zurück (zeigt geladenen Stand).
      if ((window.location.hash || '') !== '#/start') {
        navigiere('#/start'); // löst onhashchange -> render() aus
      } else {
        render();
      }
    };
    reader.onerror = function () {
      setzeFlash('Datei konnte nicht gelesen werden.', true);
      render();
    };
    reader.readAsText(datei);
  }

  // ---------------------------------------------------------------------------
  // Test-Hook — exponiert die reinen Logik-Bausteine + ausgewählte View-Builder
  // für node:test (siehe tests/ui.dom.test.js). Im Browser harmlos: nur ein
  // zusätzliches Property an window, keine Verhaltensänderung.
  // ---------------------------------------------------------------------------
  window.__uiTest = {
    mischeIndizes: mischeIndizes,
    reihenfolgeKorrekt: reihenfolgeKorrekt,
    parseZahl: parseZahl,
    numerischKorrekt: numerischKorrekt,
    mcKorrekt: mcKorrekt,
    naechsteSrsKarte: naechsteSrsKarte,
    faelligeErklaerItems: faelligeErklaerItems,
    baueDiagnoseFragen: baueDiagnoseFragen,
    rechnenSortiert: rechnenSortiert,
    hashStr: hashStr,
    // Simulator (Phase 8) — reine Logik:
    formatZeit: formatZeit,
    simulatorZiehen: simulatorZiehen,
    empfehlungsThemen: empfehlungsThemen,
    themenKeysFuerGebiet: themenKeysFuerGebiet,
    waehleGespraechFragen: waehleGespraechFragen,
    // View-Builder liefern reines HTML (kein DOM nötig); Smoke-Test prüft,
    // dass sie ohne Wurf einen String liefern.
    viewStufe1: viewStufe1,
    viewStufe2: viewStufe2,
    viewStufe3: viewStufe3,
    viewFaellig: viewFaellig,
    viewDiagnose: viewDiagnose,
    viewSimulator: viewSimulator,
    // Sitzung muss zwischen View-Aufrufen zurückgesetzt werden können.
    sitzungReset: function () { sitzung = null; }
  };

  // ---------------------------------------------------------------------------
  // Bootstrap
  // ---------------------------------------------------------------------------

  window.addEventListener('hashchange', render);

  function start() {
    // Default-Route setzen, wenn kein/leerer Hash (löst dann onhashchange aus,
    // sonst direkt rendern).
    if (!window.location.hash) {
      window.location.replace('#/start');
    }
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
