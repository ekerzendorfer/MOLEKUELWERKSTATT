# MOLEKÜL-WERKSTATT V0.4 – Testblatt für MW-009, MW-015 und MW-024

**Stand:** 23. November 2026 · **Status:** drei Pilotaufgaben technisch implementiert, realer Browser-/Colab-Test steht aus.

Die drei Beispiele prüfen bewusst drei unterschiedliche didaktische Aufgabentypen. Alle folgen **Vermuten → Untersuchen → Deuten → Sichern**, ohne eine Antwort vor der eigenen Überlegung zu verraten.

## A – MW-009: Propanal und Aceton

**Direktlink:** https://ekerzendorfer.github.io/MOLEKUELWERKSTATT/?case=MW-009#aufgabe

**Leitfrage:** Warum unterscheiden sich Propanal und Aceton trotz gleicher Summenformel C₃H₆O?

1. Eigene Vermutung formulieren: Lage und chemische Umgebung der C=O-Gruppe.
2. In der Werkstatt die SMILES `CCC=O` (Propanal) bzw. `CC(=O)C` (Aceton) prüfen; die 2D-/3D-Links öffnen jeweils das gewünschte Molekül in MOLLAB_PRO.
3. **MOL_LAB DIDACTIC:** Colab `Laufzeit → Alle ausführen`; **Modul: Isomerie**; **Beispiel: Propanal** (eigene SMILES ausgeschaltet); **Isomerenpaar vergleichen**.
4. In der Vergleichstabelle kontrollieren: Strukturgruppe, experimentelle Siedepunkte (rund 49 °C vs. 56 °C), Reaktivitätshinweise.
5. Eigene Beobachtung und Begründung: Aldehyd-C mit H vs. Keton-C mit zwei C-Resten; unterschiedliche Oxidierbarkeit *unter passenden Reaktionsbedingungen*.
6. Fachliche Erklärung nur nach Klick einblenden; Protokoll sichern.
7. Rücklink aus MOLLAB_PRO muss wieder bei **MW-009** landen.

**Wissenschaftliche Grenze:** Keine konkrete Oxidationsreaktion oder Geschwindigkeit aus der Struktur allein vorhersagen.

## B – MW-015: Molekülform und Dipole

**Direktlink:** https://ekerzendorfer.github.io/MOLEKUELWERKSTATT/?case=MW-015#aufgabe

**Leitfrage:** Wann heben sich polare Bindungsdipole auf – wann entsteht ein permanenter Moleküldipol?

1. In der Werkstatt **ein** Beispiel wählen (voreingestellt CO₂): **Kohlenstoffdioxid (`O=C=O`)**, **Wasser (`O`)**, **Ammoniak (`N`)** oder **Methan (`C`)**.
2. Eigene Vermutung zur räumlichen Form und zur Gesamtsumme der Bindungsdipole festhalten.
3. **MOL_LAB DIDACTIC:** **Modul: Polarität und Löslichkeit**; **Beispiel: das in der Werkstatt gewählte Molekül** (eigene SMILES ausgeschaltet); **Molekül analysieren**. Nicht den Paarvergleich verwenden.
4. Form und Symmetrie im 3D-Modell prüfen. *Optional* ein zweites Beispiel wählen, um den Unterschied herauszuarbeiten.
5. **Wichtiger Test:** Bei Wechsel von CO₂ zu Wasser müssen die Notizen von CO₂ verschwinden, aber nach Rückwechsel wieder erscheinen. Dasselbe gilt für den zuletzt bearbeiteten Schritt.
6. Die eigene Deutung formulieren; erst anschließend Erklärung einblenden. Der CO₂-Fall behandelt insbesondere die Aufhebung der beiden entgegengesetzten Bindungsdipole.
7. Ein selbst erstelltes Protokoll aus dem gewählten Beispiel erstellen, dann zum nächsten Beispiel wechseln und prüfen, dass die Berichte nicht vermischt werden.
8. **„Diese Aufgabe zurücksetzen“** soll hier nur das **aktuell gewählte Beispiel** löschen, nicht die Notizen der drei anderen Beispiele.
9. 2D-/3D-Link für jede der vier Strukturen prüfen; Rücklink muss nach **MW-015** zurückführen.

**Wissenschaftliche Grenze:** Das einzelne 3D-Modell zeigt nicht automatisch Dipolvektoren, berechnete Dipolmomente oder Intermolekularkräfte. Die Vektorsumme muss didaktisch erläutert werden.

## C – MW-024: Cyclohexan und Sesselstruktur

**Direktlink:** https://ekerzendorfer.github.io/MOLEKUELWERKSTATT/?case=MW-024#aufgabe

**Leitfrage:** Warum ist die nicht-planare Sesselkonformation energetisch günstig?

1. Eigene Vermutung notieren: Winkel im Ring und gestaffelte/ekliptische C–H-Stellungen.
2. Cyclohexan (`C1CCCCC1`) über **„In 2D/3D betrachten“** in MOLLAB_PRO öffnen und prüfen, dass die 3D-Struktur nicht flach ist.
3. **MOL_LAB DIDACTIC:** Colab `Laufzeit → Alle ausführen`; **Modul: Konformere**; **Beispiel: Cyclohexan**; zuerst **Molekül analysieren**, danach **Konformere berechnen**.
4. Verfügbare relative MMFF-Energien und angezeigte Konformere beschreiben. **Nicht erwarten**, dass die einfache Minimierung gezielt die Bootkonformation oder die Ringinversionsbarriere liefert; mehrere Starts können zur gleichen Sesselstruktur optimieren.
5. Eigene Interpretation: Bindungswinkel nahe 109,5°, weitgehend gestaffelte Nachbarbindungen – günstiger als eine hypothetisch planare Ringstruktur.
6. **Optional:** Über „MOL_LAB in Colab öffnen“ tiefer gehen; `C1CCCCC1` bei Bedarf kopieren und im MOL_LAB selbst eintragen. Keine automatische Übergabe von Energien oder Geometrien behaupten.
7. Erklärung erst nach eigener Deutung einblenden; Ergebnisbericht sichern und Rücklink aus MOLLAB_PRO nach **MW-024** prüfen.

**Wissenschaftliche Grenze:** Relative MMFF-Energien sind Modellwerte und nicht mit experimentellen Konformations- oder Aktivierungsenergien gleichzusetzen.

## Übergreifende Regression vor der Freigabe

- [ ] Die neuen Wege erscheinen unter „Weitere chemische Fragen untersuchen“ auf der Startseite; „Frei erkunden“ ist weiterhin unverändert erreichbar.
- [ ] MW-001 und MW-002 zeigen ihre zuvor gespeicherten Eingaben nach Refresh weiterhin korrekt.
- [ ] Jeder neue Weg besitzt seinen eigenen Forschungsweg, seine eigenen Beobachtungsfelder, eine verborgen beginnende Erklärung und einen exportierbaren Bericht.
- [ ] Wechsel zwischen MW-009, MW-015, MW-024, MW-001 und MW-002 verändert keine fremden Notizen.
- [ ] Direkte URLs mit `?case=MW-009#aufgabe`, `?case=MW-015#aufgabe`, `?case=MW-024#aufgabe` öffnen jeweils die richtige Aufgabe.
- [ ] Rückkehr aus MOLLAB_PRO landet bei der richtigen Aufgaben-ID; keine falschen oder erfundenen 3D-Ergebnisse.
- [ ] Responsive Darstellung auf Desktop und Smartphone: Aufgabenwahl, Molekül-Dropdown und 2D-/3D-Links bleiben lesbar.
- [ ] Keine Aufgabentexte versprechen eine unmittelbare Auswertung aus Colab oder eine quantenmechanische Referenzgeometrie.

## Automatisierte Tests

```sh
node tests/handoff.test.cjs
node tests/learning-paths.test.cjs
node tests/research-catalog.test.cjs
```

Automatisch geprüft werden JavaScript-Syntax, **61/61 DIDACTIC-Katalogabdeckung**, fünf valide aktive Forschungswege, URL-Kontexte, Wiederherstellung alter Notizen sowie getrennte Einträge für die vier MW-015-Moleküle. Ein automatisierter Test ohne echten Browser ersetzt **nicht** die Sichtkontrolle der JSME-Übernahme oder Colab-Auswertung.

**Nach fachlicher Rückmeldung:** Die drei Aufgaben und die B-/C-Templates redaktionell korrigieren, erst danach weitere Forschungswege freigeben. DIDACTIC-Notebook und CHEMIE_KI_LINKS-Hub wurden für diese Pilotversion nicht geändert.
