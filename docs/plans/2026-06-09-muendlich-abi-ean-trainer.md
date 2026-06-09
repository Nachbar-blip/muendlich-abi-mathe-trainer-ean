# EAN-Trainer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Inhalts-Erzeugung läuft als **Workflow-Agentenschwarm** (`tools/wf_inhalt.js`).

**Goal:** Ein Klon des GAN-Trainers auf **erhöhtem Anforderungsniveau (EAN)** — gleiche App/Engine/Tests, neuer EAN-Inhalt und EAN-Scope-Guard, veröffentlicht als neues öffentliches GitHub-Repo mit QR-Docx.

**Architecture:** Statische Single-Page-App (`app/`: engine.js + content.js + ui.js + styles.css + vendored KaTeX). Inhalt wird per Workflow-Pipeline (Autor → Verify mit sympy + Wolfram) erzeugt, mit `tools/merge_content.py` in `app/content.js` gemerged und durch pytest/node:test/Playwright abgesichert. Quell-of-truth des Scopes: `scope_verbote.json` == `engine.js::SCOPE_VERBOTE` (Test erzwingt Gleichheit).

**Tech Stack:** Vanilla JS (klassische Skripte), KaTeX (lokal), Python (sympy, python-docx, qrcode), pytest, node:test, Playwright, GitHub Pages Action.

**Quellprojekt (klonen):** `C:\DevProjects\schule\zzz_TOP\mündlich ABI\` (GAN). **Zielordner:** `C:\DevProjects\schule\zzz_TOP\muendlich-abi-mathe-trainer-ean\` (bereits git-init, Design-Doc committet).

---

## EAN-Scope (verbindlich, „Musterarbeiten-treu")

**REIN:** ganzrationale Funktionen (Grad ≤ 4) + Vektorgeometrie R³, **plus** EAN-Technik:
Funktionen-/Ebenenscharen `fₖ`/`Eₖ`, Rotationsvolumen `π∫f(x)²dx`, Wende mit `f'''`, Nullstellen per
Substitution, Rekonstruktion (LGS), Fläche Tangente–Graph, Lagebeziehung & Schnittgerade zweier
Ebenen, Lage Gerade–Ebene, Winkel Ebene–Ebene/Achsenebene, HESSEsche Normalform & Abstand Gerade–Ebene.

**RAUS (Guard bannt):** `e^x`, `ln`, Ketten-/Quotientenregel, **windschiefe** Geraden, Stochastik,
Originalaufgaben (Jaccard ≥ 0.6 gegen die 2 EAN-Prüfungen).

**Scope-Delta ggü. GAN:** entfernt `[a-z]_[a-z]\(`, `[a-z]_\{[a-z]\}`, `Hessesch`, `\bHNF\b`;
behält `e\^`, `\\ln`, `ln(`, `Kettenregel`, `Quotientenregel`, `windschief` + 5× Stochastik.

## Themen (13) — verbindliche Keys & Reihenfolge (TOPIC_ORDER)

**Analysis (7):** `ana-eigenschaften`, `ana-nullstellen`, `ana-extrema-wende`, `ana-ableitung-graph`,
`ana-rekonstruktion`, `ana-integral`, `ana-scharen`
**Geometrie (6):** `geo-vektoren-geraden`, `geo-ebene`, `geo-lage-ebenen`, `geo-lage-gerade-ebene`,
`geo-winkel`, `geo-abstand-hnf`

Pro Thema: 1 `verfahren`, 5–6 `rechnen` (level 1–4, numerisch/mc, jedes mit sympy-`check`), 3–4
`erklaeren`. **Simulator:** 2 Aufgaben je Gebiet (`sim-ana-1/2`, `sim-geo-1/2`), je ≥4 Teilaufgaben.

---

## Phase A — Scaffold (deterministisch)

### Task A1: App-Skelett & Harness aus GAN klonen
**Files (kopieren GAN → EAN, unverändert):** `app/ui.js`, `app/styles.css`, `app/vendor/katex/**`,
`tools/extract_exams.py`, `tools/check_math.py`, `tools/load_content.py`, `tools/browser_verify.js`,
`tests/engine.*.test.js`, `tests/ui.*.test.js`, `tests/test_math.py`, `.github/workflows/pages.yml`,
`netlify.toml`, `requirements.txt`, `.gitignore`, `.gitattributes`.
- Schritt: per PowerShell `Copy-Item` rekursiv; node_modules/.git/*.docx NICHT kopieren.
- Verify: `Test-Path app/vendor/katex/katex.min.js` → True.

### Task A2: EAN-Scope setzen (`scope_verbote.json` + `engine.js`)
- Create `scope_verbote.json` mit der EAN-Verbotsliste (11 Muster, s.o.).
- Copy `app/engine.js`, dann `SCOPE_VERBOTE`-Array auf dieselben 11 Muster ändern (string-identisch),
  Kommentare „GK"→„EAN".
- Verify (nach Phase A vollständig): `python -m pytest tests/test_content.py::test_verbotsliste_sync -q` → PASS.

### Task A3: `content.js`-Skelett (13 Themen, leere Item-Arrays)
- Create `app/content.js`: `const CONTENT = { version:1, themen:[…13…], verfahren:[], rechnen:[],
  erklaeren:[], simulator:[] }; window.CONTENT = CONTENT;`
- Verify: `python tools/load_content.py` → `1 13`.

### Task A4: Tests an EAN anpassen
- `tests/test_content.py`: `test_laedt` Assertion `== 10` → `== 13`.
- `tests/engine.scope.test.js`: GAN-Fälle umdrehen — Scharen (`f_a(`)/HNF/Hessesch dürfen jetzt **nicht**
  mehr als Verstoß gelten; `e^x`, `ln(`, `windschief`, Stochastik weiterhin als Verstoß. (Datei lesen,
  betroffene `assert`/Erwartungen flippen.)
- Verify: `node --test tests/engine.scope.test.js` → PASS; `pytest tests/test_content.py -q` → PASS (leerer Inhalt = vacuously grün).

### Task A5: Branding
- `app/index.html`: `<title>` + Header → „Mündlich-Abi Mathe — EAN".
- `package.json`: neu, `"name": "muendlich-abi-trainer-ean"`, scripts/devDeps wie GAN.
- `README.md`: EAN-Fassung (Niveau EAN; Scope-Hinweis: kein e^x/ln, keine windschiefen Geraden, keine Stochastik).
- `app/ui.js`: nach „GAN"/„grundlegend" greppen und ggf. auf EAN umtexten (nur Anzeigetexte).

### Task A6: EAN-Originale für Kein-Original-Test bereitstellen
- Copy `EAN/mdl. Prüfung EAN 2017.docx` und `…2021.docx` → EAN-Repo-Root (gitignored via `*.docx`).
- Verify: `python -c "from tools.extract_exams import extract; import glob; print(len(glob.glob('*.docx')))"` → 2.

### Task A7: Commit Scaffold
- `git add -A && git commit -m "feat: EAN-Scaffold (App-Klon, EAN-Scope, leeres content-Skelett)"`.
- Volle Suite (leerer Inhalt): `pytest -q` PASS, `node --test tests/*.test.js` PASS.

## Phase B — Inhalts-Workflow auf EAN adaptieren

### Task B1: `tools/wf_inhalt.js` (EAN)
- Copy aus GAN, dann ändern:
  - `SPEC`: EAN-Scope-Block (ganzrational + erlaubte EAN-Technik **explizit** erlauben: Scharen,
    Rotationsvolumen, f''', Substitution, HNF, Lagebeziehung/Schnittgerade Ebenen, Winkel; VERBOTEN
    e^x/ln/Kettenregel/Quotientenregel/windschief/Stochastik). check-Hinweise unverändert.
  - `TOPICS`: die 13 EAN-Themen mit präzisem `fokus` je Thema (s. Themenliste).
  - `SIMS`: 4 Aufgaben (2 Analysis EAN-Stil inkl. Schar/Rotationsvolumen, 2 Geometrie EAN-Stil inkl.
    Lagebeziehung Ebenen/Winkel/HNF).
- Schemas (FRAGMENT/VERIFY/SIM) unverändert übernehmen.

### Task B2: `tools/merge_content.py` (EAN)
- `TOPIC_ORDER` = die 13 EAN-Keys (exakt Reihenfolge wie `wf_inhalt.js` TOPICS).
- `ERWARTET_PATCH` = {} (leer starten; nach Verify nur falls mc-Item ohne loesung einen
  `check.erwartet` braucht — dann gezielt nachtragen).

## Phase C — Agentenschwarm (Workflow)

### Task C1: Workflow ausführen
- `Workflow({ scriptPath: "…/muendlich-abi-mathe-trainer-ean/tools/wf_inhalt.js" })` (Hintergrund).
- Pipeline pro Thema: **Autor** (Items + sympy-Selbstcheck) → **Verify** (unabhängig sympy + Wolfram-
  Konnektor + Frage↔Lösung + Scope + Kein-Original, repariert/entfernt). Plus SIMS-Pipeline.
- Bei Completion: Rückgabe `{themen:[…], simulator:[…]}` als JSON `{ "result": … }` nach
  `wf_out.json` schreiben.

## Phase D — Assemblieren & absichern

### Task D1: Merge
- `python tools/merge_content.py wf_out.json` → schreibt `app/content.js` + `tests/wolfram_log.md`.
- Verify: Ausgabe „MERGE OK" mit plausiblen Zahlen (rechnen ~70, erklaeren ~45, verfahren ~13, simulator 4).

### Task D2: Volle Verifikation (Definition of Done)
- `pytest -q` → PASS (Schema, **Scope-Guard**, **Kein-Original** gegen EAN-Docx, **sympy-Recompute** aller checks, AFB, IDs eindeutig).
- `node --test tests/*.test.js` → PASS.
- `node tools/browser_verify.js` (Playwright) → PASS (App rendert, KaTeX, Routing, Simulator).
- Jeder Fehlschlag: gezielter Reparatur-Agent / Edit, dann erneut. Nicht „fertig" ohne grüne Suite.

### Task D3: Commit Inhalt
- `git add -A && git commit -m "feat(inhalt): EAN-Items (sympy+Wolfram-verifiziert)"`.

## Phase E — Ausliefern

### Task E1: GitHub-Repo + Push
- `gh repo create Nachbar-blip/muendlich-abi-mathe-trainer-ean --public --source . --remote origin --push`.
- Verify: `gh repo view Nachbar-blip/muendlich-abi-mathe-trainer-ean --json url`.

### Task E2: GitHub Pages
- Pages-Action liegt bereits (`.github/workflows/pages.yml`, `path: app`). Pages-Build via
  `gh api` aktivieren (`source: workflow`) falls nötig; Deploy-Run abwarten.
- Verify: `https://nachbar-blip.github.io/muendlich-abi-mathe-trainer-ean/` liefert die App (WebFetch/curl 200).

### Task E3: QR-Docx „hier"
- `tools/make_qr_docx.py` (EAN): `URL` = Pages-URL, Titeltexte „EAN", `OUT` →
  `C:\DevProjects\schule\zzz_TOP\mündlich ABI\QR Muendlich-Abi Mathe Trainer EAN.docx`.
- `python tools/make_qr_docx.py`. Verify: Datei existiert „hier".

## Definition of Done
- `pytest -q` grün **mit** vorhandenen EAN-Docx (Kein-Original real geprüft, nicht skipped).
- `node --test` + Playwright grün. Scope-Guard grün. Alle `check`-Items sympy-bestätigt + Wolfram-Log.
- Repo öffentlich gepusht, Pages live, QR-Docx „hier" erzeugt und zeigt auf die Live-URL.
