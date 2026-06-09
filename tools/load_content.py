"""Laedt app/content.js als Python-dict.

Die Datei ist KEIN ausfuehrbares JS-Modul fuer uns: wir schneiden das
JSON-Objektliteral zwischen `const CONTENT =` und `};\nwindow.CONTENT` per
Regex heraus und parsen es mit json.loads. Das Objektliteral MUSS daher
gueltiges JSON sein (doppelte Anfuehrungszeichen, keine trailing commas).
"""
import json
import re
from pathlib import Path

# Greift das Objektliteral inkl. schliessender '}' (vor dem ';\nwindow.CONTENT').
_MUSTER = re.compile(r"const CONTENT\s*=\s*(\{.*\})\s*;\s*\n\s*window\.CONTENT", re.DOTALL)


def load_content(pfad="app/content.js"):
    """Liest content.js (utf-8) und liefert das CONTENT-Objekt als dict."""
    text = Path(pfad).read_text(encoding="utf-8")
    treffer = _MUSTER.search(text)
    if not treffer:
        raise ValueError(f"CONTENT-Objektliteral in {pfad} nicht gefunden.")
    return json.loads(treffer.group(1))


if __name__ == "__main__":
    c = load_content()
    print(c["version"], len(c["themen"]))
