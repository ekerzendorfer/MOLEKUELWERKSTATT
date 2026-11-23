# MOLEKÜL-WERKSTATT V0.3 – Abnahme MW-002

**Ziel:** Den zweiten durchgängigen Forschungsweg mit einem anderen chemischen Schwerpunkt praktisch prüfen, ohne MW-001 zu beschädigen.

## MW-002: Wasser / Schwefelwasserstoff

1. [Werkstatt öffnen](https://ekerzendorfer.github.io/MOLEKUELWERKSTATT/) → auf der Startseite **MW-002 beginnen**.
2. Die Leitfrage lautet: „Warum ist Wasser bei Raumtemperatur flüssig, Schwefelwasserstoff dagegen gasförmig?“ Eine eigene Vermutung eingeben.
3. Unter **Untersuchen** das MOL_LAB DIDACTIC öffnen: **Laufzeit → Alle ausführen** → **Modul „Polarität und Löslichkeit“** → **Vergleich „Wasser vs. Schwefelwasserstoff“** → **„Polaritäts-/Löslichkeitsvergleich“**.
4. Die Strukturformen, Siedepunkte und Rolle der Wasserstoffbrücken vergleichen; eine eigene Beobachtung in der Werkstatt festhalten.
5. Unter **Deuten** die eigene Erklärung eingeben. Die fachliche Erklärung soll erst nach Klick auf **„Erklärung anzeigen“** erscheinen.
6. Unter **Sichern** Fazit formulieren; Protokoll kopieren oder als `.md` exportieren.
7. Nebenbei die Links **„In 2D/3D betrachten“** für Wasser und Schwefelwasserstoff prüfen. Im MOLLAB PRO soll der 2D-Editor jeweils automatisch die richtige Struktur laden und der Rücklink **gezielt nach MW-002** führen.

**Sicherheit:** H₂S ist giftig. Das ist eine digitale Vergleichsaufgabe; keine Aufforderung, H₂S im Unterricht herzustellen oder zu verwenden.

## Regression MW-001

- [ ] MW-001 starten, Vermutung eintragen, bis mindestens Schritt 2 arbeiten.
- [ ] Zur Startseite, danach MW-002: **keine** MW-001-Eingaben sichtbar.
- [ ] In MW-002 neue Notizen eintragen, danach zu MW-001 wechseln: ursprüngliche Notizen sind weiter vorhanden.
- [ ] MW-002 zurücksetzen: MW-001 ist weiterhin unverändert.
- [ ] Browser neu laden: beide Arbeitsstände bleiben getrennt.
- [ ] MOLLAB PRO → Rücklink aus MW-001 öffnet MW-001; aus MW-002 öffnet MW-002.

## Modellgrenzen

In MOLLAB PRO wird je ein einzelnes Molekül als 2D/3D-Modell untersucht. Solche Darstellungen zeigen **nicht unmittelbar** die zwischenmolekularen Wasserstoffbrücken-Netzwerke. Die chemische Deutung beruht daher zusätzlich auf der Polarität und auf experimentellen Stoffdaten. Für die kleinen anorganischen Moleküle sind einige Deskriptoren (etwa logP) nur eingeschränkt aussagekräftig.

## Automatische Regression

`node tests/learning-paths.test.cjs` prüft die voneinander getrennten lokalen Arbeitsstände einschließlich Rückkehr und Reset. `node tests/handoff.test.cjs` kontrolliert beide erlaubten Aufgabenkontexte und die sicheren Rücklinks.

GitHub Pages und ein Browser-Test in der realen Colab-Laufzeit bleiben zusätzliche Abnahmeschritte.
