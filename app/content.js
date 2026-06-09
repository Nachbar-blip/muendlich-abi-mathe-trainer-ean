const CONTENT = {
  "version": 1,
  "themen": [
    {
      "key": "ana-eigenschaften",
      "gebiet": "analysis",
      "name": "Eigenschaften & Symmetrie"
    },
    {
      "key": "ana-nullstellen",
      "gebiet": "analysis",
      "name": "Nullstellen (inkl. Substitution)"
    },
    {
      "key": "ana-extrema-wende",
      "gebiet": "analysis",
      "name": "Extrema & Wendepunkte"
    },
    {
      "key": "ana-ableitung-graph",
      "gebiet": "analysis",
      "name": "Ableitung und Graph"
    },
    {
      "key": "ana-rekonstruktion",
      "gebiet": "analysis",
      "name": "Rekonstruktion (Steckbrief)"
    },
    {
      "key": "ana-integral",
      "gebiet": "analysis",
      "name": "Integral: Flaeche & Rotationsvolumen"
    },
    {
      "key": "ana-scharen",
      "gebiet": "analysis",
      "name": "Funktionenscharen"
    },
    {
      "key": "geo-vektoren-geraden",
      "gebiet": "geometrie",
      "name": "Vektoren & Geraden"
    },
    {
      "key": "geo-ebene",
      "gebiet": "geometrie",
      "name": "Ebenen aufstellen (+ Scharen)"
    },
    {
      "key": "geo-lage-ebenen",
      "gebiet": "geometrie",
      "name": "Lage & Schnittgerade von Ebenen"
    },
    {
      "key": "geo-lage-gerade-ebene",
      "gebiet": "geometrie",
      "name": "Lage Gerade-Ebene"
    },
    {
      "key": "geo-winkel",
      "gebiet": "geometrie",
      "name": "Winkel"
    },
    {
      "key": "geo-abstand-hnf",
      "gebiet": "geometrie",
      "name": "HNF & Abstaende"
    }
  ],
  "verfahren": [
    {
      "id": "ana-eigenschaften-v1",
      "frage": "Bringen Sie die Schritte in die richtige Reihenfolge, um die wesentlichen Eigenschaften des Graphen einer ganzrationalen Funktion \\(f\\) OHNE Rechnung allein aus ihrem Funktionsterm abzulesen.",
      "schritte": [
        "Bestimme den Grad \\(n\\) (hoechster Exponent) und den Leitkoeffizienten \\(a_n\\) (Vorfaktor der hoechsten Potenz).",
        "Lies das Grenzverhalten ab: bei geradem \\(n\\) streben beide Aeste in dieselbe Richtung (nach \\(+\\infty\\) falls \\(a_n>0\\), nach \\(-\\infty\\) falls \\(a_n<0\\)); bei ungeradem \\(n\\) streben sie in entgegengesetzte Richtungen.",
        "Pruefe die Symmetrie ueber die Exponenten: treten nur gerade Exponenten auf, ist der Graph achsensymmetrisch zur y-Achse; treten nur ungerade Exponenten auf, ist er punktsymmetrisch zum Ursprung.",
        "Lies den y-Achsenabschnitt als das absolute Glied \\(f(0)=a_0\\) direkt ab.",
        "Gib die Hoechstzahlen an: hoechstens \\(n\\) Nullstellen, hoechstens \\(n-1\\) Extremstellen und hoechstens \\(n-2\\) Wendestellen."
      ],
      "thema": "ana-eigenschaften"
    },
    {
      "id": "ana-nullstellen-v1",
      "frage": "Beschreiben Sie die Vorgehensweise, um die Nullstellen einer biquadratischen Funktion der Form \\( f(x)=a x^{4}+b x^{2}+c \\) mit Hilfe der Substitution zu bestimmen.",
      "schritte": [
        "Setze \\( f(x)=0 \\), also \\( a x^{4}+b x^{2}+c=0 \\), und substituiere \\( z=x^{2} \\). Dadurch entsteht die quadratische Gleichung \\( a z^{2}+b z+c=0 \\).",
        "Loese die quadratische Gleichung in \\( z \\) mit der pq- bzw. Mitternachtsformel und erhalte die Werte \\( z_{1} \\) und \\( z_{2} \\).",
        "Ruecksubstituiere \\( z=x^{2} \\): Loese \\( x^{2}=z_{1} \\) und \\( x^{2}=z_{2} \\). Nur Werte \\( z\\ge 0 \\) liefern reelle Loesungen \\( x=\\pm\\sqrt{z} \\); negative \\( z \\)-Werte ergeben keine reelle Nullstelle.",
        "Fasse alle reellen Loesungen zur Loesungsmenge zusammen und gib die Nullstellen an."
      ],
      "thema": "ana-nullstellen"
    },
    {
      "id": "ana-extrema-wende-v1",
      "frage": "Beschreiben Sie die Vorgehensweise, um die Wendepunkte einer ganzrationalen Funktion \\(f\\) mithilfe des \\(f'''\\)-Kriteriums zu bestimmen.",
      "schritte": [
        "Bilde die zweite Ableitung \\(f''(x)\\) und setze sie gleich null: \\(f''(x)=0\\) (notwendige Bedingung). Loese die Gleichung nach \\(x\\) auf und erhalte die Kandidaten \\(x_0\\).",
        "Bilde die dritte Ableitung \\(f'''(x)\\) und setze jede Loesung \\(x_0\\) ein. Gilt \\(f'''(x_0)\\neq 0\\), so ist \\(x_0\\) eine Wendestelle (hinreichende Bedingung erfuellt).",
        "Ist \\(f'''(x_0)=0\\), so liefert das Kriterium keine Entscheidung; untersuche dann das Vorzeichenwechselverhalten von \\(f''\\) an der Stelle \\(x_0\\).",
        "Berechne fuer jede bestaetigte Wendestelle den Funktionswert \\(f(x_0)\\) und gib den Wendepunkt als \\(W\\,(x_0\\mid f(x_0))\\) an."
      ],
      "thema": "ana-extrema-wende"
    },
    {
      "id": "ana-ableitung-graph-v1",
      "frage": "Gegeben ist der Graph der Ableitungsfunktion \\(f'\\). Beschreiben Sie die Vorgehensweise, mit der Sie aus dem Verlauf von \\(f'\\) die Extremstellen von \\(f\\) und deren Art bestimmen.",
      "schritte": [
        "Lies aus dem Graphen die Nullstellen von \\(f'\\) ab; nur dort kann \\(f\\) eine waagerechte Tangente und damit eine Extremstelle haben (notwendige Bedingung \\(f'(x_0)=0\\)).",
        "Untersuche an jeder Nullstelle, ob der Graph von \\(f'\\) die x-Achse mit Vorzeichenwechsel schneidet (hinreichende Bedingung) oder sie nur beruehrt (kein Vorzeichenwechsel \\(\\Rightarrow\\) keine Extremstelle).",
        "Bestimme bei einem Vorzeichenwechsel die Richtung: Wechselt \\(f'\\) von \\(-\\) nach \\(+\\), so liegt eine Tiefpunktstelle (Minimum) vor; wechselt \\(f'\\) von \\(+\\) nach \\(-\\), so liegt eine Hochpunktstelle (Maximum) vor.",
        "Notiere abschliessend zu jeder gefundenen Extremstelle ihre x-Koordinate und die Art (Hoch- oder Tiefpunkt)."
      ],
      "thema": "ana-ableitung-graph"
    },
    {
      "id": "ana-rekonstruktion-v1",
      "frage": "Beschreiben Sie die Vorgehensweise, mit der man eine ganzrationale Funktion 3. Grades aus vier gegebenen Eigenschaften (z. B. Punkten, waagerechten Tangenten, Wendepunkt) rekonstruiert.",
      "schritte": [
        "Allgemeinen Funktionsansatz mit unbekannten Koeffizienten notieren: \\( f(x)=a x^{3}+b x^{2}+c x+d \\).",
        "Die benoetigten Ableitungen bilden: \\( f'(x)=3a x^{2}+2b x+c \\) und \\( f''(x)=6a x+2b \\).",
        "Jede gegebene Eigenschaft in eine Gleichung uebersetzen: ein Punkt \\((x_0\\mid y_0)\\) liefert \\( f(x_0)=y_0 \\), eine waagerechte Tangente an der Stelle \\(x_0\\) liefert \\( f'(x_0)=0 \\), eine Wendestelle \\(x_0\\) liefert \\( f''(x_0)=0 \\).",
        "Die so entstandenen Gleichungen zu einem linearen Gleichungssystem in den Unbekannten \\(a,b,c,d\\) zusammenstellen (vier Bedingungen fuer vier Unbekannte).",
        "Das lineare Gleichungssystem loesen (z. B. Einsetzen oder Gauss-Verfahren) und die gefundenen Koeffizienten in den Ansatz einsetzen.",
        "Das Ergebnis kontrollieren, indem man jede geforderte Bedingung in die gefundene Funktion einsetzt und prueft, ob sie erfuellt ist."
      ],
      "thema": "ana-rekonstruktion"
    },
    {
      "id": "ana-integral-v1",
      "frage": "Beschreiben Sie die Vorgehensweise zur Berechnung der Flaeche, die der Graph einer ganzrationalen Funktion \\(f\\) und seine Tangente \\(t\\) im Beruehrpunkt \\(B(x_0\\mid f(x_0))\\) vollstaendig einschliessen.",
      "schritte": [
        "Tangentengleichung im Punkt \\(x_0\\) aufstellen: \\(t(x)=f'(x_0)\\,(x-x_0)+f(x_0)\\).",
        "Differenzfunktion \\(d(x)=f(x)-t(x)\\) bilden und gleich null setzen, um alle Schnitt- bzw. Beruehrstellen zu bestimmen; \\(x_0\\) ist dabei eine doppelte Nullstelle.",
        "Aus den Loesungen die zweite Grenze ablesen, sodass das Integrationsintervall \\([x_0,\\,x_1]\\) (bzw. \\([x_1,\\,x_0]\\)) zwischen Beruehrpunkt und weiterem Schnittpunkt feststeht.",
        "Auf diesem Intervall das Vorzeichen von \\(d(x)\\) pruefen, damit obere minus untere Kurve korrekt eingesetzt wird.",
        "Die Flaeche als bestimmtes Integral \\(A=\\left|\\int_{x_0}^{x_1}\\bigl(f(x)-t(x)\\bigr)\\,dx\\right|\\) berechnen und das Ergebnis mit Flaecheneinheiten angeben."
      ],
      "thema": "ana-integral"
    },
    {
      "id": "ana-scharen-v1",
      "frage": "Bringen Sie die Schritte in die richtige Reihenfolge, um den (von \\(k\\) unabhaengigen) gemeinsamen Punkt aller Kurven einer Funktionenschar \\(f_k\\) zu bestimmen.",
      "schritte": [
        "Notiere den Funktionsterm \\(f_k(x)\\) und ordne ihn so, dass der Parameter \\(k\\) ausgeklammert ist: \\(f_k(x) = k\\cdot g(x) + h(x)\\).",
        "Ein Punkt liegt genau dann auf allen Kurven der Schar, wenn sein \\(y\\)-Wert nicht von \\(k\\) abhaengt; das ist dort der Fall, wo der \\(k\\)-Term verschwindet, also wo \\(g(x)=0\\) ist.",
        "Loese die Gleichung \\(g(x)=0\\) und erhalte die \\(x\\)-Koordinate(n) der moeglichen gemeinsamen Punkte.",
        "Setze jede gefundene \\(x\\)-Koordinate in \\(f_k(x)\\) ein; da der \\(k\\)-Term dort wegfaellt, ergibt sich ein fester Wert \\(y=h(x)\\) ohne \\(k\\).",
        "Gib den gemeinsamen Punkt \\((x \\mid y)\\) an; zur Kontrolle pruefe, dass dieser \\(y\\)-Wert tatsaechlich frei von \\(k\\) ist."
      ],
      "thema": "ana-scharen"
    },
    {
      "id": "geo-vektoren-geraden-v1",
      "frage": "Geben Sie die Vorgehensweise an, um zu pruefen, ob ein Punkt \\(P\\) auf der Geraden \\(g: \\vec{x} = \\vec{a} + t\\cdot\\vec{u}\\) liegt (Punktprobe).",
      "schritte": [
        "Den Punkt in die Geradengleichung einsetzen: \\(\\vec{p} = \\vec{a} + t\\cdot\\vec{u}\\), also komponentenweise drei Gleichungen aufstellen.",
        "Aus einer Komponentengleichung den Parameter \\(t\\) berechnen (z. B. aus der ersten Zeile).",
        "Diesen Wert von \\(t\\) in die beiden uebrigen Komponentengleichungen einsetzen und pruefen, ob sie ebenfalls erfuellt sind.",
        "Sind alle drei Gleichungen mit demselben \\(t\\) erfuellt, liegt \\(P\\) auf \\(g\\); andernfalls liegt \\(P\\) nicht auf \\(g\\)."
      ],
      "thema": "geo-vektoren-geraden"
    },
    {
      "id": "geo-ebene-v1",
      "frage": "Eine Ebene ist in Parameterform gegeben durch \\( E:\\ \\vec{x} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + s\\begin{pmatrix} 2 \\\\ 1 \\\\ -1 \\end{pmatrix} + t\\begin{pmatrix} 0 \\\\ 3 \\\\ 1 \\end{pmatrix} \\). Bringen Sie die Schritte in die richtige Reihenfolge, um die Koordinatengleichung zu bestimmen.",
      "schritte": [
        "Die beiden Spannvektoren \\( \\vec{u} = \\begin{pmatrix} 2 \\\\ 1 \\\\ -1 \\end{pmatrix} \\) und \\( \\vec{v} = \\begin{pmatrix} 0 \\\\ 3 \\\\ 1 \\end{pmatrix} \\) der Parameterform ablesen.",
        "Den Normalenvektor als Kreuzprodukt der Spannvektoren berechnen: \\( \\vec{n} = \\vec{u} \\times \\vec{v} = \\begin{pmatrix} 4 \\\\ -2 \\\\ 6 \\end{pmatrix} \\).",
        "Mit \\( \\vec{n} \\) den Ansatz der Koordinatengleichung aufstellen: \\( 4x - 2y + 6z = d \\).",
        "Den Stuetzpunkt \\( (1\\mid 2\\mid 3) \\) einsetzen, um \\( d \\) zu bestimmen: \\( d = 4\\cdot 1 - 2\\cdot 2 + 6\\cdot 3 = 18 \\).",
        "Die fertige Koordinatengleichung angeben: \\( E:\\ 4x - 2y + 6z = 18 \\)."
      ],
      "thema": "geo-ebene"
    },
    {
      "id": "geo-lage-ebenen-v1",
      "frage": "Beschreiben Sie die Vorgehensweise, um die Lagebeziehung zweier in Koordinatenform gegebener Ebenen \\(E_1\\) und \\(E_2\\) zu bestimmen und im Schnittfall eine Gleichung der Schnittgeraden zu ermitteln.",
      "schritte": [
        "Normalenvektoren \\(\\vec{n}_1\\) und \\(\\vec{n}_2\\) aus den Koordinatenformen ablesen und auf lineare Abhaengigkeit pruefen (gibt es ein \\(k\\) mit \\(\\vec{n}_2 = k\\,\\vec{n}_1\\), bzw. ist \\(\\vec{n}_1 \\times \\vec{n}_2 = \\vec{0}\\)?).",
        "Sind die Normalenvektoren NICHT parallel, schneiden sich die Ebenen; sind sie parallel, in eine der parallelen Ebenengleichungen einen Punkt der anderen einsetzen: stimmt die Gleichung, sind die Ebenen identisch, sonst echt parallel.",
        "Im Schnittfall die beiden Koordinatengleichungen als lineares Gleichungssystem mit drei Unbekannten auffassen und EINE Variable als Parameter setzen, z. B. \\(z = t\\).",
        "Das LGS nach den beiden uebrigen Variablen aufloesen, sodass \\(x\\) und \\(y\\) in Abhaengigkeit von \\(t\\) ausgedrueckt sind.",
        "Die Loesung als Geradengleichung in Parameterform \\(\\vec{x} = \\vec{p} + t\\,\\vec{u}\\) zusammenfassen (Stuetzpunkt \\(\\vec{p}\\) aus dem t-freien Anteil, Richtungsvektor \\(\\vec{u}\\) aus den t-Koeffizienten); zur Kontrolle muss \\(\\vec{u}\\) parallel zu \\(\\vec{n}_1 \\times \\vec{n}_2\\) sein."
      ],
      "thema": "geo-lage-ebenen"
    },
    {
      "id": "geo-lage-gerade-ebene-v1",
      "frage": "Eine Gerade \\( g: \\vec{x} = \\vec{p} + t\\,\\vec{u} \\) und eine Ebene \\( E \\) in Koordinatenform \\( a x + b y + c z = d \\) mit Normalenvektor \\( \\vec{n} = \\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix} \\) sind gegeben. Bringen Sie die Schritte zur Bestimmung der Lagebeziehung in die richtige Reihenfolge.",
      "schritte": [
        "Allgemeinen Geradenpunkt aufstellen: setze \\( \\vec{x} = \\vec{p} + t\\,\\vec{u} \\), also die Koordinaten \\( (p_1 + t u_1,\\; p_2 + t u_2,\\; p_3 + t u_3) \\).",
        "Diese drei Koordinaten in die Koordinatenform \\( a x + b y + c z = d \\) der Ebene einsetzen; es entsteht eine lineare Gleichung mit der einzigen Unbekannten \\( t \\).",
        "Die Gleichung nach \\( t \\) zusammenfassen und die Anzahl der Loesungen ablesen.",
        "Genau eine Loesung \\( t \\): Gerade schneidet die Ebene; setze \\( t \\) in \\( g \\) ein und erhalte den Durchstosspunkt.",
        "Keine Loesung (Widerspruch, z. B. \\( 0 = 5 \\)): Gerade ist echt parallel zur Ebene, denn \\( \\vec{n}\\cdot\\vec{u} = 0 \\) und der Stuetzpunkt liegt nicht in \\( E \\).",
        "Alle \\( t \\) sind Loesung (wahre Aussage, z. B. \\( 0 = 0 \\)): Gerade liegt vollstaendig in der Ebene."
      ],
      "thema": "geo-lage-gerade-ebene"
    },
    {
      "id": "geo-winkel-v1",
      "frage": "Gegeben sind zwei Ebenen \\(E_1\\) und \\(E_2\\) jeweils in Koordinatenform. Beschreiben Sie das Standardverfahren, um den Schnittwinkel \\(\\alpha\\) zwischen den beiden Ebenen zu bestimmen.",
      "schritte": [
        "Aus den Koordinatenformen die Normalenvektoren ablesen: \\(\\vec{n_1}\\) zu \\(E_1\\) und \\(\\vec{n_2}\\) zu \\(E_2\\).",
        "Das Skalarprodukt \\(\\vec{n_1}\\cdot\\vec{n_2}\\) berechnen und davon den Betrag \\(|\\vec{n_1}\\cdot\\vec{n_2}|\\) nehmen (der Betrag stellt sicher, dass der spitze Winkel herauskommt).",
        "Die Betraege (Laengen) der Normalenvektoren berechnen: \\(|\\vec{n_1}|\\) und \\(|\\vec{n_2}|\\).",
        "In die Formel einsetzen: \\(\\cos\\alpha=\\dfrac{|\\vec{n_1}\\cdot\\vec{n_2}|}{|\\vec{n_1}|\\cdot|\\vec{n_2}|}\\).",
        "Den Winkel durch \\(\\alpha=\\arccos\\!\\left(\\dfrac{|\\vec{n_1}\\cdot\\vec{n_2}|}{|\\vec{n_1}|\\,|\\vec{n_2}|}\\right)\\) bestimmen; \\(\\alpha\\) liegt zwischen \\(0^\\circ\\) und \\(90^\\circ\\)."
      ],
      "thema": "geo-winkel"
    },
    {
      "id": "geo-abstand-hnf-v1",
      "frage": "Beschreiben Sie die Vorgehensweise, um den Abstand eines Punktes \\(P\\) von einer in Koordinatenform \\(ax+by+cz=d_0\\) gegebenen Ebene \\(E\\) mit Hilfe der HESSEschen Normalform zu bestimmen.",
      "schritte": [
        "Den Normalenvektor \\(\\vec{n}=\\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix}\\) der Ebene ablesen und seinen Betrag \\(|\\vec{n}|=\\sqrt{a^2+b^2+c^2}\\) berechnen.",
        "Die Koordinatenform durch \\(|\\vec{n}|\\) teilen, sodass der Normalenvektor normiert ist (HESSEsche Normalform): \\(\\frac{a x + b y + c z - d_0}{\\sqrt{a^2+b^2+c^2}}=0\\).",
        "Die Koordinaten des Punktes \\(P(p_1\\,|\\,p_2\\,|\\,p_3)\\) in die linke Seite der HESSEschen Normalform einsetzen.",
        "Den Betrag des erhaltenen Wertes bilden: \\(d=\\dfrac{|a p_1 + b p_2 + c p_3 - d_0|}{\\sqrt{a^2+b^2+c^2}}\\). Dies ist der gesuchte Abstand."
      ],
      "thema": "geo-abstand-hnf"
    }
  ],
  "rechnen": [
    {
      "id": "ana-eigenschaften-r1",
      "level": 1,
      "typ": "mc",
      "frage": "Welche Symmetrie besitzt der Graph von \\( f(x) = 2x^4 - 3x^2 + 1 \\)? Begruenden Sie ohne Wertetabelle ueber die Exponenten.",
      "tipp": "Schaue nur auf die Exponenten der vorkommenden Potenzen von \\(x\\). Die Konstante \\(1\\) zaehlt wie \\(x^0\\) und hat damit einen geraden Exponenten.",
      "loesungsweg": "Es treten ausschliesslich gerade Exponenten auf (\\(x^4,\\,x^2,\\,x^0\\)). Damit gilt \\( f(-x)=f(x) \\), denn jede Potenz mit geradem Exponenten bleibt beim Ersetzen von \\(x\\) durch \\(-x\\) unveraendert. Der Graph ist also achsensymmetrisch zur y-Achse.",
      "optionen": [
        "Achsensymmetrisch zur y-Achse",
        "Punktsymmetrisch zum Ursprung",
        "Keine Symmetrie zum Koordinatensystem"
      ],
      "korrekt": 0,
      "check": {
        "art": "ausdruck",
        "expr": "(2*(-x)**4-3*(-x)**2+1)-(2*x**4-3*x**2+1)",
        "erwartet": 0
      },
      "thema": "ana-eigenschaften"
    },
    {
      "id": "ana-eigenschaften-r2",
      "level": 2,
      "typ": "numerisch",
      "frage": "Gegeben ist die achsensymmetrische Funktion \\( f(x) = x^4 - 2x^2 + 1 \\). Berechnen Sie den Funktionswert \\( f(-2) \\).",
      "tipp": "Wegen der Achsensymmetrie gilt \\(f(-2)=f(2)\\). Beachte bei den geraden Exponenten: \\((-2)^4=16\\) und \\((-2)^2=4\\).",
      "loesungsweg": "\\( f(-2) = (-2)^4 - 2\\cdot(-2)^2 + 1 = 16 - 2\\cdot 4 + 1 = 16 - 8 + 1 = 9 \\). (Probe ueber die Symmetrie: \\(f(2)=16-8+1=9\\), identisch.)",
      "loesung": 9,
      "check": {
        "art": "ausdruck",
        "expr": "(-2)**4-2*(-2)**2+1"
      },
      "thema": "ana-eigenschaften"
    },
    {
      "id": "ana-eigenschaften-r3",
      "level": 2,
      "typ": "numerisch",
      "frage": "Eine ganzrationale Funktion hat den Grad \\(4\\). Geben Sie die hoechstmoegliche Anzahl reeller Nullstellen an, die ihr Graph haben kann.",
      "tipp": "Eine ganzrationale Funktion vom Grad \\(n\\) hat hoechstens \\(n\\) reelle Nullstellen.",
      "loesungsweg": "Der Grad ist \\(n=4\\). Eine ganzrationale Funktion vom Grad \\(n\\) kann hoechstens \\(n\\) reelle Nullstellen besitzen, denn ihr Term laesst sich in hoechstens \\(n\\) Linearfaktoren zerlegen. Also sind hoechstens \\(4\\) Nullstellen moeglich.",
      "loesung": 4,
      "check": {
        "art": "ausdruck",
        "expr": "4"
      },
      "thema": "ana-eigenschaften"
    },
    {
      "id": "ana-eigenschaften-r4",
      "level": 3,
      "typ": "mc",
      "frage": "Bestimmen Sie ohne Rechnung das Grenzverhalten von \\( f(x) = -x^3 + 2x \\) fuer \\( x \\to -\\infty \\).",
      "tipp": "Fuer das Grenzverhalten entscheidet allein das Glied mit der hoechsten Potenz, hier \\(-x^3\\). Der Grad \\(3\\) ist ungerade, der Leitkoeffizient \\(-1\\) ist negativ.",
      "loesungsweg": "Massgeblich ist der Summand \\(-x^3\\). Fuer \\( x \\to -\\infty \\) gilt \\( x^3 \\to -\\infty \\), also \\( -x^3 \\to +\\infty \\). Damit folgt \\( \\lim\\limits_{x\\to -\\infty} f(x) = +\\infty \\). (Allgemein: ungerader Grad und negativer Leitkoeffizient bedeuten links \\(+\\infty\\) und rechts \\(-\\infty\\).)",
      "optionen": [
        "\\( f(x) \\to -\\infty \\)",
        "\\( f(x) \\to +\\infty \\)",
        "\\( f(x) \\to 0 \\)"
      ],
      "korrekt": 1,
      "check": {
        "art": "ausdruck",
        "expr": "-1*(-1)**3",
        "erwartet": 1
      },
      "thema": "ana-eigenschaften"
    },
    {
      "id": "ana-eigenschaften-r5",
      "level": 3,
      "typ": "numerisch",
      "frage": "Geben Sie ohne Rechnung die hoechstmoegliche Anzahl von Wendepunkten des Graphen einer ganzrationalen Funktion vom Grad \\(4\\) an.",
      "tipp": "Wendestellen sind Nullstellen von \\(f''\\) mit Vorzeichenwechsel. Ueberlege, welchen Grad \\(f''\\) bei einer Funktion vom Grad \\(4\\) hat.",
      "loesungsweg": "Ist \\(f\\) vom Grad \\(4\\), so ist \\(f''\\) vom Grad \\(2\\). Ein Term vom Grad \\(2\\) hat hoechstens \\(2\\) Nullstellen, also kann \\(f''\\) hoechstens an \\(2\\) Stellen das Vorzeichen wechseln. Damit gibt es hoechstens \\(n-2 = 4-2 = 2\\) Wendepunkte.",
      "loesung": 2,
      "check": {
        "art": "ausdruck",
        "expr": "2"
      },
      "thema": "ana-eigenschaften"
    },
    {
      "id": "ana-eigenschaften-r6",
      "level": 4,
      "typ": "mc",
      "frage": "Gegeben ist die Funktionenschar \\( f_k(x) = x^4 - k\\,x^2 \\) mit dem Parameter \\( k \\in \\mathbb{R} \\). Welche Symmetrie besitzt der Graph von \\( f_k \\) in Abhaengigkeit von \\(k\\)? Begruenden Sie ohne Rechnung.",
      "tipp": "Pruefe die Exponenten unabhaengig vom Wert des Parameters \\(k\\): es kommen nur \\(x^4\\) und \\(x^2\\) vor.",
      "loesungsweg": "In \\( f_k(x)=x^4-k\\,x^2 \\) treten nur gerade Exponenten (\\(x^4\\) und \\(x^2\\)) auf; der Parameter \\(k\\) steht lediglich als Vorfaktor vor \\(x^2\\). Daher gilt \\( f_k(-x) = (-x)^4 - k(-x)^2 = x^4 - k\\,x^2 = f_k(x) \\) fuer jedes \\(k\\). Der Graph ist somit fuer alle Werte von \\(k\\) achsensymmetrisch zur y-Achse.",
      "optionen": [
        "Fuer jeden Wert von \\(k\\) achsensymmetrisch zur y-Achse",
        "Nur fuer \\(k>0\\) achsensymmetrisch, sonst keine Symmetrie",
        "Fuer jeden Wert von \\(k\\) punktsymmetrisch zum Ursprung"
      ],
      "korrekt": 0,
      "check": {
        "art": "ausdruck",
        "expr": "((-x)**4-k*(-x)**2)-(x**4-k*x**2)",
        "erwartet": 0
      },
      "thema": "ana-eigenschaften"
    },
    {
      "id": "ana-nullstellen-r1",
      "level": 2,
      "typ": "numerisch",
      "frage": "Bestimmen Sie die groesste Nullstelle der Funktion \\( f(x)=2x^{4}-7x^{2}-4 \\).",
      "tipp": "Substituiere \\( z=x^{2} \\) und loese zuerst \\( 2z^{2}-7z-4=0 \\). Beachte: nur \\( z\\ge 0 \\) liefert reelle \\( x \\).",
      "loesungsweg": "Mit \\( z=x^{2} \\) wird die Gleichung zu \\( 2z^{2}-7z-4=0 \\). Loesungen: \\( z=4 \\) und \\( z=-\\tfrac{1}{2} \\). Nur \\( z=4\\ge 0 \\) ist verwertbar, \\( z=-\\tfrac{1}{2}<0 \\) entfaellt. Ruecksubstitution: \\( x^{2}=4 \\Rightarrow x=\\pm 2 \\). Die groesste Nullstelle ist somit \\( x=2 \\).",
      "loesung": 2,
      "check": {
        "art": "ausdruck",
        "expr": "Max(-2, 2)"
      },
      "thema": "ana-nullstellen"
    },
    {
      "id": "ana-nullstellen-r2",
      "level": 1,
      "typ": "mc",
      "frage": "Wie viele (reelle) Nullstellen besitzt die Funktion \\( f(x)=x^{3}-4x \\)?",
      "tipp": "Klammere zuerst \\( x \\) aus und wende den Satz vom Nullprodukt an.",
      "loesungsweg": "Ausklammern: \\( f(x)=x\\,(x^{2}-4)=x\\,(x-2)(x+2) \\). Nach dem Satz vom Nullprodukt ist ein Produkt genau dann null, wenn ein Faktor null ist: \\( x=0 \\), \\( x=2 \\) oder \\( x=-2 \\). Es gibt also drei Nullstellen.",
      "optionen": [
        "1",
        "2",
        "3",
        "4"
      ],
      "korrekt": 2,
      "check": {
        "art": "menge",
        "gleichung": "x**3-4*x",
        "var": "x",
        "erwartet": [
          "-2",
          "0",
          "2"
        ]
      },
      "thema": "ana-nullstellen"
    },
    {
      "id": "ana-nullstellen-r3",
      "level": 2,
      "typ": "numerisch",
      "frage": "Bestimmen Sie die groesste Nullstelle der Funktion \\( f(x)=x^{4}-13x^{2}+36 \\).",
      "tipp": "Substituiere \\( z=x^{2} \\) und loese \\( z^{2}-13z+36=0 \\).",
      "loesungsweg": "Mit \\( z=x^{2} \\) entsteht \\( z^{2}-13z+36=0 \\). Loesungen: \\( z=4 \\) und \\( z=9 \\), beide nichtnegativ. Ruecksubstitution: \\( x^{2}=4 \\Rightarrow x=\\pm 2 \\) und \\( x^{2}=9 \\Rightarrow x=\\pm 3 \\). Die Nullstellen sind \\( -3,-2,2,3 \\); die groesste ist \\( x=3 \\).",
      "loesung": 3,
      "check": {
        "art": "ausdruck",
        "expr": "Max(-3, -2, 2, 3)"
      },
      "thema": "ana-nullstellen"
    },
    {
      "id": "ana-nullstellen-r4",
      "level": 2,
      "typ": "mc",
      "frage": "Wie viele (reelle) Nullstellen besitzt die Funktion \\( f(x)=3x^{4}-12x^{2} \\)?",
      "tipp": "Klammere \\( 3x^{2} \\) aus; ein doppelter Faktor \\( x^{2} \\) liefert nur eine Nullstelle (bei \\( x=0 \\)).",
      "loesungsweg": "Ausklammern: \\( f(x)=3x^{2}\\,(x^{2}-4)=3x^{2}(x-2)(x+2) \\). Satz vom Nullprodukt: \\( x^{2}=0 \\Rightarrow x=0 \\) (doppelte Nullstelle, aber als Stelle nur einmal gezaehlt), \\( x=2 \\), \\( x=-2 \\). Damit gibt es drei verschiedene Nullstellen: \\( -2,0,2 \\).",
      "optionen": [
        "2",
        "3",
        "4",
        "5"
      ],
      "korrekt": 1,
      "check": {
        "art": "menge",
        "gleichung": "3*x**4-12*x**2",
        "var": "x",
        "erwartet": [
          "-2",
          "0",
          "2"
        ]
      },
      "thema": "ana-nullstellen"
    },
    {
      "id": "ana-nullstellen-r5",
      "level": 3,
      "typ": "numerisch",
      "frage": "Bestimmen Sie die groesste Nullstelle der Funktion \\( f(x)=x^{4}-5x^{2}+4 \\).",
      "tipp": "Substituiere \\( z=x^{2} \\). Die Gleichung \\( z^{2}-5z+4=0 \\) hat zwei positive Loesungen.",
      "loesungsweg": "Mit \\( z=x^{2} \\) folgt \\( z^{2}-5z+4=0 \\), also \\( (z-1)(z-4)=0 \\) mit \\( z=1 \\) und \\( z=4 \\). Ruecksubstitution: \\( x^{2}=1 \\Rightarrow x=\\pm 1 \\), \\( x^{2}=4 \\Rightarrow x=\\pm 2 \\). Nullstellen: \\( -2,-1,1,2 \\); die groesste ist \\( x=2 \\).",
      "loesung": 2,
      "check": {
        "art": "ausdruck",
        "expr": "Max(-2, -1, 1, 2)"
      },
      "thema": "ana-nullstellen"
    },
    {
      "id": "ana-nullstellen-r6",
      "level": 4,
      "typ": "numerisch",
      "frage": "Bestimmen Sie die groesste Nullstelle der Funktion \\( f(x)=x^{4}+2x^{2}-8 \\). Runden Sie auf zwei Nachkommastellen.",
      "tipp": "Substituiere \\( z=x^{2} \\) und loese \\( z^{2}+2z-8=0 \\). Achte darauf, welche \\( z \\)-Loesung negativ ist und deshalb entfaellt.",
      "loesungsweg": "Mit \\( z=x^{2} \\) entsteht \\( z^{2}+2z-8=0 \\), also \\( (z-2)(z+4)=0 \\) mit \\( z=2 \\) und \\( z=-4 \\). Wegen \\( z=x^{2}\\ge 0 \\) entfaellt \\( z=-4 \\). Ruecksubstitution: \\( x^{2}=2 \\Rightarrow x=\\pm\\sqrt{2} \\). Die groesste Nullstelle ist \\( x=\\sqrt{2}\\approx 1{,}41 \\).",
      "loesung": 1.41,
      "toleranz": 0.01,
      "check": {
        "art": "ausdruck",
        "expr": "sqrt(2)"
      },
      "thema": "ana-nullstellen"
    },
    {
      "id": "ana-extrema-wende-r1",
      "level": 1,
      "typ": "numerisch",
      "frage": "Bestimmen Sie die \\(x\\)-Koordinate des Wendepunktes von \\(f(x)=x^{3}-6x^{2}+9x+2\\).",
      "tipp": "Setze \\(f''(x)=0\\). Bei einer Funktion dritten Grades ist \\(f''\\) linear, es gibt also genau einen Kandidaten. Mit \\(f'''(x)=6\\neq 0\\) ist die hinreichende Bedingung automatisch erfuellt.",
      "loesungsweg": "Es ist \\(f'(x)=3x^{2}-12x+9\\) und \\(f''(x)=6x-12\\). Aus \\(f''(x)=0\\) folgt \\(6x-12=0\\), also \\(x=2\\). Wegen \\(f'''(x)=6\\neq 0\\) liegt bei \\(x=2\\) tatsaechlich ein Wendepunkt vor.",
      "loesung": 2,
      "check": {
        "art": "ausdruck",
        "expr": "solve(diff(x**3-6*x**2+9*x+2, x, 2), x)[0]"
      },
      "thema": "ana-extrema-wende"
    },
    {
      "id": "ana-extrema-wende-r2",
      "level": 2,
      "typ": "numerisch",
      "frage": "Die Funktion \\(f(x)=x^{3}-3x^{2}-9x+5\\) besitzt an der Stelle \\(x_0=-1\\) ein lokales Extremum. Werten Sie \\(f''(-1)\\) aus, um die Art des Extremums zu bestimmen (Angabe des Zahlenwertes von \\(f''(-1)\\)).",
      "tipp": "Bilde \\(f''(x)\\) und setze \\(x_0=-1\\) ein. Ist der Wert negativ, handelt es sich um einen Hochpunkt; ist er positiv, um einen Tiefpunkt.",
      "loesungsweg": "Es ist \\(f'(x)=3x^{2}-6x-9\\) und \\(f''(x)=6x-6\\). Einsetzen ergibt \\(f''(-1)=6\\cdot(-1)-6=-12\\). Da \\(f''(-1)=-12<0\\), liegt bei \\(x_0=-1\\) ein Hochpunkt vor.",
      "loesung": -12,
      "check": {
        "art": "ausdruck",
        "expr": "diff(x**3-3*x**2-9*x+5, x, 2).subs(x, -1)"
      },
      "thema": "ana-extrema-wende"
    },
    {
      "id": "ana-extrema-wende-r3",
      "level": 2,
      "typ": "numerisch",
      "frage": "Gegeben ist \\(f(x)=x^{3}-12x+1\\). An der Stelle \\(x_0=2\\) liegt ein Extremum vor. Berechnen Sie den Wert \\(f''(2)\\).",
      "tipp": "Die zweite Ableitung einer Funktion dritten Grades ist linear: \\(f''(x)=6x\\). Setze \\(x_0=2\\) ein. Das Vorzeichen entscheidet ueber die Art des Extremums.",
      "loesungsweg": "Es ist \\(f'(x)=3x^{2}-12\\) und \\(f''(x)=6x\\). Einsetzen liefert \\(f''(2)=6\\cdot 2=12\\). Wegen \\(f''(2)=12>0\\) liegt bei \\(x_0=2\\) ein Tiefpunkt vor.",
      "loesung": 12,
      "check": {
        "art": "ausdruck",
        "expr": "diff(x**3-12*x+1, x, 2).subs(x, 2)"
      },
      "thema": "ana-extrema-wende"
    },
    {
      "id": "ana-extrema-wende-r4",
      "level": 3,
      "typ": "mc",
      "frage": "Die Funktion \\(f(x)=x^{4}-6x^{2}+x\\) besitzt zwei Wendestellen. Welche ist die groessere der beiden \\(x\\)-Koordinaten?",
      "tipp": "Bilde \\(f''(x)=12x^{2}-12\\) und loese \\(f''(x)=0\\). Es entsteht eine rein quadratische Gleichung mit zwei Loesungen, die sich nur im Vorzeichen unterscheiden.",
      "loesungsweg": "Es ist \\(f'(x)=4x^{3}-12x+1\\) und \\(f''(x)=12x^{2}-12\\). Aus \\(f''(x)=0\\) folgt \\(x^{2}=1\\), also \\(x=-1\\) oder \\(x=1\\). Mit \\(f'''(x)=24x\\) gilt \\(f'''(1)=24\\neq 0\\) und \\(f'''(-1)=-24\\neq 0\\); beide sind echte Wendestellen. Die groessere \\(x\\)-Koordinate ist \\(x=1\\).",
      "optionen": [
        "\\(x=-1\\)",
        "\\(x=0\\)",
        "\\(x=1\\)",
        "\\(x=\\sqrt{6}\\)"
      ],
      "korrekt": 2,
      "check": {
        "art": "menge",
        "gleichung": "12*x**2-12",
        "var": "x",
        "erwartet": [
          "-1",
          "1"
        ]
      },
      "thema": "ana-extrema-wende"
    },
    {
      "id": "ana-extrema-wende-r5",
      "level": 3,
      "typ": "numerisch",
      "frage": "Gegeben ist \\(f(x)=x^{4}-4x^{3}+2\\). Eine der Wendestellen ist \\(x_0=0\\). Werten Sie \\(f'''(0)\\) aus, um nachzuweisen, dass die hinreichende Bedingung erfuellt ist (Angabe des Zahlenwertes).",
      "tipp": "Bilde nacheinander \\(f'\\), \\(f''\\), \\(f'''\\). Setze dann \\(x_0=0\\) in \\(f'''\\) ein. Ein von null verschiedener Wert bestaetigt die Wendestelle.",
      "loesungsweg": "Es ist \\(f'(x)=4x^{3}-12x^{2}\\), \\(f''(x)=12x^{2}-24x\\) und \\(f'''(x)=24x-24\\). Einsetzen liefert \\(f'''(0)=24\\cdot 0-24=-24\\). Da \\(f'''(0)=-24\\neq 0\\), ist die hinreichende Bedingung erfuellt und \\(x_0=0\\) ist eine Wendestelle.",
      "loesung": -24,
      "check": {
        "art": "ausdruck",
        "expr": "diff(x**4-4*x**3+2, x, 3).subs(x, 0)"
      },
      "thema": "ana-extrema-wende"
    },
    {
      "id": "ana-extrema-wende-r6",
      "level": 4,
      "typ": "numerisch",
      "frage": "Bestimmen Sie die kleinere der beiden Wendestellen von \\(f(x)=x^{4}-2x^{2}\\). Geben Sie den Wert auf zwei Nachkommastellen gerundet an.",
      "tipp": "Aus \\(f''(x)=12x^{2}-4=0\\) folgt \\(x^{2}=\\tfrac{1}{3}\\). Die beiden Loesungen sind \\(x=\\pm\\tfrac{1}{\\sqrt{3}}=\\pm\\tfrac{\\sqrt{3}}{3}\\); waehle die kleinere (negative).",
      "loesungsweg": "Es ist \\(f'(x)=4x^{3}-4x\\) und \\(f''(x)=12x^{2}-4\\). Aus \\(f''(x)=0\\) folgt \\(x^{2}=\\tfrac{1}{3}\\), also \\(x=\\pm\\tfrac{\\sqrt{3}}{3}\\approx\\pm 0{,}577\\). Mit \\(f'''(x)=24x\\) ist \\(f'''\\left(\\pm\\tfrac{\\sqrt{3}}{3}\\right)\\neq 0\\), beide sind Wendestellen. Die kleinere ist \\(x=-\\tfrac{\\sqrt{3}}{3}\\approx -0{,}58\\).",
      "loesung": -0.58,
      "toleranz": 0.01,
      "check": {
        "art": "ausdruck",
        "expr": "-sqrt(3)/3"
      },
      "thema": "ana-extrema-wende"
    },
    {
      "id": "ana-ableitung-graph-r1",
      "level": 1,
      "typ": "numerisch",
      "frage": "Der Graph von \\(f'\\) ist eine nach oben geoeffnete Parabel mit der Funktionsgleichung \\(f'(x)=x^2-2x-3\\). An einer ihrer Nullstellen wechselt \\(f'\\) das Vorzeichen von \\(+\\) nach \\(-\\). An welcher Stelle \\(x\\) hat \\(f\\) folglich einen Hochpunkt?",
      "loesung": -1,
      "tipp": "Bestimme die Nullstellen von \\(f'\\). Beim Hochpunkt geht \\(f'\\) von positiven zu negativen Werten ueber - das ist bei der nach oben geoeffneten Parabel die linke (kleinere) Nullstelle.",
      "loesungsweg": "Nullstellen: \\(x^2-2x-3=(x+1)(x-3)=0\\Rightarrow x_1=-1,\\ x_2=3\\). Links von \\(-1\\) ist \\(f'>0\\) (z.B. \\(f'(-2)=5\\)), rechts davon \\(f'<0\\) (z.B. \\(f'(0)=-3\\)). Der Vorzeichenwechsel \\(+\\to-\\) bei \\(x=-1\\) bedeutet: \\(f\\) hat dort einen Hochpunkt.",
      "check": {
        "art": "ausdruck",
        "expr": "Min(*solve(x**2-2*x-3, x))"
      },
      "thema": "ana-ableitung-graph"
    },
    {
      "id": "ana-ableitung-graph-r2",
      "level": 1,
      "typ": "mc",
      "frage": "Der Graph von \\(f'\\) hat die Gleichung \\(f'(x)=x^3-4x\\) und schneidet die x-Achse bei \\(x=-2,\\ x=0,\\ x=2\\). Welche Art von Punkt besitzt der Graph von \\(f\\) an der Stelle \\(x=0\\)?",
      "optionen": [
        "Hochpunkt, da \\(f'\\) bei \\(x=0\\) von \\(+\\) nach \\(-\\) wechselt",
        "Tiefpunkt, da \\(f'\\) bei \\(x=0\\) von \\(-\\) nach \\(+\\) wechselt",
        "Sattelpunkt, da \\(f'\\) die x-Achse bei \\(x=0\\) nur beruehrt",
        "keine Aussage moeglich ohne den Funktionsterm von \\(f\\)"
      ],
      "korrekt": 0,
      "tipp": "Setze Werte links und rechts von \\(x=0\\) in \\(f'\\) ein, etwa \\(f'(-1)\\) und \\(f'(1)\\), und beachte die Richtung des Vorzeichenwechsels.",
      "loesungsweg": "Es ist \\(f'(-1)=(-1)^3-4(-1)=3>0\\) und \\(f'(1)=1-4=-3<0\\). Der Graph von \\(f'\\) schneidet die x-Achse bei \\(x=0\\) (einfache Nullstelle) mit Vorzeichenwechsel von \\(+\\) nach \\(-\\). Damit hat \\(f\\) bei \\(x=0\\) einen Hochpunkt.",
      "check": {
        "art": "menge",
        "gleichung": "x**3-4*x",
        "var": "x",
        "erwartet": [
          "-2",
          "0",
          "2"
        ]
      },
      "thema": "ana-ableitung-graph"
    },
    {
      "id": "ana-ableitung-graph-r3",
      "level": 2,
      "typ": "numerisch",
      "frage": "Der Graph von \\(f'\\) hat die Gleichung \\(f'(x)=x^3-4x\\). An welcher x-Stelle liegt der am weitesten links gelegene Tiefpunkt von \\(f\\)?",
      "loesung": -2,
      "tipp": "Tiefpunkte von \\(f\\) liegen dort, wo \\(f'\\) von \\(-\\) nach \\(+\\) wechselt. Pruefe die Nullstellen \\(-2,\\ 0,\\ 2\\) der Reihe nach.",
      "loesungsweg": "Nullstellen von \\(f'\\): \\(x^3-4x=x(x-2)(x+2)=0\\Rightarrow x=-2,0,2\\). Vorzeichen: \\(f'(-3)=-15<0\\), \\(f'(-1)=3>0\\): bei \\(x=-2\\) Wechsel \\(-\\to+\\) (Tiefpunkt). Bei \\(x=0\\) Wechsel \\(+\\to-\\) (Hochpunkt). Bei \\(x=2\\): \\(f'(1)=-3<0\\), \\(f'(3)=15>0\\), also \\(-\\to+\\) (Tiefpunkt). Die beiden Tiefpunkte liegen bei \\(x=-2\\) und \\(x=2\\); der am weitesten links gelegene ist \\(x=-2\\).",
      "check": {
        "art": "ausdruck",
        "expr": "Min(*solve(x**3-4*x, x))"
      },
      "thema": "ana-ableitung-graph"
    },
    {
      "id": "ana-ableitung-graph-r4",
      "level": 2,
      "typ": "mc",
      "frage": "Der Graph von \\(f'\\) hat die Gleichung \\(f'(x)=x^3-3x+2\\). Seine Nullstellen sind \\(x=-2\\) und \\(x=1\\) (bei \\(x=1\\) beruehrt der Graph von \\(f'\\) die x-Achse). Wie viele Extremstellen besitzt \\(f\\)?",
      "optionen": [
        "genau eine Extremstelle (bei \\(x=-2\\))",
        "genau zwei Extremstellen (bei \\(x=-2\\) und \\(x=1\\))",
        "keine Extremstelle",
        "genau drei Extremstellen"
      ],
      "korrekt": 0,
      "tipp": "Eine Extremstelle setzt einen Vorzeichenwechsel von \\(f'\\) voraus. Eine Beruehrung der x-Achse (doppelte Nullstelle) bedeutet keinen Vorzeichenwechsel.",
      "loesungsweg": "\\(f'(x)=x^3-3x+2=(x+2)(x-1)^2\\). Bei \\(x=-2\\): \\(f'(-3)=-16<0\\), \\(f'(0)=2>0\\), Wechsel \\(-\\to+\\) \\(\\Rightarrow\\) Tiefpunkt. Bei \\(x=1\\) liegt eine doppelte Nullstelle vor; \\(f'(0)=2>0\\) und \\(f'(2)=4>0\\): kein Vorzeichenwechsel, also keine Extremstelle. Somit hat \\(f\\) genau eine Extremstelle bei \\(x=-2\\).",
      "check": {
        "art": "menge",
        "gleichung": "x**3-3*x+2",
        "var": "x",
        "erwartet": [
          "-2",
          "1"
        ]
      },
      "thema": "ana-ableitung-graph"
    },
    {
      "id": "ana-ableitung-graph-r5",
      "level": 3,
      "typ": "mc",
      "frage": "Der Graph von \\(f'\\) verlaeuft vollstaendig unterhalb der x-Achse und beruehrt sie an genau einer Stelle \\(x=2\\) (dort gilt \\(f'(2)=0\\)), sonst ist stets \\(f'(x)<0\\). Welche Aussage ueber \\(f\\) ist korrekt?",
      "optionen": [
        "\\(f\\) hat bei \\(x=2\\) einen Tiefpunkt.",
        "\\(f\\) hat bei \\(x=2\\) einen Hochpunkt.",
        "\\(f\\) ist auf ganz \\(\\mathbb{R}\\) streng monoton fallend und hat keine Extremstelle; bei \\(x=2\\) liegt ein Sattelpunkt.",
        "\\(f\\) ist auf ganz \\(\\mathbb{R}\\) streng monoton steigend."
      ],
      "korrekt": 2,
      "tipp": "Was bedeutet \\(f'(x)<0\\) fuer das Monotonieverhalten von \\(f\\)? Und was folgt, wenn \\(f'\\) an einer Nullstelle das Vorzeichen NICHT wechselt?",
      "loesungsweg": "Da \\(f'(x)<0\\) fuer alle \\(x\\neq 2\\) gilt, ist \\(f\\) streng monoton fallend. An der Beruehrstelle \\(x=2\\) ist \\(f'(2)=0\\), aber \\(f'\\) bleibt links und rechts negativ - es gibt keinen Vorzeichenwechsel. Daher ist \\(x=2\\) keine Extremstelle, sondern ein Sattelpunkt (Terrassenpunkt) mit waagerechter Tangente bei weiterhin fallendem Verlauf.",
      "thema": "ana-ableitung-graph"
    },
    {
      "id": "ana-ableitung-graph-r6",
      "level": 3,
      "typ": "numerisch",
      "frage": "Der Graph von \\(f'\\) hat die Gleichung \\(f'(x)=x^3-4x\\). An welcher x-Stelle liegt der am weitesten rechts gelegene Extrempunkt von \\(f\\)?",
      "loesung": 2,
      "tipp": "Bestimme alle Nullstellen von \\(f'\\) mit Vorzeichenwechsel und waehle die groesste.",
      "loesungsweg": "Nullstellen von \\(f'\\): \\(x=-2,0,2\\), alle einfach, also alle mit Vorzeichenwechsel und damit Extremstellen. Die am weitesten rechts gelegene ist \\(x=2\\). Wegen \\(f'(1)=-3<0\\) und \\(f'(3)=15>0\\) (Wechsel \\(-\\to+\\)) handelt es sich dort um einen Tiefpunkt.",
      "check": {
        "art": "ausdruck",
        "expr": "Max(*solve(x**3-4*x, x))"
      },
      "thema": "ana-ableitung-graph"
    },
    {
      "id": "ana-rekonstruktion-r1",
      "level": 1,
      "typ": "numerisch",
      "frage": "Eine zum Ursprung punktsymmetrische ganzrationale Funktion 3. Grades hat an der Stelle \\(x=1\\) einen Hochpunkt mit dem Funktionswert \\(2\\), also \\(H(1\\mid 2)\\). Wegen der Punktsymmetrie lautet der Ansatz \\( f(x)=a x^{3}+c x \\) (es gilt \\(b=0,\\ d=0\\)). Man erhaelt \\( f(x)=-x^{3}+3x \\). Berechnen Sie \\( f(2) \\).",
      "tipp": "Setze \\(x=2\\) in \\( f(x)=-x^{3}+3x \\) ein: \\( -2^{3}+3\\cdot 2 \\).",
      "loesungsweg": "Aus den Bedingungen \\( f(1)=2 \\) und \\( f'(1)=0 \\) mit \\( f(x)=a x^{3}+c x \\) und \\( f'(x)=3a x^{2}+c \\) ergibt sich \\( a+c=2 \\) und \\( 3a+c=0 \\). Subtraktion liefert \\( 2a=-2 \\), also \\( a=-1 \\) und \\( c=3 \\). Somit \\( f(x)=-x^{3}+3x \\). Einsetzen: \\( f(2)=-8+6=-2 \\).",
      "loesung": -2,
      "check": {
        "art": "ausdruck",
        "expr": "(-x**3 + 3*x).subs(x,2)"
      },
      "thema": "ana-rekonstruktion"
    },
    {
      "id": "ana-rekonstruktion-r2",
      "level": 2,
      "typ": "numerisch",
      "frage": "Eine ganzrationale Funktion 3. Grades \\( f(x)=a x^{3}+b x^{2}+c x+d \\) hat im Punkt \\(W(1\\mid 3)\\) einen Sattelpunkt (Wendepunkt mit waagerechter Tangente) und schneidet die y-Achse bei \\(d\\) mit \\( f(0)=1 \\). Bestimmen Sie den Leitkoeffizienten \\(a\\).",
      "tipp": "Sattelpunkt bei \\(x=1\\) bedeutet \\( f'(1)=0 \\) UND \\( f''(1)=0 \\). Zusammen mit \\( f(1)=3 \\) und \\( f(0)=1 \\) hast du vier Gleichungen.",
      "loesungsweg": "Bedingungen: \\( f(0)=1\\Rightarrow d=1 \\); \\( f(1)=3\\Rightarrow a+b+c+d=3 \\); \\( f'(1)=0\\Rightarrow 3a+2b+c=0 \\); \\( f''(1)=0\\Rightarrow 6a+2b=0 \\), also \\( b=-3a \\). Einsetzen liefert \\( c=3a \\) und \\( a-3a+3a+1=3 \\Rightarrow a=2 \\). Damit \\( f(x)=2x^{3}-6x^{2}+6x+1 \\).",
      "loesung": 2,
      "check": {
        "art": "ausdruck",
        "expr": "solve([a*1**3+b*1**2+c*1+d-3, 3*a*1**2+2*b*1+c, 6*a*1+2*b, d-1],[a,b,c,d])[a]"
      },
      "thema": "ana-rekonstruktion"
    },
    {
      "id": "ana-rekonstruktion-r3",
      "level": 2,
      "typ": "numerisch",
      "frage": "Gesucht ist \\( f(x)=a x^{3}+b x^{2}+c x+d \\) mit: waagerechte Tangente und Schnittpunkt der y-Achse bei \\(y=4\\), also \\( f(0)=4 \\) und \\( f'(0)=0 \\); Wendestelle bei \\(x=1\\), also \\( f''(1)=0 \\); Nullstelle bei \\(x=2\\), also \\( f(2)=0 \\). Die Loesung ist \\( f(x)=x^{3}-3x^{2}+4 \\). Berechnen Sie \\( f(3) \\).",
      "tipp": "Setze \\(x=3\\) in die fertige Funktion ein: \\( 3^{3}-3\\cdot 3^{2}+4 \\).",
      "loesungsweg": "Aus \\( f(0)=4 \\) folgt \\( d=4 \\); aus \\( f'(0)=0 \\) folgt \\( c=0 \\). \\( f''(x)=6a x+2b \\), also \\( f''(1)=0\\Rightarrow 6a+2b=0\\Rightarrow b=-3a \\). \\( f(2)=0\\Rightarrow 8a+4b+4=0 \\). Mit \\( b=-3a \\): \\( 8a-12a+4=0\\Rightarrow -4a=-4\\Rightarrow a=1,\\ b=-3 \\). Also \\( f(x)=x^{3}-3x^{2}+4 \\). Einsetzen: \\( f(3)=27-27+4=4 \\).",
      "loesung": 4,
      "check": {
        "art": "ausdruck",
        "expr": "(x**3 - 3*x**2 + 4).subs(x,3)"
      },
      "thema": "ana-rekonstruktion"
    },
    {
      "id": "ana-rekonstruktion-r4",
      "level": 3,
      "typ": "numerisch",
      "frage": "Fuer die in einer fruheren Teilaufgabe rekonstruierte Funktion \\( f(x)=2x^{3}-6x^{2}+6x+1 \\) (Sattelpunkt in \\(W(1\\mid 3)\\), \\( f(0)=1 \\)) berechnen Sie den Funktionswert an der Stelle \\(x=2\\), also \\( f(2) \\).",
      "tipp": "Direkt einsetzen: \\( 2\\cdot 2^{3}-6\\cdot 2^{2}+6\\cdot 2+1 \\). Achte auf die Reihenfolge der Rechenschritte.",
      "loesungsweg": "\\( f(2)=2\\cdot 8-6\\cdot 4+6\\cdot 2+1=16-24+12+1=5 \\).",
      "loesung": 5,
      "check": {
        "art": "ausdruck",
        "expr": "(2*x**3 - 6*x**2 + 6*x + 1).subs(x,2)"
      },
      "thema": "ana-rekonstruktion"
    },
    {
      "id": "ana-rekonstruktion-r5",
      "level": 3,
      "typ": "numerisch",
      "frage": "Bei einer Rekonstruktion ist der Leitkoeffizient bereits zu \\( a=1 \\) bestimmt, der Ansatz lautet also \\( f(x)=x^{3}+b x^{2}+c x+d \\). Die Funktion soll an der Stelle \\(x=2\\) eine Wendestelle besitzen. Bestimmen Sie den Koeffizienten \\(b\\).",
      "tipp": "Eine Wendestelle erfordert \\( f''(x_0)=0 \\). Bilde \\( f''(x)=6x+2b \\) und setze \\(x=2\\) ein.",
      "loesungsweg": "\\( f''(x)=6x+2b \\). Die notwendige Bedingung fuer eine Wendestelle bei \\(x=2\\) ist \\( f''(2)=0 \\): \\( 6\\cdot 2+2b=0\\Rightarrow 12+2b=0\\Rightarrow b=-6 \\).",
      "loesung": -6,
      "check": {
        "art": "ausdruck",
        "expr": "solve(Eq((6*1*x + 2*b).subs(x,2), 0), b)[0]"
      },
      "thema": "ana-rekonstruktion"
    },
    {
      "id": "ana-rekonstruktion-r6",
      "level": 4,
      "typ": "numerisch",
      "frage": "Eine zur y-Achse achsensymmetrische ganzrationale Funktion 4. Grades hat die Form \\( f(x)=a x^{4}+b x^{2}+e \\) (ungerade Koeffizienten sind \\(0\\)). Sie schneidet die y-Achse bei \\( f(0)=3 \\) und besitzt in \\(T(1\\mid 0)\\) einen Tiefpunkt (also \\( f(1)=0 \\) und \\( f'(1)=0 \\)). Die Rekonstruktion ergibt \\( f(x)=3x^{4}-6x^{2}+3 \\). Berechnen Sie \\( f(2) \\).",
      "tipp": "Erst \\(e=3\\) aus \\( f(0)=3 \\). Dann \\( f(1)=0 \\) und \\( f'(1)=0 \\) mit \\( f'(x)=4a x^{3}+2b x \\) loesen. Zum Schluss \\(x=2\\) einsetzen.",
      "loesungsweg": "\\( f(0)=3\\Rightarrow e=3 \\). \\( f'(x)=4a x^{3}+2b x \\), also \\( f'(1)=0\\Rightarrow 4a+2b=0\\Rightarrow b=-2a \\). \\( f(1)=0\\Rightarrow a+b+3=0 \\); mit \\( b=-2a \\): \\( a-2a+3=0\\Rightarrow -a=-3\\Rightarrow a=3,\\ b=-6 \\). Also \\( f(x)=3x^{4}-6x^{2}+3 \\). Einsetzen: \\( f(2)=3\\cdot 16-6\\cdot 4+3=48-24+3=27 \\).",
      "loesung": 27,
      "check": {
        "art": "ausdruck",
        "expr": "(3*x**4 - 6*x**2 + 3).subs(x,2)"
      },
      "thema": "ana-rekonstruktion"
    },
    {
      "id": "ana-rekonstruktion-rm1",
      "level": 1,
      "typ": "mc",
      "frage": "Eine ganzrationale Funktion 3. Grades soll rekonstruiert werden. Wie viele voneinander unabhaengige Bedingungen werden benoetigt, um die Funktion \\( f(x)=a x^{3}+b x^{2}+c x+d \\) eindeutig festzulegen?",
      "tipp": "Zaehle die unbekannten Koeffizienten im allgemeinen Ansatz.",
      "loesungsweg": "Der allgemeine Ansatz \\( f(x)=a x^{3}+b x^{2}+c x+d \\) enthaelt die vier Unbekannten \\(a,b,c,d\\). Fuer ein eindeutig loesbares lineares Gleichungssystem braucht man genau vier voneinander unabhaengige Bedingungen.",
      "optionen": [
        "2 Bedingungen",
        "3 Bedingungen",
        "4 Bedingungen",
        "5 Bedingungen"
      ],
      "korrekt": 2,
      "thema": "ana-rekonstruktion"
    },
    {
      "id": "ana-integral-r1",
      "level": 1,
      "typ": "numerisch",
      "frage": "Berechnen Sie den Wert des bestimmten Integrals \\(\\displaystyle\\int_{1}^{3}\\bigl(3x^{2}-4x+1\\bigr)\\,dx\\).",
      "tipp": "Bilde eine Stammfunktion termweise: \\(\\int 3x^2\\,dx=x^3\\), \\(\\int 4x\\,dx=2x^2\\), \\(\\int 1\\,dx=x\\). Setze danach obere minus untere Grenze ein.",
      "loesungsweg": "Stammfunktion: \\(F(x)=x^{3}-2x^{2}+x\\). Oberer Wert \\(F(3)=27-18+3=12\\). Unterer Wert \\(F(1)=1-2+1=0\\). Integral \\(=F(3)-F(1)=12-0=12\\).",
      "loesung": 12,
      "check": {
        "art": "ausdruck",
        "expr": "integrate(3*x**2-4*x+1,(x,1,3))"
      },
      "thema": "ana-integral"
    },
    {
      "id": "ana-integral-r2",
      "level": 2,
      "typ": "numerisch",
      "frage": "Gegeben sind \\(f(x)=x^{2}\\) und die Gerade \\(g(x)=2x+3\\). Berechnen Sie den Flaecheninhalt des von beiden Graphen vollstaendig eingeschlossenen Gebietes (in Flaecheneinheiten).",
      "tipp": "Bestimme zuerst die Schnittstellen aus \\(x^2=2x+3\\). Im Inneren liegt die Gerade oberhalb der Parabel, integriere also \\(g(x)-f(x)\\).",
      "loesungsweg": "Schnittstellen: \\(x^{2}=2x+3\\Rightarrow x^{2}-2x-3=0\\Rightarrow (x-3)(x+1)=0\\Rightarrow x=-1,\\ x=3\\). Gerade liegt oben: \\(A=\\int_{-1}^{3}\\bigl((2x+3)-x^{2}\\bigr)\\,dx=\\bigl[x^{2}+3x-\\tfrac{1}{3}x^{3}\\bigr]_{-1}^{3}=\\tfrac{32}{3}\\approx10{,}67\\).",
      "loesung": 10.67,
      "toleranz": 0.01,
      "check": {
        "art": "ausdruck",
        "expr": "integrate((2*x+3)-x**2,(x,-1,3))"
      },
      "thema": "ana-integral"
    },
    {
      "id": "ana-integral-r3",
      "level": 3,
      "typ": "numerisch",
      "frage": "Die Graphen von \\(f(x)=x^{3}\\) und \\(g(x)=x\\) schliessen zwischen \\(x=-1\\) und \\(x=1\\) zwei Teilflaechen ein. Berechnen Sie den gesamten Flaecheninhalt (in Flaecheneinheiten).",
      "tipp": "Bei \\(x=0\\) wechselt die Differenz das Vorzeichen. Zerlege das Intervall in \\([-1,0]\\) und \\([0,1]\\) und addiere die Betraege der beiden Teilflaechen.",
      "loesungsweg": "Schnittstellen: \\(x^{3}=x\\Rightarrow x(x^{2}-1)=0\\Rightarrow x=-1,0,1\\). Auf \\([-1,0]\\) ist \\(f\\ge g\\): \\(\\int_{-1}^{0}(x^{3}-x)\\,dx=\\tfrac14\\). Auf \\([0,1]\\) ist \\(g\\ge f\\): \\(\\int_{0}^{1}(x-x^{3})\\,dx=\\tfrac14\\). Gesamtflaeche \\(=\\tfrac14+\\tfrac14=\\tfrac12=0{,}5\\). (Ein einzelnes Integral \\(\\int_{-1}^{1}(x^3-x)\\,dx=0\\) waere falsch.)",
      "loesung": 0.5,
      "check": {
        "art": "ausdruck",
        "expr": "integrate(x**3-x,(x,-1,0))+integrate(x-x**3,(x,0,1))"
      },
      "thema": "ana-integral"
    },
    {
      "id": "ana-integral-r4",
      "level": 4,
      "typ": "numerisch",
      "frage": "Gegeben ist \\(f(x)=x^{3}\\). Die Tangente \\(t\\) an den Graphen im Punkt \\(B(1\\mid 1)\\) schneidet den Graphen ausserdem in einem zweiten Punkt. Berechnen Sie den Flaecheninhalt der von Graph und Tangente eingeschlossenen Flaeche (in Flaecheneinheiten).",
      "tipp": "Stelle \\(t(x)=f'(1)(x-1)+f(1)\\) auf. Setze \\(f(x)-t(x)=0\\); \\(x_0=1\\) ist doppelte Nullstelle, faktorisiere, um die zweite Grenze zu finden.",
      "loesungsweg": "\\(f'(x)=3x^{2}\\Rightarrow f'(1)=3\\), also \\(t(x)=3(x-1)+1=3x-2\\). Differenz: \\(f(x)-t(x)=x^{3}-3x+2=(x-1)^{2}(x+2)\\), zweite Schnittstelle \\(x=-2\\). Auf \\([-2,1]\\) ist \\(f(x)-t(x)\\ge 0\\): \\(A=\\int_{-2}^{1}\\bigl(x^{3}-3x+2\\bigr)\\,dx=\\bigl[\\tfrac14x^{4}-\\tfrac32x^{2}+2x\\bigr]_{-2}^{1}=\\tfrac{27}{4}=6{,}75\\).",
      "loesung": 6.75,
      "check": {
        "art": "ausdruck",
        "expr": "integrate(x**3-(3*x-2),(x,-2,1))"
      },
      "thema": "ana-integral"
    },
    {
      "id": "ana-integral-r5",
      "level": 3,
      "typ": "numerisch",
      "frage": "Der Graph von \\(f(x)=-x^{2}+2x\\) rotiert ueber dem Intervall \\([0,\\,2]\\) um die \\(x\\)-Achse. Berechnen Sie das Volumen des entstehenden Rotationskoerpers. Runden Sie auf zwei Nachkommastellen.",
      "tipp": "Verwende \\(V=\\pi\\int_{0}^{2}\\bigl(f(x)\\bigr)^{2}\\,dx\\). Quadriere zuerst: \\((-x^2+2x)^2=x^4-4x^3+4x^2\\).",
      "loesungsweg": "\\(V=\\pi\\int_{0}^{2}(-x^{2}+2x)^{2}\\,dx=\\pi\\int_{0}^{2}\\bigl(x^{4}-4x^{3}+4x^{2}\\bigr)\\,dx=\\pi\\bigl[\\tfrac15x^{5}-x^{4}+\\tfrac43x^{3}\\bigr]_{0}^{2}=\\pi\\cdot\\tfrac{16}{15}=\\tfrac{16\\pi}{15}\\approx3{,}35\\).",
      "loesung": 3.35,
      "toleranz": 0.01,
      "check": {
        "art": "ausdruck",
        "expr": "pi*integrate((-x**2+2*x)**2,(x,0,2))"
      },
      "thema": "ana-integral"
    },
    {
      "id": "ana-integral-r6",
      "level": 2,
      "typ": "mc",
      "frage": "Die Graphen von \\(f(x)=x^{3}\\) und \\(g(x)=x\\) schneiden sich bei \\(x=-1,\\,0,\\,1\\) und schliessen zwei gleich grosse Teilflaechen ein. Welcher Ansatz liefert den GESAMTEN Flaecheninhalt korrekt?",
      "tipp": "Wegen des Vorzeichenwechsels der Differenz bei \\(x=0\\) wuerde ein durchgehendes Integral ueber \\([-1,1]\\) die Teilflaechen gegeneinander aufheben.",
      "loesungsweg": "Die Differenz \\(f(x)-g(x)\\) wechselt bei \\(x=0\\) das Vorzeichen. Ein einziges Integral \\(\\int_{-1}^{1}(x^3-x)\\,dx\\) ergibt \\(0\\), da sich die Beitraege aufheben. Korrekt ist die abschnittsweise Berechnung mit Betraegen: \\(\\left|\\int_{-1}^{0}(x^3-x)\\,dx\\right|+\\left|\\int_{0}^{1}(x^3-x)\\,dx\\right|=\\tfrac14+\\tfrac14=\\tfrac12\\). Richtig ist Option 2.",
      "optionen": [
        "\\(\\displaystyle\\int_{-1}^{1}\\bigl(x^{3}-x\\bigr)\\,dx\\)",
        "\\(\\displaystyle\\left|\\int_{-1}^{0}\\bigl(x^{3}-x\\bigr)\\,dx\\right|+\\left|\\int_{0}^{1}\\bigl(x^{3}-x\\bigr)\\,dx\\right|\\)",
        "\\(\\displaystyle\\left|\\int_{-1}^{1}\\bigl(x^{3}-x\\bigr)\\,dx\\right|\\)",
        "\\(\\displaystyle\\int_{-1}^{1}\\bigl(x-x^{3}\\bigr)\\,dx\\)"
      ],
      "korrekt": 1,
      "check": {
        "art": "menge",
        "gleichung": "x**3-x",
        "var": "x",
        "erwartet": [
          "-1",
          "0",
          "1"
        ]
      },
      "thema": "ana-integral"
    },
    {
      "id": "ana-scharen-r1",
      "level": 1,
      "typ": "numerisch",
      "frage": "Gegeben ist die Schar \\( f_k(x) = x^3 - k\\,x^2 + 2x - 3 \\) mit reellem Parameter \\(k\\). Alle Kurven der Schar gehen durch denselben Punkt auf der \\(y\\)-Achse. Bestimmen Sie dessen \\(y\\)-Koordinate.",
      "tipp": "Setze \\(x=0\\) ein. Welcher Summand enthaelt \\(k\\), und was wird aus ihm, wenn \\(x=0\\) ist?",
      "loesungsweg": "Der Punkt auf der \\(y\\)-Achse hat \\(x=0\\). Einsetzen: \\( f_k(0) = 0^3 - k\\cdot 0^2 + 2\\cdot 0 - 3 = -3 \\). Der \\(k\\)-Term \\(-k\\,x^2\\) faellt fuer \\(x=0\\) weg, also ist \\(f_k(0)=-3\\) unabhaengig von \\(k\\). Der gemeinsame Punkt ist \\((0 \\mid -3)\\).",
      "loesung": -3,
      "check": {
        "art": "ausdruck",
        "expr": "(0)**3 - k*(0)**2 + 2*(0) - 3"
      },
      "thema": "ana-scharen"
    },
    {
      "id": "ana-scharen-r2",
      "level": 2,
      "typ": "numerisch",
      "frage": "Gegeben ist die Schar \\( f_k(x) = x^3 + k\\,x - 6 \\). Bestimmen Sie den Wert von \\(k\\), fuer den \\( x=1 \\) eine Nullstelle von \\(f_k\\) ist.",
      "tipp": "Setze die Bedingung \\( f_k(1) = 0 \\) an und loese die entstehende lineare Gleichung nach \\(k\\) auf.",
      "loesungsweg": "Bedingung \\( f_k(1)=0 \\): \\( 1^3 + k\\cdot 1 - 6 = 0 \\Rightarrow 1 + k - 6 = 0 \\Rightarrow k - 5 = 0 \\Rightarrow k = 5 \\).",
      "loesung": 5,
      "check": {
        "art": "ausdruck",
        "expr": "solve(1**3 + k*1 - 6, k)[0]"
      },
      "thema": "ana-scharen"
    },
    {
      "id": "ana-scharen-r3",
      "level": 2,
      "typ": "mc",
      "frage": "Wie viele verschiedene reelle Nullstellen besitzt die Funktion \\( f_k(x) = x^4 - k\\,x^2 \\) der Schar fuer den Wert \\( k = 4 \\)?",
      "tipp": "Klammere \\(x^2\\) aus: \\( x^2(x^2 - k) = 0 \\). Setze \\(k=4\\) ein und bestimme alle reellen Loesungen.",
      "loesungsweg": "Ausklammern: \\( x^4 - 4x^2 = x^2(x^2 - 4) = 0 \\). Satz vom Nullprodukt: \\( x^2 = 0 \\Rightarrow x = 0 \\) (eine Stelle) oder \\( x^2 - 4 = 0 \\Rightarrow x = \\pm 2 \\). Die verschiedenen Nullstellen sind \\( -2,\\; 0,\\; 2 \\) - also drei.",
      "optionen": [
        "1 Nullstelle",
        "2 Nullstellen",
        "3 Nullstellen",
        "4 Nullstellen"
      ],
      "korrekt": 2,
      "check": {
        "art": "menge",
        "gleichung": "x**4 - 4*x**2",
        "var": "x",
        "erwartet": [
          "-2",
          "0",
          "2"
        ]
      },
      "thema": "ana-scharen"
    },
    {
      "id": "ana-scharen-r4",
      "level": 3,
      "typ": "numerisch",
      "frage": "Gegeben ist die Schar \\( f_k(x) = x^2 - 4x + k \\). Bestimmen Sie den Wert von \\(k\\), fuer den der Tiefpunkt der Parabel genau auf der \\(x\\)-Achse liegt.",
      "tipp": "Bestimme zuerst die Extremstelle aus \\( f_k'(x)=0 \\). Der Tiefpunkt liegt auf der \\(x\\)-Achse, wenn dort der Funktionswert \\(0\\) ist.",
      "loesungsweg": "Ableitung: \\( f_k'(x) = 2x - 4 = 0 \\Rightarrow x = 2 \\); wegen \\( f_k''(x)=2>0 \\) ein Tiefpunkt. Bedingung \"auf der \\(x\\)-Achse\": \\( f_k(2)=0 \\Rightarrow 2^2 - 4\\cdot 2 + k = 0 \\Rightarrow 4 - 8 + k = 0 \\Rightarrow k = 4 \\).",
      "loesung": 4,
      "check": {
        "art": "ausdruck",
        "expr": "solve((2)**2 - 4*(2) + k, k)[0]"
      },
      "thema": "ana-scharen"
    },
    {
      "id": "ana-scharen-r5",
      "level": 3,
      "typ": "mc",
      "frage": "Die Kurven der Schar \\( f_k(x) = k\\,(x^2 - 2x) + x^3 - 1 \\) besitzen einen gemeinsamen Punkt mit der \\(x\\)-Koordinate \\(x=2\\). Welche \\(y\\)-Koordinate hat dieser Punkt?",
      "tipp": "Der \\(k\\)-Term \\( k(x^2-2x) \\) verschwindet bei \\(x=2\\). Setze \\(x=2\\) ein; das Ergebnis haengt dann nicht mehr von \\(k\\) ab.",
      "loesungsweg": "Einsetzen von \\(x=2\\): \\( f_k(2) = k\\,(2^2 - 2\\cdot 2) + 2^3 - 1 = k\\cdot(4-4) + 8 - 1 = 0 + 7 = 7 \\). Da der \\(k\\)-Term wegfaellt, liegt der gemeinsame Punkt bei \\((2 \\mid 7)\\).",
      "optionen": [
        "\\(y = 0\\)",
        "\\(y = 7\\)",
        "\\(y = 8\\)",
        "\\(y = -1\\)"
      ],
      "korrekt": 1,
      "check": {
        "art": "ausdruck",
        "expr": "k*((2)**2-2*(2)) + (2)**3 - 1",
        "erwartet": 7
      },
      "thema": "ana-scharen"
    },
    {
      "id": "ana-scharen-r6",
      "level": 4,
      "typ": "numerisch",
      "frage": "Gegeben ist die Schar \\( f_k(x) = k\\,(x^2 - 2x) + x^3 - 1 \\). Alle Kurven besitzen zwei gemeinsame Punkte. Bestimmen Sie die groessere der beiden \\(x\\)-Koordinaten dieser gemeinsamen Punkte.",
      "tipp": "Ein Punkt liegt auf allen Kurven, wenn sein \\(y\\)-Wert nicht von \\(k\\) abhaengt - also dort, wo der Faktor vor \\(k\\) null wird. Loese \\( x^2 - 2x = 0 \\).",
      "loesungsweg": "Schreibe \\( f_k(x) = k\\,(x^2-2x) + (x^3-1) \\). Der \\(y\\)-Wert ist genau dort von \\(k\\) unabhaengig, wo der \\(k\\)-Term verschwindet: \\( x^2 - 2x = 0 \\Rightarrow x(x-2)=0 \\Rightarrow x=0 \\) oder \\( x=2 \\). Es gibt also zwei gemeinsame Punkte; die groessere \\(x\\)-Koordinate ist \\( x = 2 \\). (Gegenprobe: die Differenz zweier Kurven \\( f_{k_1}-f_{k_2} = (k_1-k_2)\\,x(x-2) \\) hat genau dort ihre Nullstellen.)",
      "loesung": 2,
      "check": {
        "art": "ausdruck",
        "expr": "Max(*solve(x**2 - 2*x, x))"
      },
      "thema": "ana-scharen"
    },
    {
      "id": "geo-vektoren-geraden-r1",
      "level": 1,
      "typ": "mc",
      "frage": "Gegeben sind die Punkte \\(A(2\\,|\\,-1\\,|\\,3)\\) und \\(B(5\\,|\\,1\\,|\\,-2)\\). Welcher Vektor ist der Verbindungsvektor \\(\\overrightarrow{AB}\\)?",
      "tipp": "Es gilt \\(\\overrightarrow{AB} = \\vec{b} - \\vec{a}\\), also Koordinaten des Endpunkts minus Koordinaten des Anfangspunkts.",
      "loesungsweg": "\\[\\overrightarrow{AB} = \\vec{b} - \\vec{a} = \\begin{pmatrix} 5 \\\\ 1 \\\\ -2 \\end{pmatrix} - \\begin{pmatrix} 2 \\\\ -1 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 2 \\\\ -5 \\end{pmatrix}\\]",
      "optionen": [
        "\\(\\begin{pmatrix} 3 \\\\ 2 \\\\ -5 \\end{pmatrix}\\)",
        "\\(\\begin{pmatrix} -3 \\\\ -2 \\\\ 5 \\end{pmatrix}\\)",
        "\\(\\begin{pmatrix} 7 \\\\ 0 \\\\ 1 \\end{pmatrix}\\)"
      ],
      "korrekt": 0,
      "check": {
        "art": "vektor",
        "expr": "Matrix([5,1,-2]) - Matrix([2,-1,3])",
        "erwartet": [
          3,
          2,
          -5
        ]
      },
      "thema": "geo-vektoren-geraden"
    },
    {
      "id": "geo-vektoren-geraden-r2",
      "level": 1,
      "typ": "numerisch",
      "frage": "Berechnen Sie den Betrag des Vektors \\(\\vec{v} = \\begin{pmatrix} 2 \\\\ -3 \\\\ 6 \\end{pmatrix}\\).",
      "tipp": "Der Betrag ist \\(|\\vec{v}| = \\sqrt{v_1^2 + v_2^2 + v_3^2}\\). Quadrate sind stets nicht negativ, das Minuszeichen faellt also weg.",
      "loesungsweg": "\\[|\\vec{v}| = \\sqrt{2^2 + (-3)^2 + 6^2} = \\sqrt{4+9+36} = \\sqrt{49} = 7\\]",
      "loesung": 7,
      "check": {
        "art": "ausdruck",
        "expr": "sqrt(2**2+(-3)**2+6**2)"
      },
      "thema": "geo-vektoren-geraden"
    },
    {
      "id": "geo-vektoren-geraden-r3",
      "level": 2,
      "typ": "numerisch",
      "frage": "Gegeben sind \\(A(1\\,|\\,2\\,|\\,2)\\) und \\(B(4\\,|\\,4\\,|\\,1)\\). Berechnen Sie die Laenge der Strecke \\(\\overline{AB}\\) (also \\(|\\overrightarrow{AB}|\\)). Runden Sie auf zwei Nachkommastellen.",
      "tipp": "Erst \\(\\overrightarrow{AB} = \\vec{b} - \\vec{a}\\) bilden, dann den Betrag \\(\\sqrt{x^2+y^2+z^2}\\) berechnen.",
      "loesungsweg": "\\[\\overrightarrow{AB} = \\begin{pmatrix} 3 \\\\ 2 \\\\ -1 \\end{pmatrix}, \\quad |\\overrightarrow{AB}| = \\sqrt{3^2 + 2^2 + (-1)^2} = \\sqrt{9+4+1} = \\sqrt{14} \\approx 3{,}74\\]",
      "loesung": 3.74,
      "toleranz": 0.01,
      "check": {
        "art": "ausdruck",
        "expr": "sqrt((4-1)**2+(4-2)**2+(1-2)**2)"
      },
      "thema": "geo-vektoren-geraden"
    },
    {
      "id": "geo-vektoren-geraden-r4",
      "level": 2,
      "typ": "numerisch",
      "frage": "Gegeben sind \\(A(3\\,|\\,-2\\,|\\,5)\\) und \\(B(7\\,|\\,4\\,|\\,-1)\\). Berechnen Sie die \\(z\\)-Koordinate des Mittelpunkts \\(M\\) der Strecke \\(\\overline{AB}\\).",
      "tipp": "Der Mittelpunkt entsteht koordinatenweise als Mittelwert: \\(m_z = \\tfrac{1}{2}(a_z + b_z)\\).",
      "loesungsweg": "\\[m_z = \\frac{a_z + b_z}{2} = \\frac{5 + (-1)}{2} = \\frac{4}{2} = 2\\]",
      "loesung": 2,
      "check": {
        "art": "ausdruck",
        "expr": "Rational(5+(-1),2)"
      },
      "thema": "geo-vektoren-geraden"
    },
    {
      "id": "geo-vektoren-geraden-r5",
      "level": 3,
      "typ": "numerisch",
      "frage": "Der Punkt \\(P(7\\,|\\,-1\\,|\\,9)\\) liegt auf der Geraden \\(g: \\vec{x} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + t \\begin{pmatrix} 2 \\\\ -1 \\\\ 2 \\end{pmatrix}\\). Bestimmen Sie den zugehoerigen Parameterwert \\(t\\).",
      "tipp": "Setzen Sie \\(P\\) in die Geradengleichung ein und loesen Sie eine Komponentengleichung nach \\(t\\) auf, z. B. die erste: \\(1 + 2t = 7\\).",
      "loesungsweg": "Erste Komponente: \\(1 + 2t = 7 \\Rightarrow t = 3\\). Kontrolle: \\(y\\): \\(2 - 1\\cdot 3 = -1\\) und \\(z\\): \\(3 + 2\\cdot 3 = 9\\). Alle drei Komponenten stimmen, also \\[t = 3.\\]",
      "loesung": 3,
      "check": {
        "art": "ausdruck",
        "expr": "Rational(7-1,2)"
      },
      "thema": "geo-vektoren-geraden"
    },
    {
      "id": "geo-vektoren-geraden-r6",
      "level": 3,
      "typ": "mc",
      "frage": "Gegeben ist die Gerade \\(g: \\vec{x} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix} + t \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix}\\). Welcher der folgenden Punkte liegt auf \\(g\\)?",
      "tipp": "Pruefen Sie pro Punkt, ob es EIN gemeinsames \\(t\\) gibt, das alle drei Komponentengleichungen \\(1+2t=x,\\ 0+t=y,\\ 2+3t=z\\) erfuellt.",
      "loesungsweg": "Fuer \\((7\\,|\\,3\\,|\\,11)\\): aus \\(y\\) folgt \\(t=3\\). Kontrolle \\(x\\): \\(1+2\\cdot 3 = 7\\) und \\(z\\): \\(2+3\\cdot 3 = 11\\). Alle Komponenten stimmen mit \\(t=3\\), also liegt nur dieser Punkt auf \\(g\\). Bei den anderen Punkten widersprechen sich die aus den Komponenten berechneten \\(t\\)-Werte.",
      "optionen": [
        "\\((5\\,|\\,2\\,|\\,5)\\)",
        "\\((3\\,|\\,2\\,|\\,5)\\)",
        "\\((7\\,|\\,3\\,|\\,11)\\)",
        "\\((7\\,|\\,3\\,|\\,9)\\)"
      ],
      "korrekt": 2,
      "check": {
        "art": "vektor",
        "expr": "Matrix([1,0,2]) + 3*Matrix([2,1,3])",
        "erwartet": [
          7,
          3,
          11
        ]
      },
      "thema": "geo-vektoren-geraden"
    },
    {
      "id": "geo-ebene-r1",
      "level": 2,
      "typ": "numerisch",
      "frage": "Eine Ebene wird von den Spannvektoren \\( \\vec{u} = \\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix} \\) und \\( \\vec{v} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 2 \\end{pmatrix} \\) aufgespannt. Berechnen Sie die dritte Komponente \\( n_3 \\) des Normalenvektors \\( \\vec{n} = \\vec{u} \\times \\vec{v} \\).",
      "tipp": "Die dritte Komponente des Kreuzprodukts ist \\( n_3 = u_1 v_2 - u_2 v_1 \\).",
      "loesungsweg": "Mit der Formel fuer das Kreuzprodukt gilt \\( n_3 = u_1 v_2 - u_2 v_1 = 2\\cdot 2 - 1\\cdot 1 = 4 - 1 = 3 \\). (Der vollstaendige Normalenvektor lautet \\( \\vec{n} = \\begin{pmatrix} 2 \\\\ -4 \\\\ 3 \\end{pmatrix} \\).)",
      "loesung": 3,
      "check": {
        "art": "ausdruck",
        "expr": "Matrix([2,1,0]).cross(Matrix([1,2,2]))[2]"
      },
      "thema": "geo-ebene"
    },
    {
      "id": "geo-ebene-r2",
      "level": 3,
      "typ": "numerisch",
      "frage": "Die Ebene \\( E:\\ \\vec{x} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + s\\begin{pmatrix} 2 \\\\ 1 \\\\ -1 \\end{pmatrix} + t\\begin{pmatrix} 0 \\\\ 3 \\\\ 1 \\end{pmatrix} \\) wird in die Koordinatenform \\( 4x - 2y + 6z = d \\) ueberfuehrt. Bestimmen Sie den Wert von \\( d \\).",
      "tipp": "Setze den Stuetzpunkt \\( (1\\mid 2\\mid 3) \\) in die linke Seite \\( 4x - 2y + 6z \\) ein.",
      "loesungsweg": "Der Normalenvektor ist \\( \\vec{n} = \\begin{pmatrix} 2 \\\\ 1 \\\\ -1 \\end{pmatrix} \\times \\begin{pmatrix} 0 \\\\ 3 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ -2 \\\\ 6 \\end{pmatrix} \\). Einsetzen des Stuetzpunkts liefert \\( d = 4\\cdot 1 - 2\\cdot 2 + 6\\cdot 3 = 4 - 4 + 18 = 18 \\).",
      "loesung": 18,
      "check": {
        "art": "ausdruck",
        "expr": "Matrix([2,1,-1]).cross(Matrix([0,3,1])).dot(Matrix([1,2,3]))"
      },
      "thema": "geo-ebene"
    },
    {
      "id": "geo-ebene-r3",
      "level": 2,
      "typ": "mc",
      "frage": "Eine Ebene wird von den Vektoren \\( \\vec{u} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 0 \\end{pmatrix} \\) und \\( \\vec{v} = \\begin{pmatrix} 0 \\\\ 1 \\\\ 3 \\end{pmatrix} \\) aufgespannt. Welcher Vektor ist ein Normalenvektor der Ebene?",
      "tipp": "Berechne das Kreuzprodukt \\( \\vec{u} \\times \\vec{v} \\); achte besonders auf die Vorzeichen der einzelnen Komponenten.",
      "loesungsweg": "\\( \\vec{n} = \\vec{u} \\times \\vec{v} = \\begin{pmatrix} 2\\cdot 3 - 0\\cdot 1 \\\\ 0\\cdot 0 - 1\\cdot 3 \\\\ 1\\cdot 1 - 2\\cdot 0 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\ -3 \\\\ 1 \\end{pmatrix} \\).",
      "optionen": [
        "\\( \\begin{pmatrix} 6 \\\\ -3 \\\\ 1 \\end{pmatrix} \\)",
        "\\( \\begin{pmatrix} -6 \\\\ -3 \\\\ 1 \\end{pmatrix} \\)",
        "\\( \\begin{pmatrix} 6 \\\\ 3 \\\\ 1 \\end{pmatrix} \\)",
        "\\( \\begin{pmatrix} 3 \\\\ 6 \\\\ 1 \\end{pmatrix} \\)"
      ],
      "korrekt": 0,
      "check": {
        "art": "vektor",
        "expr": "Matrix([1,2,0]).cross(Matrix([0,1,3]))",
        "erwartet": [
          6,
          -3,
          1
        ]
      },
      "thema": "geo-ebene"
    },
    {
      "id": "geo-ebene-r4",
      "level": 1,
      "typ": "numerisch",
      "frage": "Gegeben ist die Ebene \\( E:\\ 2x - 4y + 3z = 8 \\). Berechnen Sie fuer den Punkt \\( P(4\\mid 1\\mid 3) \\) den Wert der linken Seite \\( 2x - 4y + 3z \\), um eine Punktprobe durchzufuehren.",
      "tipp": "Setze die Koordinaten von \\( P \\) in \\( 2x - 4y + 3z \\) ein und vergleiche das Ergebnis mit \\( 8 \\).",
      "loesungsweg": "Einsetzen ergibt \\( 2\\cdot 4 - 4\\cdot 1 + 3\\cdot 3 = 8 - 4 + 9 = 13 \\). Da \\( 13 \\neq 8 \\), liegt \\( P \\) nicht in der Ebene.",
      "loesung": 13,
      "check": {
        "art": "ausdruck",
        "expr": "(2*x - 4*y + 3*z).subs({x:4, y:1, z:3})"
      },
      "thema": "geo-ebene"
    },
    {
      "id": "geo-ebene-r5",
      "level": 3,
      "typ": "mc",
      "frage": "Die Ebene \\( E \\) enthaelt die Gerade \\( g:\\ \\vec{x} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix} + r\\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix} \\) und den Punkt \\( P(0\\mid 2\\mid 3) \\). Welcher Vektor ist ein Normalenvektor von \\( E \\)?",
      "tipp": "Zweiter Spannvektor ist \\( \\overrightarrow{AP} = P - A \\) mit dem Stuetzpunkt \\( A(1\\mid 0\\mid 1) \\) der Geraden. Dann Kreuzprodukt mit der Richtung von \\( g \\) bilden.",
      "loesungsweg": "Der zweite Spannvektor ist \\( \\overrightarrow{AP} = \\begin{pmatrix} 0 \\\\ 2 \\\\ 3 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 2 \\\\ 2 \\end{pmatrix} \\). Mit der Richtung von \\( g \\) gilt \\( \\vec{n} = \\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix} \\times \\begin{pmatrix} -1 \\\\ 2 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ -4 \\\\ 5 \\end{pmatrix} \\).",
      "optionen": [
        "\\( \\begin{pmatrix} 2 \\\\ -4 \\\\ 5 \\end{pmatrix} \\)",
        "\\( \\begin{pmatrix} 2 \\\\ 4 \\\\ 5 \\end{pmatrix} \\)",
        "\\( \\begin{pmatrix} -1 \\\\ 2 \\\\ 2 \\end{pmatrix} \\)",
        "\\( \\begin{pmatrix} 1 \\\\ 3 \\\\ 4 \\end{pmatrix} \\)"
      ],
      "korrekt": 0,
      "check": {
        "art": "vektor",
        "expr": "Matrix([2,1,0]).cross(Matrix([-1,2,2]))",
        "erwartet": [
          2,
          -4,
          5
        ]
      },
      "thema": "geo-ebene"
    },
    {
      "id": "geo-ebene-r6",
      "level": 4,
      "typ": "numerisch",
      "frage": "Gegeben ist die Ebenenschar \\( E_k:\\ \\vec{x} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix} + s\\begin{pmatrix} 1 \\\\ k \\\\ 0 \\end{pmatrix} + t\\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix} \\) mit Parameter \\( k \\). Der Normalenvektor ist \\( \\vec{n}_k = \\begin{pmatrix} k \\\\ -1 \\\\ 1 \\end{pmatrix} \\). Berechnen Sie die erste Komponente \\( n_1 \\) des Normalenvektors fuer \\( k = 2 \\).",
      "tipp": "Bilde das Kreuzprodukt der Spannvektoren in Abhaengigkeit von \\( k \\); die erste Komponente haengt direkt von \\( k \\) ab. Setze dann \\( k = 2 \\) ein.",
      "loesungsweg": "Das Kreuzprodukt liefert \\( \\vec{n}_k = \\begin{pmatrix} 1 \\\\ k \\\\ 0 \\end{pmatrix} \\times \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} k \\\\ -1 \\\\ 1 \\end{pmatrix} \\). Also ist \\( n_1 = k \\), und fuer \\( k = 2 \\) folgt \\( n_1 = 2 \\).",
      "loesung": 2,
      "check": {
        "art": "ausdruck",
        "expr": "Matrix([1,k,0]).cross(Matrix([0,1,1]))[0].subs(k,2)"
      },
      "thema": "geo-ebene"
    },
    {
      "id": "geo-lage-ebenen-r1",
      "level": 1,
      "typ": "mc",
      "frage": "Gegeben sind \\(E_1:\\ 2x-3y+6z=5\\) und \\(E_2:\\ -4x+6y-12z=9\\). Welche Lagebeziehung haben die beiden Ebenen?",
      "optionen": [
        "Sie sind identisch.",
        "Sie sind echt parallel (kein gemeinsamer Punkt).",
        "Sie schneiden sich in einer Geraden.",
        "Sie schneiden sich in genau einem Punkt."
      ],
      "korrekt": 1,
      "tipp": "Pruefe zuerst, ob die Normalenvektoren \\(\\vec{n}_1=\\begin{pmatrix}2\\\\-3\\\\6\\end{pmatrix}\\) und \\(\\vec{n}_2=\\begin{pmatrix}-4\\\\6\\\\-12\\end{pmatrix}\\) parallel sind. Wenn ja: identisch oder echt parallel? Vergleiche dazu auch die rechten Seiten mit demselben Faktor.",
      "loesungsweg": "Es gilt \\(\\vec{n}_2 = -2\\,\\vec{n}_1\\), denn \\(-2\\cdot 2=-4\\), \\(-2\\cdot(-3)=6\\), \\(-2\\cdot 6=-12\\); gleichwertig ist \\(\\vec{n}_1\\times\\vec{n}_2=\\vec{0}\\). Die Normalenvektoren sind also parallel, die Ebenen sind parallel. Multipliziert man \\(E_1\\) mit \\(k=-2\\), wird die rechte Seite \\(-2\\cdot 5=-10\\neq 9\\). Die Gleichungen sind also NICHT aequivalent, die Ebenen haben keinen gemeinsamen Punkt: sie sind echt parallel.",
      "check": {
        "art": "vektor",
        "expr": "Matrix([2,-3,6]).cross(Matrix([-4,6,-12]))",
        "erwartet": [
          0,
          0,
          0
        ]
      },
      "thema": "geo-lage-ebenen"
    },
    {
      "id": "geo-lage-ebenen-r2",
      "level": 2,
      "typ": "numerisch",
      "frage": "Die Normalenvektoren zweier echt paralleler Ebenen sind \\(\\vec{n}_1=\\begin{pmatrix}1\\\\-2\\\\4\\end{pmatrix}\\) und \\(\\vec{n}_2=\\begin{pmatrix}3\\\\-6\\\\12\\end{pmatrix}\\). Bestimmen Sie den Faktor \\(k\\) mit \\(\\vec{n}_2=k\\,\\vec{n}_1\\).",
      "loesung": 3,
      "tipp": "Teile eine Komponente von \\(\\vec{n}_2\\) durch die entsprechende Komponente von \\(\\vec{n}_1\\), z. B. die erste: \\(k=\\frac{3}{1}\\). Kontrolliere mit einer zweiten Komponente.",
      "loesungsweg": "Aus der ersten Komponente folgt \\(k=\\frac{3}{1}=3\\). Kontrolle: \\(3\\cdot(-2)=-6\\) (zweite Komponente) und \\(3\\cdot 4=12\\) (dritte Komponente) stimmen. Damit ist \\(\\vec{n}_2=3\\,\\vec{n}_1\\), also \\(k=3\\).",
      "check": {
        "art": "ausdruck",
        "expr": "Matrix([3,-6,12])[0] / Matrix([1,-2,4])[0]"
      },
      "thema": "geo-lage-ebenen"
    },
    {
      "id": "geo-lage-ebenen-r3",
      "level": 2,
      "typ": "mc",
      "frage": "Die Ebenen \\(E_1:\\ x+y+z=1\\) und \\(E_2:\\ x-y+2z=0\\) schneiden sich in einer Geraden \\(g\\). Welcher Vektor ist ein moeglicher Richtungsvektor von \\(g\\)?",
      "optionen": [
        "\\(\\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix}\\)",
        "\\(\\begin{pmatrix}3\\\\-1\\\\-2\\end{pmatrix}\\)",
        "\\(\\begin{pmatrix}1\\\\-1\\\\2\\end{pmatrix}\\)",
        "\\(\\begin{pmatrix}2\\\\1\\\\0\\end{pmatrix}\\)"
      ],
      "korrekt": 1,
      "tipp": "Der Richtungsvektor der Schnittgeraden steht senkrecht auf beiden Normalenvektoren. Berechne das Kreuzprodukt \\(\\vec{n}_1\\times\\vec{n}_2\\) mit \\(\\vec{n}_1=\\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix}\\), \\(\\vec{n}_2=\\begin{pmatrix}1\\\\-1\\\\2\\end{pmatrix}\\).",
      "loesungsweg": "Ein Richtungsvektor der Schnittgeraden ist \\(\\vec{u}=\\vec{n}_1\\times\\vec{n}_2=\\begin{pmatrix}1\\cdot 2-1\\cdot(-1)\\\\1\\cdot 1-1\\cdot 2\\\\1\\cdot(-1)-1\\cdot 1\\end{pmatrix}=\\begin{pmatrix}3\\\\-1\\\\-2\\end{pmatrix}\\). Gegenprobe ueber das LGS mit \\(z=t\\): aus \\(x+y=1-t\\) und \\(x-y=-2t\\) folgt \\(x=\\tfrac{1-3t}{2}\\), \\(y=\\tfrac{1+t}{2}\\); die t-Koeffizienten ergeben \\(\\begin{pmatrix}-3/2\\\\1/2\\\\1\\end{pmatrix}\\), also (mal \\(-2\\)) ebenfalls \\(\\begin{pmatrix}3\\\\-1\\\\-2\\end{pmatrix}\\).",
      "check": {
        "art": "vektor",
        "expr": "Matrix([1,1,1]).cross(Matrix([1,-1,2]))",
        "erwartet": [
          3,
          -1,
          -2
        ]
      },
      "thema": "geo-lage-ebenen"
    },
    {
      "id": "geo-lage-ebenen-r4",
      "level": 3,
      "typ": "numerisch",
      "frage": "Die Ebenen \\(E_1:\\ 2x+y-z=4\\) und \\(E_2:\\ x-y+z=1\\) schneiden sich in der Geraden \\(g\\). Bestimmen Sie die \\(x\\)-Komponente jedes Punktes von \\(g\\) (sie ist konstant). Runden Sie auf zwei Nachkommastellen.",
      "loesung": 1.67,
      "toleranz": 0.01,
      "tipp": "Setze \\(z=t\\) und addiere die beiden Gleichungen geschickt, sodass \\(y\\) und \\(z\\) herausfallen. Dann erhaeltst du \\(x\\) ohne Parameter.",
      "loesungsweg": "Mit \\(z=t\\) lauten die Gleichungen \\(2x+y=4+t\\) und \\(x-y=1-t\\). Addition beider Gleichungen liefert \\(3x=5\\), also \\(x=\\frac{5}{3}\\approx 1{,}67\\) — unabhaengig von \\(t\\). Die Schnittgerade verlaeuft somit in der Ebene \\(x=\\frac{5}{3}\\).",
      "check": {
        "art": "ausdruck",
        "expr": "Rational(5,3)"
      },
      "thema": "geo-lage-ebenen"
    },
    {
      "id": "geo-lage-ebenen-r5",
      "level": 3,
      "typ": "numerisch",
      "frage": "Die Ebenen \\(E_1:\\ x+2y+z=6\\) und \\(E_2:\\ 2x-y+z=3\\) schneiden sich in der Geraden \\(g\\). Bestimmen Sie die \\(z\\)-Komponente desjenigen Punktes von \\(g\\), der in der \\(x\\)-\\(z\\)-Ebene liegt (also \\(y=0\\)).",
      "loesung": 9,
      "tipp": "Setze \\(y=0\\) in beide Ebenengleichungen ein. Es bleibt ein \\(2\\times 2\\)-LGS in \\(x\\) und \\(z\\), das du z. B. durch Subtraktion loesen kannst.",
      "loesungsweg": "Setze \\(y=0\\): Aus \\(E_1\\) wird \\(x+z=6\\), aus \\(E_2\\) wird \\(2x+z=3\\). Subtraktion (\\(E_2-E_1\\)) ergibt \\(x=-3\\). Einsetzen in \\(x+z=6\\) liefert \\(z=6-(-3)=9\\). Der gesuchte Punkt ist \\((-3\\,|\\,0\\,|\\,9)\\), die \\(z\\)-Komponente ist \\(9\\).",
      "check": {
        "art": "ausdruck",
        "expr": "solve([x + z - 6, 2*x + z - 3], [x, z])[z]"
      },
      "thema": "geo-lage-ebenen"
    },
    {
      "id": "geo-lage-ebenen-r6",
      "level": 4,
      "typ": "numerisch",
      "frage": "Die Ebene \\(E_1:\\ 3x-2y+5z=1\\) und die Ebene \\(E_2:\\ 9x-6y+a\\,z=4\\) sind parallel. Bestimmen Sie den Wert von \\(a\\).",
      "loesung": 15,
      "tipp": "Parallelitaet bedeutet \\(\\vec{n}_2=k\\,\\vec{n}_1\\). Lies \\(k\\) aus den x-Komponenten ab (\\(9=k\\cdot 3\\)) und wende denselben Faktor auf die z-Komponente an.",
      "loesungsweg": "Die Normalenvektoren \\(\\vec{n}_1=\\begin{pmatrix}3\\\\-2\\\\5\\end{pmatrix}\\) und \\(\\vec{n}_2=\\begin{pmatrix}9\\\\-6\\\\a\\end{pmatrix}\\) muessen parallel sein. Aus den ersten Komponenten folgt \\(k=\\frac{9}{3}=3\\); Kontrolle an der zweiten: \\(3\\cdot(-2)=-6\\) (passt). Also \\(a=k\\cdot 5=3\\cdot 5=15\\). Wegen \\(k\\cdot 1=3\\neq 4\\) sind die Ebenen sogar echt parallel.",
      "check": {
        "art": "ausdruck",
        "expr": "Rational(9,3)*5"
      },
      "thema": "geo-lage-ebenen"
    },
    {
      "id": "geo-lage-gerade-ebene-r1",
      "level": 1,
      "typ": "numerisch",
      "frage": "Gegeben sind die Ebene \\( E:\\; x + 2y + 2z = 10 \\) mit Normalenvektor \\( \\vec{n} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 2 \\end{pmatrix} \\) und der Richtungsvektor \\( \\vec{u} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix} \\) einer Geraden \\( g \\). Berechnen Sie das Skalarprodukt \\( \\vec{n}\\cdot\\vec{u} \\).",
      "tipp": "Skalarprodukt komponentenweise: \\( \\vec{n}\\cdot\\vec{u} = n_1 u_1 + n_2 u_2 + n_3 u_3 \\). Ist der Wert nicht 0, schneidet die Gerade die Ebene.",
      "loesung": 5,
      "loesungsweg": "\\( \\vec{n}\\cdot\\vec{u} = 1\\cdot 1 + 2\\cdot 1 + 2\\cdot 1 = 1 + 2 + 2 = 5 \\). Da \\( \\vec{n}\\cdot\\vec{u} = 5 \\neq 0 \\) ist, ist die Gerade nicht parallel zur Ebene, sondern schneidet sie in genau einem Punkt.",
      "check": {
        "art": "ausdruck",
        "expr": "Matrix([1,2,2]).dot(Matrix([1,1,1]))"
      },
      "thema": "geo-lage-gerade-ebene"
    },
    {
      "id": "geo-lage-gerade-ebene-r2",
      "level": 1,
      "typ": "mc",
      "frage": "Gegeben ist die Ebene \\( E:\\; 3x - y + 2z = 7 \\) mit Normalenvektor \\( \\vec{n} = \\begin{pmatrix} 3 \\\\ -1 \\\\ 2 \\end{pmatrix} \\). Welcher der folgenden Richtungsvektoren \\( \\vec{u} \\) gehoert zu einer Geraden, die parallel zur Ebene \\( E \\) verlaeuft (d. h. \\( \\vec{n}\\cdot\\vec{u} = 0 \\))?",
      "tipp": "Eine Gerade ist genau dann parallel zur Ebene (oder liegt in ihr), wenn der Richtungsvektor senkrecht zum Normalenvektor steht, also \\( \\vec{n}\\cdot\\vec{u} = 0 \\). Pruefe jede Option durch das Skalarprodukt.",
      "loesungsweg": "Pruefe \\( \\vec{n}\\cdot\\vec{u} \\) fuer jede Option: \\( \\begin{pmatrix} 1 \\\\ 1 \\\\ -1 \\end{pmatrix}: 3-1-2 = 0 \\) (parallel). \\( \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix}: 3-1+2 = 4 \\). \\( \\begin{pmatrix} 1 \\\\ 2 \\\\ 0 \\end{pmatrix}: 3-2+0 = 1 \\). \\( \\begin{pmatrix} 2 \\\\ 2 \\\\ -1 \\end{pmatrix}: 6-2-2 = 2 \\). Nur fuer \\( \\begin{pmatrix} 1 \\\\ 1 \\\\ -1 \\end{pmatrix} \\) ist das Skalarprodukt 0.",
      "optionen": [
        "\\( \\vec{u} = \\begin{pmatrix} 1 \\\\ 1 \\\\ -1 \\end{pmatrix} \\)",
        "\\( \\vec{u} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix} \\)",
        "\\( \\vec{u} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 0 \\end{pmatrix} \\)",
        "\\( \\vec{u} = \\begin{pmatrix} 2 \\\\ 2 \\\\ -1 \\end{pmatrix} \\)"
      ],
      "korrekt": 0,
      "check": {
        "art": "ausdruck",
        "expr": "Matrix([3,-1,2]).dot(Matrix([1,1,-1]))",
        "erwartet": 0
      },
      "thema": "geo-lage-gerade-ebene"
    },
    {
      "id": "geo-lage-gerade-ebene-r3",
      "level": 2,
      "typ": "numerisch",
      "frage": "Gegeben sind die Ebene \\( E:\\; 2x + 3y - z = 6 \\) und die Gerade \\( g:\\; \\vec{x} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix} + t \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix} \\). Bestimmen Sie den Parameterwert \\( t \\) des Durchstosspunktes.",
      "tipp": "Setze den allgemeinen Geradenpunkt \\( (1+t,\\; t,\\; t) \\) in die Ebenengleichung ein und loese die entstehende lineare Gleichung nach \\( t \\) auf.",
      "loesung": 1,
      "loesungsweg": "Geradenpunkt \\( (1+t,\\; t,\\; t) \\) in \\( E \\) einsetzen: \\( 2(1+t) + 3t - t = 6 \\Rightarrow 2 + 2t + 3t - t = 6 \\Rightarrow 2 + 4t = 6 \\Rightarrow 4t = 4 \\Rightarrow t = 1 \\). (Der Durchstosspunkt ist dann \\( (2,\\,1,\\,1) \\), Probe: \\( 2\\cdot 2 + 3\\cdot 1 - 1 = 6 \\).)",
      "check": {
        "art": "ausdruck",
        "expr": "solve(2*(1+symbols('t'))+3*symbols('t')-symbols('t')-6, symbols('t'))[0]"
      },
      "thema": "geo-lage-gerade-ebene"
    },
    {
      "id": "geo-lage-gerade-ebene-r4",
      "level": 2,
      "typ": "numerisch",
      "frage": "Gegeben sind die Ebene \\( E:\\; x - y + 2z = 4 \\) und die Gerade \\( g:\\; \\vec{x} = \\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix} + s \\begin{pmatrix} 1 \\\\ 2 \\\\ 1 \\end{pmatrix} \\). Die Gerade durchstoesst die Ebene in genau einem Punkt. Geben Sie die \\( x \\)-Koordinate dieses Durchstosspunktes an.",
      "tipp": "Setze den Geradenpunkt \\( (2+s,\\; 1+2s,\\; s) \\) in die Ebenengleichung ein, loese nach \\( s \\) auf und setze \\( s \\) in die erste Koordinate \\( x = 2 + s \\) ein.",
      "loesung": 5,
      "loesungsweg": "Einsetzen von \\( (2+s,\\; 1+2s,\\; s) \\) in \\( E \\): \\( (2+s) - (1+2s) + 2s = 4 \\Rightarrow 2 + s - 1 - 2s + 2s = 4 \\Rightarrow 1 + s = 4 \\Rightarrow s = 3 \\). Damit ist \\( x = 2 + s = 2 + 3 = 5 \\). (Der vollstaendige Durchstosspunkt ist \\( (5,\\,7,\\,3) \\).)",
      "check": {
        "art": "ausdruck",
        "expr": "2 + solve((2+symbols('s'))-(1+2*symbols('s'))+2*symbols('s')-4, symbols('s'))[0]"
      },
      "thema": "geo-lage-gerade-ebene"
    },
    {
      "id": "geo-lage-gerade-ebene-r5",
      "level": 3,
      "typ": "mc",
      "frage": "Gesucht ist eine Gerade \\( h \\), die echt parallel zur Ebene \\( E:\\; 2x - y + 3z = 5 \\) (Normalenvektor \\( \\vec{n} = \\begin{pmatrix} 2 \\\\ -1 \\\\ 3 \\end{pmatrix} \\)) verlaeuft. Eine solche Gerade braucht einen Richtungsvektor \\( \\vec{u} \\) mit \\( \\vec{n}\\cdot\\vec{u} = 0 \\) und einen Stuetzpunkt, der nicht in \\( E \\) liegt. Welche der folgenden Geraden ist echt parallel zu \\( E \\)?",
      "tipp": "Zwei Bedingungen pruefen: (1) \\( \\vec{n}\\cdot\\vec{u} = 0 \\) (Richtungsvektor senkrecht zum Normalenvektor) und (2) der Stuetzpunkt erfuellt die Ebenengleichung NICHT. Nur wenn beide zutreffen, ist die Gerade echt parallel.",
      "loesungsweg": "Richtungsvektoren pruefen: \\( \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix}: 2-1+3 = 4 \\neq 0 \\); \\( \\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix}: 4-1+0 = 3 \\neq 0 \\); \\( \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix}: 2-0+6 = 8 \\neq 0 \\); \\( \\begin{pmatrix} 0 \\\\ 3 \\\\ 1 \\end{pmatrix}: 0-3+3 = 0 \\). Nur die Gerade mit \\( \\vec{u} = \\begin{pmatrix} 0 \\\\ 3 \\\\ 1 \\end{pmatrix} \\) erfuellt \\( \\vec{n}\\cdot\\vec{u} = 0 \\). Ihr Stuetzpunkt \\( (1,0,0) \\) liefert \\( 2\\cdot 1 - 0 + 3\\cdot 0 = 2 \\neq 5 \\), liegt also nicht in \\( E \\) — die Gerade ist echt parallel.",
      "optionen": [
        "\\( h:\\; \\vec{x} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix} + r \\begin{pmatrix} 0 \\\\ 3 \\\\ 1 \\end{pmatrix} \\)",
        "\\( h:\\; \\vec{x} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix} + r \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix} \\)",
        "\\( h:\\; \\vec{x} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix} + r \\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix} \\)",
        "\\( h:\\; \\vec{x} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix} + r \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix} \\)"
      ],
      "korrekt": 0,
      "check": {
        "art": "ausdruck",
        "expr": "Matrix([2,-1,3]).dot(Matrix([0,3,1]))",
        "erwartet": 0
      },
      "thema": "geo-lage-gerade-ebene"
    },
    {
      "id": "geo-lage-gerade-ebene-r6",
      "level": 4,
      "typ": "mc",
      "frage": "Gegeben sind die Ebene \\( E:\\; x + 2y + 2z = 9 \\) und die Gerade \\( g:\\; \\vec{x} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix} + t \\begin{pmatrix} 2 \\\\ -1 \\\\ 0 \\end{pmatrix} \\). Bestimmen Sie die Lagebeziehung von \\( g \\) und \\( E \\).",
      "tipp": "Pruefe zuerst \\( \\vec{n}\\cdot\\vec{u} \\) mit \\( \\vec{n} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 2 \\end{pmatrix} \\). Ist es 0, entscheide ueber den Stuetzpunkt: liegt er in \\( E \\) (alle Loesungen, Gerade in \\( E \\)) oder nicht (keine Loesung, echt parallel)?",
      "loesungsweg": "Skalarprodukt: \\( \\vec{n}\\cdot\\vec{u} = 1\\cdot 2 + 2\\cdot(-1) + 2\\cdot 0 = 2 - 2 + 0 = 0 \\) — die Gerade ist also parallel zur Ebene oder liegt in ihr. Stuetzpunkt \\( (1,1,1) \\) in \\( E \\) einsetzen: \\( 1 + 2\\cdot 1 + 2\\cdot 1 = 5 \\neq 9 \\). Der Stuetzpunkt liegt nicht in \\( E \\). Beim Einsetzen des Geradenpunktes \\( (1+2t,\\,1-t,\\,1) \\) entsteht \\( 5 = 9 \\), ein Widerspruch ohne Loesung. Daher ist \\( g \\) echt parallel zur Ebene.",
      "optionen": [
        "\\( g \\) ist echt parallel zu \\( E \\) (keine Loesung).",
        "\\( g \\) durchstoesst \\( E \\) in genau einem Punkt (eine Loesung).",
        "\\( g \\) liegt vollstaendig in \\( E \\) (alle Loesungen).",
        "\\( g \\) steht senkrecht auf \\( E \\)."
      ],
      "korrekt": 0,
      "check": {
        "art": "ausdruck",
        "expr": "Matrix([1,2,2]).dot(Matrix([2,-1,0]))",
        "erwartet": 0
      },
      "thema": "geo-lage-gerade-ebene"
    },
    {
      "id": "geo-winkel-r1",
      "level": 2,
      "typ": "numerisch",
      "frage": "Bestimmen Sie \\(\\cos\\alpha\\) fuer den Schnittwinkel der beiden Ebenen \\(E_1:\\,2x+y+2z=5\\) und \\(E_2:\\,x-2y+2z=3\\). Geben Sie den Wert auf vier Nachkommastellen gerundet an.",
      "tipp": "Normalenvektoren ablesen: \\(\\vec{n_1}=\\begin{pmatrix} 2 \\\\ 1 \\\\ 2 \\end{pmatrix}\\), \\(\\vec{n_2}=\\begin{pmatrix} 1 \\\\ -2 \\\\ 2 \\end{pmatrix}\\). Beide Laengen sind \\(3\\).",
      "loesungsweg": "Skalarprodukt: \\(\\vec{n_1}\\cdot\\vec{n_2}=2\\cdot1+1\\cdot(-2)+2\\cdot2=4\\). Laengen: \\(|\\vec{n_1}|=\\sqrt{4+1+4}=3\\), \\(|\\vec{n_2}|=\\sqrt{1+4+4}=3\\). Damit \\(\\cos\\alpha=\\dfrac{|4|}{3\\cdot3}=\\dfrac{4}{9}\\approx 0{,}4444\\).",
      "loesung": 0.4444,
      "toleranz": 0.01,
      "check": {
        "art": "ausdruck",
        "expr": "Abs(2*1+1*(-2)+2*2)/(sqrt(2**2+1**2+2**2)*sqrt(1**2+(-2)**2+2**2))"
      },
      "thema": "geo-winkel"
    },
    {
      "id": "geo-winkel-r2",
      "level": 1,
      "typ": "numerisch",
      "frage": "Die Ebene \\(E:\\,x+2y+2z=6\\) schneidet die \\(xy\\)-Koordinatenebene. Bestimmen Sie \\(\\cos\\alpha\\) fuer den Schnittwinkel \\(\\alpha\\) zwischen \\(E\\) und der \\(xy\\)-Ebene (auf vier Nachkommastellen gerundet).",
      "tipp": "Die \\(xy\\)-Ebene hat den Normalenvektor \\(\\vec{n_2}=\\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix}\\) mit Laenge \\(1\\). Der Normalenvektor von \\(E\\) ist \\(\\vec{n_1}=\\begin{pmatrix} 1 \\\\ 2 \\\\ 2 \\end{pmatrix}\\).",
      "loesungsweg": "Skalarprodukt: \\(\\vec{n_1}\\cdot\\vec{n_2}=1\\cdot0+2\\cdot0+2\\cdot1=2\\). Laengen: \\(|\\vec{n_1}|=\\sqrt{1+4+4}=3\\), \\(|\\vec{n_2}|=1\\). Somit \\(\\cos\\alpha=\\dfrac{|2|}{3\\cdot1}=\\dfrac{2}{3}\\approx 0{,}6667\\).",
      "loesung": 0.6667,
      "toleranz": 0.01,
      "check": {
        "art": "ausdruck",
        "expr": "Abs(1*0+2*0+2*1)/(sqrt(1**2+2**2+2**2)*1)"
      },
      "thema": "geo-winkel"
    },
    {
      "id": "geo-winkel-r3",
      "level": 2,
      "typ": "mc",
      "frage": "Welcher Schnittwinkel \\(\\alpha\\) ergibt sich zwischen den Ebenen \\(E_1:\\,x+y+z=1\\) und \\(E_2:\\,x-y=2\\)?",
      "tipp": "Normalenvektoren: \\(\\vec{n_1}=\\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix}\\), \\(\\vec{n_2}=\\begin{pmatrix} 1 \\\\ -1 \\\\ 0 \\end{pmatrix}\\). Berechnen Sie zuerst das Skalarprodukt im Zaehler.",
      "loesungsweg": "Skalarprodukt: \\(\\vec{n_1}\\cdot\\vec{n_2}=1\\cdot1+1\\cdot(-1)+1\\cdot0=0\\). Wegen \\(\\cos\\alpha=\\dfrac{|0|}{|\\vec{n_1}|\\,|\\vec{n_2}|}=0\\) folgt \\(\\alpha=\\arccos(0)=90^\\circ\\). Die Ebenen stehen senkrecht aufeinander, da ihre Normalenvektoren orthogonal sind.",
      "optionen": [
        "\\(\\alpha=90^\\circ\\) (die Ebenen stehen senkrecht aufeinander)",
        "\\(\\alpha=0^\\circ\\) (die Ebenen sind parallel)",
        "\\(\\alpha=45^\\circ\\)",
        "\\(\\alpha=60^\\circ\\)"
      ],
      "korrekt": 0,
      "check": {
        "art": "ausdruck",
        "expr": "acos(Abs(1*1+1*(-1)+1*0)/(sqrt(3)*sqrt(2)))*180/pi",
        "erwartet": 90
      },
      "thema": "geo-winkel"
    },
    {
      "id": "geo-winkel-r4",
      "level": 2,
      "typ": "mc",
      "frage": "Die Ebene \\(E:\\,3x+4y+12z=9\\) schneidet die \\(xz\\)-Koordinatenebene. Welcher Wert von \\(\\cos\\alpha\\) gehoert zum Schnittwinkel \\(\\alpha\\) zwischen \\(E\\) und der \\(xz\\)-Ebene?",
      "tipp": "Die \\(xz\\)-Ebene hat den Normalenvektor \\(\\vec{n_2}=\\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\end{pmatrix}\\). Beachten Sie: \\(|\\vec{n_1}|=\\sqrt{9+16+144}=13\\).",
      "loesungsweg": "Normalenvektor von \\(E\\): \\(\\vec{n_1}=\\begin{pmatrix} 3 \\\\ 4 \\\\ 12 \\end{pmatrix}\\), \\(|\\vec{n_1}|=\\sqrt{9+16+144}=\\sqrt{169}=13\\). Skalarprodukt mit \\(\\vec{n_2}=\\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\end{pmatrix}\\): \\(3\\cdot0+4\\cdot1+12\\cdot0=4\\). Also \\(\\cos\\alpha=\\dfrac{|4|}{13\\cdot1}=\\dfrac{4}{13}\\approx 0{,}3077\\).",
      "optionen": [
        "\\(\\cos\\alpha=\\dfrac{4}{13}\\approx 0{,}3077\\)",
        "\\(\\cos\\alpha=\\dfrac{12}{13}\\approx 0{,}9231\\)",
        "\\(\\cos\\alpha=\\dfrac{3}{13}\\approx 0{,}2308\\)",
        "\\(\\cos\\alpha=\\dfrac{4}{12}\\approx 0{,}3333\\)"
      ],
      "korrekt": 0,
      "check": {
        "art": "ausdruck",
        "expr": "Abs(3*0+4*1+12*0)/(sqrt(3**2+4**2+12**2)*1)",
        "erwartet": "4/13"
      },
      "thema": "geo-winkel"
    },
    {
      "id": "geo-winkel-r5",
      "level": 3,
      "typ": "numerisch",
      "frage": "Bestimmen Sie \\(\\cos\\alpha\\) fuer den Schnittwinkel der Ebenen \\(E_1:\\,6x+2y-3z=12\\) und \\(E_2:\\,3x+4z=1\\). Geben Sie den Wert auf vier Nachkommastellen gerundet an.",
      "tipp": "Normalenvektoren: \\(\\vec{n_1}=\\begin{pmatrix} 6 \\\\ 2 \\\\ -3 \\end{pmatrix}\\) mit \\(|\\vec{n_1}|=7\\) und \\(\\vec{n_2}=\\begin{pmatrix} 3 \\\\ 0 \\\\ 4 \\end{pmatrix}\\) mit \\(|\\vec{n_2}|=5\\). In \\(E_2\\) fehlt \\(y\\), die \\(y\\)-Komponente ist daher \\(0\\).",
      "loesungsweg": "Skalarprodukt: \\(\\vec{n_1}\\cdot\\vec{n_2}=6\\cdot3+2\\cdot0+(-3)\\cdot4=18-12=6\\). Laengen: \\(|\\vec{n_1}|=\\sqrt{36+4+9}=\\sqrt{49}=7\\), \\(|\\vec{n_2}|=\\sqrt{9+0+16}=\\sqrt{25}=5\\). Damit \\(\\cos\\alpha=\\dfrac{|6|}{7\\cdot5}=\\dfrac{6}{35}\\approx 0{,}1714\\).",
      "loesung": 0.1714,
      "toleranz": 0.01,
      "check": {
        "art": "ausdruck",
        "expr": "Abs(6*3+2*0+(-3)*4)/(sqrt(6**2+2**2+(-3)**2)*sqrt(3**2+0**2+4**2))"
      },
      "thema": "geo-winkel"
    },
    {
      "id": "geo-winkel-r6",
      "level": 4,
      "typ": "numerisch",
      "frage": "Die Ebene \\(E:\\,2x+3y+6z=12\\) schliesst mit der \\(xy\\)-Koordinatenebene einen Schnittwinkel \\(\\alpha\\) ein. Berechnen Sie \\(\\alpha\\) in Grad (auf zwei Nachkommastellen gerundet).",
      "tipp": "Berechnen Sie zuerst \\(\\cos\\alpha=\\dfrac{|\\vec{n_1}\\cdot\\vec{n_2}|}{|\\vec{n_1}|\\,|\\vec{n_2}|}\\) mit \\(\\vec{n_2}=\\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix}\\) und wenden Sie dann \\(\\arccos\\) an. Es ist \\(|\\vec{n_1}|=7\\).",
      "loesungsweg": "Normalenvektor von \\(E\\): \\(\\vec{n_1}=\\begin{pmatrix} 2 \\\\ 3 \\\\ 6 \\end{pmatrix}\\), \\(|\\vec{n_1}|=\\sqrt{4+9+36}=\\sqrt{49}=7\\). Skalarprodukt mit \\(\\vec{n_2}=\\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix}\\): \\(6\\). Also \\(\\cos\\alpha=\\dfrac{|6|}{7\\cdot1}=\\dfrac{6}{7}\\). Dann \\(\\alpha=\\arccos\\!\\left(\\dfrac{6}{7}\\right)\\approx 31{,}00^\\circ\\).",
      "loesung": 31,
      "toleranz": 0.1,
      "check": {
        "art": "ausdruck",
        "expr": "acos(Abs(2*0+3*0+6*1)/(sqrt(2**2+3**2+6**2)*1))*180/pi"
      },
      "thema": "geo-winkel"
    },
    {
      "id": "geo-abstand-hnf-r1",
      "level": 2,
      "typ": "numerisch",
      "frage": "Gegeben sind die Ebene \\(E:\\; 2x+3y-6z=12\\) und der Punkt \\(P(5\\,|\\,4\\,|\\,1)\\). Berechnen Sie den Abstand des Punktes \\(P\\) von der Ebene \\(E\\) (auf zwei Nachkommastellen gerundet).",
      "tipp": "Setze die Koordinaten von \\(P\\) in \\(d=\\dfrac{|a p_1 + b p_2 + c p_3 - d_0|}{\\sqrt{a^2+b^2+c^2}}\\) ein. Hier ist \\(|\\vec{n}|=\\sqrt{4+9+36}=7\\).",
      "loesungsweg": "\\(d=\\dfrac{|2\\cdot 5 + 3\\cdot 4 - 6\\cdot 1 - 12|}{\\sqrt{2^2+3^2+(-6)^2}}=\\dfrac{|10+12-6-12|}{\\sqrt{49}}=\\dfrac{4}{7}\\approx 0{,}57\\).",
      "loesung": 0.57,
      "toleranz": 0.01,
      "check": {
        "art": "ausdruck",
        "expr": "Abs(2*5+3*4-6*1-12)/sqrt(2**2+3**2+(-6)**2)"
      },
      "thema": "geo-abstand-hnf"
    },
    {
      "id": "geo-abstand-hnf-r2",
      "level": 1,
      "typ": "numerisch",
      "frage": "Eine Ebene besitzt den Normalenvektor \\(\\vec{n}=\\begin{pmatrix} 2 \\\\ 6 \\\\ 3 \\end{pmatrix}\\). Berechnen Sie den Betrag \\(|\\vec{n}|\\).",
      "tipp": "Der Betrag eines Vektors ist \\(|\\vec{n}|=\\sqrt{a^2+b^2+c^2}\\). Beachte: \\(4+36+9\\) ist eine Quadratzahl.",
      "loesungsweg": "\\(|\\vec{n}|=\\sqrt{2^2+6^2+3^2}=\\sqrt{4+36+9}=\\sqrt{49}=7\\).",
      "loesung": 7,
      "check": {
        "art": "ausdruck",
        "expr": "sqrt(2**2+6**2+3**2)"
      },
      "thema": "geo-abstand-hnf"
    },
    {
      "id": "geo-abstand-hnf-r3",
      "level": 3,
      "typ": "numerisch",
      "frage": "Bestimmen Sie den Abstand des Punktes \\(P(4\\,|\\,2\\,|\\,5)\\) von der Ebene \\(E:\\; x+y+z=3\\) (auf zwei Nachkommastellen gerundet).",
      "tipp": "Hier ist \\(|\\vec{n}|=\\sqrt{1+1+1}=\\sqrt{3}\\) irrational. Setze in die HESSEsche Normalform ein und runde erst am Ende.",
      "loesungsweg": "\\(d=\\dfrac{|1\\cdot 4 + 1\\cdot 2 + 1\\cdot 5 - 3|}{\\sqrt{1^2+1^2+1^2}}=\\dfrac{|8|}{\\sqrt{3}}=\\dfrac{8}{\\sqrt{3}}=\\dfrac{8\\sqrt{3}}{3}\\approx 4{,}62\\).",
      "loesung": 4.62,
      "toleranz": 0.01,
      "check": {
        "art": "ausdruck",
        "expr": "Abs(1*4+1*2+1*5-3)/sqrt(1**2+1**2+1**2)"
      },
      "thema": "geo-abstand-hnf"
    },
    {
      "id": "geo-abstand-hnf-r4",
      "level": 4,
      "typ": "numerisch",
      "frage": "Gegeben sind die Ebene \\(E:\\; 2x+2y-z=4\\) und die Gerade \\(g:\\; \\vec{x}=\\begin{pmatrix} 1 \\\\ 3 \\\\ 2 \\end{pmatrix}+t\\begin{pmatrix} 1 \\\\ -1 \\\\ 0 \\end{pmatrix}\\). Die Gerade verläuft parallel zur Ebene. Berechnen Sie den Abstand der Geraden \\(g\\) von der Ebene \\(E\\) (auf zwei Nachkommastellen gerundet).",
      "tipp": "Da \\(g\\) parallel zu \\(E\\) ist (\\(\\vec{r}\\cdot\\vec{n}=0\\)), hat jeder Geradenpunkt denselben Abstand. Setze den Aufpunkt \\((1\\,|\\,3\\,|\\,2)\\) in die HESSEsche Normalform ein. Es gilt \\(|\\vec{n}|=\\sqrt{4+4+1}=3\\).",
      "loesungsweg": "Parallelitätsprüfung: \\(\\begin{pmatrix} 1 \\\\ -1 \\\\ 0 \\end{pmatrix}\\cdot\\begin{pmatrix} 2 \\\\ 2 \\\\ -1 \\end{pmatrix}=2-2+0=0\\), also ist \\(g\\) parallel zu \\(E\\) (der Aufpunkt liegt wegen \\(2\\cdot1+2\\cdot3-2=6\\neq 4\\) nicht in \\(E\\)). Abstand des Aufpunkts \\((1\\,|\\,3\\,|\\,2)\\): \\(d=\\dfrac{|2\\cdot 1 + 2\\cdot 3 - 1\\cdot 2 - 4|}{\\sqrt{2^2+2^2+(-1)^2}}=\\dfrac{|2+6-2-4|}{3}=\\dfrac{2}{3}\\approx 0{,}67\\).",
      "loesung": 0.67,
      "toleranz": 0.01,
      "check": {
        "art": "ausdruck",
        "expr": "Abs(2*1+2*3-1*2-4)/sqrt(2**2+2**2+(-1)**2)"
      },
      "thema": "geo-abstand-hnf"
    },
    {
      "id": "geo-abstand-hnf-r5",
      "level": 2,
      "typ": "mc",
      "frage": "Eine Ebene hat den Normalenvektor \\(\\vec{n}=\\begin{pmatrix} 6 \\\\ 2 \\\\ 3 \\end{pmatrix}\\). Welcher Vektor ist der zugehörige Einheitsnormalenvektor (normierter Normalenvektor)?",
      "tipp": "Teile jede Komponente durch \\(|\\vec{n}|=\\sqrt{36+4+9}\\).",
      "loesungsweg": "Es gilt \\(|\\vec{n}|=\\sqrt{6^2+2^2+3^2}=\\sqrt{49}=7\\). Der Einheitsnormalenvektor ist \\(\\dfrac{1}{7}\\begin{pmatrix} 6 \\\\ 2 \\\\ 3 \\end{pmatrix}=\\begin{pmatrix} 6/7 \\\\ 2/7 \\\\ 3/7 \\end{pmatrix}\\).",
      "optionen": [
        "\\(\\begin{pmatrix} 6/7 \\\\ 2/7 \\\\ 3/7 \\end{pmatrix}\\)",
        "\\(\\begin{pmatrix} 6/11 \\\\ 2/11 \\\\ 3/11 \\end{pmatrix}\\)",
        "\\(\\begin{pmatrix} 6/49 \\\\ 2/49 \\\\ 3/49 \\end{pmatrix}\\)",
        "\\(\\begin{pmatrix} 1/6 \\\\ 1/2 \\\\ 1/3 \\end{pmatrix}\\)"
      ],
      "korrekt": 0,
      "check": {
        "art": "vektor",
        "expr": "Matrix([6,2,3])/sqrt(6**2+2**2+3**2)",
        "erwartet": [
          "6/7",
          "2/7",
          "3/7"
        ]
      },
      "thema": "geo-abstand-hnf"
    },
    {
      "id": "geo-abstand-hnf-r6",
      "level": 3,
      "typ": "numerisch",
      "frage": "Berechnen Sie den Abstand des Ursprungs \\(O(0\\,|\\,0\\,|\\,0)\\) von der Ebene \\(E:\\; 3x-4y+12z=26\\).",
      "tipp": "Setze \\(O\\) in die HESSEsche Normalform ein; alle Zähler-Summanden mit den Koordinaten von \\(O\\) fallen weg. Beachte \\(|\\vec{n}|=\\sqrt{9+16+144}\\).",
      "loesungsweg": "\\(d=\\dfrac{|3\\cdot 0 - 4\\cdot 0 + 12\\cdot 0 - 26|}{\\sqrt{3^2+(-4)^2+12^2}}=\\dfrac{26}{\\sqrt{169}}=\\dfrac{26}{13}=2\\).",
      "loesung": 2,
      "check": {
        "art": "ausdruck",
        "expr": "Abs(3*0-4*0+12*0-26)/sqrt(3**2+(-4)**2+12**2)"
      },
      "thema": "geo-abstand-hnf"
    }
  ],
  "erklaeren": [
    {
      "id": "ana-eigenschaften-e1",
      "frage": "Gegeben ist \\( f(x) = x^4 - 4x^2 + 3 \\). Geben Sie ohne Rechnung drei Eigenschaften des Graphen an und begruenden Sie jeweils kurz.",
      "erwartungsbild": [
        "Symmetrie: Es treten nur gerade Exponenten auf (\\(x^4, x^2, x^0\\)), daher \\(f(-x)=f(x)\\) -> achsensymmetrisch zur y-Achse.",
        "y-Achsenabschnitt: Das absolute Glied ist \\(3\\), also \\(f(0)=3\\); der Graph schneidet die y-Achse bei \\((0\\,|\\,3)\\).",
        "Grenzverhalten: Grad \\(4\\) (gerade) mit positivem Leitkoeffizienten \\(1\\) -> beide Aeste steigen, \\(f(x)\\to +\\infty\\) fuer \\(x\\to\\pm\\infty\\).",
        "Hoechstzahlen: hoechstens \\(4\\) Nullstellen, hoechstens \\(3\\) Extremstellen und hoechstens \\(2\\) Wendestellen (aus Grad \\(4\\))."
      ],
      "thema": "ana-eigenschaften"
    },
    {
      "id": "ana-eigenschaften-e2",
      "frage": "Erlaeutern Sie, woran man bei einer ganzrationalen Funktion allein am Funktionsterm - ohne jede Rechnung - die Symmetrie des Graphen zum Koordinatensystem erkennt.",
      "erwartungsbild": [
        "Massgeblich sind die Exponenten der auftretenden Potenzen von \\(x\\).",
        "Nur gerade Exponenten (inkl. konstantem Glied \\(x^0\\)) -> \\(f(-x)=f(x)\\) -> achsensymmetrisch zur y-Achse.",
        "Nur ungerade Exponenten -> \\(f(-x)=-f(x)\\) -> punktsymmetrisch zum Ursprung; ein konstantes Glied \\(\\neq 0\\) zerstoert diese Symmetrie.",
        "Treten gerade UND ungerade Exponenten gemischt auf, liegt keine Symmetrie zum Koordinatensystem vor."
      ],
      "thema": "ana-eigenschaften"
    },
    {
      "id": "ana-eigenschaften-e3",
      "frage": "Beschreiben Sie, wie sich das Grenzverhalten einer ganzrationalen Funktion fuer \\( x \\to +\\infty \\) und \\( x \\to -\\infty \\) ohne Rechnung aus Grad und Leitkoeffizient ergibt.",
      "erwartungsbild": [
        "Fuer das Grenzverhalten ist nur das Glied mit der hoechsten Potenz (Leitterm \\(a_n x^n\\)) entscheidend; alle anderen Summanden wachsen langsamer.",
        "Gerader Grad: beide Aeste streben in dieselbe Richtung - bei \\(a_n>0\\) nach \\(+\\infty\\), bei \\(a_n<0\\) nach \\(-\\infty\\).",
        "Ungerader Grad: die Aeste streben in entgegengesetzte Richtungen; bei \\(a_n>0\\) links \\(-\\infty\\) und rechts \\(+\\infty\\), bei \\(a_n<0\\) umgekehrt.",
        "Das Vorzeichen des Leitkoeffizienten legt also (zusammen mit der Paritaet des Grades) die Richtung der beiden Aeste fest."
      ],
      "thema": "ana-eigenschaften"
    },
    {
      "id": "ana-eigenschaften-e4",
      "frage": "Begruenden Sie ohne Rechnung, warum der Graph einer ganzrationalen Funktion vom Grad \\(n\\) hoechstens \\(n\\) Nullstellen, hoechstens \\(n-1\\) Extremstellen und hoechstens \\(n-2\\) Wendestellen besitzen kann.",
      "erwartungsbild": [
        "Nullstellen: Ein Term vom Grad \\(n\\) laesst sich in hoechstens \\(n\\) Linearfaktoren zerlegen, also hoechstens \\(n\\) reelle Nullstellen.",
        "Extremstellen sind notwendig Nullstellen von \\(f'\\); \\(f'\\) hat Grad \\(n-1\\), also hoechstens \\(n-1\\) Nullstellen und damit hoechstens \\(n-1\\) Extremstellen.",
        "Wendestellen sind notwendig Nullstellen von \\(f''\\) (mit Vorzeichenwechsel); \\(f''\\) hat Grad \\(n-2\\), also hoechstens \\(n-2\\) Wendestellen.",
        "Mit jeder Ableitung sinkt der Grad um \\(1\\), wodurch sich die jeweilige Hoechstzahl der Stellen um \\(1\\) verringert."
      ],
      "thema": "ana-eigenschaften"
    },
    {
      "id": "ana-nullstellen-e1",
      "frage": "Erlaeutern Sie die Grundidee der Substitution \\( x^{2}=z \\) bei der Nullstellenbestimmung einer biquadratischen Funktion \\( f(x)=a x^{4}+b x^{2}+c \\). Warum ist dieses Vorgehen sinnvoll?",
      "erwartungsbild": [
        "In \\( f(x) \\) treten nur gerade Potenzen auf; mit \\( z=x^{2} \\) wird wegen \\( x^{4}=(x^{2})^{2}=z^{2} \\) aus dem Grad-4-Term eine quadratische Gleichung \\( a z^{2}+b z+c=0 \\).",
        "Eine quadratische Gleichung ist mit pq-/Mitternachtsformel direkt loesbar, eine allgemeine Gleichung 4. Grades dagegen nicht ohne Weiteres.",
        "Nach dem Loesen muss ruecksubstituiert werden: \\( x^{2}=z \\), wobei nur \\( z\\ge 0 \\) reelle Nullstellen \\( x=\\pm\\sqrt{z} \\) liefert.",
        "Negative \\( z \\)-Werte ergeben keine reelle Loesung und werden verworfen."
      ],
      "thema": "ana-nullstellen"
    },
    {
      "id": "ana-nullstellen-e2",
      "frage": "Eine biquadratische Funktion \\( f(x)=a x^{4}+b x^{2}+c \\) fuehrt nach der Substitution auf die quadratische Gleichung \\( a z^{2}+b z+c=0 \\). Begruenden Sie ohne Rechnung, warum \\( f \\) hoechstens vier und je nach Lage der \\( z \\)-Loesungen auch null, zwei oder vier Nullstellen haben kann.",
      "erwartungsbild": [
        "Jede positive \\( z \\)-Loesung liefert wegen \\( x=\\pm\\sqrt{z} \\) genau zwei reelle Nullstellen, eine \\( z \\)-Loesung gleich null liefert genau eine (\\( x=0 \\)), eine negative \\( z \\)-Loesung liefert keine reelle Nullstelle.",
        "Die quadratische Gleichung in \\( z \\) hat hoechstens zwei Loesungen; daraus folgt fuer \\( x \\) hoechstens vier Nullstellen.",
        "Sind beide \\( z \\)-Loesungen positiv: vier Nullstellen; ist eine positiv und eine negativ: zwei Nullstellen; sind beide negativ (oder keine reelle \\( z \\)-Loesung): keine Nullstelle.",
        "Sonderfall einer doppelten \\( z \\)-Loesung bzw. \\( z=0 \\) reduziert die Anzahl entsprechend."
      ],
      "thema": "ana-nullstellen"
    },
    {
      "id": "ana-nullstellen-e3",
      "frage": "Erlaeutern Sie, wie der Satz vom Nullprodukt beim Bestimmen der Nullstellen einer ganzrationalen Funktion eingesetzt wird, etwa bei \\( f(x)=x^{3}-4x \\).",
      "erwartungsbild": [
        "Zunaechst wird die Funktion durch Ausklammern in ein Produkt zerlegt, z. B. \\( f(x)=x\\,(x^{2}-4)=x\\,(x-2)(x+2) \\).",
        "Der Satz vom Nullprodukt besagt: Ein Produkt ist genau dann null, wenn mindestens einer der Faktoren null ist.",
        "Man setzt daher jeden Faktor einzeln gleich null und loest die entstehenden einfachen Gleichungen: \\( x=0 \\), \\( x-2=0 \\), \\( x+2=0 \\).",
        "Die so gefundenen Werte \\( x=0,\\,2,\\,-2 \\) bilden die Loesungsmenge bzw. die Nullstellen."
      ],
      "thema": "ana-nullstellen"
    },
    {
      "id": "ana-nullstellen-e4",
      "frage": "Der Graph einer ganzrationalen Funktion 4. Grades schneidet die x-Achse an zwei Stellen und beruehrt sie an keiner weiteren Stelle. Begruenden Sie ohne Rechnung, welche Aussage sich daraus ueber die Anzahl der reellen Nullstellen und ueber die zugehoerigen \\( z \\)-Werte einer biquadratischen Funktion treffen laesst.",
      "erwartungsbild": [
        "Schnittpunkte mit der x-Achse sind genau die reellen Nullstellen; zwei Schnittstellen bedeuten zwei reelle Nullstellen.",
        "Bei einer biquadratischen Funktion treten Nullstellen symmetrisch als \\( \\pm\\sqrt{z} \\) auf; zwei Nullstellen bedeuten genau eine positive \\( z \\)-Loesung.",
        "Die zweite \\( z \\)-Loesung muss negativ sein (oder es existiert keine zweite reelle \\( z \\)-Loesung), da sie sonst zwei weitere Schnittstellen liefern wuerde.",
        "Aus 'beruehrt sie an keiner weiteren Stelle' folgt, dass \\( z=0 \\) keine Loesung ist (sonst Beruehrung im Ursprung); die Nullstellen liegen also achsensymmetrisch bei \\( x=\\pm\\sqrt{z} \\) mit \\( z>0 \\)."
      ],
      "thema": "ana-nullstellen"
    },
    {
      "id": "ana-extrema-wende-e1",
      "frage": "Erlaeutern Sie den Unterschied zwischen der notwendigen und der hinreichenden Bedingung fuer das Vorliegen eines Wendepunktes.",
      "erwartungsbild": [
        "Notwendige Bedingung: An einer Wendestelle \\(x_0\\) muss \\(f''(x_0)=0\\) gelten. Diese Bedingung liefert nur Kandidaten, garantiert aber noch keinen Wendepunkt.",
        "Hinreichende Bedingung: Gilt zusaetzlich \\(f''(x_0)=0\\) UND \\(f'''(x_0)\\neq 0\\), so ist \\(x_0\\) sicher eine Wendestelle.",
        "Aus der notwendigen Bedingung allein folgt nicht zwingend ein Wendepunkt (Beispiel: \\(f(x)=x^{4}\\) mit \\(f''(0)=0\\), aber kein Wendepunkt bei \\(x=0\\)).",
        "Erst die hinreichende Bedingung sichert, dass an der Kandidatenstelle ein Vorzeichenwechsel der Kruemmung und damit ein echter Wendepunkt vorliegt."
      ],
      "thema": "ana-extrema-wende"
    },
    {
      "id": "ana-extrema-wende-e2",
      "frage": "Begruenden Sie, warum die Bedingung \\(f''(x_0)=0\\) allein nicht ausreicht, um auf einen Wendepunkt zu schliessen.",
      "erwartungsbild": [
        "\\(f''(x_0)=0\\) bedeutet nur, dass die Kruemmung an dieser Stelle null ist; es muss dort kein Kruemmungswechsel stattfinden.",
        "Gegenbeispiel: Bei \\(f(x)=x^{4}\\) ist \\(f''(0)=0\\), aber der Graph ist beidseitig linksgekruemmt; bei \\(x=0\\) liegt ein Tiefpunkt, kein Wendepunkt.",
        "Ein Wendepunkt erfordert einen Vorzeichenwechsel von \\(f''\\); dies wird durch \\(f'''(x_0)\\neq 0\\) (oder direkt durch eine Vorzeichenuntersuchung von \\(f''\\)) sichergestellt.",
        "Daher ist \\(f''(x_0)=0\\) nur notwendig, nicht hinreichend."
      ],
      "thema": "ana-extrema-wende"
    },
    {
      "id": "ana-extrema-wende-e3",
      "frage": "Erlaeutern Sie, wie man mithilfe von \\(f''\\) die Art eines Extremums (Hochpunkt oder Tiefpunkt) entscheidet, und nennen Sie das verwendete Kriterium.",
      "erwartungsbild": [
        "Zunaechst liefert die notwendige Bedingung \\(f'(x_0)=0\\) die Kandidatenstellen fuer Extrema.",
        "Hinreichendes Kriterium (\\(f''\\)-Kriterium): Gilt \\(f'(x_0)=0\\) und \\(f''(x_0)<0\\), so liegt ein Hochpunkt (lokales Maximum) vor.",
        "Gilt \\(f'(x_0)=0\\) und \\(f''(x_0)>0\\), so liegt ein Tiefpunkt (lokales Minimum) vor.",
        "Ist \\(f''(x_0)=0\\), so versagt das Kriterium; man muss dann das Vorzeichenwechselverhalten von \\(f'\\) untersuchen."
      ],
      "thema": "ana-extrema-wende"
    },
    {
      "id": "ana-extrema-wende-e4",
      "frage": "Vergleichen Sie das \\(f''\\)-Kriterium fuer Extrema mit dem \\(f'''\\)-Kriterium fuer Wendepunkte. Worin besteht die strukturelle Analogie?",
      "erwartungsbild": [
        "Beim Extremum: notwendige Bedingung \\(f'(x_0)=0\\), hinreichend zusaetzlich \\(f''(x_0)\\neq 0\\) (Vorzeichen bestimmt Hoch-/Tiefpunkt).",
        "Beim Wendepunkt: notwendige Bedingung \\(f''(x_0)=0\\), hinreichend zusaetzlich \\(f'''(x_0)\\neq 0\\).",
        "Strukturelle Analogie: In beiden Faellen wird die erste verschwindende Ableitung gleich null gesetzt und die naechsthoehere Ableitung auf \\(\\neq 0\\) geprueft.",
        "Verschwindet auch diese naechsthoehere Ableitung, versagt das jeweilige Kriterium und es ist eine Vorzeichenuntersuchung der relevanten Ableitung noetig."
      ],
      "thema": "ana-extrema-wende"
    },
    {
      "id": "ana-ableitung-graph-e1",
      "frage": "Erlaeutern Sie, wie man mit dem Graphen von \\(f'\\) die Extremstellen von \\(f\\) und ihre Art bestimmt.",
      "erwartungsbild": [
        "Extremstellen von \\(f\\) sind moegliche Kandidaten an den Nullstellen von \\(f'\\) (notwendige Bedingung \\(f'(x_0)=0\\), waagerechte Tangente).",
        "Hinreichend ist ein Vorzeichenwechsel von \\(f'\\) an der Nullstelle; aus dem Graphen abzulesen daran, dass \\(f'\\) die x-Achse schneidet (nicht nur beruehrt).",
        "Vorzeichenwechsel \\(-\\to+\\) liefert eine Tiefpunktstelle (Minimum), Vorzeichenwechsel \\(+\\to-\\) eine Hochpunktstelle (Maximum).",
        "Beruehrt der Graph von \\(f'\\) die x-Achse ohne Vorzeichenwechsel (doppelte Nullstelle), so liegt keine Extremstelle, sondern ein Sattel-/Terrassenpunkt vor."
      ],
      "thema": "ana-ableitung-graph"
    },
    {
      "id": "ana-ableitung-graph-e2",
      "frage": "Begruenden Sie, warum aus \\(f'(x_0)=0\\) allein noch nicht folgt, dass \\(f\\) an der Stelle \\(x_0\\) eine Extremstelle besitzt.",
      "erwartungsbild": [
        "\\(f'(x_0)=0\\) ist nur notwendig: Es garantiert eine waagerechte Tangente, aber nicht zwingend einen Hoch- oder Tiefpunkt.",
        "Entscheidend ist das Verhalten von \\(f'\\) in der Umgebung: nur bei einem Vorzeichenwechsel liegt ein Extremum vor.",
        "Gegenbeispiel: An einer doppelten Nullstelle von \\(f'\\) (Graph beruehrt die x-Achse) bleibt das Vorzeichen erhalten - es entsteht ein Sattelpunkt statt eines Extremums (z.B. \\(f'(x)=x^2\\) bei \\(x_0=0\\))."
      ],
      "thema": "ana-ableitung-graph"
    },
    {
      "id": "ana-ableitung-graph-e3",
      "frage": "Beschreiben Sie, wie Sie allein aus dem Graphen von \\(f'\\) entscheiden, in welchen Bereichen der Graph von \\(f\\) steigt bzw. faellt, und wie sich daraus die Art einer Extremstelle ergibt.",
      "erwartungsbild": [
        "In Intervallen mit \\(f'(x)>0\\) (Graph von \\(f'\\) oberhalb der x-Achse) ist \\(f\\) streng monoton steigend, bei \\(f'(x)<0\\) (unterhalb) streng monoton fallend.",
        "An einer Extremstelle wechselt damit das Monotonieverhalten von \\(f\\): von steigend zu fallend ergibt einen Hochpunkt, von fallend zu steigend einen Tiefpunkt.",
        "Die Art des Extremums folgt unmittelbar aus der Richtung des Vorzeichenwechsels von \\(f'\\): \\(+\\to-\\) Hochpunkt, \\(-\\to+\\) Tiefpunkt."
      ],
      "thema": "ana-ableitung-graph"
    },
    {
      "id": "ana-ableitung-graph-e4",
      "frage": "Erklaeren Sie den Unterschied zwischen einem einfachen und einem doppelten Schnittpunkt des Graphen von \\(f'\\) mit der x-Achse hinsichtlich der Bedeutung fuer \\(f\\).",
      "erwartungsbild": [
        "Ein einfacher Schnittpunkt (Graph von \\(f'\\) durchsetzt die x-Achse) bedeutet einen Vorzeichenwechsel von \\(f'\\) und damit eine Extremstelle von \\(f\\).",
        "Ein doppelter Schnittpunkt (Graph von \\(f'\\) beruehrt die x-Achse und kehrt auf dieselbe Seite zurueck) bedeutet keinen Vorzeichenwechsel und damit keine Extremstelle.",
        "Im Beruehrfall hat \\(f\\) zwar eine waagerechte Tangente (\\(f'=0\\)), jedoch einen Sattel-/Terrassenpunkt; das Monotonieverhalten von \\(f\\) bleibt vor und hinter der Stelle gleich (durchgehend steigend oder durchgehend fallend)."
      ],
      "thema": "ana-ableitung-graph"
    },
    {
      "id": "ana-rekonstruktion-e1",
      "frage": "Erlaeutern Sie allgemein, wie man eine ganzrationale Funktion 3. Grades aus vorgegebenen Eigenschaften bestimmt (Steckbriefaufgabe).",
      "erwartungsbild": [
        "Allgemeinen Ansatz mit unbekannten Koeffizienten aufstellen: \\( f(x)=a x^{3}+b x^{2}+c x+d \\) (vier Unbekannte).",
        "Benoetigte Ableitungen bestimmen: \\( f'(x)=3a x^{2}+2b x+c \\), \\( f''(x)=6a x+2b \\).",
        "Jede Eigenschaft in eine Gleichung uebersetzen (Punkt -> Funktionswert, Tangentensteigung -> \\(f'\\), Wendepunkt -> \\(f''\\)).",
        "Aus den Gleichungen ein lineares Gleichungssystem bilden und nach \\(a,b,c,d\\) aufloesen; Ergebnis durch Einsetzen kontrollieren."
      ],
      "thema": "ana-rekonstruktion"
    },
    {
      "id": "ana-rekonstruktion-e2",
      "frage": "Begruenden Sie, warum man fuer die eindeutige Bestimmung einer ganzrationalen Funktion 3. Grades genau vier Bedingungen benoetigt, und nennen Sie typische Eigenschaften, die jeweils eine Bedingung liefern.",
      "erwartungsbild": [
        "Der Ansatz \\( f(x)=a x^{3}+b x^{2}+c x+d \\) hat vier unbekannte Koeffizienten \\(a,b,c,d\\).",
        "Ein lineares Gleichungssystem ist nur dann eindeutig loesbar, wenn (mindestens) so viele unabhaengige Gleichungen wie Unbekannte vorliegen, also vier.",
        "Ein vorgegebener Punkt \\((x_0\\mid y_0)\\) liefert \\( f(x_0)=y_0 \\).",
        "Eine waagerechte Tangente (Extrem- oder Sattelpunkt) liefert \\( f'(x_0)=0 \\); eine Wendestelle liefert \\( f''(x_0)=0 \\)."
      ],
      "thema": "ana-rekonstruktion"
    },
    {
      "id": "ana-rekonstruktion-e3",
      "frage": "Erlaeutern Sie, wie sich eine vorgegebene Symmetrie (Punktsymmetrie zum Ursprung oder Achsensymmetrie zur y-Achse) auf den Ansatz einer ganzrationalen Funktion auswirkt und welchen Vorteil das fuer die Rekonstruktion bringt.",
      "erwartungsbild": [
        "Punktsymmetrie zum Ursprung bedeutet \\( f(-x)=-f(x) \\); dadurch fallen alle Terme mit geraden Exponenten weg (beim Grad 3 also \\(b=0,\\ d=0\\), Ansatz \\( f(x)=a x^{3}+c x \\)).",
        "Achsensymmetrie zur y-Achse bedeutet \\( f(-x)=f(x) \\); dadurch fallen alle Terme mit ungeraden Exponenten weg (Ansatz nur mit geraden Potenzen, z. B. \\( f(x)=a x^{4}+b x^{2}+e \\)).",
        "Die Symmetrie reduziert die Anzahl der unbekannten Koeffizienten.",
        "Dadurch werden weniger Bedingungen benoetigt und das lineare Gleichungssystem wird kleiner und einfacher loesbar."
      ],
      "thema": "ana-rekonstruktion"
    },
    {
      "id": "ana-rekonstruktion-e4",
      "frage": "Bei einer Steckbriefaufgabe wird ein Sattelpunkt (Terrassenpunkt) an einer Stelle \\(x_0\\) gefordert. Erlaeutern Sie, welche Bedingungen dieser eine Punkt fuer die Rekonstruktion liefert.",
      "erwartungsbild": [
        "Ein Sattelpunkt liegt auf dem Graphen, also liefert er den Funktionswert: \\( f(x_0)=y_0 \\).",
        "Ein Sattelpunkt besitzt eine waagerechte Tangente, also gilt \\( f'(x_0)=0 \\).",
        "Ein Sattelpunkt ist zugleich ein Wendepunkt, also gilt die notwendige Bedingung \\( f''(x_0)=0 \\).",
        "Ein einziger Sattelpunkt liefert somit drei Gleichungen fuer das lineare Gleichungssystem (Funktionswert, erste und zweite Ableitung)."
      ],
      "thema": "ana-rekonstruktion"
    },
    {
      "id": "ana-integral-e1",
      "frage": "Erlaeutern Sie das Vorgehen zur Berechnung des Volumens eines Koerpers, der entsteht, wenn der Graph einer Funktion \\(f\\) ueber \\([a,b]\\) um die \\(x\\)-Achse rotiert.",
      "erwartungsbild": [
        "Jeder Querschnitt senkrecht zur \\(x\\)-Achse ist eine Kreisscheibe mit Radius \\(|f(x)|\\), also Flaeche \\(\\pi\\,f(x)^{2}\\).",
        "Aufsummieren (Integrieren) der Scheibenvolumina liefert die Formel \\(V=\\pi\\int_{a}^{b}\\bigl(f(x)\\bigr)^{2}\\,dx\\).",
        "Wichtig: \\(f(x)\\) wird quadriert (nicht das fertige Integral), wodurch Vorzeichen von \\(f\\) keine Rolle spielen.",
        "Stammfunktion des quadrierten Terms bilden, Grenzen einsetzen und mit \\(\\pi\\) multiplizieren; Ergebnis in Volumeneinheiten angeben."
      ],
      "thema": "ana-integral"
    },
    {
      "id": "ana-integral-e2",
      "frage": "Erlaeutern Sie, warum man bei der Flaeche zwischen zwei Graphen, deren Differenz das Vorzeichen wechselt, das Integrationsintervall an den Schnittstellen aufteilen muss.",
      "erwartungsbild": [
        "Das bestimmte Integral der Differenz misst eine vorzeichenbehaftete (orientierte) Flaeche, nicht den geometrischen Inhalt.",
        "Wo die Differenz negativ ist (untere und obere Kurve vertauscht), liefert das Integral einen negativen Beitrag.",
        "Ueber das ganze Intervall koennen sich positive und negative Beitraege teilweise oder ganz aufheben, sodass das Ergebnis zu klein (oder sogar 0) wird.",
        "Korrekt: an jeder Schnittstelle trennen, in jedem Teilintervall obere minus untere Kurve integrieren bzw. den Betrag nehmen und die Teilflaechen addieren."
      ],
      "thema": "ana-integral"
    },
    {
      "id": "ana-integral-e3",
      "frage": "Beschreiben Sie, wie man die Flaeche bestimmt, die der Graph einer ganzrationalen Funktion und eine seiner Tangenten einschliessen, und worin sich dieser Fall von der Flaeche zwischen zwei beliebigen Graphen unterscheidet.",
      "erwartungsbild": [
        "Zunaechst Tangente im Beruehrpunkt \\(x_0\\) aufstellen: \\(t(x)=f'(x_0)(x-x_0)+f(x_0)\\).",
        "Die Differenz \\(f(x)-t(x)\\) besitzt bei \\(x_0\\) eine DOPPELTE Nullstelle (Beruehrung), da Tangente und Graph dort gemeinsamen Funktions- und Steigungswert haben.",
        "Faktorisieren von \\(f(x)-t(x)\\) liefert ueber den Faktor \\((x-x_0)^2\\) hinaus die weitere(n) Schnittstelle(n) als Integrationsgrenze.",
        "Anschliessend wie ueblich \\(A=\\bigl|\\int (f(x)-t(x))\\,dx\\bigr|\\) zwischen Beruehr- und Schnittstelle berechnen; Unterschied: eine Grenze ist hier automatisch der Beruehrpunkt."
      ],
      "thema": "ana-integral"
    },
    {
      "id": "ana-integral-e4",
      "frage": "Erlaeutern Sie, welche geometrische Bedeutung das Vorzeichen eines bestimmten Integrals \\(\\int_a^b f(x)\\,dx\\) hat und warum es vom gesuchten Flaecheninhalt abweichen kann.",
      "erwartungsbild": [
        "Das bestimmte Integral gibt die orientierte (vorzeichenbehaftete) Bilanz aus Flaechenanteilen oberhalb und unterhalb der \\(x\\)-Achse an.",
        "Flaechenstuecke oberhalb der \\(x\\)-Achse zaehlen positiv, Stuecke unterhalb negativ.",
        "Liegt der Graph teils ueber, teils unter der Achse, koennen sich Anteile aufheben; das Integral kann kleiner als der tatsaechliche Inhalt oder sogar null sein.",
        "Fuer den geometrischen Flaecheninhalt zerlegt man an den Nullstellen von \\(f\\) und summiert die Betraege der Teilintegrale."
      ],
      "thema": "ana-integral"
    },
    {
      "id": "ana-scharen-e1",
      "frage": "Erlaeutern Sie am Beispiel der Schar \\( f_k(x) = x^4 - k\\,x^2 \\) (mit \\(k\\) reell), wie sich die Anzahl der reellen Nullstellen mit \\(k\\) aendert.",
      "erwartungsbild": [
        "Term faktorisieren: \\( x^4 - k x^2 = x^2(x^2 - k) \\); eine Loesung ist stets \\(x=0\\), die weiteren ergeben sich aus \\( x^2 = k \\).",
        "Fallunterscheidung nach dem Vorzeichen von \\(k\\): fuer \\( k < 0 \\) hat \\( x^2 = k \\) keine reelle Loesung, es bleibt nur \\(x=0\\) - also genau eine Nullstelle.",
        "Fuer \\( k = 0 \\) wird \\( f_0(x)=x^4 \\); einzige (vierfache) Nullstelle bei \\(x=0\\) - ebenfalls nur eine verschiedene Nullstelle.",
        "Fuer \\( k > 0 \\) liefert \\( x^2 = k \\) zusaetzlich \\( x = \\pm\\sqrt{k} \\); zusammen mit \\(x=0\\) ergeben sich drei verschiedene Nullstellen.",
        "Fazit: Die Anzahl der verschiedenen Nullstellen springt bei \\(k=0\\); fuer \\(k>0\\) sind es drei, fuer \\(k\\le 0\\) genau eine."
      ],
      "thema": "ana-scharen"
    },
    {
      "id": "ana-scharen-e2",
      "frage": "Begruenden Sie ohne ausfuehrliche Rechnung, warum alle Kurven der Schar \\( f_k(x) = k\\,(x^2 - 2x) + x^3 - 1 \\) durch zwei feste, von \\(k\\) unabhaengige Punkte verlaufen.",
      "erwartungsbild": [
        "Der Parameter \\(k\\) steht nur vor dem Term \\( x^2 - 2x \\); nur dieser Summand veraendert sich beim Variieren von \\(k\\).",
        "An den Stellen, an denen \\( x^2 - 2x = 0 \\) ist, faellt der gesamte \\(k\\)-Anteil weg, sodass der Funktionswert dort nicht mehr von \\(k\\) abhaengt.",
        "Die Gleichung \\( x^2 - 2x = x(x-2)=0 \\) hat die zwei Loesungen \\(x=0\\) und \\(x=2\\); an genau diesen Stellen liefern alle Kurven denselben \\(y\\)-Wert.",
        "Damit verlaufen alle Scharkurven durch die beiden festen Punkte \\((0\\mid -1)\\) und \\((2\\mid 7)\\) - unabhaengig von \\(k\\)."
      ],
      "thema": "ana-scharen"
    },
    {
      "id": "ana-scharen-e3",
      "frage": "Erlaeutern Sie die Vorgehensweise, um fuer eine Schar \\( f_k \\) einen Wert von \\(k\\) so zu bestimmen, dass ein Extrempunkt der Kurve auf der \\(x\\)-Achse liegt.",
      "erwartungsbild": [
        "Zunaechst die Extremstelle(n) bestimmen: \\( f_k'(x)=0 \\) loesen (notwendige Bedingung); meist haengt die Loesung von \\(k\\) ab oder ist fest.",
        "Mit der zweiten Ableitung pruefen, ob ein Hoch- oder Tiefpunkt vorliegt (\\( f_k''(x_0) \\neq 0 \\)).",
        "Bedingung \"auf der \\(x\\)-Achse\" bedeutet, dass der \\(y\\)-Wert des Extrempunktes null ist: also \\( f_k(x_0) = 0 \\) ansetzen.",
        "Diese Gleichung nach \\(k\\) aufloesen; der gefundene Wert (bzw. die Werte) von \\(k\\) erfuellt die Bedingung.",
        "Geometrisch entspricht ein Extrempunkt auf der \\(x\\)-Achse einer doppelten (beruehrenden) Nullstelle der Funktion an dieser Stelle."
      ],
      "thema": "ana-scharen"
    },
    {
      "id": "ana-scharen-e4",
      "frage": "Beschreiben Sie, wie man begruendet, dass die Lage der Extremstellen der Schar \\( f_k(x) = x^2 - 4x + k \\) nicht von \\(k\\) abhaengt, die Hoehe des Tiefpunktes aber schon.",
      "erwartungsbild": [
        "Erste Ableitung bilden: \\( f_k'(x) = 2x - 4 \\); der Parameter \\(k\\) ist eine additive Konstante und faellt beim Ableiten weg.",
        "Die Extremstelle folgt aus \\( f_k'(x)=0 \\Rightarrow x=2 \\) - dieser \\(x\\)-Wert ist fuer jedes \\(k\\) gleich, die Extremstelle ist also \\(k\\)-unabhaengig.",
        "Der zugehoerige Funktionswert \\( f_k(2) = 4 - 8 + k = k - 4 \\) haengt dagegen direkt von \\(k\\) ab.",
        "Anschaulich: Variieren von \\(k\\) verschiebt die ganze Parabel nur senkrecht (in \\(y\\)-Richtung); Form und Lage der Symmetrieachse \\(x=2\\) bleiben erhalten, nur die Hoehe des Tiefpunktes \\((2\\mid k-4)\\) wandert."
      ],
      "thema": "ana-scharen"
    },
    {
      "id": "geo-vektoren-geraden-e1",
      "frage": "Eine Gerade \\(g: \\vec{x} = \\vec{a} + t\\cdot\\vec{u}\\) im Raum hat den Richtungsvektor \\(\\vec{u} = \\begin{pmatrix} 0 \\\\ 0 \\\\ 3 \\end{pmatrix}\\). Begruenden Sie ohne Rechnung, welche besondere Lage die Gerade im Koordinatensystem hat.",
      "erwartungsbild": [
        "Im Richtungsvektor sind die \\(x\\)- und \\(y\\)-Komponente gleich \\(0\\), nur die \\(z\\)-Komponente ist von \\(0\\) verschieden.",
        "Bewegt man sich entlang der Geraden, aendern sich \\(x\\) und \\(y\\) nicht, nur \\(z\\) waechst bzw. faellt; die Gerade verlaeuft also parallel zur \\(z\\)-Achse (bzw. ist die \\(z\\)-Achse, falls auch \\(\\vec{a}\\) auf ihr liegt).",
        "Allgemein gilt: ist genau EINE Koordinate des Richtungsvektors ungleich \\(0\\), so ist die Gerade parallel zur entsprechenden Koordinatenachse."
      ],
      "thema": "geo-vektoren-geraden"
    },
    {
      "id": "geo-vektoren-geraden-e2",
      "frage": "Erlaeutern Sie, woran man am Richtungsvektor einer Geraden erkennt, dass die Gerade parallel zu einer Koordinatenebene (z. B. der \\(x\\)-\\(y\\)-Ebene) verlaeuft.",
      "erwartungsbild": [
        "Die Gerade ist parallel zu einer Koordinatenebene, wenn GENAU EINE Komponente des Richtungsvektors gleich \\(0\\) ist.",
        "Bei Parallelitaet zur \\(x\\)-\\(y\\)-Ebene ist die \\(z\\)-Komponente des Richtungsvektors \\(0\\) (\\(u_3 = 0\\)); dann bleibt die \\(z\\)-Koordinate aller Punkte der Geraden konstant.",
        "Analog: \\(u_2 = 0\\) bedeutet parallel zur \\(x\\)-\\(z\\)-Ebene, \\(u_1 = 0\\) bedeutet parallel zur \\(y\\)-\\(z\\)-Ebene.",
        "Zusatz: Ist nicht nur \\(u_3=0\\), sondern liegt zusaetzlich der Stuetzpunkt in der Ebene (\\(a_3=0\\)), so liegt die Gerade sogar IN der \\(x\\)-\\(y\\)-Ebene."
      ],
      "thema": "geo-vektoren-geraden"
    },
    {
      "id": "geo-vektoren-geraden-e3",
      "frage": "Beschreiben Sie, wie man entscheidet, ob drei Punkte \\(A\\), \\(B\\) und \\(C\\) auf einer gemeinsamen Geraden liegen (kollinear sind).",
      "erwartungsbild": [
        "Zwei Verbindungsvektoren bilden, die vom selben Punkt ausgehen, z. B. \\(\\overrightarrow{AB}\\) und \\(\\overrightarrow{AC}\\).",
        "Pruefen, ob die beiden Vektoren Vielfache voneinander sind, d. h. ob ein Faktor \\(r\\) mit \\(\\overrightarrow{AC} = r\\cdot\\overrightarrow{AB}\\) existiert (Kollinearitaet / lineare Abhaengigkeit).",
        "Existiert ein einheitliches \\(r\\) fuer alle drei Komponenten, sind die Punkte kollinear; widersprechen sich die Faktoren, liegen sie nicht auf einer Geraden.",
        "Alternativ: Gerade durch \\(A\\) und \\(B\\) aufstellen und mit einer Punktprobe pruefen, ob \\(C\\) auf ihr liegt."
      ],
      "thema": "geo-vektoren-geraden"
    },
    {
      "id": "geo-vektoren-geraden-e4",
      "frage": "Erklaeren Sie, warum man zur Punktprobe immer ALLE drei Komponentengleichungen pruefen muss und es nicht genuegt, den Parameter \\(t\\) aus nur einer Gleichung zu bestimmen.",
      "erwartungsbild": [
        "Aus einer einzelnen Komponente erhaelt man stets ein \\(t\\); dieses garantiert nur die Uebereinstimmung in dieser einen Koordinate.",
        "Der Punkt liegt aber nur dann auf der Geraden, wenn DASSELBE \\(t\\) auch die beiden uebrigen Komponentengleichungen erfuellt (alle drei Koordinaten muessen passen).",
        "Liefert \\(t\\) in einer der anderen Komponenten einen Widerspruch, liegt der Punkt nicht auf der Geraden, obwohl eine Koordinate zufaellig stimmen kann.",
        "Im Raum (\\(\\mathbb{R}^3\\)) sind es drei Gleichungen fuer einen Parameter; das System ist ueberbestimmt, weshalb die Kontrolle der restlichen Zeilen zwingend ist."
      ],
      "thema": "geo-vektoren-geraden"
    },
    {
      "id": "geo-ebene-e1",
      "frage": "Eine Gerade \\( g \\) und ein Punkt \\( P \\), der nicht auf \\( g \\) liegt, sind gegeben. Beschreiben Sie die Vorgehensweise, um eine Koordinatengleichung der Ebene \\( E \\) aufzustellen, die \\( g \\) und \\( P \\) enthaelt.",
      "erwartungsbild": [
        "Stuetzpunkt \\( A \\) und Richtungsvektor \\( \\vec{u} \\) der Geraden \\( g \\) ablesen; \\( A \\) dient zugleich als Stuetzpunkt der Ebene.",
        "Einen zweiten, zu \\( \\vec{u} \\) linear unabhaengigen Spannvektor erzeugen als Verbindungsvektor \\( \\vec{v} = \\overrightarrow{AP} = P - A \\).",
        "Normalenvektor als Kreuzprodukt der Spannvektoren berechnen: \\( \\vec{n} = \\vec{u} \\times \\vec{v} \\).",
        "Koordinatengleichung \\( n_1 x + n_2 y + n_3 z = d \\) ansetzen und \\( d \\) durch Einsetzen eines bekannten Punktes (z. B. \\( A \\) oder \\( P \\)) bestimmen."
      ],
      "thema": "geo-ebene"
    },
    {
      "id": "geo-ebene-e2",
      "frage": "Erlaeutern Sie, warum sich der Normalenvektor einer Ebene direkt aus ihrer Koordinatengleichung \\( a x + b y + c z = d \\) ablesen laesst.",
      "erwartungsbild": [
        "Die Koordinatengleichung entsteht aus der Normalenform \\( \\vec{n} \\cdot (\\vec{x} - \\vec{p}) = 0 \\), also \\( \\vec{n} \\cdot \\vec{x} = d \\).",
        "Beim Ausmultiplizieren des Skalarprodukts stehen genau die Komponenten von \\( \\vec{n} \\) als Koeffizienten vor \\( x, y, z \\).",
        "Daher ist \\( \\vec{n} = \\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix} \\) ein Normalenvektor; jedes Vielfache \\( \\lambda \\vec{n} \\) (mit \\( \\lambda \\neq 0 \\)) ist ebenfalls Normalenvektor.",
        "Die Konstante \\( d \\) beeinflusst nur die Lage (Verschiebung) der Ebene, nicht ihre Richtung bzw. den Normalenvektor."
      ],
      "thema": "geo-ebene"
    },
    {
      "id": "geo-ebene-e3",
      "frage": "Begruenden Sie, weshalb das Kreuzprodukt der beiden Spannvektoren einen Normalenvektor der Ebene liefert, und worauf bei der Wahl der Spannvektoren zu achten ist.",
      "erwartungsbild": [
        "Das Kreuzprodukt \\( \\vec{u} \\times \\vec{v} \\) steht per Definition senkrecht sowohl auf \\( \\vec{u} \\) als auch auf \\( \\vec{v} \\).",
        "Da \\( \\vec{u} \\) und \\( \\vec{v} \\) die Ebene aufspannen, steht das Kreuzprodukt senkrecht auf der gesamten Ebene und ist somit ein Normalenvektor.",
        "Die Spannvektoren muessen linear unabhaengig (nicht parallel) sein, sonst ist das Kreuzprodukt der Nullvektor und liefert keinen brauchbaren Normalenvektor."
      ],
      "thema": "geo-ebene"
    },
    {
      "id": "geo-ebene-e4",
      "frage": "Erlaeutern Sie, wie man mit einer Punktprobe entscheidet, ob ein gegebener Punkt \\( P \\) in einer Ebene \\( E:\\ a x + b y + c z = d \\) liegt.",
      "erwartungsbild": [
        "Die Koordinaten von \\( P \\) in die linke Seite \\( a x + b y + c z \\) der Koordinatengleichung einsetzen.",
        "Den berechneten Wert mit der rechten Seite \\( d \\) vergleichen.",
        "Stimmen beide Seiten ueberein (Wert \\( = d \\)), so erfuellt \\( P \\) die Gleichung und liegt in der Ebene; andernfalls liegt \\( P \\) nicht in \\( E \\)."
      ],
      "thema": "geo-ebene"
    },
    {
      "id": "geo-lage-ebenen-e1",
      "frage": "Geben Sie alle Lagemoeglichkeiten zweier Ebenen an und erlaeutern Sie, wie man sie unterscheidet.",
      "erwartungsbild": [
        "Es gibt genau drei Lagemoeglichkeiten: (1) die Ebenen sind identisch, (2) sie sind echt parallel (kein gemeinsamer Punkt), (3) sie schneiden sich in einer Geraden.",
        "Erstes Kriterium: lineare (Un-)Abhaengigkeit der Normalenvektoren. Sind \\(\\vec{n}_1\\) und \\(\\vec{n}_2\\) parallel (es gibt \\(k\\) mit \\(\\vec{n}_2=k\\,\\vec{n}_1\\) bzw. \\(\\vec{n}_1\\times\\vec{n}_2=\\vec{0}\\)), liegen Fall (1) oder (2) vor; sind sie nicht parallel, liegt Fall (3) vor.",
        "Unterscheidung identisch / echt parallel: einen Punkt der einen Ebene in die Gleichung der anderen einsetzen. Erfuellt er sie, sind die Ebenen identisch; erfuellt er sie nicht, sind sie echt parallel. (Gleichwertig: rechte Seiten mit demselben Faktor \\(k\\) vergleichen.)",
        "Im Schnittfall erhaelt man die Schnittgerade, indem man die beiden Koordinatengleichungen als LGS auffasst, eine Variable als Parameter setzt (z. B. \\(z=t\\)) und nach den anderen aufloest; der Richtungsvektor ist parallel zu \\(\\vec{n}_1\\times\\vec{n}_2\\)."
      ],
      "thema": "geo-lage-ebenen"
    },
    {
      "id": "geo-lage-ebenen-e2",
      "frage": "Begruenden Sie ohne Rechnung, warum sich zwei Ebenen im Raum niemals in genau einem Punkt schneiden koennen.",
      "erwartungsbild": [
        "Eine Ebene ist ein zweidimensionales (unendlich ausgedehntes) Objekt; der Schnitt zweier Ebenen kann daher nur leer (parallel), die ganze Ebene (identisch) oder eine ganze Gerade sein.",
        "Anschaulich: Sobald zwei nicht-parallele Ebenen einen gemeinsamen Punkt haben, teilen sie sich um diesen Punkt herum eine ganze gemeinsame Schnittlinie — ein einzelner isolierter Schnittpunkt ist geometrisch nicht moeglich.",
        "Ein einzelner Schnittpunkt entsteht erst beim Schnitt DREIER Ebenen bzw. einer Geraden mit einer Ebene (Durchstosspunkt), nicht bei zwei Ebenen."
      ],
      "thema": "geo-lage-ebenen"
    },
    {
      "id": "geo-lage-ebenen-e3",
      "frage": "Erlaeutern Sie, wie man beim Aufstellen der Schnittgeraden zweier Ebenen aus deren Koordinatenformen vorgeht und woran man die richtige Loesung erkennt.",
      "erwartungsbild": [
        "Die beiden Koordinatengleichungen bilden ein lineares Gleichungssystem mit drei Unbekannten und nur zwei Gleichungen; es ist also unterbestimmt und hat eine einparametrige Loesungsmenge — genau das ist die Schnittgerade.",
        "Man setzt eine geeignete Variable als Parameter, z. B. \\(z=t\\), und loest die beiden Gleichungen nach den uebrigen Variablen auf, sodass \\(x\\) und \\(y\\) als Ausdruecke in \\(t\\) entstehen.",
        "Die Loesung schreibt man als Parametergleichung \\(\\vec{x}=\\vec{p}+t\\,\\vec{u}\\): \\(\\vec{p}\\) ist der parameterfreie Anteil (ein Punkt der Geraden), \\(\\vec{u}\\) enthaelt die Koeffizienten von \\(t\\).",
        "Kontrolle: Der Richtungsvektor \\(\\vec{u}\\) muss parallel zu \\(\\vec{n}_1\\times\\vec{n}_2\\) sein, und ein eingesetzter Geradenpunkt muss BEIDE Ebenengleichungen erfuellen."
      ],
      "thema": "geo-lage-ebenen"
    },
    {
      "id": "geo-lage-ebenen-e4",
      "frage": "Erlaeutern Sie, warum die Bedingung \\(\\vec{n}_1\\times\\vec{n}_2=\\vec{0}\\) gleichbedeutend damit ist, dass die beiden Ebenen parallel oder identisch sind, aber alleine noch keine Entscheidung zwischen diesen beiden Faellen liefert.",
      "erwartungsbild": [
        "Das Kreuzprodukt zweier Vektoren ist genau dann der Nullvektor, wenn die Vektoren linear abhaengig (parallel) sind. \\(\\vec{n}_1\\times\\vec{n}_2=\\vec{0}\\) bedeutet also: die Normalenvektoren zeigen in dieselbe (oder entgegengesetzte) Richtung.",
        "Parallele Normalenvektoren bedeuten, dass beide Ebenen dieselbe Stellung im Raum haben — sie koennen sich daher nicht schneiden, sondern sind entweder identisch oder echt parallel.",
        "Die Bedingung sagt nichts ueber die Lage entlang der Normalenrichtung (den Abstand) aus; diese steckt in den rechten Seiten der Gleichungen bzw. den Stuetzpunkten.",
        "Zur Entscheidung muss man zusaetzlich einen Punkt der einen Ebene in die andere einsetzen (bzw. die rechten Seiten mit demselben Faktor \\(k\\) vergleichen): passt es, sind die Ebenen identisch, sonst echt parallel."
      ],
      "thema": "geo-lage-ebenen"
    },
    {
      "id": "geo-lage-gerade-ebene-e1",
      "frage": "Beschreiben Sie die Vorgehensweise, mit der man die Lagebeziehung zwischen einer Geraden \\( g \\) und einer in Koordinatenform gegebenen Ebene \\( E \\) bestimmt. Gehen Sie auf alle drei moeglichen Faelle ein.",
      "erwartungsbild": [
        "Den allgemeinen Geradenpunkt \\( \\vec{p} + t\\,\\vec{u} \\) komponentenweise in die Koordinatenform \\( a x + b y + c z = d \\) der Ebene einsetzen; es entsteht eine lineare Gleichung in der einen Unbekannten \\( t \\).",
        "Genau eine Loesung fuer \\( t \\): die Gerade schneidet die Ebene in einem Punkt (Durchstosspunkt). Diesen erhaelt man durch Einsetzen von \\( t \\) in die Geradengleichung.",
        "Keine Loesung (die Gleichung fuehrt auf einen Widerspruch wie \\( 0 = 5 \\)): die Gerade ist echt parallel zur Ebene.",
        "Unendlich viele Loesungen (wahre Aussage wie \\( 0 = 0 \\), die Gleichung ist fuer jedes \\( t \\) erfuellt): die Gerade liegt vollstaendig in der Ebene."
      ],
      "thema": "geo-lage-gerade-ebene"
    },
    {
      "id": "geo-lage-gerade-ebene-e2",
      "frage": "Erlaeutern Sie die Bedingung dafuer, dass eine Gerade \\( g \\) mit Richtungsvektor \\( \\vec{u} \\) parallel zu einer Ebene \\( E \\) mit Normalenvektor \\( \\vec{n} \\) verlaeuft, und wodurch sich der Fall der echten Parallelitaet vom Fall \"Gerade liegt in der Ebene\" unterscheidet.",
      "erwartungsbild": [
        "Der Richtungsvektor der Geraden muss senkrecht zum Normalenvektor der Ebene stehen: \\( \\vec{n}\\cdot\\vec{u} = 0 \\). Dann verlaeuft die Gerade parallel zur Ebene oder liegt in ihr (rechnerisch: beim Einsetzen faellt \\( t \\) heraus).",
        "Echt parallel: zusaetzlich liegt der Stuetzpunkt der Geraden nicht in \\( E \\) (er erfuellt die Ebenengleichung nicht); es gibt keinen gemeinsamen Punkt.",
        "Gerade liegt in der Ebene: der Stuetzpunkt erfuellt die Ebenengleichung; dann liegt jeder Punkt der Geraden in \\( E \\).",
        "Anschaulich: \\( \\vec{n}\\cdot\\vec{u} = 0 \\) bedeutet, dass \\( \\vec{u} \\) in einer zur Ebene parallelen Richtung zeigt; die Lage des Stuetzpunktes entscheidet dann ueber den 'Abstand null oder nicht'."
      ],
      "thema": "geo-lage-gerade-ebene"
    },
    {
      "id": "geo-lage-gerade-ebene-e3",
      "frage": "Erklaeren Sie, wie man eine Gerade \\( h \\) konstruiert, die echt parallel zu einer gegebenen Ebene \\( E:\\; ax + by + cz = d \\) verlaeuft.",
      "erwartungsbild": [
        "Einen Richtungsvektor \\( \\vec{u} \\) waehlen, der senkrecht zum Normalenvektor \\( \\vec{n} = \\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix} \\) steht, also \\( \\vec{n}\\cdot\\vec{u} = 0 \\) erfuellt (z. B. systematisch eine Komponente 0 setzen und die anderen so waehlen, dass die Summe der Produkte 0 wird).",
        "Einen Stuetzpunkt \\( P \\) waehlen, der nicht in der Ebene liegt, d. h. \\( a\\,P_1 + b\\,P_2 + c\\,P_3 \\neq d \\).",
        "Die Gerade \\( h:\\; \\vec{x} = \\vec{P} + r\\,\\vec{u} \\) ist dann wegen \\( \\vec{n}\\cdot\\vec{u} = 0 \\) parallel und wegen \\( P \\notin E \\) sogar echt parallel.",
        "Kontrolle: Einsetzen des Geradenpunktes in die Ebenengleichung muss auf einen Widerspruch (keine Loesung) fuehren."
      ],
      "thema": "geo-lage-gerade-ebene"
    },
    {
      "id": "geo-lage-gerade-ebene-e4",
      "frage": "Begruenden Sie ohne ausfuehrliche Rechnung, woran man beim Einsetzen einer Geraden in eine Ebenengleichung sofort erkennt, ob ein Durchstosspunkt existiert oder die Gerade parallel ist.",
      "erwartungsbild": [
        "Beim Einsetzen entsteht eine Gleichung der Form (Vielfaches von \\( t \\)) \\( + \\) Zahl \\( = \\) Zahl; der Faktor vor \\( t \\) ist gerade \\( \\vec{n}\\cdot\\vec{u} \\).",
        "Ist der Faktor vor \\( t \\) ungleich 0 (\\( \\vec{n}\\cdot\\vec{u} \\neq 0 \\)), laesst sich die Gleichung eindeutig nach \\( t \\) aufloesen: es existiert genau ein Durchstosspunkt.",
        "Ist der Faktor vor \\( t \\) gleich 0 (\\( \\vec{n}\\cdot\\vec{u} = 0 \\)), faellt \\( t \\) heraus; es bleibt eine Zahlen-Gleichung uebrig — entweder ein Widerspruch (echt parallel, keine Loesung) oder eine wahre Aussage (Gerade liegt in \\( E \\), alle Loesungen).",
        "Daher genuegt zur Vorentscheidung das Vorzeichen bzw. der Wert des Skalarprodukts \\( \\vec{n}\\cdot\\vec{u} \\): nicht 0 bedeutet Schnitt, 0 bedeutet parallel oder enthalten."
      ],
      "thema": "geo-lage-gerade-ebene"
    },
    {
      "id": "geo-winkel-e1",
      "frage": "Beschreiben Sie, wie man den Winkel zwischen zwei Ebenen bestimmt.",
      "erwartungsbild": [
        "Aus den Koordinatenformen der beiden Ebenen die Normalenvektoren \\(\\vec{n_1}\\) und \\(\\vec{n_2}\\) ablesen.",
        "Den Winkel ueber die Formel \\(\\cos\\alpha=\\dfrac{|\\vec{n_1}\\cdot\\vec{n_2}|}{|\\vec{n_1}|\\cdot|\\vec{n_2}|}\\) berechnen, wobei der Betrag im Zaehler den spitzen Schnittwinkel liefert.",
        "Anschliessend \\(\\alpha=\\arccos(\\dots)\\) bilden; der Schnittwinkel zweier Ebenen liegt stets zwischen \\(0^\\circ\\) und \\(90^\\circ\\).",
        "Der Winkel zwischen den Ebenen ist gleich dem Winkel zwischen ihren Normalenvektoren (bzw. dessen spitzem Nebenwinkel)."
      ],
      "thema": "geo-winkel"
    },
    {
      "id": "geo-winkel-e2",
      "frage": "Erlaeutern Sie, warum in der Winkelformel \\(\\cos\\alpha=\\dfrac{|\\vec{n_1}\\cdot\\vec{n_2}|}{|\\vec{n_1}|\\,|\\vec{n_2}|}\\) im Zaehler der Betrag des Skalarprodukts steht.",
      "erwartungsbild": [
        "Ohne Betrag koennte das Skalarprodukt negativ werden und damit ein stumpfer Winkel (> \\(90^\\circ\\)) herauskommen.",
        "Als Schnittwinkel zweier Ebenen ist konventionell der spitze (kleinere) Winkel zwischen \\(0^\\circ\\) und \\(90^\\circ\\) gemeint.",
        "Der Betrag erzwingt einen nichtnegativen Kosinuswert und liefert so automatisch diesen spitzen Winkel, unabhaengig von der Orientierung (Vorzeichen) der gewaehlten Normalenvektoren."
      ],
      "thema": "geo-winkel"
    },
    {
      "id": "geo-winkel-e3",
      "frage": "Begruenden Sie ohne Rechnung, woran man am Normalenvektor erkennt, dass eine Ebene \\(E\\) senkrecht auf der \\(xy\\)-Koordinatenebene steht.",
      "erwartungsbild": [
        "Die \\(xy\\)-Ebene hat den Normalenvektor \\(\\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix}\\) (die \\(z\\)-Achse).",
        "Zwei Ebenen stehen genau dann senkrecht aufeinander, wenn ihre Normalenvektoren orthogonal sind, also ihr Skalarprodukt \\(0\\) ist.",
        "Das Skalarprodukt von \\(\\vec{n}=\\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix}\\) mit \\(\\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix}\\) ist \\(c\\); es ist genau dann \\(0\\), wenn die \\(z\\)-Komponente \\(c=0\\) ist.",
        "Hat der Normalenvektor von \\(E\\) also keine \\(z\\)-Komponente (\\(c=0\\)), steht \\(E\\) senkrecht auf der \\(xy\\)-Ebene."
      ],
      "thema": "geo-winkel"
    },
    {
      "id": "geo-winkel-e4",
      "frage": "Beschreiben Sie, wie man den Schnittwinkel zwischen einer Geraden \\(g\\) und einer Ebene \\(E\\) bestimmt, und worin der Unterschied zur Formel fuer den Winkel zwischen zwei Ebenen liegt.",
      "erwartungsbild": [
        "Man verwendet den Richtungsvektor \\(\\vec{u}\\) der Geraden und den Normalenvektor \\(\\vec{n}\\) der Ebene.",
        "Statt des Kosinus wird der Sinus benutzt: \\(\\sin\\alpha=\\dfrac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\cdot|\\vec{n}|}\\), weil zunaechst der Winkel zwischen Gerade und Normale berechnet und dann zu \\(90^\\circ\\) ergaenzt wird.",
        "Bei zwei Ebenen wird dagegen mit \\(\\cos\\alpha\\) und beiden Normalenvektoren gerechnet, da man direkt den Winkel zwischen den Normalen erhaelt.",
        "In beiden Faellen sorgt der Betrag im Zaehler dafuer, dass der spitze Winkel zwischen \\(0^\\circ\\) und \\(90^\\circ\\) herauskommt."
      ],
      "thema": "geo-winkel"
    },
    {
      "id": "geo-abstand-hnf-e1",
      "frage": "Erläutern Sie die Vorgehensweise, um den Abstand einer zu einer Ebene \\(E\\) parallelen Geraden \\(g\\) von der Ebene \\(E\\) mit Hilfe der HESSEschen Normalform zu bestimmen.",
      "erwartungsbild": [
        "Zunächst prüfen, ob \\(g\\) tatsächlich parallel zu \\(E\\) ist: Der Richtungsvektor der Geraden muss senkrecht zum Normalenvektor der Ebene stehen, also \\(\\vec{r}\\cdot\\vec{n}=0\\) (und \\(g\\) liegt nicht in \\(E\\)).",
        "Bei Parallelität haben alle Punkte der Geraden denselben Abstand zur Ebene; es genügt daher, einen einzigen beliebigen Geradenpunkt zu betrachten (üblicherweise den Aufpunkt/Stützvektor).",
        "Die Ebene in die HESSEsche Normalform bringen, d.h. die Koordinatenform durch \\(|\\vec{n}|=\\sqrt{a^2+b^2+c^2}\\) teilen.",
        "Die Koordinaten des gewählten Geradenpunktes einsetzen und den Betrag bilden: \\(d=\\dfrac{|a p_1 + b p_2 + c p_3 - d_0|}{\\sqrt{a^2+b^2+c^2}}\\). Dieser Wert ist der Abstand der Geraden von der Ebene."
      ],
      "thema": "geo-abstand-hnf"
    },
    {
      "id": "geo-abstand-hnf-e2",
      "frage": "Begründen Sie, warum bei einer zur Ebene parallelen Geraden das Einsetzen eines einzigen beliebigen Geradenpunktes in die HESSEsche Normalform für die Abstandsbestimmung ausreicht.",
      "erwartungsbild": [
        "Eine zur Ebene parallele Gerade verläuft überall im gleichen senkrechten Abstand zur Ebene; alle ihre Punkte sind gleich weit von der Ebene entfernt.",
        "Daher liefert jeder beliebige Geradenpunkt denselben Abstandswert — die Wahl des Punktes ist gleichgültig.",
        "Praktisch wählt man den Stützpunkt (Aufpunkt) der Geradengleichung, weil dessen Koordinaten unmittelbar ablesbar sind und kein zusätzlicher Parameterwert bestimmt werden muss."
      ],
      "thema": "geo-abstand-hnf"
    },
    {
      "id": "geo-abstand-hnf-e3",
      "frage": "Erläutern Sie die Bedeutung des Normierens des Normalenvektors beim Aufstellen der HESSEschen Normalform und welche Rolle der Betrag \\(|\\vec{n}|\\) dabei spielt.",
      "erwartungsbild": [
        "Beim Normieren wird der Normalenvektor durch seinen Betrag \\(|\\vec{n}|=\\sqrt{a^2+b^2+c^2}\\) geteilt, sodass er die Länge 1 erhält (Einheitsnormalenvektor).",
        "Erst durch diese Normierung liefert das Einsetzen eines Punktes in die linke Seite der Gleichung direkt den (orientierten) Abstand; ohne Division durch \\(|\\vec{n}|\\) ergäbe sich nur ein zur Strecke proportionaler, nicht der tatsächliche Abstandswert.",
        "Der Betrag des eingesetzten Ergebnisses ist stets nichtnegativ und entspricht dem geometrischen Abstand des Punktes von der Ebene."
      ],
      "thema": "geo-abstand-hnf"
    },
    {
      "id": "geo-abstand-hnf-e4",
      "frage": "Ein Schüler behauptet, der Abstand eines Punktes von einer Ebene \\(ax+by+cz=d_0\\) sei einfach \\(|a p_1 + b p_2 + c p_3 - d_0|\\). Erläutern Sie, worin der Fehler besteht und wie die korrekte Formel lautet.",
      "erwartungsbild": [
        "Der Fehler ist, dass nicht durch den Betrag des Normalenvektors \\(|\\vec{n}|=\\sqrt{a^2+b^2+c^2}\\) geteilt wurde; die Ebene wurde also nicht in die HESSEsche Normalform überführt.",
        "Der angegebene Term liefert nur dann den richtigen Abstand, wenn der Normalenvektor bereits die Länge 1 hat (\\(|\\vec{n}|=1\\)); im Allgemeinen ist er um den Faktor \\(|\\vec{n}|\\) zu groß.",
        "Die korrekte Formel lautet \\(d=\\dfrac{|a p_1 + b p_2 + c p_3 - d_0|}{\\sqrt{a^2+b^2+c^2}}\\)."
      ],
      "thema": "geo-abstand-hnf"
    }
  ],
  "simulator": [
    {
      "id": "sim-ana-1",
      "gebiet": "analysis",
      "teilaufgaben": [
        {
          "frage": "Gegeben ist die ganzrationale Funktion \\( f \\) mit \\( f(x) = x^3 - 3x^2 \\) (Definitionsbereich \\( \\mathbb{R} \\)). Begruenden Sie OHNE Rechnung: (i) ob der Graph achsen- oder punktsymmetrisch ist, (ii) das Grenzverhalten von \\( f \\) fuer \\( x \\to +\\infty \\) und \\( x \\to -\\infty \\), und (iii) wie viele Nullstellen \\( f \\) hoechstens haben kann und warum mindestens eine existiert.",
          "erwartungsbild": [
            "(i) Symmetrie: Der Funktionsterm enthaelt sowohl eine ungerade Potenz (\\( x^3 \\)) als auch eine gerade Potenz (\\( -3x^2 \\)). Daher ist der Graph WEDER achsensymmetrisch zur y-Achse (das verlangte nur gerade Exponenten) NOCH punktsymmetrisch zum Ursprung (das verlangte nur ungerade Exponenten). Keine dieser einfachen Symmetrien liegt vor.",
            "(ii) Grenzverhalten: Es entscheidet die hoechste Potenz \\( x^3 \\) mit positivem Koeffizienten. Da der Grad ungerade ist, laufen die Aeste in entgegengesetzte Richtungen: \\( x \\to +\\infty \\Rightarrow f(x) \\to +\\infty \\) und \\( x \\to -\\infty \\Rightarrow f(x) \\to -\\infty \\).",
            "(iii) Nullstellenzahl: Eine ganzrationale Funktion vom Grad 3 hat hoechstens 3 reelle Nullstellen (Grad = Hoechstzahl der Nullstellen). Mindestens eine reelle Nullstelle existiert, weil \\( f \\) stetig ist und wegen des entgegengesetzten Grenzverhaltens (von \\( -\\infty \\) nach \\( +\\infty \\)) den Wert 0 nach dem Zwischenwertsatz annehmen muss.",
            "Bewertung der Tiefe: Eine reine Nennung ohne Begruendung (z.B. nur 'nicht symmetrisch') ist AFB I; die korrekte Begruendung ueber gerade/ungerade Exponenten, fuehrenden Term und Zwischenwertsatz ist AFB II."
          ],
          "afb": "I/II"
        },
        {
          "frage": "Bestimmen Sie rechnerisch die Lage und Art aller Extrempunkte von \\( f(x) = x^3 - 3x^2 \\) (Nachweis der Art ueber das \\( f'' \\)-Kriterium) sowie den Wendepunkt (notwendige Bedingung \\( f''(x)=0 \\) UND hinreichende Bedingung \\( f'''(x)\\neq 0 \\)).",
          "erwartungsbild": [
            "Ableitungen bilden: \\( f'(x) = 3x^2 - 6x \\), \\( f''(x) = 6x - 6 \\), \\( f'''(x) = 6 \\).",
            "Notwendige Bedingung fuer Extrema: \\( f'(x)=0 \\Rightarrow 3x(x-2)=0 \\Rightarrow x_1 = 0,\\ x_2 = 2 \\).",
            "Art ueber \\( f'' \\): \\( f''(0) = -6 < 0 \\Rightarrow \\) Hochpunkt; \\( f''(2) = 6 > 0 \\Rightarrow \\) Tiefpunkt.",
            "Funktionswerte: \\( f(0)=0 \\) und \\( f(2)= 8 - 12 = -4 \\). Ergebnis: Hochpunkt \\( H(0\\,|\\,0) \\), Tiefpunkt \\( T(2\\,|\\,-4) \\).",
            "Wendepunkt: notwendig \\( f''(x)=0 \\Rightarrow 6x-6=0 \\Rightarrow x=1 \\); hinreichend \\( f'''(1)=6 \\neq 0 \\Rightarrow \\) Wendestelle bestaetigt. Mit \\( f(1)=1-3=-2 \\) folgt Wendepunkt \\( W(1\\,|\\,-2) \\).",
            "Maschinelle Checks: Tiefpunkt-y-Wert direkt ueber Einsetzen (x**3-3*x**2).subs(x,2) = -4; Wendestelle x=1 aus solve(6*x-6) = 1. Alle Werte mit sympy und Wolfram bestaetigt (HP(0|0), TP(2|-4), WP(1|-2))."
          ],
          "afb": "II"
        },
        {
          "frage": "Im Punkt \\( B(3\\,|\\,0) \\) (einer Nullstelle von \\( f \\)) wird die Tangente \\( t \\) an den Graphen von \\( f \\) gelegt. Beschreiben Sie zunaechst allgemein die Vorgehensweise zur Berechnung des Flaecheninhalts der von der Tangente \\( t \\) und dem Graphen von \\( f \\) eingeschlossenen Flaeche, geben Sie dann den vollstaendigen Ansatz konkret an und berechnen Sie den Flaecheninhalt.",
          "erwartungsbild": [
            "Vorgehensweise (Verfahren, in richtiger Reihenfolge): 1. Tangentensteigung \\( m = f'(3) \\) berechnen und Tangentengleichung \\( t(x)=f(3)+f'(3)\\,(x-3) \\) aufstellen. 2. Schnittstellen von Graph und Tangente ueber \\( f(x)=t(x) \\) bestimmen (Differenzfunktion \\( d(x)=f(x)-t(x) \\) gleich 0 setzen). 3. Die so erhaltenen Grenzen liefern das Integrationsintervall; Flaeche \\( = \\big| \\int_{a}^{b}\\big(f(x)-t(x)\\big)\\,dx \\big| \\) (Betrag, da die Differenzfunktion das Vorzeichen nicht wechselt).",
            "Konkret Schritt 1: \\( f'(x)=3x^2-6x \\Rightarrow m=f'(3)=27-18=9 \\); mit \\( f(3)=0 \\) folgt \\( t(x)=9(x-3)=9x-27 \\).",
            "Konkret Schritt 2: \\( d(x)=f(x)-t(x)=x^3-3x^2-9x+27=(x-3)^2(x+3) \\). Doppelte Nullstelle bei \\( x=3 \\) (Beruehrpunkt) und einfache bei \\( x=-3 \\). Integrationsgrenzen: \\( a=-3 \\) bis \\( b=3 \\).",
            "Konkret Schritt 3 (Ansatz und Wert): \\[ A = \\left| \\int_{-3}^{3}\\big((x^3-3x^2)-(9x-27)\\big)\\,dx \\right| = \\left| \\int_{-3}^{3}(x-3)^2(x+3)\\,dx \\right| = 108. \\]",
            "Maschineller Check (numerisch, level 3): loesung = 108; check { art: ausdruck, expr: 'Abs(integrate((x**3-3*x**2)-(9*x-27),(x,-3,3)))' }. Mit sympy UND Wolfram bestaetigt (Flaeche exakt 108, Faktorisierung (x-3)^2(x+3); auf dem offenen Intervall (-3,3) gilt d(x)>0, also kein Vorzeichenwechsel, der Betrag ist gerechtfertigt).",
            "Bewertung: Korrekte Beschreibung der Vorgehensweise ist AFB II; das eigenstaendige Aufstellen der Tangente, Erkennen des Betrags wegen fehlendem Vorzeichenwechsel und die fehlerfreie Integration sind AFB III."
          ],
          "afb": "II/III"
        },
        {
          "frage": "Betrachten Sie nun die Funktionenschar \\( f_k \\) mit \\( f_k(x) = x^3 - 3x^2 + k,\\ k \\in \\mathbb{R} \\). Untersuchen Sie, wie viele Nullstellen der Graph von \\( f_k \\) in Abhaengigkeit von \\( k \\) besitzt, und bestimmen Sie alle Werte von \\( k \\), fuer die der Graph GENAU zwei Nullstellen hat.",
          "erwartungsbild": [
            "Idee: Die Addition von \\( k \\) verschiebt den Graphen nur vertikal; die Extremstellen bleiben unveraendert. \\( f_k'(x)=3x^2-6x=0 \\Rightarrow x=0 \\) (Hochpunkt) und \\( x=2 \\) (Tiefpunkt). Die Anzahl der Nullstellen haengt von der Lage der Extrempunkte relativ zur x-Achse ab.",
            "Extremwerte in Abhaengigkeit von k: Hochpunkt \\( H(0\\,|\\,k) \\) mit \\( y_H = f_k(0)=k \\); Tiefpunkt \\( T(2\\,|\\,k-4) \\) mit \\( y_T = f_k(2)=k-4 \\).",
            "Drei Nullstellen \\( \\Leftrightarrow \\) Hochpunkt oberhalb und Tiefpunkt unterhalb der x-Achse: \\( y_H>0 \\) und \\( y_T<0 \\Rightarrow k>0 \\) und \\( k-4<0 \\Rightarrow 0<k<4 \\).",
            "Genau zwei Nullstellen \\( \\Leftrightarrow \\) ein Extrempunkt liegt GENAU auf der x-Achse (Beruehrung, doppelte Nullstelle): \\( y_H=0 \\) oder \\( y_T=0 \\Rightarrow k=0 \\) oder \\( k=4 \\). Ergebnis: \\( k=0 \\) (Beruehrung im Hochpunkt, Nullstellen \\( x=0 \\) doppelt und \\( x=3 \\)) oder \\( k=4 \\) (Beruehrung im Tiefpunkt, Nullstellen \\( x=-1 \\) und \\( x=2 \\) doppelt).",
            "Eine Nullstelle \\( \\Leftrightarrow \\) beide Extrempunkte auf derselben Seite der x-Achse: \\( y_T>0 \\Rightarrow k>4 \\) oder \\( y_H<0 \\Rightarrow k<0 \\).",
            "Maschinelle Checks: Mengen-Check fuer k=0 { art: menge, gleichung: 'x**3-3*x**2', var: 'x', erwartet: ['0','3'] }; fuer k=4 { art: menge, gleichung: 'x**3-3*x**2+4', var: 'x', erwartet: ['-1','2'] }. Als numerisch (level 4): 'groesster k-Wert mit genau 2 Nullstellen' loesung = 4, check { art: ausdruck, expr: 'Max(0,4)' }. Anzahl-Nullstellen (verschiedene reelle) fuer k in {-1,0,2,4,5} = {1,2,3,2,1} mit sympy UND Wolfram bestaetigt.",
            "Bewertung: Das Verknuepfen der Nullstellenzahl mit der Lage der von k abhaengigen Extrempunkte und die vollstaendige Fallunterscheidung sind AFB III."
          ],
          "afb": "III"
        }
      ]
    },
    {
      "id": "sim-ana-2",
      "gebiet": "analysis",
      "teilaufgaben": [
        {
          "frage": "Gegeben ist die ganzrationale Funktion \\( f \\) mit \\( f(x) = \\tfrac{1}{2}x^4 - 4x^2 + 2 \\). Begruenden Sie ohne Rechnung drei Eigenschaften des Graphen: das Symmetrieverhalten zur \\( y \\)-Achse, den \\( y \\)-Achsenabschnitt sowie die maximal moegliche Anzahl an Nullstellen und an Extrempunkten. Erlaeutern Sie jeweils kurz, woran man die Eigenschaft erkennt.",
          "erwartungsbild": [
            "Symmetrie: Es treten nur gerade Exponenten von \\( x \\) auf (Grad 4, Grad 2 und das konstante Glied, das wie \\( x^0 \\) zaehlt); daher gilt \\( f(-x)=f(x) \\) und der Graph ist achsensymmetrisch zur \\( y \\)-Achse.",
            "\\( y \\)-Achsenabschnitt: Er ist der Funktionswert an der Stelle \\( x=0 \\); das absolute Glied liefert direkt \\( f(0)=2 \\), also den Punkt \\( (0 \\mid 2) \\) — ohne Einsetzen ablesbar.",
            "Maximale Anzahl Nullstellen: Ein Polynom 4. Grades hat hoechstens 4 reelle Nullstellen, da der Grad die Hoechstzahl der Nullstellen angibt.",
            "Maximale Anzahl Extrempunkte: Die Ableitung \\( f' \\) hat Grad 3 und damit hoechstens 3 Nullstellen; folglich besitzt \\( f \\) hoechstens 3 Extrempunkte. Wegen der Achsensymmetrie liegt einer davon auf der \\( y \\)-Achse (bei \\( x=0 \\), da \\( f' \\) als Ableitung einer geraden Funktion ungerade ist und somit \\( f'(0)=0 \\) gilt)."
          ],
          "afb": "I/II"
        },
        {
          "frage": "Bestimmen Sie alle Nullstellen von \\( f \\) mit \\( f(x)=\\tfrac{1}{2}x^4 - 4x^2 + 2 \\) mit Hilfe der Substitution \\( x^2 = z \\). Beschreiben Sie die einzelnen Schritte und geben Sie die Nullstellen exakt sowie gerundet an.",
          "erwartungsbild": [
            "Ansatz \\( f(x)=0 \\): \\( \\tfrac{1}{2}x^4 - 4x^2 + 2 = 0 \\); mit der Substitution \\( z=x^2 \\) entsteht die quadratische Gleichung \\( \\tfrac{1}{2}z^2 - 4z + 2 = 0 \\), nach Multiplikation mit \\( 2 \\) also \\( z^2 - 8z + 4 = 0 \\).",
            "Loesen mit der p-q-Formel: \\( z = 4 \\pm \\sqrt{16-4} = 4 \\pm 2\\sqrt{3} \\); beide Werte \\( z_1=4-2\\sqrt{3}\\approx 0{,}54 \\) und \\( z_2=4+2\\sqrt{3}\\approx 7{,}46 \\) sind positiv, liefern also reelle \\( x \\).",
            "Ruecksubstitution \\( x=\\pm\\sqrt{z} \\): aus \\( z_1 \\) folgt \\( x=\\pm\\sqrt{4-2\\sqrt{3}}=\\pm(\\sqrt{3}-1) \\), aus \\( z_2 \\) folgt \\( x=\\pm\\sqrt{4+2\\sqrt{3}}=\\pm(\\sqrt{3}+1) \\).",
            "Es gibt vier reelle Nullstellen: \\( x_1\\approx -2{,}73,\\ x_2\\approx -0{,}73,\\ x_3\\approx 0{,}73,\\ x_4\\approx 2{,}73 \\); sie liegen wegen der Achsensymmetrie paarweise spiegelbildlich zur \\( y \\)-Achse. Ein negatives \\( z \\) haette man verworfen, da \\( x^2\\ge 0 \\)."
          ],
          "afb": "II"
        },
        {
          "frage": "Die Kurve \\( h \\) mit \\( h(x) = -\\tfrac{1}{2}x^2 + 2 \\) schliesst mit der \\( x \\)-Achse eine Flaeche ein, die um die \\( x \\)-Achse rotiert. Beschreiben Sie die Vorgehensweise zur Berechnung des Rotationsvolumens, geben Sie den vollstaendigen Ansatz mit Integrationsgrenzen an und berechnen Sie das Volumen.",
          "erwartungsbild": [
            "Integrationsgrenzen sind die Nullstellen von \\( h \\): \\( -\\tfrac{1}{2}x^2+2=0 \\Rightarrow x^2=4 \\Rightarrow x=-2 \\) und \\( x=2 \\); dort schneidet die Kurve die \\( x \\)-Achse und begrenzt die rotierende Flaeche.",
            "Ansatz fuer das Rotationsvolumen um die \\( x \\)-Achse: \\[ V = \\pi\\int_{-2}^{2} \\big(h(x)\\big)^2\\,dx = \\pi\\int_{-2}^{2}\\left(-\\tfrac{1}{2}x^2+2\\right)^2 dx. \\]",
            "Integranden ausquadrieren: \\( \\left(-\\tfrac{1}{2}x^2+2\\right)^2 = \\tfrac{1}{4}x^4 - 2x^2 + 4 \\); eine Stammfunktion ist \\( \\tfrac{1}{20}x^5 - \\tfrac{2}{3}x^3 + 4x \\).",
            "Grenzen einsetzen (Auswertung zwischen \\( -2 \\) und \\( 2 \\)) ergibt \\( V = \\tfrac{128}{15}\\,\\pi \\approx 26{,}81 \\) (Volumeneinheiten).",
            "Typische Fehlerquellen benennen: Es wird \\( h(x) \\) quadriert (nicht nur der Funktionswert eingesetzt) und der Faktor \\( \\pi \\) darf nicht vergessen werden; das Ergebnis ist ein Volumen, kein Flaecheninhalt."
          ],
          "afb": "II/III"
        },
        {
          "frage": "Gesucht ist eine ganzrationale Funktion \\( q \\) dritten Grades, \\( q(x)=ax^3+bx^2+cx+d \\), mit folgenden Eigenschaften: Der Graph schneidet die \\( y \\)-Achse bei \\( 4 \\), besitzt bei \\( x=2 \\) einen Tiefpunkt, der auf der \\( x \\)-Achse liegt (also \\( q(2)=0 \\)), und hat bei \\( x=1 \\) einen Wendepunkt. Stellen Sie das lineare Gleichungssystem zur Bestimmung der Koeffizienten auf und beschreiben Sie den Loesungsweg.",
          "erwartungsbild": [
            "Allgemeiner Ansatz mit Ableitungen: \\( q(x)=ax^3+bx^2+cx+d \\), \\( q'(x)=3ax^2+2bx+c \\), \\( q''(x)=6ax+2b \\).",
            "Eigenschaften in Bedingungen uebersetzen: \\( y \\)-Achsenabschnitt \\( q(0)=4 \\); der Tiefpunkt bei \\( x=2 \\) liefert die Lage \\( q(2)=0 \\) und die waagerechte Tangente \\( q'(2)=0 \\); der Wendepunkt bei \\( x=1 \\) liefert \\( q''(1)=0 \\).",
            "Lineares Gleichungssystem nach Einsetzen: \\( d=4 \\); \\( 8a+4b+2c+d=0 \\); \\( 12a+4b+c=0 \\); \\( 6a+2b=0 \\).",
            "Loesen (z. B. durch Einsetzen): \\( q(0)=4 \\) liefert sofort \\( d=4 \\); aus \\( 6a+2b=0 \\) folgt \\( b=-3a \\); Einsetzen in die restlichen Gleichungen ergibt nacheinander \\( a=1,\\ b=-3,\\ c=0 \\). Ergebnis: \\( q(x)=x^3-3x^2+4 \\).",
            "Probe zur Bestaetigung: \\( q(0)=4 \\) (richtig), \\( q'(2)=12-12=0 \\) mit \\( q''(2)=12-6=6>0 \\) (also tatsaechlich Tiefpunkt) und \\( q''(1)=6-6=0 \\) (Wendepunkt). Faktorisiert gilt \\( q(x)=(x-2)^2(x+1) \\), die Nullstellen sind \\( x=-1 \\) und \\( x=2 \\) (doppelt)."
          ],
          "afb": "II/III"
        }
      ]
    },
    {
      "id": "sim-geo-1",
      "gebiet": "geometrie",
      "teilaufgaben": [
        {
          "frage": "Gegeben sind die beiden Ebenen \\(E_1:\\; 2x + y - 2z = 6\\) und \\(E_2:\\; 4x + 2y - 4z = 12\\) sowie die Punkte \\(A(2\\mid 2\\mid 0)\\) und \\(B(1\\mid 6\\mid 1)\\). Weisen Sie nach, dass beide Punkte sowohl in \\(E_1\\) als auch in \\(E_2\\) liegen, und schließen Sie daraus auf die Lagebeziehung von \\(E_1\\) und \\(E_2\\).",
          "erwartungsbild": [
            "Einsetzen von \\(A(2\\mid 2\\mid 0)\\) in \\(E_1\\): \\(2\\cdot 2 + 2 - 2\\cdot 0 = 4 + 2 - 0 = 6\\) — wahre Aussage, also \\(A \\in E_1\\).",
            "Einsetzen von \\(B(1\\mid 6\\mid 1)\\) in \\(E_1\\): \\(2\\cdot 1 + 6 - 2\\cdot 1 = 2 + 6 - 2 = 6\\) — wahre Aussage, also \\(B \\in E_1\\).",
            "Einsetzen von \\(A\\) in \\(E_2\\): \\(4\\cdot 2 + 2\\cdot 2 - 4\\cdot 0 = 8 + 4 - 0 = 12\\) — wahr, also \\(A \\in E_2\\); Einsetzen von \\(B\\) in \\(E_2\\): \\(4\\cdot 1 + 2\\cdot 6 - 4\\cdot 1 = 4 + 12 - 4 = 12\\) — wahr, also \\(B \\in E_2\\).",
            "Vergleich der Normalenvektoren: \\(\\vec{n_2} = \\begin{pmatrix} 4 \\\\ 2 \\\\ -4 \\end{pmatrix} = 2\\cdot\\begin{pmatrix} 2 \\\\ 1 \\\\ -2 \\end{pmatrix} = 2\\,\\vec{n_1}\\) — die Normalenvektoren sind parallel, also ist \\(E_1 \\parallel E_2\\) oder \\(E_1 = E_2\\).",
            "Da \\(A\\) und \\(B\\) zwei (verschiedene) gemeinsame Punkte sind und die Normalen parallel sind, sind die Ebenen identisch: \\(E_1 = E_2\\) (auch erkennbar daran, dass \\(E_2\\) durch Multiplikation von \\(E_1\\) mit \\(2\\) entsteht: \\(2\\cdot 6 = 12\\)). Es genügt streng genommen schon ein gemeinsamer Punkt zusammen mit den parallelen Normalen; die beiden Punkte bestätigen das Ergebnis."
          ],
          "afb": "I/II"
        },
        {
          "frage": "Geben Sie alle möglichen Lagebeziehungen zweier Ebenen im Raum an und erläutern Sie diese kurz. Erläutern Sie anschließend, wie die Gleichung von \\(E_2\\) (bei unverändertem Normalenvektor) abgeändert werden müsste, damit \\(E_2\\) echt parallel zu \\(E_1\\) verläuft und keinen gemeinsamen Punkt mehr mit \\(E_1\\) hat.",
          "erwartungsbild": [
            "Es gibt genau drei Lagebeziehungen zweier Ebenen: (1) identisch (gleiche Ebene, unendlich viele gemeinsame Punkte), (2) echt parallel (parallele Normalen, aber kein gemeinsamer Punkt), (3) schneidend (Normalen nicht parallel, gemeinsame Punkte bilden eine Schnittgerade).",
            "Kriterium: Bei parallelen Normalenvektoren liegt (1) oder (2) vor; sind die Normalen nicht parallel, schneiden sich die Ebenen (3).",
            "Unterscheidung (1)/(2): Bei identischen Normalen prüft man, ob die Ebenengleichungen Vielfache voneinander sind (gleiche rechte Seite nach Normierung) — dann identisch, sonst echt parallel.",
            "Für echte Parallelität muss der Normalenvektor von \\(E_2\\) ein Vielfaches von \\(\\vec{n_1}=\\begin{pmatrix}2\\\\1\\\\-2\\end{pmatrix}\\) bleiben, die rechte Seite jedoch so geändert werden, dass kein Punkt von \\(E_1\\) die Gleichung erfüllt.",
            "Beispiel: \\(E_2^{*}:\\; 2x + y - 2z = 10\\). Da \\(\\vec{n}=\\vec{n_1}\\), ist \\(E_2^{*}\\parallel E_1\\); Einsetzen von \\(A(2\\mid2\\mid0)\\) ergibt \\(6 \\neq 10\\), also kein gemeinsamer Punkt — die Ebenen sind echt parallel. (Jede rechte Seite \\(\\neq 6\\) bei diesem Normalenvektor leistet das.)"
          ],
          "afb": "II"
        },
        {
          "frage": "Da \\(E_1\\) und \\(E_2\\) identisch sind, ist jeder Punkt von \\(E_1\\) gemeinsamer Punkt beider Ebenen. Bestimmen Sie deshalb einen von \\(A\\) und \\(B\\) verschiedenen gemeinsamen Punkt. Erläutern Sie außerdem das allgemeine Vorgehen, mit dem man bei zwei sich schneidenden Ebenen die Schnittgerade bestimmt, und führen Sie es beispielhaft für \\(E_1:\\;2x+y-2z=6\\) und die Ebene \\(E_3:\\;x-y+z=0\\) durch.",
          "erwartungsbild": [
            "Weiterer gemeinsamer Punkt: ein beliebiger Punkt, der \\(2x+y-2z=6\\) erfüllt; z. B. \\(x=0,\\ z=0 \\Rightarrow y=6\\), also \\(C(0\\mid 6\\mid 0)\\). Probe in \\(E_2\\): \\(4\\cdot0+2\\cdot6-4\\cdot0=12\\) — erfüllt, somit \\(C\\in E_1=E_2\\).",
            "Allgemeines Vorgehen bei schneidenden Ebenen: Die beiden Ebenengleichungen bilden ein lineares Gleichungssystem mit zwei Gleichungen und drei Unbekannten; man setzt eine Koordinate als Parameter \\(t\\) und löst die übrigen beiden auf. (Alternative: Richtungsvektor der Schnittgeraden über das Kreuzprodukt \\(\\vec{n_1}\\times\\vec{n_3}\\), ein Geradenpunkt aus dem LGS.)",
            "Durchführung mit \\(E_3:\\;x-y+z=0\\): Setze \\(z=t\\). Aus dem LGS \\(2x+y-2z=6,\\ x-y+z=0\\) folgt \\(x=\\tfrac{t}{3}+2\\) und \\(y=\\tfrac{4t}{3}+2\\).",
            "Schnittgerade in Parameterform (mit \\(t=3s\\), um Brüche zu vermeiden): \\(g:\\ \\vec{x}=\\begin{pmatrix} 2 \\\\ 2 \\\\ 0 \\end{pmatrix} + s\\begin{pmatrix} 1 \\\\ 4 \\\\ 3 \\end{pmatrix}\\). Der Richtungsvektor \\(\\begin{pmatrix}1\\\\4\\\\3\\end{pmatrix}\\) ist (bis auf Vorzeichen) das Kreuzprodukt \\(\\vec{n_1}\\times\\vec{n_3}=\\begin{pmatrix}-1\\\\-4\\\\-3\\end{pmatrix}\\).",
            "Kontrolle: \\(\\vec{n_1}\\cdot\\begin{pmatrix}1\\\\4\\\\3\\end{pmatrix}=2+4-6=0\\) und \\(\\vec{n_3}\\cdot\\begin{pmatrix}1\\\\4\\\\3\\end{pmatrix}=1-4+3=0\\); der Stützpunkt \\(A(2\\mid2\\mid0)\\) liegt in beiden Ebenen — die Gerade liegt also in \\(E_1\\) und \\(E_3\\)."
          ],
          "afb": "II/III"
        },
        {
          "frage": "Berechnen Sie den Schnittwinkel zwischen der Ebene \\(E_1:\\;2x+y-2z=6\\) und der \\(xy\\)-Koordinatenebene. Erläutern Sie zunächst die verwendete Formel.",
          "erwartungsbild": [
            "Der Schnittwinkel \\(\\alpha\\) zweier Ebenen wird über die Normalenvektoren bestimmt: \\(\\cos\\alpha = \\dfrac{|\\vec{n_1}\\cdot\\vec{n_2}|}{|\\vec{n_1}|\\,|\\vec{n_2}|}\\). Der Betrag im Zähler stellt sicher, dass der spitze Schnittwinkel (\\(0^\\circ \\le \\alpha \\le 90^\\circ\\)) herauskommt.",
            "Normalenvektor von \\(E_1\\): \\(\\vec{n_1}=\\begin{pmatrix} 2 \\\\ 1 \\\\ -2 \\end{pmatrix}\\); Normalenvektor der \\(xy\\)-Ebene (\\(z=0\\)): \\(\\vec{n}=\\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix}\\).",
            "Skalarprodukt: \\(\\vec{n_1}\\cdot\\vec{n}=2\\cdot0+1\\cdot0+(-2)\\cdot1=-2\\); Beträge: \\(|\\vec{n_1}|=\\sqrt{2^2+1^2+(-2)^2}=\\sqrt{9}=3\\), \\(|\\vec{n}|=1\\).",
            "Einsetzen: \\(\\cos\\alpha=\\dfrac{|-2|}{3\\cdot 1}=\\dfrac{2}{3}\\approx 0{,}6667\\).",
            "Ergebnis: \\(\\alpha=\\arccos\\!\\big(\\tfrac{2}{3}\\big)\\approx 48{,}19^\\circ\\) (gerundet auf zwei Nachkommastellen). Das ist der gesuchte Schnittwinkel zwischen \\(E_1\\) und der \\(xy\\)-Ebene."
          ],
          "afb": "II/III"
        }
      ]
    },
    {
      "id": "sim-geo-2",
      "gebiet": "geometrie",
      "teilaufgaben": [
        {
          "frage": "Gegeben sind die Gerade \\( g:\\ \\vec{x} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 0 \\end{pmatrix} + t \\begin{pmatrix} 2 \\\\ 0 \\\\ 3 \\end{pmatrix} \\) und der Punkt \\( A\\begin{pmatrix} 5 \\\\ 6 \\\\ 4 \\end{pmatrix} \\). Untersuchen Sie durch eine Punktprobe, ob \\( A \\) auf \\( g \\) liegt, und geben Sie die besondere Lage von \\( g \\) im Koordinatensystem an. Begruenden Sie diese Lage anhand des Richtungs- und des Stuetzvektors.",
          "erwartungsbild": [
            "Punktprobe: Ansatz \\( \\begin{pmatrix} 1 \\\\ 2 \\\\ 0 \\end{pmatrix} + t \\begin{pmatrix} 2 \\\\ 0 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 6 \\\\ 4 \\end{pmatrix} \\) fuehrt auf drei Gleichungen fuer den einen Parameter \\( t \\).",
            "Aus der ersten Zeile \\( 1 + 2t = 5 \\) folgt \\( t = 2 \\); die zweite Zeile \\( 2 + 0\\cdot t = 6 \\) liefert jedoch \\( 2 = 6 \\), was nicht erfuellbar ist (auch die dritte Zeile ergaebe \\( t = \\tfrac{4}{3} \\)).",
            "Da das Gleichungssystem keine gemeinsame Loesung hat, liegt \\( A \\) nicht auf \\( g \\).",
            "Besondere Lage: Der Richtungsvektor \\( \\vec{u}=\\begin{pmatrix} 2 \\\\ 0 \\\\ 3 \\end{pmatrix} \\) hat die \\( y \\)-Komponente \\( 0 \\); zudem ist die \\( y \\)-Koordinate jedes Geradenpunktes konstant gleich \\( 2 \\). Damit liegt \\( g \\) vollstaendig in der Ebene \\( y = 2 \\) und verlaeuft parallel zur \\( x\\text{-}z \\)-Koordinatenebene (Ebene \\( y=0 \\))."
          ],
          "afb": "I/II"
        },
        {
          "frage": "Stellen Sie eine Koordinatengleichung der Ebene \\( E \\) auf, die die Gerade \\( g \\) und den Punkt \\( A\\begin{pmatrix} 5 \\\\ 6 \\\\ 4 \\end{pmatrix} \\) enthaelt. Verwenden Sie zur Bestimmung eines Normalenvektors das Kreuzprodukt und weisen Sie abschliessend nach, dass sowohl \\( g \\) als auch \\( A \\) in \\( E \\) liegen.",
          "erwartungsbild": [
            "Zwei in \\( E \\) liegende Richtungsvektoren waehlen: den Richtungsvektor von \\( g \\), \\( \\vec{u}=\\begin{pmatrix} 2 \\\\ 0 \\\\ 3 \\end{pmatrix} \\), und den Verbindungsvektor vom Stuetzpunkt \\( P\\begin{pmatrix} 1 \\\\ 2 \\\\ 0 \\end{pmatrix} \\) der Geraden zu \\( A \\): \\( \\vec{PA}=A-P=\\begin{pmatrix} 4 \\\\ 4 \\\\ 4 \\end{pmatrix} \\).",
            "Normalenvektor ueber das Kreuzprodukt: \\( \\vec{u}\\times\\vec{PA}=\\begin{pmatrix} 0\\cdot 4-3\\cdot 4 \\\\ 3\\cdot 4-2\\cdot 4 \\\\ 2\\cdot 4-0\\cdot 4 \\end{pmatrix}=\\begin{pmatrix} -12 \\\\ 4 \\\\ 8 \\end{pmatrix} \\); kuerzen durch \\( 4 \\) ergibt \\( \\vec{n}=\\begin{pmatrix} -3 \\\\ 1 \\\\ 2 \\end{pmatrix} \\) (gleichwertig \\( \\begin{pmatrix} 3 \\\\ -1 \\\\ -2 \\end{pmatrix} \\)).",
            "Koordinatenform aus \\( \\vec{n}\\cdot\\vec{x}=\\vec{n}\\cdot P \\): mit \\( \\vec{n}=\\begin{pmatrix} 3 \\\\ -1 \\\\ -2 \\end{pmatrix} \\) gilt \\( \\vec{n}\\cdot P = 3\\cdot 1 - 1\\cdot 2 - 2\\cdot 0 = 1 \\), also \\( E:\\ 3x - y - 2z = 1 \\).",
            "Nachweis \\( A\\in E \\): \\( 3\\cdot 5 - 6 - 2\\cdot 4 = 15-6-8 = 1 \\) (erfuellt). Nachweis \\( g\\subset E \\): Der Stuetzpunkt \\( P \\) liegt in \\( E \\) (\\( 3\\cdot 1-2-0=1 \\)) und \\( \\vec{n}\\cdot\\vec{u}=3\\cdot 2 -1\\cdot 0 -2\\cdot 3 = 0 \\), d. h. \\( \\vec{u} \\) verlaeuft parallel zu \\( E \\); also liegt ganz \\( g \\) in \\( E \\)."
          ],
          "afb": "II"
        },
        {
          "frage": "Geben Sie die Gleichung einer Geraden \\( h \\) an, die echt parallel zur Ebene \\( E:\\ 3x - y - 2z = 1 \\) verlaeuft (also parallel zu \\( E \\), aber nicht in \\( E \\) enthalten ist). Erlaeutern Sie, welche beiden Bedingungen Ihr Richtungsvektor und Ihr Stuetzpunkt dafuer erfuellen muessen, und weisen Sie beide Bedingungen fuer Ihre Wahl nach.",
          "erwartungsbild": [
            "Bedingung 1 (Richtung parallel zu \\( E \\)): Der Richtungsvektor \\( \\vec{v} \\) von \\( h \\) muss senkrecht auf dem Normalenvektor \\( \\vec{n}=\\begin{pmatrix} 3 \\\\ -1 \\\\ -2 \\end{pmatrix} \\) stehen, also \\( \\vec{n}\\cdot\\vec{v}=0 \\).",
            "Bedingung 2 (nicht in \\( E \\)): Der Stuetzpunkt \\( Q \\) von \\( h \\) darf die Ebenengleichung nicht erfuellen, also \\( 3\\,Q_x - Q_y - 2\\,Q_z \\neq 1 \\); sonst laege \\( h \\) in \\( E \\).",
            "Beispielwahl Richtungsvektor: \\( \\vec{v}=\\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix} \\) mit \\( \\vec{n}\\cdot\\vec{v}=3-1-2=0 \\) (Bedingung 1 erfuellt).",
            "Beispielwahl Stuetzpunkt: \\( Q\\begin{pmatrix} 8 \\\\ 5 \\\\ 2 \\end{pmatrix} \\) (z. B. \\( Q=A+\\vec{n} \\)) mit \\( 3\\cdot 8 - 5 - 2\\cdot 2 = 24-5-4 = 15 \\neq 1 \\) (Bedingung 2 erfuellt).",
            "Ergebnis: \\( h:\\ \\vec{x}=\\begin{pmatrix} 8 \\\\ 5 \\\\ 2 \\end{pmatrix} + r\\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix} \\) ist echt parallel zu \\( E \\)."
          ],
          "afb": "II/III"
        },
        {
          "frage": "Bestimmen Sie den Abstand der Geraden \\( h:\\ \\vec{x}=\\begin{pmatrix} 8 \\\\ 5 \\\\ 2 \\end{pmatrix} + r\\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix} \\) zur Ebene \\( E:\\ 3x - y - 2z = 1 \\) mithilfe der HESSEschen Normalenform. Begruenden Sie, warum es genuegt, den Abstand eines einzigen Punktes von \\( h \\) zu berechnen.",
          "erwartungsbild": [
            "Begruendung: Da \\( h \\) echt parallel zu \\( E \\) ist (siehe vorige Teilaufgabe), haben alle Punkte von \\( h \\) denselben Abstand zu \\( E \\); es genuegt daher, den Abstand des Stuetzpunktes \\( Q\\begin{pmatrix} 8 \\\\ 5 \\\\ 2 \\end{pmatrix} \\) zu bestimmen.",
            "HESSEsche Normalenform von \\( E \\): Normalenvektor \\( \\vec{n}=\\begin{pmatrix} 3 \\\\ -1 \\\\ -2 \\end{pmatrix} \\) mit \\( |\\vec{n}|=\\sqrt{3^2+(-1)^2+(-2)^2}=\\sqrt{14} \\); damit \\( \\dfrac{3x - y - 2z - 1}{\\sqrt{14}} = 0 \\).",
            "Abstand durch Einsetzen von \\( Q \\): \\( d = \\dfrac{|\\,3\\cdot 8 - 5 - 2\\cdot 2 - 1\\,|}{\\sqrt{14}} = \\dfrac{|15-1|}{\\sqrt{14}} = \\dfrac{14}{\\sqrt{14}} \\).",
            "Vereinfachen: \\( d = \\dfrac{14}{\\sqrt{14}} = \\sqrt{14} \\approx 3{,}74 \\) (Laengeneinheiten)."
          ],
          "afb": "III"
        }
      ]
    }
  ]
};
window.CONTENT = CONTENT;
