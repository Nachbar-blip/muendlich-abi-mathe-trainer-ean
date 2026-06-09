/* Browser-Verifikation (Playwright/Chromium) ueber einen lokalen HTTP-Server —
   so, wie die App gehostet laeuft (Netlify/GH): mit funktionierendem localStorage.
   Testet KaTeX-Render, Events, Timer, Persistenz und den Fällig-Flow (C1-Regression).
   Aufruf: node tools/browser_verify.js
   (Hinweis: file://-Laden + lokales KaTeX wurde separat geprueft; headless-Chromium
    blockt localStorage auf file://, daher hier HTTP = naeher am Deployment.) */
const { chromium } = require('playwright');
const http = require('http');
const path = require('path');
const fs = require('fs');

const APP_DIR = path.join(__dirname, '..', 'app');
const SHOTS = path.join(__dirname, '_qa_shots');
fs.mkdirSync(SHOTS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
  '.json': 'application/json', '.png': 'image/png',
};

const fehler = [];
const schritte = [];
function ok(s) { schritte.push('OK   ' + s); }
function bad(s) { schritte.push('FAIL ' + s); fehler.push(s); }

function starteServer() {
  const server = http.createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]);
    if (rel === '/' || rel === '') rel = '/index.html';
    const fp = path.join(APP_DIR, rel);
    if (!fp.startsWith(APP_DIR)) { res.statusCode = 403; res.end('forbidden'); return; }
    fs.readFile(fp, (e, data) => {
      if (e) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(fp)] || 'application/octet-stream');
      res.end(data);
    });
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

(async () => {
  const server = await starteServer();
  const BASE = 'http://127.0.0.1:' + server.address().port + '/index.html';
  const geh = async (page, hash) => {
    await page.goto(BASE + hash, { waitUntil: 'load' });
    await page.waitForTimeout(350);
  };

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const konsole = [];
  page.on('console', (m) => { if (m.type() === 'error') konsole.push(m.text()); });
  page.on('pageerror', (e) => konsole.push('PAGEERROR ' + e.message));

  try {
    // --- Start ---
    await geh(page, '#/start');
    const bodyStart = await page.textContent('body');
    if (/Analysis/.test(bodyStart) && /Geometrie/.test(bodyStart)) ok('Start: beide Gebiete sichtbar');
    else bad('Start: Gebiete fehlen');
    if (/Heute f.llig/.test(bodyStart)) ok('Start: Faellig-Button da'); else bad('Start: Faellig-Button fehlt');
    const themaLinks = await page.locator('a.thema').count();
    if (themaLinks === 13) ok('Start: 13 Themen verlinkt'); else bad('Start: ' + themaLinks + ' Themen (erwartet 13)');
    await page.screenshot({ path: path.join(SHOTS, '01-start.png'), fullPage: true });

    // --- Stufe 2 (Rechnen) ---
    await geh(page, '#/thema/ana-eigenschaften/2');
    const katexN = await page.locator('.katex').count();
    if (katexN > 0) ok('Stufe2: KaTeX gerendert (' + katexN + ' Formeln)'); else bad('Stufe2: keine KaTeX-Formeln');
    if (!(await page.textContent('body')).includes('\\(')) ok('Stufe2: kein roher LaTeX-Code'); else bad('Stufe2: roher \\( sichtbar');
    await page.screenshot({ path: path.join(SHOTS, '02-stufe2.png'), fullPage: true });

    // --- Stufe 1 (Verfahren) ---
    await geh(page, '#/thema/ana-extrema-wende/1');
    if (/Schritt|Reihenfolge|Verfahren|oben|unten|Pr.fen/i.test(await page.textContent('body'))) ok('Stufe1: Verfahrens-View da'); else bad('Stufe1: View unklar');
    await page.screenshot({ path: path.join(SHOTS, '03-stufe1.png'), fullPage: true });

    // --- Stufe 3 (Erklaeren) + aufdecken ---
    await geh(page, '#/thema/geo-ebene/3');
    const aufdecken = page.locator('button:has-text("aufdecken"), button:has-text("Aufdecken")').first();
    if (await aufdecken.count()) {
      await aufdecken.click(); await page.waitForTimeout(200);
      const bewBtn = await page.locator('[data-bewertung]').count();
      if (bewBtn >= 2) ok('Stufe3: Erwartungsbild aufgedeckt + Bewertungsknoepfe'); else bad('Stufe3: Bewertungsknoepfe fehlen');
      await page.screenshot({ path: path.join(SHOTS, '04-stufe3.png'), fullPage: true });
      // Eine Bewertung abgeben -> erzeugt eine SRS-Karte (Persistenztest danach).
      const ersteBew = page.locator('[data-bewertung]').first();
      if (await ersteBew.count()) { await ersteBew.click(); await page.waitForTimeout(150); }
    } else { bad('Stufe3: Aufdecken-Button fehlt'); await page.screenshot({ path: path.join(SHOTS, '04-stufe3.png'), fullPage: true }); }

    // --- Persistenz: Stufe-3-Bewertung legt SRS-Karte an (localStorage) ---
    const srsNach = await page.evaluate(() => {
      const raw = localStorage.getItem('muendlich-abi-v1');
      if (!raw) return -1;
      try { return Object.keys(JSON.parse(raw).srs || {}).length; } catch (e) { return -2; }
    });
    if (srsNach >= 1) ok('Persistenz: SRS-Karte in localStorage (' + srsNach + ')'); else bad('Persistenz: keine SRS-Karte gespeichert (' + srsNach + ')');

    // --- Simulator: ziehen -> Vorbereitung ---
    await geh(page, '#/simulator');
    const zieh = page.locator('button:has-text("ziehen"), button:has-text("Pr.fung ziehen")').first();
    if (await zieh.count()) {
      await zieh.click(); await page.waitForTimeout(300);
      const bv = await page.textContent('body');
      if (/20:00/.test(bv)) ok('Sim: 20:00-Vorbereitungstimer'); else bad('Sim: 20:00 fehlt');
      const aufdeckKnoepfe = await page.locator('button:has-text("aufdecken"), button:has-text("Aufdecken")').count();
      if (aufdeckKnoepfe === 0) ok('Sim: kein Aufdecken-Knopf in Vorbereitung (Didaktik-Regel)'); else bad('Sim: ' + aufdeckKnoepfe + ' Aufdecken-Knopf in Vorbereitung');
      await page.screenshot({ path: path.join(SHOTS, '05-sim-vorbereitung.png'), fullPage: true });
      const startBtn = page.locator('button:has-text("Start")').first();
      if (await startBtn.count()) {
        await startBtn.click(); await page.waitForTimeout(2200);
        const uhr = (await page.locator('.sim-uhr').first().textContent() || '').trim();
        if (uhr !== '20:00' && /19:5/.test(uhr)) ok('Sim: Countdown laeuft (' + uhr + ')'); else bad('Sim: Countdown unklar (' + uhr + ')');
      } else bad('Sim: Start-Button fehlt');
    } else bad('Sim: Ziehen-Button fehlt');

    // --- Diagnose ---
    await geh(page, '#/diagnose');
    if (/Diagnose|Frage|berspringen|Abbrechen/i.test(await page.textContent('body'))) ok('Diagnose: View da'); else bad('Diagnose: View unklar');
    await page.screenshot({ path: path.join(SHOTS, '06-diagnose.png'), fullPage: true });

    // --- Heute fällig: C1-Regression (3 faellige Karten, keine darf uebersprungen werden) ---
    await geh(page, '#/start');
    const erkIds = await page.evaluate(() => (window.CONTENT.erklaeren || []).slice(0, 3).map((i) => i.id));
    if (erkIds.length === 3) {
      // Seed via evaluate (Origin etabliert) + Navigation; localStorage bleibt
      // ueber gleiche Origin erhalten. (addInitScript laeuft zu frueh fuer localStorage.)
      await page.evaluate((ids) => {
        const seed = { schemaVersion: 1, srs: {}, stufen: {}, reflexionen: [], diagnoseGemacht: false };
        ids.forEach((id) => { seed.srs[id] = { intervall: 1, ef: 2.5, wiederholungen: 1, faelligTag: 0 }; });
        localStorage.setItem('muendlich-abi-v1', JSON.stringify(seed));
      }, erkIds);
      await geh(page, '#/faellig');
      const gesehen = new Set();
      for (let i = 0; i < 5; i++) {
        const fr = page.locator('.frage').first();
        if (!(await fr.count())) break;
        const txt = ((await fr.textContent()) || '').trim();
        if (txt) gesehen.add(txt);
        const auf = page.locator('#btn-aufdecken');
        if (!(await auf.count())) break;
        await auf.click(); await page.waitForTimeout(120);
        const gut = page.locator('[data-bewertung="gut"]').first();
        if (!(await gut.count())) break;
        await gut.click(); await page.waitForTimeout(150);
      }
      if (gesehen.size === 3) ok('Faellig: alle 3 Karten gezeigt (C1-Regression, kein Skip)');
      else bad('Faellig: nur ' + gesehen.size + ' verschiedene Karten (erwartet 3 — C1!)');
      if (/wiederholt|Stark/i.test(await page.textContent('body'))) ok('Faellig: Abschluss erreicht'); else bad('Faellig: kein Abschluss');
    } else bad('Faellig: konnte keine 3 erklaeren-IDs lesen');

  } catch (e) {
    bad('EXCEPTION ' + e.message);
  } finally {
    await browser.close();
    server.close();
  }

  console.log('=== SCHRITTE ===');
  schritte.forEach((s) => console.log(s));
  console.log('=== KONSOLEN-/SEITENFEHLER (' + konsole.length + ') ===');
  konsole.slice(0, 20).forEach((s) => console.log('  ' + s));
  console.log('=== ERGEBNIS ===');
  console.log(fehler.length === 0 && konsole.length === 0 ? 'ALLES GRUEN' : ('PROBLEME: ' + fehler.length + ' Schritt-Fails, ' + konsole.length + ' Konsolenfehler'));
  process.exit(fehler.length === 0 && konsole.length === 0 ? 0 : 1);
})();
