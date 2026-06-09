"""Inhalts-Tests fuer die muendlich-ABI-Lernapp (Phase 2).

Die Tests parsen app/content.js (kein JS-Eval), validieren das Inhalts-Schema,
sichern den GK-Scope ab und stellen sicher, dass keine Originalaufgaben
woertlich uebernommen wurden.
"""
import json
import re
import sys
from pathlib import Path

import pytest

# Projekt-Root in den Pfad, damit `tools.*` importierbar ist.
ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from tools.load_content import load_content  # noqa: E402

# Erlaubte AFB-Stufen (kanonisch, ohne Leerzeichen): I, II, III und Kombis (I/II, II/III, ...)
AFB_MUSTER = r"(I|II|III)(/(I|II|III))*"

CONTENT = load_content(str(ROOT / "app" / "content.js"))
THEMA_KEYS = {t["key"] for t in CONTENT["themen"]}


# ---------------------------------------------------------------------------
# Task 2.2 — Loader
# ---------------------------------------------------------------------------

def test_laedt():
    assert CONTENT["version"] == 1
    assert len(CONTENT["themen"]) == 13
    for t in CONTENT["themen"]:
        assert t["gebiet"] in {"analysis", "geometrie"}


# ---------------------------------------------------------------------------
# Task 2.3 — Schema-Integritaet (parametrisiert; bei leerem Inhalt vacuously true)
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("item", CONTENT["rechnen"])
def test_rechnen_item(item):
    assert isinstance(item.get("id"), str) and item["id"]
    assert item.get("thema") in THEMA_KEYS
    assert item.get("level") in (1, 2, 3, 4)
    assert item.get("typ") in ("numerisch", "mc")
    for feld in ("frage", "tipp", "loesungsweg"):
        assert isinstance(item.get(feld), str) and item[feld]
    if item["typ"] == "numerisch":
        loesung = item.get("loesung")
        assert isinstance(loesung, (int, float)) and not isinstance(loesung, bool)
    elif item["typ"] == "mc":
        optionen = item.get("optionen")
        assert isinstance(optionen, list) and len(optionen) >= 2
        korrekt = item.get("korrekt")
        assert isinstance(korrekt, int) and not isinstance(korrekt, bool)
        assert 0 <= korrekt < len(optionen)


@pytest.mark.parametrize("item", CONTENT["erklaeren"])
def test_erklaeren_item(item):
    assert isinstance(item.get("id"), str) and item["id"]
    assert item.get("thema") in THEMA_KEYS
    assert isinstance(item.get("frage"), str) and item["frage"]
    eb = item.get("erwartungsbild")
    assert isinstance(eb, list) and len(eb) >= 2
    assert all(isinstance(s, str) and s for s in eb)


@pytest.mark.parametrize("item", CONTENT["verfahren"])
def test_verfahren_item(item):
    assert isinstance(item.get("id"), str) and item["id"]
    assert item.get("thema") in THEMA_KEYS
    assert isinstance(item.get("frage"), str) and item["frage"]
    schritte = item.get("schritte")
    assert isinstance(schritte, list) and len(schritte) >= 3
    assert all(isinstance(s, str) and s for s in schritte)


@pytest.mark.parametrize("eintrag", CONTENT["simulator"])
def test_simulator_eintrag(eintrag):
    assert isinstance(eintrag.get("id"), str) and eintrag["id"]
    assert eintrag.get("gebiet") in ("analysis", "geometrie")
    teilaufgaben = eintrag.get("teilaufgaben")
    assert isinstance(teilaufgaben, list) and len(teilaufgaben) >= 3
    for ta in teilaufgaben:
        assert isinstance(ta.get("frage"), str) and ta["frage"]
        eb = ta.get("erwartungsbild")
        assert isinstance(eb, list) and len(eb) >= 1
        assert all(isinstance(s, str) and s for s in eb)
        # AFB kanonisch ohne Leerzeichen; Kombis wie "I/II", "II/III" sind in den
        # Originalprüfungen üblich (I/II 12x, II/III 8x) und müssen zulässig sein.
        assert re.fullmatch(AFB_MUSTER, ta.get("afb") or ""), \
            f"ungueltige AFB-Stufe: {ta.get('afb')!r} (erlaubt z.B. I, II, III, I/II, II/III)"


def test_afb_format_akzeptiert_kombis_und_lehnt_ungueltiges_ab():
    for gut in ("I", "II", "III", "I/II", "II/III", "I/II/III"):
        assert re.fullmatch(AFB_MUSTER, gut), f"{gut} sollte erlaubt sein"
    for schlecht in ("", "IV", "i", "I / II", "I-II", "II/IV", "1/2"):
        assert not re.fullmatch(AFB_MUSTER, schlecht), f"{schlecht} sollte abgelehnt werden"


def test_ids_eindeutig():
    ids = []
    for liste in ("rechnen", "erklaeren", "verfahren", "simulator"):
        for item in CONTENT[liste]:
            ids.append(item["id"])
    assert len(ids) == len(set(ids)), "IDs muessen ueber alle Listen eindeutig sein"


# ---------------------------------------------------------------------------
# Task 2.3 — Scope-Guard (GK-Verbotsmuster duerfen nicht vorkommen)
# ---------------------------------------------------------------------------

def _scope_regex():
    muster = json.loads((ROOT / "scope_verbote.json").read_text(encoding="utf-8"))["verbote"]
    return re.compile("|".join(muster), re.IGNORECASE)


SCOPE_REGEX = _scope_regex()


def _scope_texte():
    """Liefert (id, feldname, text)-Tripel aller pruefpflichtigen Textfelder."""
    out = []
    for item in CONTENT["rechnen"]:
        for feld in ("frage", "loesungsweg", "tipp"):
            if isinstance(item.get(feld), str):
                out.append((item["id"], feld, item[feld]))
        for i, opt in enumerate(item.get("optionen", []) or []):
            out.append((item["id"], f"optionen[{i}]", opt))
    for item in CONTENT["erklaeren"]:
        if isinstance(item.get("frage"), str):
            out.append((item["id"], "frage", item["frage"]))
        for i, s in enumerate(item.get("erwartungsbild", []) or []):
            out.append((item["id"], f"erwartungsbild[{i}]", s))
    for item in CONTENT["verfahren"]:
        if isinstance(item.get("frage"), str):
            out.append((item["id"], "frage", item["frage"]))
        for i, s in enumerate(item.get("schritte", []) or []):
            out.append((item["id"], f"schritte[{i}]", s))
    for eintrag in CONTENT["simulator"]:
        for ta in eintrag.get("teilaufgaben", []) or []:
            if isinstance(ta.get("frage"), str):
                out.append((eintrag["id"], "teil.frage", ta["frage"]))
            for i, s in enumerate(ta.get("erwartungsbild", []) or []):
                out.append((eintrag["id"], f"teil.erwartungsbild[{i}]", s))
    return out


@pytest.mark.parametrize("ident,feld,text", _scope_texte())
def test_scope_guard(ident, feld, text):
    m = SCOPE_REGEX.search(text)
    assert m is None, f"{ident}/{feld}: GK-Verbotsmuster '{m.group(0) if m else ''}' in: {text!r}"


# ---------------------------------------------------------------------------
# Task 2.3 — Verbotsliste-Sync zwischen engine.js und scope_verbote.json
# ---------------------------------------------------------------------------

def test_verbotsliste_sync():
    js = (ROOT / "app" / "engine.js").read_text(encoding="utf-8")
    # Den Array-Literal-Block 'const SCOPE_VERBOTE = [ ... ];' herausschneiden.
    block = re.search(r"const SCOPE_VERBOTE\s*=\s*\[(.*?)\]\s*;", js, re.DOTALL)
    assert block, "SCOPE_VERBOTE-Array in engine.js nicht gefunden"
    # Einfach-gequotete String-Literale parsen. Inhalt darf '\\' enthalten,
    # aber keine maskierten einfachen Anfuehrungszeichen (kommt hier nicht vor).
    js_muster = re.findall(r"'((?:[^'\\]|\\.)*)'", block.group(1))
    # JS-Escapes in tatsaechliche Strings aufloesen: \\ -> \ (die Muster nutzen
    # \\( , \\{ , \\\\ln , \\b ). json.loads mit Doppelquotes erledigt das sauber.
    js_muster = [json.loads('"' + s.replace('"', '\\"') + '"') for s in js_muster]
    json_muster = json.loads((ROOT / "scope_verbote.json").read_text(encoding="utf-8"))["verbote"]
    assert js_muster == json_muster, (
        "SCOPE_VERBOTE (engine.js) und scope_verbote.json muessen string-identisch sein.\n"
        f"engine.js: {js_muster}\njson:      {json_muster}"
    )


# ---------------------------------------------------------------------------
# Task 2.3 — Kein-Original-Test (Jaccard-Aehnlichkeit der Wort-3-Shingles)
# ---------------------------------------------------------------------------
# Schwelle 0.6: liegt die Jaccard-Aehnlichkeit eines Aufgaben-Fragetexts gegen
# IRGENDEINEN Originalabsatz >= 0.6, gilt die Aufgabe als zu nah am Original
# und der Test schlaegt fehl. 0.6 ist bewusst tolerant gegenueber unvermeidbarem
# Fachvokabular-Overlap ("bestimme die Nullstellen ..."), faengt aber woertliche
# Uebernahmen ganzer Saetze.

JACCARD_SCHWELLE = 0.6
SHINGLE_N = 3


def _normalisiere(text):
    text = text.lower()
    text = re.sub(r"[^\wäöüß ]+", " ", text, flags=re.UNICODE)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def _shingles(text, n=SHINGLE_N):
    woerter = _normalisiere(text).split()
    if len(woerter) < n:
        # Kurze Texte: ganze Wortmenge als ein Shingle-Set (sonst leer).
        return {tuple(woerter)} if woerter else set()
    return {tuple(woerter[i:i + n]) for i in range(len(woerter) - n + 1)}


def _jaccard(a, b):
    if not a and not b:
        return 0.0
    sa, sb = _shingles(a), _shingles(b)
    if not sa or not sb:
        return 0.0
    schnitt = len(sa & sb)
    vereinigung = len(sa | sb)
    return schnitt / vereinigung if vereinigung else 0.0


def _zu_pruefende_texte():
    """Felder, die eine KONKRETE Aufgabe tragen und nicht aus den Originalen
    uebernommen sein duerfen: die rechnen-Aufgabe + ihr Loesungsweg sowie die
    Simulator-Teilaufgaben (Frage + Erwartungsbild) — denn der Simulator soll
    laut Plan ausdruecklich *neue*, nie originale Aufgaben stellen.

    BEWUSST AUSGENOMMEN (Nutzer-Vorgabe: "hoechstens aehnliche Fragestellungen"):
    erklaeren-Fragen/-Erwartungsbilder, verfahren-Schritte und tipp. Das sind
    generische Konzeptfragen bzw. Standard-Verfahrensbeschreibungen im O-Ton der
    Pruefung ("Beschreiben Sie die Vorgehensweise ..."), deren Aehnlichkeit zu den
    Originalen erlaubt und teils gewollt ist; sie reproduzieren keine konkrete
    Aufgabe (keine spezifischen Zahlen/Funktionen).
    """
    texte = []
    for item in CONTENT["rechnen"]:
        if isinstance(item.get("frage"), str):
            texte.append((f"rechnen:{item['id']}:frage", item["frage"]))
        if isinstance(item.get("loesungsweg"), str):
            texte.append((f"rechnen:{item['id']}:loesungsweg", item["loesungsweg"]))
    for eintrag in CONTENT["simulator"]:
        for i, ta in enumerate(eintrag.get("teilaufgaben", []) or []):
            if isinstance(ta.get("frage"), str):
                texte.append((f"simulator:{eintrag['id']}#{i}:frage", ta["frage"]))
            for j, eb in enumerate(ta.get("erwartungsbild", []) or []):
                if isinstance(eb, str):
                    texte.append((f"simulator:{eintrag['id']}#{i}:eb{j}", eb))
    return texte


def _originalabsaetze():
    from tools.extract_exams import extract
    docx = sorted(ROOT.glob("*.docx"))
    absaetze = []
    for pfad in docx:
        try:
            absaetze.extend(extract(str(pfad)))
        except Exception:  # noqa: BLE001 — kaputte/geschuetzte Datei ignorieren
            continue
    return docx, absaetze


def test_kein_original():
    # HINWEIS (Code-Review I-3): Die Original-.docx sind gitignored. In einem
    # sauberen CI-Checkout wird dieser Plagiatswaechter uebersprungen — er greift
    # nur lokal beim Authoring (der relevante Zeitpunkt). "gruen" in CI heisst
    # hier NICHT "geprueft". Siehe Definition of Done im Plan.
    texte = _zu_pruefende_texte()
    docx, originale = _originalabsaetze()
    if not docx:
        pytest.skip("Keine Original-.docx vorhanden (gitignored) — Kein-Original-Test uebersprungen.")
    if not texte:
        # Leerer Inhalt: nichts zu pruefen, aber die Originale wurden geladen.
        return
    treffer = []
    for ident, text in texte:
        for absatz in originale:
            sim = _jaccard(text, absatz)
            if sim >= JACCARD_SCHWELLE:
                treffer.append((ident, round(sim, 3), absatz[:80]))
                break
    assert not treffer, f"Zu nah am Original (Jaccard >= {JACCARD_SCHWELLE}): {treffer}"
