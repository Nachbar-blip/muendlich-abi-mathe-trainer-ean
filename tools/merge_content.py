"""Mergt das Ergebnis des Inhalts-Workflows (Autor+Verify) in app/content.js und
schreibt das Wolfram-/sympy-Verifikationsprotokoll nach tests/wolfram_log.md.

Aufruf:  python tools/merge_content.py <pfad-zur-workflow-output-datei>

Die Themen-Reihenfolge im Workflow-Ergebnis entspricht TOPIC_ORDER (so wie in
tools/wf_inhalt.js definiert). Jedes Item bekommt sein 'thema' injiziert; zwei
mc-Items ohne eigene loesung erhalten check['erwartet'] (verifizierter Wert).
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from tools.load_content import load_content  # noqa: E402

TOPIC_ORDER = [
    "ana-eigenschaften", "ana-nullstellen", "ana-extrema-wende", "ana-ableitung-graph",
    "ana-rekonstruktion", "ana-integral", "ana-scharen",
    "geo-vektoren-geraden", "geo-ebene", "geo-lage-ebenen", "geo-lage-gerade-ebene",
    "geo-winkel", "geo-abstand-hnf",
]

# mc-Items mit check art=ausdruck ohne eigene loesung -> verifizierter Vergleichswert.
# Leer: die Verify-Agenten tragen check.erwartet bei solchen mc-Items inline ein.
ERWARTET_PATCH = {}


def main(out_pfad):
    daten = json.loads(Path(out_pfad).read_text(encoding="utf-8"))
    res = daten["result"]
    if isinstance(res, str):
        res = json.loads(res)
    themen_res = res["themen"]
    sim_res = res["simulator"]
    assert len(themen_res) == len(TOPIC_ORDER), (len(themen_res), len(TOPIC_ORDER))

    content = load_content()  # vorhandenes Skelett mit den 10 themen-Definitionen
    content["verfahren"] = []
    content["rechnen"] = []
    content["erklaeren"] = []
    content["simulator"] = []

    log_rows = []
    for key, tr in zip(TOPIC_ORDER, themen_res):
        for kind in ("verfahren", "rechnen", "erklaeren"):
            for it in tr.get(kind, []):
                assert it["id"].startswith(key), f"id {it['id']} passt nicht zu thema {key}"
                it["thema"] = key
                if it["id"] in ERWARTET_PATCH:
                    it.setdefault("check", {})["erwartet"] = ERWARTET_PATCH[it["id"]]
                content[kind].append(it)
        for pr in tr.get("pruefprotokoll", []):
            log_rows.append((pr.get("id", ""), pr.get("status", ""),
                             pr.get("wolfram_query", ""), pr.get("wolfram_ergebnis", ""),
                             pr.get("anmerkung", "")))

    for s in sim_res:
        content["simulator"].append({
            "id": s["id"], "gebiet": s["gebiet"], "teilaufgaben": s["teilaufgaben"],
        })
        for pr in s.get("pruefprotokoll", []):
            log_rows.append((f"{s['id']}/{pr.get('teil', '')}", pr.get("status", ""),
                             pr.get("wolfram_query", ""), pr.get("wolfram_ergebnis", ""),
                             pr.get("anmerkung", "")))

    # content.js schreiben (gueltiges JSON-Objektliteral + window-Zuweisung)
    js = "const CONTENT = " + json.dumps(content, ensure_ascii=False, indent=2) + ";\nwindow.CONTENT = CONTENT;\n"
    (ROOT / "app" / "content.js").write_text(js, encoding="utf-8")

    # wolfram_log.md schreiben
    md = [
        "# Wolfram-/sympy-Verifikationsprotokoll",
        "",
        "Automatisch aus dem Inhalts-Workflow erzeugt. Jedes rechnerische Item wurde",
        "unabhaengig mit **sympy** UND dem **Wolfram-Konnektor** gegengeprueft.",
        "",
        f"Items im Protokoll: {len(log_rows)}",
        "",
        "| ID | Status | Wolfram-Query | Wolfram-Ergebnis | Anmerkung |",
        "|----|--------|---------------|------------------|-----------|",
    ]
    for row in log_rows:
        cells = [str(c).replace("|", "\\|").replace("\n", " ").strip() for c in row]
        md.append("| " + " | ".join(cells) + " |")
    (ROOT / "tests" / "wolfram_log.md").write_text("\n".join(md) + "\n", encoding="utf-8")

    print("MERGE OK:",
          "verfahren", len(content["verfahren"]),
          "rechnen", len(content["rechnen"]),
          "erklaeren", len(content["erklaeren"]),
          "simulator", len(content["simulator"]),
          "log_rows", len(log_rows))


if __name__ == "__main__":
    main(sys.argv[1])
