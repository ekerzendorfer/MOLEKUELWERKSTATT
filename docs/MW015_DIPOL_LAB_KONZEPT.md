# MW-015 – Dipol-Labor: Entwicklungskonzept (28.11.2026)
 
## Reihenfolge
1. Werkstatt: dynamische neutrale Auswahl, Überschrift und Leitfrage; Wechsel zu Schritt 1, Reload stellt den letzten Schritt wieder her. Drei Beobachtungsfelder pro Molekül; alte Freitextnotizen behalten.
2. DIDACTIC V0.9a: H₂O als isolierter Colab-Prototyp mit EN-Labels und Bindungspfeilen im vorhandenen 3Dmol.js-Viewer.
3. V0.9b: H₂O/CO₂, freie Vektoren Spitze-an-Anfang, Resultierende im selben drehbaren Molekülfenster, Orientierung beibehalten.
4. V0.9c: NH₃/CH₄, Symmetrie und Nulltoleranz, experimentelle Gasphasenreferenzen getrennt. Geometrie ggf. idealisieren oder Abweichung sichtbar erläutern; keine numerischen Restvektoren als physikalischen Dipol darstellen.
5. Integration und praktische Abnahme aller vier Moleküle, Regression MW-024, keine Veröffentlichung auf main davor.

## Erweiterbarkeit
Aktiv bleibt ausschließlich Basisset CO₂/H₂O/NH₃/CH₄. Datenmodell mit Set-ID, Mitgliedern und pro Molekül eigener Leitfrage/Beobachtung. Später z.B. Set 2 (BF₃, SO₂, CCl₄, CH₃Cl), Set 3 (H₂S, Methanal, Phosgen, ein noch zu bestimmendes Molekül). Nur Vorschläge, keine aktivierten Aufgaben. Phosgen ausschließlich digitale Modellbetrachtung, kein Schulversuch. Später Set-Wechsel mit isolierten Notizen und Regression; keine 12 gleichzeitigen Kacheln. DIDACTIC soll dieselben Set- und Molekül-IDs nutzen; bestehender Notebook-Katalog bleibt unabhängig.

## Wissenschaftliche Grenzen
Pauling-EN (H 2,20; C 2,55; N 3,04; O 3,44). Chemische Pfeile von weniger zu stärker elektronegativ, entgegengesetzt zur physikalischen Dipolmomentkonvention. Für symmetrieäquivalente Bindungen im Basisset gleiche Modellpfeillängen. Keine Debye, keine quantitative Prognose aus ΔEN, keine Gleichsetzung mit logP/TPSA oder heuristischem Polaritätsscore. Bei gemischten Bindungstypen Modell erst gesondert validieren. Freie Elektronenpaare und Elektronendichte nicht durch einfache Bindungspfeile vollständig erfasst.
 
## Allgemeiner Moleküldipol (späterer eigenständiger Schritt)
Optionaler Gesamtvektor im Einzelmolekül-Viewer, ohne Einzeldipole. Nur für eine dafür validierte Methode (z.B. Gasteiger-Ladungen mit Summe q_i r_i als ausdrücklich approximativer physikalischer Dipol; neutrale Moleküle, Ladungssumme prüfen, Richtung/Einheit/Debye dokumentieren; keine Aussage bei fehlenden Parametern). Keine Ableitung eines Vektors aus dem bisherigen skalaren Polaritätsscore. Alternativ xTB für wissenschaftliche Vertiefung. Keine generelle Anzeige unvalidierter EN-Summen als physikalisches Dipolmoment. Für Basisset kann der qualitative Modellresultierende optional separat sichtbar sein.
 
## Abnahme Schritt 1
Vier dynamische Titel; keine Form/Polarität als Karten-Metadaten; bewusstes Umschalten beginnt bei Schritt 1; Reload stellt Schritt wieder her. Drei getrennte Beobachtungen mit individuellen Fragen je Molekül, Bericht und Reset ohne Datenverlust. Keine Änderung an main oder den Colab-Links bis zur Integration.

## Integrationsstand – 28.11.2026

V0.9a–c praktisch abgenommen; V0.9d enthält experimentellen Bezug. MW-015 führt zum V0.9d-Entwicklungsnotebook; übrige Wege unverändert. Drei Beobachtungsfelder bleiben pro Molekül getrennt. Referenzvergleich freiwillig im Fazit. Die Erklärung in Schritt 3 bezieht sich nur auf das gewählte Beispiel (kein Vorwegnehmen der anderen Fälle). Freigabe erst nach Gesamtprüfung: DIDACTIC main zuerst, dann MW-015-Testlink entfernen und Werkstatt main. Keine weiteren Sets oder allgemeine Dipolmoment-Anzeige.

## Abschließende praktische Freigabeprüfung – 28.11.2026

5/5 bestanden: Referenz erst im letzten Additionsschritt, verständliche Referenz/Quelle/Modellgrenze, Referenz beim Zurückschalten verborgen, verständliche MW-015-Anleitung und vollständiger Forschungsweg mit Protokoll. [Werkstatt-Regression](https://github.com/ekerzendorfer/MOLEKUELWERKSTATT/actions/runs/46148928877) erfolgreich, einschließlich Sperre der Erklärung bis zur eigenen Deutung. Diese Sperre wurde nicht separat als visueller Prüfpunkt bestätigt. DIDACTIC V0.9d wurde nach einem veralteten Colab-Speichervorgang byteidentisch wiederhergestellt; erneute Regression vor Veröffentlichung. main bleibt bis zum Abschluss der technischen Freigabe unverändert.

## Veröffentlichung – 28.11.2026

Anwender hat abschließend alle Funktionen kontrolliert und die Veröffentlichung auf main ausdrücklich freigegeben. DIDACTIC V0.9 veröffentlicht, MW-015-Testlink entfernt; stabiler Standardlink aus tools.json gilt wieder. Regression der abgenommenen Werkstatt: https://github.com/ekerzendorfer/MOLEKUELWERKSTATT/actions/runs/46149353286. Der vorläufige Entwicklungszyklus endet hier. Weitere Molekül-Sets und allgemeine Dipolmoment-Anzeige bleiben zurückgestellt. MW-009 beginnt erst nach der vereinbarten Pause.
