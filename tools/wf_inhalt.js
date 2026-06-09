export const meta = {
  name: 'muendlich-inhalt-ean',
  description: 'Authort & verifiziert (sympy + Wolfram) EAN-Mathe-Inhalte fuer den muendlich-ABI-Trainer (erhoehtes Niveau)',
  phases: [
    { title: 'Autor', detail: 'pro Thema Items erzeugen, mit sympy selbst geprueft' },
    { title: 'Verify', detail: 'unabhaengig: sympy + Wolfram + Frage-Loesung-Abgleich, repariert Fehler' },
  ],
}

// ---------------------------------------------------------------------------
// Gemeinsame Spezifikation (in jeden Prompt eingebettet)
// ---------------------------------------------------------------------------
const SPEC = `
EAN-SCOPE (erhoehtes Anforderungsniveau, STRENG einhalten):
- GANZRATIONALE Funktionen bis Grad 4 (Analysis) und Vektorgeometrie im R^3 (Geometrie).
- ERLAUBT und ERWUENSCHT (EAN-Technik, nutze sie wo das Thema es vorgibt):
  * Funktionen- und Ebenenscharen mit Parameter k (f_k, E_k).
  * Rotationsvolumen um die x-Achse: V = \\pi \\int f(x)^2 dx.
  * Wendepunkte mit notwendiger Bedingung f''(x)=0 UND hinreichender Bedingung f'''(x) != 0.
  * Nullstellen ganzrationaler Funktionen per Substitution (x^2 = z, biquadratisch).
  * Rekonstruktion / Steckbriefaufgaben (Funktion aus Eigenschaften via lineares Gleichungssystem).
  * Flaeche zwischen einer Tangente und dem Graphen.
  * Lagebeziehung UND Schnittgerade zweier Ebenen; Lagebeziehung Gerade-Ebene (Durchstosspunkt/parallel/enthalten).
  * Winkel zwischen zwei Ebenen bzw. zwischen Ebene und Koordinatenebene: cos(alpha) = |n1.n2| / (|n1| |n2|).
  * HESSEsche Normalform und Abstand Gerade-Ebene (bei Parallelitaet).
- VERBOTEN (ueber den Rahmen dieser EAN-Pruefung hinaus, NIEMALS verwenden):
  e^x / ln / Exponential- und Logarithmusfunktionen, Ketten-/Quotientenregel,
  windschiefe Geraden und deren Abstand, Stochastik (Normalverteilung, Hypothesentest,
  Binomialverteilung, Signifikanz).
- Formeln IMMER als LaTeX in \\( ... \\) (inline) bzw. \\[ ... \\] (abgesetzt).
  Vektoren als \\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix}. Keine Unicode-Mathesymbole. (Kreiszahl als \\pi.)
- NIEMALS eine Originalaufgabe aus echten Pruefungen abbilden — eigene Zahlen/Funktionen waehlen.
  Frage-FORMULIERUNGEN duerfen im Pruefungsstil sein ("Beschreiben Sie die Vorgehensweise ...",
  "Begruenden Sie ohne Rechnung ...", "Weisen Sie nach, dass ...", "Erlaeutern Sie ...").

SCHEMA der Item-Typen (Feldnamen exakt so):
- verfahren: { "id", "frage", "schritte": [>=3 Strings in RICHTIGER Reihenfolge] }
- rechnen: { "id", "level" (1..4), "typ" ("numerisch" | "mc"), "frage", "tipp", "loesungsweg", ["check"], ... }
    numerisch: zusaetzlich "loesung" = GENAU EINE Zahl. Bei irrationalen/gerundeten Werten
       "toleranz" setzen (z.B. 0.01) und loesung passend gerundet angeben (z.B. 2.83).
    mc: zusaetzlich "optionen" (>=3 Strings) und "korrekt" (Integer-Index der richtigen Option).
- erklaeren: { "id", "frage", "erwartungsbild": [>=2 Stichpunkte] }

CHECK-Feld (maschinelle Verifikation, sympy-Syntax; verfuegbar: x,y,z, Matrix, Rational, sqrt, pi, cos, sin, acos, Abs, diff, integrate, solve):
- numerisch  -> "check": { "art":"ausdruck", "expr":"<sympy-Ausdruck, der die loesung ergibt>" }
       Bsp Integral:        { "art":"ausdruck", "expr":"integrate(3*x**2,(x,0,2))" }                (loesung 8)
       Bsp Rotationsvolumen:{ "art":"ausdruck", "expr":"pi*integrate((Rational(5,4)*x)**2,(x,0,2))" } (loesung gerundet + toleranz)
       Bsp Abstand:         { "art":"ausdruck", "expr":"Abs(6*1-1*1-4*1-12)/sqrt(6**2+1**2+4**2)" }   (loesung gerundet + toleranz)
       Bsp Winkel-Kosinus:  { "art":"ausdruck", "expr":"Abs(6*0-1*0-4*1)/(sqrt(6**2+1**2+4**2)*1)" }   (loesung = cos(alpha), gerundet + toleranz)
- Mengen-Antwort (z.B. Nullstellen, auch nach Substitution): baue es als mc ODER als numerisch auf EINEN Wert
       (z.B. "groesste Nullstelle"). Optional check
       { "art":"menge", "gleichung":"2*x**4-7*x**2-4", "var":"x", "erwartet":[ "-2", "2" ] }.
- Vektor-/Koordinaten-Antwort (z.B. Normalenvektor, Schnittgeraden-Richtung): baue es als mc; check
       { "art":"vektor", "expr":"Matrix([1,1,1]).cross(Matrix([1,2,3]))", "erwartet":[1,-2,1] }.
- Jedes numerisch-Item MUSS ein "check" mit art "ausdruck" haben. mc darf optional check (menge/vektor/ausdruck mit "erwartet") haben.

IDs: prefix mit dem Thema-Key, z.B. "geo-ebene-v1" (verfahren), "geo-ebene-r1".."r6" (rechnen),
     "geo-ebene-e1".."e4" (erklaeren). Eindeutig.

UMFANG pro Thema: 1 verfahren (wo ein Standardverfahren existiert; sonst 0), 5-6 rechnen
(ueber level 1..4 verteilt, Mischung numerisch/mc), 3-4 erklaeren.
`

// ---------------------------------------------------------------------------
// Themen mit fachlichem Fokus (13) — EAN
// ---------------------------------------------------------------------------
const TOPICS = [
  { key: 'ana-eigenschaften', gebiet: 'analysis',
    fokus: `Eigenschaften ganzrationaler Funktionen OHNE Rechnung: Symmetrie ueber gerade/ungerade Exponenten (f(-x) mit f(x) bzw. -f(x) vergleichen), y-Achsenabschnitt, maximale Anzahl von Nullstellen/Extrema/Wendepunkten aus dem Grad, Grenzverhalten lim x->+/-unendlich aus Grad und Leitkoeffizient. rechnen: Symmetrietyp bestimmen (mc), f(-x) auswerten (numerisch), maximale Nullstellenzahl (numerisch). erklaeren: "Geben Sie ohne Rechnung drei Eigenschaften des Graphen an und begruenden Sie."` },
  { key: 'ana-nullstellen', gebiet: 'analysis',
    fokus: `Nullstellen ganzrationaler Funktionen: Ausklammern + Satz vom Nullprodukt; SUBSTITUTION x^2=z bei biquadratischen Funktionen (z.B. 2x^4-7x^2-4 -> 2z^2-7z-4). rechnen: groesste Nullstelle (numerisch), Anzahl der Nullstellen (numerisch/mc); check art=menge fuer die Loesungsmenge. erklaeren: Begruendung der Nullstellenzahl am Graphen bzw. die Idee der Substitution.` },
  { key: 'ana-extrema-wende', gebiet: 'analysis',
    fokus: `Extrema via f'(x)=0 und f''-Kriterium (Art ueber Vorzeichen von f''); Wendepunkte mit notwendiger Bedingung f''(x)=0 und hinreichender Bedingung f'''(x) != 0. verfahren: Schritte der Wendepunktbestimmung mit f'''-Kriterium. rechnen: x-Koordinate eines Wendepunktes (numerisch), f''(x0) oder f'''(x0) auswerten (numerisch). erklaeren: Unterschied notwendige/hinreichende Bedingung bei Wendepunkten (f''=0 und f''' != 0).` },
  { key: 'ana-ableitung-graph', gebiet: 'analysis',
    fokus: `Vom Graphen der ABLEITUNGSFUNKTION f' auf die Funktion f schliessen: Extremstellen von f als Nullstellen von f' mit Vorzeichenwechsel, Art des Extremums ueber die VZW-Richtung (- nach + Tiefpunkt, + nach - Hochpunkt). Ueberwiegend mc/konzeptionell. erklaeren: "Erlaeutern Sie, wie man mit dem Graphen von f' die Extremstellen von f und ihre Art bestimmt."` },
  { key: 'ana-rekonstruktion', gebiet: 'analysis',
    fokus: `Rekonstruktion / Steckbriefaufgabe: ganzrationale Funktion (meist Grad 3) aus Eigenschaften (Wendepunkt, waagerechte Tangente, gegebener Punkt, Symmetrie) bestimmen -> lineares Gleichungssystem fuer a,b,c,d aufstellen und loesen. verfahren: Schritte (allgemeine Form notieren, 1./2. Ableitung, Bedingungen in ein LGS uebersetzen, loesen). rechnen: bei einfachen Vorgaben einen Koeffizienten bestimmen (numerisch) oder f(x0) der rekonstruierten Funktion (numerisch). erklaeren: Vorgehensweise der Funktionsbestimmung aus den Eigenschaften.` },
  { key: 'ana-integral', gebiet: 'analysis',
    fokus: `Bestimmtes Integral; Flaeche zwischen zwei Graphen (obere minus untere, abschnittsweise bei Vorzeichenwechsel); Flaeche zwischen einer Tangente und dem Graphen; ROTATIONSVOLUMEN um die x-Achse V = pi * Integral f(x)^2 dx. verfahren: Schritte der Flaechenberechnung zwischen Tangente und Graph. rechnen: Integralwert/Flaeche (numerisch, ggf. toleranz; check art=ausdruck integrate(...)), Rotationsvolumen (numerisch + toleranz; check art=ausdruck mit pi). erklaeren: Vorgehensweise Rotationsvolumen bzw. Flaeche zwischen Tangente und Graph.` },
  { key: 'ana-scharen', gebiet: 'analysis',
    fokus: `FUNKTIONENSCHAREN f_k mit reellem Parameter k (ganzrational): Eigenschaften bzw. Nullstellenzahl in Abhaengigkeit von k; einen Wert von k so bestimmen, dass eine Bedingung gilt (z.B. genau 2 Nullstellen, Extrempunkt auf der x-Achse, gemeinsamer Punkt aller Kurven). rechnen: konkreten k-Wert bestimmen (numerisch), gemeinsamen Punkt der Schar (numerisch). erklaeren: "Erlaeutern Sie, wie sich die Anzahl der Nullstellen von f_k mit k aendert." Scharen sind im EAN ausdruecklich ERLAUBT.` },
  { key: 'geo-vektoren-geraden', gebiet: 'geometrie',
    fokus: `Vektoren: Verbindungsvektor zweier Punkte, Betrag, Mittelpunkt, Kollinearitaet (liegt ein Punkt auf der Geraden?). Geraden im R^3 aufstellen, Punktprobe, besondere Lagen (parallel zu Koordinatenebenen/-achsen, wenn Komponenten des Richtungsvektors 0 sind). rechnen: Betrag eines Vektors (numerisch, toleranz), Mittelpunkt-Koordinate (numerisch), Parameter der Punktprobe (numerisch). erklaeren: woran man eine besondere Lage einer Geraden im Koordinatensystem erkennt.` },
  { key: 'geo-ebene', gebiet: 'geometrie',
    fokus: `Ebene aufstellen: aus drei Punkten bzw. aus einer Geraden und einem Punkt; Parameterform -> Koordinatenform ueber Normalenvektor = Kreuzprodukt der Spannvektoren, d durch Einsetzen eines Punktes; Normalenvektor aus der Koordinatenform ablesen; Punktprobe. Auch Ebenenscharen E_k (im EAN erlaubt). verfahren: Schritte Parameter- in Koordinatenform. rechnen: Komponente des Normalenvektors / Wert von d (numerisch), Normalenvektor (mc, check art=vektor mit Matrix(...).cross(...)), Punktprobe-Wert (numerisch). erklaeren: Vorgehensweise zur Koordinatengleichung aus Gerade und Punkt.` },
  { key: 'geo-lage-ebenen', gebiet: 'geometrie',
    fokus: `Lagebeziehung zweier Ebenen (identisch / echt parallel / schneidend) ueber lineare (Un-)Abhaengigkeit der Normalenvektoren; Schnittgerade zweier Ebenen ueber ein LGS (eine Variable als Parameter t setzen). rechnen: Komponente eines Punktes oder des Richtungsvektors der Schnittgeraden (numerisch); Faktor k pruefen, ob zwei Normalenvektoren parallel sind (numerisch/mc). erklaeren: "Geben Sie alle Lagemoeglichkeiten zweier Ebenen an und erlaeutern Sie, wie man sie unterscheidet."` },
  { key: 'geo-lage-gerade-ebene', gebiet: 'geometrie',
    fokus: `Lagebeziehung Gerade-Ebene: Gerade in die Koordinatenform einsetzen -> genau eine Loesung (Durchstosspunkt), keine Loesung (echt parallel, Skalarprodukt Richtungsvektor.Normalenvektor = 0) oder alle (Gerade liegt in der Ebene); eine Gerade h echt parallel zur Ebene konstruieren (Richtungsvektor mit n.u=0, Stuetzpunkt nicht in E). rechnen: Parameter/Koordinate des Durchstosspunktes (numerisch), Skalarprodukt n.u (numerisch; =0 bei Parallelitaet). erklaeren: Vorgehensweise zur Lagebestimmung Gerade-Ebene; Bedingung fuer echte Parallelitaet.` },
  { key: 'geo-winkel', gebiet: 'geometrie',
    fokus: `Winkel zwischen zwei Ebenen bzw. zwischen einer Ebene und einer Koordinatenebene ueber cos(alpha) = |n1.n2| / (|n1| * |n2|). rechnen: BEVORZUGT cos(alpha) als Zahl (numerisch, toleranz; check art=ausdruck mit Abs/sqrt) oder alternativ der Winkel in Grad (numerisch, toleranz; check art=ausdruck "acos(...)*180/pi"). erklaeren: "Beschreiben Sie, wie man den Winkel zwischen zwei Ebenen bestimmt."` },
  { key: 'geo-abstand-hnf', gebiet: 'geometrie',
    fokus: `HESSEsche Normalform einer Ebene (Normalenvektor normieren) und Abstaende: Abstand Punkt-Ebene d = |a*p1+b*p2+c*p3 - d0| / sqrt(a^2+b^2+c^2); Abstand einer zur Ebene PARALLELEN Geraden zur Ebene (einen beliebigen Geradenpunkt einsetzen). HNF ist im EAN ERLAUBT. rechnen: Abstand Punkt-Ebene (numerisch, toleranz; check art=ausdruck Abs(...)/sqrt(...)), Betrag |n| des Normalenvektors (numerisch). erklaeren: Vorgehensweise zur Bestimmung des Abstands Gerade-Ebene ueber die HESSEsche Normalform.` },
]

// ---------------------------------------------------------------------------
// Simulator-Aufgaben (4): je 2 pro Gebiet, vollstaendig & mehrteilig, pruefungsAEHNLICH (nie original)
// ---------------------------------------------------------------------------
const SIMS = [
  { id: 'sim-ana-1', gebiet: 'analysis',
    fokus: `Ganzrationale Funktion 3. Grades (EIGENE Koeffizienten). Teilaufgaben mit steigendem AFB: a) Eigenschaften ohne Rechnung (Symmetrie/Grenzverhalten/Nullstellenzahl) AFB I/II; b) Extrem- und Wendepunkt berechnen (f''-Kriterium fuer Extrema, f'''-Kriterium fuer den Wendepunkt) AFB II; c) Flaeche zwischen einer Tangente und dem Graphen (Vorgehensweise + Ansatz) AFB II/III; d) FUNKTIONENSCHAR f_k (z.B. Konstante +k) — Anzahl der Nullstellen in Abhaengigkeit von k bzw. k so bestimmen, dass der Graph genau 2 Nullstellen hat AFB III. Pro Teilaufgabe frage + erwartungsbild + afb.` },
  { id: 'sim-ana-2', gebiet: 'analysis',
    fokus: `Ganzrationale Funktion 4. Grades, biquadratisch (EIGENE Koeffizienten). a) drei Eigenschaften ohne Rechnung (Symmetrie zur y-Achse, y-Achsenabschnitt, maximale Anzahl Nullstellen/Extrema) AFB I/II; b) Nullstellen per SUBSTITUTION x^2=z bestimmen AFB II; c) ROTATIONSVOLUMEN eines begrenzten Bereichs um die x-Achse (Vorgehensweise + Ansatz V=pi*Integral f(x)^2 dx) AFB II/III; d) REKONSTRUKTION einer ganzrationalen Funktion 3. Grades aus Eigenschaften (LGS aufstellen) AFB II/III. Pro Teilaufgabe frage + erwartungsbild + afb.` },
  { id: 'sim-geo-1', gebiet: 'geometrie',
    fokus: `Zwei Ebenen E1, E2 in Koordinatenform (EIGENE Zahlen) sowie zwei Punkte. a) nachweisen, dass beide Punkte in beiden Ebenen liegen, und auf die Lagebeziehung schliessen AFB I/II; b) alle Lagemoeglichkeiten zweier Ebenen angeben und erlaeutern, wie E2 zu aendern waere AFB II; c) Schnittgerade bzw. einen weiteren gemeinsamen Punkt bestimmen AFB II/III; d) Winkel zwischen E1 und einer Koordinatenebene berechnen AFB II/III. Pro Teilaufgabe frage + erwartungsbild + afb.` },
  { id: 'sim-geo-2', gebiet: 'geometrie',
    fokus: `Eine Gerade g und ein Punkt A im R^3 (EIGENE Zahlen). a) Punktprobe A auf g und besondere Lage von g angeben/begruenden AFB I/II; b) Ebene E aus g und A in Koordinatenform aufstellen (Kreuzprodukt) AFB II; c) eine Gerade h angeben, die echt parallel zu E liegt (Richtungsvektor mit n.u=0, Stuetzpunkt nicht in E) AFB II/III; d) Abstand der Geraden h zur Ebene E ueber die HESSEsche Normalform bestimmen AFB III. Pro Teilaufgabe frage + erwartungsbild + afb.` },
]

// ---------------------------------------------------------------------------
// Schemas (structured output)
// ---------------------------------------------------------------------------
const FRAGMENT_SCHEMA = {
  type: 'object',
  required: ['verfahren', 'rechnen', 'erklaeren'],
  additionalProperties: false,
  properties: {
    verfahren: { type: 'array', items: {
      type: 'object', required: ['id', 'frage', 'schritte'], additionalProperties: false,
      properties: { id: { type: 'string' }, frage: { type: 'string' },
        schritte: { type: 'array', minItems: 3, items: { type: 'string' } } } } },
    rechnen: { type: 'array', items: {
      type: 'object', required: ['id', 'level', 'typ', 'frage', 'tipp', 'loesungsweg'], additionalProperties: false,
      properties: {
        id: { type: 'string' }, level: { type: 'integer' }, typ: { type: 'string' },
        frage: { type: 'string' }, tipp: { type: 'string' }, loesungsweg: { type: 'string' },
        loesung: { type: 'number' }, toleranz: { type: 'number' },
        optionen: { type: 'array', items: { type: 'string' } }, korrekt: { type: 'integer' },
        check: { type: 'object', additionalProperties: true } } } },
    erklaeren: { type: 'array', items: {
      type: 'object', required: ['id', 'frage', 'erwartungsbild'], additionalProperties: false,
      properties: { id: { type: 'string' }, frage: { type: 'string' },
        erwartungsbild: { type: 'array', minItems: 2, items: { type: 'string' } } } } },
  },
}

const VERIFY_SCHEMA = {
  type: 'object',
  required: ['verfahren', 'rechnen', 'erklaeren', 'pruefprotokoll'],
  additionalProperties: false,
  properties: {
    ...FRAGMENT_SCHEMA.properties,
    pruefprotokoll: { type: 'array', items: {
      type: 'object', required: ['id', 'status'], additionalProperties: false,
      properties: {
        id: { type: 'string' }, status: { type: 'string' }, // "ok" | "korrigiert" | "entfernt"
        wolfram_query: { type: 'string' }, wolfram_ergebnis: { type: 'string' },
        anmerkung: { type: 'string' } } } },
  },
}

const SIM_SCHEMA = {
  type: 'object',
  required: ['id', 'gebiet', 'teilaufgaben', 'pruefprotokoll'],
  additionalProperties: false,
  properties: {
    id: { type: 'string' }, gebiet: { type: 'string' },
    teilaufgaben: { type: 'array', minItems: 4, items: {
      type: 'object', required: ['frage', 'erwartungsbild', 'afb'], additionalProperties: false,
      properties: { frage: { type: 'string' },
        erwartungsbild: { type: 'array', minItems: 1, items: { type: 'string' } },
        afb: { type: 'string' } } } },
    pruefprotokoll: { type: 'array', items: {
      type: 'object', required: ['teil', 'status'], additionalProperties: false,
      properties: { teil: { type: 'string' }, status: { type: 'string' },
        wolfram_query: { type: 'string' }, wolfram_ergebnis: { type: 'string' },
        anmerkung: { type: 'string' } } } },
  },
}

// ---------------------------------------------------------------------------
// Pipeline: pro Thema  Autor -> Verify(+Repair)
// ---------------------------------------------------------------------------
log(`Starte EAN-Inhalts-Authoring fuer ${TOPICS.length} Themen + ${SIMS.length} Simulator-Aufgaben`)

const themenErgebnisse = await pipeline(
  TOPICS,
  (t) => agent(
    `Du bist Mathematik-Autor (Sekundarstufe II, ERHOEHTES Anforderungsniveau / EAN). Erzeuge die Trainer-Items fuer das Thema "${t.key}" (Gebiet: ${t.gebiet}).\n\nFOKUS: ${t.fokus}\n\n${SPEC}\n\nWICHTIG: Rechne JEDES rechnen-Item mit Python+sympy SELBST nach, bevor du es zurueckgibst (nutze die Bash/python-Tools; pruefe, dass dein check.expr die loesung ergibt und die Mathematik stimmt). Korrigiere, bis alles sympy-sauber ist. Gib NUR das Fragment-Objekt zurueck.`,
    { label: `autor:${t.key}`, phase: 'Autor', schema: FRAGMENT_SCHEMA }
  ),
  (fragment, t) => agent(
    `Du bist unabhaengiger Pruefer fuer EAN-Mathe-Inhalte (erhoehtes Niveau). Hier ein Fragment fuer Thema "${t.key}" (${t.gebiet}):\n\n${JSON.stringify(fragment)}\n\n${SPEC}\n\nDEINE AUFGABE — pruefe JEDES Item unabhaengig und repariere Fehler:\n1) Rechne jedes rechnen-Item mit Python+sympy nach (loesung vs check.expr). Verfuegbar im check-Namespace: x,y,z,Matrix,Rational,sqrt,pi,cos,sin,acos,Abs,diff,integrate,solve.\n2) Cross-Check mit dem Wolfram-Konnektor: nutze ToolSearch ("select:mcp__claude_ai_Wolfram__WolframLanguageEvaluator"), lade das Tool und verifiziere jedes rechnerische Ergebnis unabhaengig (Solve/Integrate/Cross/Norm/ArcCos ...). Notiere Query+Ergebnis im pruefprotokoll.\n3) Pruefe, ob die loesung/das Erwartungsbild WIRKLICH die Frage beantwortet (Frage<->Loesung-Abgleich), ob der loesungsweg korrekt ist, und ob der EAN-Scope eingehalten ist: Scharen (f_k, E_k), HESSEsche Normalform/HNF, Rotationsvolumen, f''', Substitution, Lagebeziehung/Schnittgerade von Ebenen und Winkel sind ERLAUBT; VERBOTEN bleiben e^x/ln, Ketten-/Quotientenregel, windschiefe Geraden und Stochastik.\n4) Repariere fehlerhafte Items (loesung/check/loesungsweg/Frage). Wenn ein Item unrettbar ist, entferne es und vermerke status "entfernt".\n\nGib das KORRIGIERTE, vollstaendige Fragment zurueck (verfahren/rechnen/erklaeren) PLUS pruefprotokoll (ein Eintrag je rechnen-Item mit id, status "ok"/"korrigiert"/"entfernt", wolfram_query, wolfram_ergebnis, anmerkung). Alle Items im Ergebnis muessen sympy- UND Wolfram-bestaetigt sein.`,
    { label: `verify:${t.key}`, phase: 'Verify', schema: VERIFY_SCHEMA }
  )
)

// Simulator-Aufgaben: Autor -> Verify, parallel zu den Themen-Resultaten
const simErgebnisse = await pipeline(
  SIMS,
  (s) => agent(
    `Du bist Mathematik-Autor (EAN). Erstelle EINE vollstaendige, mehrteilige, PRUEFUNGSAEHNLICHE (NIE originale) Aufgabe fuer den Simulator, Gebiet ${s.gebiet}, id "${s.id}".\n\nFOKUS: ${s.fokus}\n\n${SPEC}\n\nGib ein Objekt { id:"${s.id}", gebiet:"${s.gebiet}", teilaufgaben:[ {frage, erwartungsbild:[...], afb}, ... >=4 ] } zurueck (ohne pruefprotokoll). AFB kanonisch ohne Leerzeichen: "I","II","III","I/II","II/III". Rechne alle Loesungen mit Python+sympy nach.`,
    { label: `autor:${s.id}`, phase: 'Autor', schema: { type: 'object', required: ['id', 'gebiet', 'teilaufgaben'], additionalProperties: false, properties: { id: { type: 'string' }, gebiet: { type: 'string' }, teilaufgaben: SIM_SCHEMA.properties.teilaufgaben } } }
  ),
  (aufgabe, s) => agent(
    `Unabhaengige Pruefung der Simulator-Aufgabe "${s.id}" (${s.gebiet}):\n\n${JSON.stringify(aufgabe)}\n\n${SPEC}\n\nPruefe jede Teilaufgabe: sympy-Nachrechnung + Wolfram-Cross-Check (ToolSearch "select:mcp__claude_ai_Wolfram__WolframLanguageEvaluator"), Frage<->Erwartungsbild-Abgleich, EAN-Scope (Scharen/HNF/Rotationsvolumen/f'''/Substitution ERLAUBT; e^x/ln/Ketten-/Quotientenregel/windschief/Stochastik VERBOTEN), AFB-Plausibilitaet. Repariere Fehler. Stelle sicher, dass die Aufgabe NICHT mit einer bekannten Originalaufgabe identisch ist (eigene Zahlen). Gib die korrigierte Aufgabe (id, gebiet, teilaufgaben) + pruefprotokoll (je Teilaufgabe: teil, status, wolfram_query, wolfram_ergebnis, anmerkung) zurueck.`,
    { label: `verify:${s.id}`, phase: 'Verify', schema: SIM_SCHEMA }
  )
)

return {
  themen: themenErgebnisse,
  simulator: simErgebnisse,
}
