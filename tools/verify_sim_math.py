# -*- coding: utf-8 -*-
"""Einmal-Verifikation der neuen Simulator-Items (sympy)."""
import sys
import sympy as sp

sys.stdout.reconfigure(encoding="utf-8")
x, t, r = sp.symbols("x t r", real=True)
ok = []

def check(name, cond):
    ok.append((name, bool(cond)))
    print(("PASS" if cond else "FAIL"), name)

# ---- sim-ana-1: f(x) = x^3 - 6x^2 + 9x ----
f = x**3 - 6*x**2 + 9*x
check("ana1 Faktorisierung x(x-3)^2", sp.expand(x*(x-3)**2) == f)
check("ana1 Nullstellen {0,3}", set(sp.solve(f, x)) == {0, 3})
f1 = sp.diff(f, x)
check("ana1 f' = 3(x-1)(x-3)", sp.expand(3*(x-1)*(x-3)) == sp.expand(f1))
check("ana1 HP(1|4)", f.subs(x, 1) == 4 and f1.subs(x, 1) == 0 and sp.diff(f, x, 2).subs(x, 1) == -6)
check("ana1 TP(3|0)", f.subs(x, 3) == 0 and f1.subs(x, 3) == 0 and sp.diff(f, x, 2).subs(x, 3) == 6)
check("ana1 mittlere AeR [0;2] = 1", sp.Rational(1, 2)*(f.subs(x, 2) - f.subs(x, 0)) == 1)
check("ana1 f'(1) = 0", f1.subs(x, 1) == 0)
check("ana1 Flaeche [0;3] = 27/4", sp.integrate(f, (x, 0, 3)) == sp.Rational(27, 4))
check("ana1 f >= 0 auf [0;3]", all(f.subs(x, v) >= 0 for v in [0, sp.Rational(1,2), 1, 2, sp.Rational(5,2), 3]))

# ---- sim-ana-2: Zuflussrate z(t) = -0.25 t^3 + 3 t^2 auf [0;12] ----
z = -sp.Rational(1, 4)*t**3 + 3*t**2
check("ana2 Faktorisierung -1/4 t^2 (t-12)", sp.expand(-sp.Rational(1,4)*t**2*(t-12)) == sp.expand(z))
check("ana2 Nullstellen {0,12}", set(sp.solve(z, t)) == {0, 12})
check("ana2 z > 0 auf (0,12)", all(z.subs(t, v) > 0 for v in [1, 6, 11]))
z1 = sp.diff(z, t)
check("ana2 z' = -3/4 t(t-8)", sp.expand(-sp.Rational(3,4)*t*(t-8)) == sp.expand(z1))
check("ana2 Maximum bei t=8, z(8)=64", sp.solve(z1, t) == [0, 8] and z.subs(t, 8) == 64 and sp.diff(z, t, 2).subs(t, 8) == -6)
check("ana2 Integral [0;12] = 432", sp.integrate(z, (t, 0, 12)) == 432)
z2 = sp.diff(z, t, 2)
check("ana2 z'' Nullstelle t=4, z'(4)=12", sp.solve(z2, t) == [4] and z1.subs(t, 4) == 12)
check("ana2 Randwerte z'(0)=0, z'(12)=-36", z1.subs(t, 0) == 0 and z1.subs(t, 12) == -36)

# ---- sim-geo-1: A(4|0|0), B(0|4|0), C(0|0|4), Pyramide OABC ----
A = sp.Matrix([4, 0, 0]); B = sp.Matrix([0, 4, 0]); C = sp.Matrix([0, 0, 4]); O = sp.Matrix([0, 0, 0])
AB, BC, CA, AC = B - A, C - B, A - C, C - A
check("geo1 gleichseitig sqrt(32)", AB.norm() == BC.norm() == CA.norm() == sp.sqrt(32))
n = AB.cross(AC)
check("geo1 Kreuzprodukt (16,16,16)", list(n) == [16, 16, 16])
check("geo1 E: x+y+z=4 enthaelt A,B,C", all(sum(P) == 4 for P in (A, B, C)))
V = sp.Rational(1, 6)*abs(sp.Matrix.hstack(A, B, C).det())
check("geo1 Volumen 32/3", V == sp.Rational(32, 3))
# Lotgerade vom Ursprung: x = t*(1,1,1); in E: 3t=4
tF = sp.solve(3*t - 4, t)[0]
F = sp.Matrix([tF, tF, tF])
check("geo1 Lotfusspunkt F(4/3,4/3,4/3)", tF == sp.Rational(4, 3))
check("geo1 Abstand |OF| = 4*sqrt(3)/3", sp.simplify(F.norm() - 4*sp.sqrt(3)/3) == 0)
G = sp.Rational(1, 2)*(AB.cross(AC)).norm()  # Grundflaeche
check("geo1 Grundflaeche 8*sqrt(3)", sp.simplify(G - 8*sp.sqrt(3)) == 0)
check("geo1 Konsistenz V = 1/3 * G * h", sp.simplify(sp.Rational(1, 3)*G*F.norm() - V) == 0)

# ---- sim-geo-2: A(2|1|5), B(4|5|3); h: (0,-3,7)+s(1,2,-1); k: (5,2,4)+r(1,2,-1) ----
A2 = sp.Matrix([2, 1, 5]); B2 = sp.Matrix([4, 5, 3])
u = B2 - A2
check("geo2 AB = (2,4,-2) = 2*(1,2,-1)", list(u) == [2, 4, -2])
# Spurpunkt x-y-Ebene: z=0
ts = sp.solve(5 - 2*t, t)[0]
S = A2 + ts*u
check("geo2 Spurpunkt S(7|11|0)", list(S) == [7, 11, 0])
# h identisch zu g: Richtung parallel + A auf h
Qh = sp.Matrix([0, -3, 7]); uh = sp.Matrix([1, 2, -1])
s_sol = sp.solve([sp.Eq(Qh[i] + t*uh[i], A2[i]) for i in range(3)], t)
check("geo2 A auf h (s=2) -> g=h", s_sol == {t: 2})
# k echt parallel: A nicht auf k
Qk = sp.Matrix([5, 2, 4])
r_sol = sp.solve([sp.Eq(Qk[i] + t*uh[i], A2[i]) for i in range(3)], t)
check("geo2 A nicht auf k -> echt parallel", r_sol == [])
# Lotfusspunkt von A auf k
P = Qk + r*uh
AP = P - A2
r_lot = sp.solve(AP.dot(uh), r)[0]
Fk = P.subs(r, r_lot)
d = (Fk - A2).norm()
check("geo2 Lot: r=-1, F(4|0|5)", r_lot == -1 and list(Fk) == [4, 0, 5])
check("geo2 Abstand sqrt(5)", sp.simplify(d - sp.sqrt(5)) == 0)
check("geo2 AF senkrecht u", (Fk - A2).dot(uh) == 0)

fails = [n for n, c in ok if not c]
print()
print("ALLE", len(ok), "CHECKS:", "GRUEN" if not fails else f"ROT: {fails}")
sys.exit(1 if fails else 0)
