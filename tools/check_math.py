"""sympy-Recompute-Harness fuer rechnen-Items / Simulator-Teilaufgaben.

Ein Item kann ein Feld "check" tragen, das die Loesung unabhaengig per sympy
nachrechnet. Drei art-Werte werden unterstuetzt (klar dispatcht, erweiterbar):

  {"art":"ausdruck","expr":"<sympy>", ["erwartet":<wert>]}
      -> sympify(expr); Vergleich mit check["erwartet"] falls vorhanden, sonst
         mit item["loesung"]. ("erwartet" ist fuer mc-Items ohne eigene loesung,
         z.B. Symmetrie-Identitaet ==0 oder Flaechenwert.)
         Toleranz aus item.get("toleranz", 0). Bei 0 -> exakt/symbolisch (1e-9-Reserve).

  {"art":"menge","gleichung":"<expr>","var":"x","erwartet":[...]}
      -> reelle Loesungen von expr == 0; Menge muss erwartet entsprechen.

  {"art":"vektor","expr":"<Matrix/3er-Vektor>","erwartet":[a,b,c]}
      -> komponentenweise gleich (Toleranz 1e-9).

Mapping der Plan-Operationen auf diese drei generischen arten (fuer Phase-3-Autoren):
  Nullstellen / Extremstellen / Wendestellen  -> art "menge" (Loesungen von expr==0)
  Integral / Flaeche / Skalarprodukt / Betrag / Abstand / Funktionswert -> art "ausdruck"
  Kreuzprodukt / Normalenvektor / Mittelpunkt / Vektorzug -> art "vektor"

pruefe_item(item) -> (bool, str)  — str = Begruendung bei Fehler ("" bei Erfolg).
"""
from sympy import (  # noqa: F401  (im Eval-Namespace gebraucht)
    Abs, Eq, Matrix, Rational, S, acos, cos, diff, integrate, nsimplify, pi, sin,
    solve, sqrt, sympify,
)
from sympy import symbols
from sympy.core.sympify import SympifyError

VEKTOR_TOLERANZ = 1e-9
# Numerische Reserve im "exakten" Vergleich gegen Float-Rauschen (z.B. 0.1+0.2 != 0.3).
EXAKT_TOLERANZ = 1e-9

# Namespace fuer sympify: erlaubt expr-Strings wie
# "integrate(-5*x**2/4+5,(x,-2,2))" oder "Matrix([1,0,0]).cross(...)".
_NS = {
    "x": symbols("x"),
    "y": symbols("y"),
    "z": symbols("z"),
    "Matrix": Matrix,
    "Rational": Rational,
    "S": S,
    "sqrt": sqrt,
    "pi": pi,
    "cos": cos,
    "sin": sin,
    "acos": acos,
    "Abs": Abs,
    "diff": diff,
    "integrate": integrate,
    "solve": solve,
}


def _sympify(ausdruck):
    return sympify(ausdruck, locals=_NS)


def pruefe_item(item):
    check = item.get("check")
    if not isinstance(check, dict):
        return False, "Kein gueltiges 'check'-Feld vorhanden."
    art = check.get("art")
    if art == "ausdruck":
        return _pruefe_ausdruck(item, check)
    if art == "menge":
        return _pruefe_menge(check)
    if art == "vektor":
        return _pruefe_vektor(check)
    return False, f"Unbekannte check-art: {art!r}"


def _pruefe_ausdruck(item, check):
    # Vergleichswert: bevorzugt check["erwartet"] (fuer mc-Items ohne eigene
    # loesung, z.B. Symmetrie-Identitaet == 0 oder Flaechenwert), sonst die
    # numerische loesung des Items.
    if "erwartet" in check:
        ziel = check["erwartet"]
    elif "loesung" in item:
        ziel = item["loesung"]
    else:
        return False, "art=ausdruck erfordert 'loesung' (Item) oder 'erwartet' (check)."
    try:
        wert = _sympify(check["expr"])
    except (SympifyError, SyntaxError, TypeError, ValueError) as e:
        return False, f"expr nicht auswertbar: {e}"
    try:
        soll = _sympify(ziel)
    except (SympifyError, SyntaxError, TypeError, ValueError) as e:
        return False, f"Vergleichswert nicht auswertbar: {e}"

    toleranz = item.get("toleranz", 0)
    if toleranz:
        try:
            diff_betrag = abs(float((wert - soll).evalf()))
        except (TypeError, ValueError) as e:
            return False, f"numerischer Vergleich fehlgeschlagen: {e}"
        if diff_betrag <= float(toleranz):
            return True, ""
        return False, (
            f"Abweichung {diff_betrag:g} > Toleranz {float(toleranz):g} "
            f"(berechnet {wert.evalf()}, erwartet {soll.evalf()})."
        )

    # Toleranz 0 -> exakter/symbolischer Vergleich (mit kleiner numerischer
    # Reserve gegen Float-Rauschen, damit z.B. loesung 0.3 vs. 0.1+0.2 nicht
    # faelschlich als Fehler gilt).
    diff_ausdruck = (wert - soll)
    try:
        if diff_ausdruck.simplify() == 0:
            return True, ""
    except Exception:  # noqa: BLE001 — simplify kann an exotischen Ausdruecken scheitern
        pass
    # Fallback nur ohne freie Symbole: symbolische Ungleichheit NICHT numerisch
    # ueberdecken (dann ist es ein echter Fehler), aber Float-Rauschen abfangen.
    try:
        if not diff_ausdruck.free_symbols and abs(float(diff_ausdruck.evalf())) <= EXAKT_TOLERANZ:
            return True, ""
    except (TypeError, ValueError):
        pass
    return False, f"Exakter Vergleich fehlgeschlagen: berechnet {wert}, erwartet {soll}."


def _pruefe_menge(check):
    for feld in ("gleichung", "var", "erwartet"):
        if feld not in check:
            return False, f"art=menge erfordert Feld '{feld}'."
    try:
        var = symbols(check["var"])
        expr = sympify(check["gleichung"], locals={**_NS, check["var"]: var})
    except (SympifyError, SyntaxError, TypeError, ValueError) as e:
        return False, f"gleichung nicht auswertbar: {e}"
    # Reelle Loesungen behalten. is_real kann bei verschachtelten Radikalen None
    # (unentscheidbar) sein -> einschliessen statt still verwerfen; nur sicher
    # komplexe (is_real is False) ausschliessen.
    loesungen = solve(Eq(expr, 0), var)
    loesungen = [l for l in loesungen if l.is_real is not False]
    ist = {nsimplify(l) for l in loesungen}
    try:
        soll = {nsimplify(_sympify(e)) for e in check["erwartet"]}
    except (SympifyError, SyntaxError, TypeError, ValueError) as e:
        return False, f"erwartet nicht auswertbar: {e}"
    if ist == soll:
        return True, ""
    return False, f"Loesungsmenge {ist} != erwartet {soll}."


def _pruefe_vektor(check):
    for feld in ("expr", "erwartet"):
        if feld not in check:
            return False, f"art=vektor erfordert Feld '{feld}'."
    try:
        wert = _sympify(check["expr"])
    except (SympifyError, SyntaxError, TypeError, ValueError) as e:
        return False, f"expr nicht auswertbar: {e}"
    try:
        komponenten = list(wert)
    except TypeError:
        return False, f"expr liefert keinen iterierbaren Vektor: {wert!r}"
    erwartet = check["erwartet"]
    if len(komponenten) != len(erwartet):
        return False, (
            f"Komponentenzahl {len(komponenten)} != erwartet {len(erwartet)}."
        )
    for i, (k, e) in enumerate(zip(komponenten, erwartet)):
        try:
            diff_betrag = abs(float((k - _sympify(e)).evalf()))
        except (TypeError, ValueError, SympifyError) as exc:
            return False, f"Komponente {i} nicht vergleichbar: {exc}"
        if diff_betrag > VEKTOR_TOLERANZ:
            return False, (
                f"Komponente {i}: {k} != erwartet {e} (Abweichung {diff_betrag:g})."
            )
    return True, ""
