# Design: Mündlich-Abi Mathe — EAN-Trainer & Prüfungs-Simulator

**Datum:** 2026-06-09
**Status:** Freigegeben (Brainstorming abgeschlossen)
**Kontext:** Schwesterprojekt zum **GAN**-Trainer (`…/mündlich ABI/`), jetzt auf **erhöhtem
Anforderungsniveau (EAN)**. Eine Schülerin bereitet sich auf die mündliche Mathe-Prüfung auf EAN vor.

---

## 1. Prinzip

**Klon der GAN-App.** `engine.js`, `ui.js`, `styles.css`, `vendor/katex/`, Test-/Tool-Harness und
CI werden **strukturell unverändert** übernommen. Inhaltlich neu/anders sind nur:

- `app/content.js` — komplett neue EAN-Items
- `scope_verbote.json` + spiegelgleiche `SCOPE_VERBOTE` in `engine.js` — EAN-Verbotsliste
- `README.md`, Branding-Label „EAN", Seitentitel
- QR-Ziel (neue Pages-URL)

Begründung: Der Nutzer wollte einen „ähnlichen Trainer, nur auf erhöhtem Niveau". Die Architektur
des GAN-Trainers ist freigegeben und getestet — der Mehrwert liegt im **EAN-Inhalt** und im
**EAN-Scope-Guard**, nicht in neuer Technik.

## 2. Prüfungsformat (identisch zu GAN)

- **Teil 1 — Vortrag:** 20 min Vorbereitung → 10 min Präsentation einer mehrteiligen Aufgabe aus
  **einem** Gebiet (Analysis **oder** Analytische Geometrie).
- **Teil 2 — Prüfungsgespräch:** 10 min Dialog über das **andere** Gebiet.
- Gebiete **gekoppelt**: Teil 1 Analysis ⇒ Teil 2 Geometrie und umgekehrt. ⇒ **beide** müssen sitzen.

### Quellen (gelesen, vollständig extrahiert)
`EAN/mdl. Prüfung EAN 2017.docx`, `EAN/mdl. Prüfung EAN 2021.docx`. Übergeordneter Lehrplan:
`…/zzz_TOP/ma_go_kc_druck_2019 …pdf` (KC gymnasiale Oberstufe Mathematik) als Scope-Referenz.

## 3. Scope-Entscheidung: **Musterarbeiten-treu** (vom Nutzer gewählt)

Die zwei EAN-Musterarbeiten sind **rein ganzrational**, enthalten aber bereits die EAN-typischen
Techniken. Der Trainer deckt **genau diese belegte Prüfungsrealität** ab — **kein** e^x/ln, **keine**
windschiefen Geraden (bewusst ausgeschlossen, obwohl im weiteren EAN-Lehrplan enthalten).

### ✅ REIN — neu gegenüber GAN
**Analysis (ganzrational):**
- Grenzverhalten `lim x→±∞` (aus Grad + Leitkoeffizient, ohne Rechnung)
- Nullstellen per **Substitution** (biquadratisch, `x²=z`) zusätzlich zu Ausklammern
- Wendepunkte mit **f‴-Kriterium** (notw. `f''(xᵂ)=0`, hinr. `f'''(xᵂ)≠0`)
- **Rekonstruktion / Steckbriefaufgaben** (Funktion aus Eigenschaften → LGS für a,b,c,d)
- Fläche **zwischen Tangente und Graph**
- **Rotationsvolumen** um die x-Achse `V = π∫ f(x)² dx`
- **Funktionenscharen** `fₖ` (Eigenschaften/Nullstellenzahl in Abhängigkeit vom Parameter)

**Analytische Geometrie:**
- **Lagebeziehung zweier Ebenen** (identisch / echt parallel / schneidend über Normalenvektoren)
- **Schnittgerade zweier Ebenen** (LGS)
- **Lagebeziehung Gerade–Ebene** (Durchstoßpunkt / echt parallel / enthalten; `n·u=0`-Test)
- **Winkel** Ebene–Ebene und Ebene–Achsenebene `cos α = |n₁·n₂| / (|n₁|·|n₂|)`
- **HESSEsche Normalform** und **Abstand Gerade–Ebene** (bei Parallelität)
- **Ebenenscharen** `Eₖ`

**Beibehalten aus GAN (EAN-gültig):** Symmetrie (gerade/ungerade Exp.), Ableitung↔Graph,
Ebene Parameter-↔Koordinatenform (Kreuzprodukt → Normalenvektor), Vektoren: Betrag, Mittelpunkt,
Vektorzug, Kollinearität, Punktprobe auf Geraden.

### ❌ RAUS — Guard erzwingt
- e-Funktionen `e^x`, Logarithmus `ln` ⇒ Ketten-/Quotientenregel
- **windschiefe** Geraden und deren Abstand
- Stochastik (Normalverteilung, Hypothesentest, Binomialverteilung, Signifikanz)
- **Originalaufgaben** (Jaccard-Abgleich gegen die 2 EAN-Musterarbeiten)

### Scope-Guard-Delta gegenüber GAN
- **Entfernt** (jetzt erlaubt): `[a-z]_[a-z]\(`, `[a-z]_\{[a-z]\}` (Scharen `fₖ`, `Eₖ`),
  `Hessesch`, `\bHNF\b`.
- **Behält** (weiter verboten): `e\^`, `\\ln`, `ln(`, `Kettenregel`, `Quotientenregel`,
  `windschief`, `normalverteilt`, `Normalverteilung`, `Signifikanz`, `Hypothesentest`,
  `Binomialverteilung`.
- Invariante: `scope_verbote.json` ist **string-identisch** zu `engine.js::SCOPE_VERBOTE`
  (Python-Test nagelt das fest).

## 4. Themen (~13, je ~6–7 pro Gebiet)

**Analysis (7):** Eigenschaften & Symmetrie · Nullstellen (+Substitution) · Extrema & Wendepunkte
(f″/f‴) · Ableitung↔Graph · Rekonstruktion · Integral (Fläche, Tangente–Graph, Rotationsvolumen) ·
Funktionenscharen
**Geometrie (6):** Vektoren & Geraden · Ebenen aufstellen (+Scharen) · Lagebeziehung & Schnittgerade
von Ebenen · Lage Gerade–Ebene · Winkel · HNF & Abstände

Finale Theme-Keys/-Zuschnitt im Umsetzungsplan.

### Drei Stufen pro Thema (identisch zu GAN)
1. **Verfahren** — geordnete Schrittfolge (sortieren/Lücken).
2. **Selbst rechnen** — `numerisch`/`mc`, mit `tipp`, `loesungsweg`, `loesung`, **`check{art, expr}`**
   (sympy-nachrechenbar), steigendes `level` 1–4.
3. **Frei erklären** — Prüfungs-O-Ton-Frage + `erwartungsbild`, Selbsteinschätzung → **SM-2-SRS**.

### Simulator (echtes 20+10+10)
~2 prüfungsähnliche, mehrteilige Aufgaben **je Gebiet** (AFB I/II/III), **nie Original**. Teil 2
wird aus `erklaeren`-Items des anderen Gebiets gespeist.

Richtwert Gesamtvolumen ≈ 140 Items (vgl. GAN 117).

## 5. Architektur & Technik (von GAN übernommen)

- Statische Seite, klassische Skripte, `file://`-tauglich. Reihenfolge `engine → content → ui`.
- **KaTeX lokal** gebündelt (kein CDN; schulnetzfest).
- Persistenz vollständig in `localStorage` (Schema-Version + Merge-Fallback), Export/Import als JSON.
- Deploy-Wurzel `app/`. GitHub Pages via Action (`path: app`), `netlify.toml` als Alternative.

## 6. Qualitätssicherung (zentral, weil Mathe)

- **Jedes** `rechnen`-Item: **sympy-Recompute** über `check.expr` **+ Wolfram-Gegenprüfung**.
- **Scope-Guard** mit EAN-Verbotsliste über alle Texte.
- **Kein-Original**-Jaccard gegen die 2 extrahierten EAN-Prüfungen (nur strukturelle Ähnlichkeit).
- Schema-/Integritäts-Tests (Pflichtfelder, Lösung ↔ Lösungsweg konsistent, SRS-Logik).
- **Playwright**-Browsercheck vor „fertig".

## 7. Ausliefern

Neues Verzeichnis `…/muendlich-abi-mathe-trainer-ean/` → `git init` → **öffentliches** GH-Repo
`muendlich-abi-mathe-trainer-ean` unter **Nachbar-blip** → push → **Pages** (Action) →
`https://nachbar-blip.github.io/muendlich-abi-mathe-trainer-ean/`. Anschließend **QR-Docx**
(`tools/make_qr_docx.py`, Ziel = Pages-URL) im aktuellen Arbeitsordner ablegen.

## 8. Bewusst NICHT enthalten (YAGNI)

- Keine Cloud/Backend/Login, kein Lehrer-Dashboard, keine Auto-Bewertung der Sprech-Erklärung.
- Kein e^x/ln, keine windschiefen Geraden (Scope-Entscheidung), keine Stochastik.

## 9. Umsetzung — Agentenschwarm

1. **Scaffold** (deterministisch): Projekt anlegen, App-Skelett kopieren, EAN-Scope setzen,
   EAN-Prüfungen für Kein-Original-Test extrahieren.
2. **Fan-out Inhalt → Verifikation** (Pipeline, 1 Agent/Thema): generiert Items im Hausformat **und**
   verifiziert sofort adversarisch (sympy + Wolfram, Scope, Kein-Original). Parallel 2 Agenten für
   Simulator-Aufgaben je Gebiet.
3. **Assemblieren**: `content.js` mergen, volle Testsuite (node:test + pytest + Playwright) grün.
4. **Ship**: Repo + Pages + QR-Docx.
