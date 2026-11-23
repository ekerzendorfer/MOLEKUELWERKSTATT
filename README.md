# MOLEKÜL-WERKSTATT – CHEMIE mit KI

**Projektstatus:** V0.3.0 – zwei geführte Lernwege (MW-001, MW-002), unabhängige Notizen und direkte SMILES-Übergabe; noch nicht im CHEMIE_KI_LINKS-Portal veröffentlicht

Die MOLEKÜL-WERKSTATT wird die **gemeinsame, didaktisch geführte Einstiegsoberfläche** zu den vorhandenen Molekül-Apps. Ausgangspunkt ist eine chemische Fragestellung – nicht die Auswahl einer Software. Vorbild: CHEMIE_ANALYTIK_HUB. Das Prinzip von MOL_LAB DIDACTIC (Beobachten → Vermuten → Antwort prüfen → Erklärung anzeigen) steht im Zentrum.

➡️ **[Detailliertes Konzept V0.1](docs/KONZEPT_V0.1_EINSTIEG.md)**

## Vorhandene Komponenten (bleiben eigenständig)
- [MOL_LAB DIDACTIC v0.4.2](https://github.com/ekerzendorfer/MOL_LAB_DIDACTIC) – kuratierte Vergleiche und Aufgaben; didaktischer Leitstern
- [MOL_LAB_TASKS](https://github.com/ekerzendorfer/MOL_LAB_TASKS) – Aufgabenbestand, Ketcher, SMILES-Übergabe
- [MOLLAB_PRO](https://github.com/ekerzendorfer/MOLLAB_PRO) – modernisierter 2D/3D-Viewer und Geometrievergleich; URL-basierte Strukturübernahme aus der Werkstatt
- [MOL_LAB (Colab)](https://github.com/ekerzendorfer/MOL_LAB) – RDKit, Konformere, MMFF/UFF, xTB-GFN2 für die wissenschaftliche Vertiefung

**Nicht Teil dieses Projektschritts:** GENLABOR, PROTEINLABOR, Docking.

V0.1 wird zuerst als eigenständige, statische GitHub-Pages-Anwendung erprobt. Bestehende Apps und Links bleiben zunächst unverändert; eine neue Hub-Kachel erfolgt erst nach Freigabe.

## V0.1.0 – erster Prototyp

Der Prototyp bietet **zwei Einstiege**: den geführten Lernweg MW-001 (Ethanol/Dimethylether) und **„Frei erkunden“**, unabhängig von einer Aufgabenstellung, mit Links zu den bestehenden 2D-/3D-Werkzeugen und zur Colab-Vertiefung. Notizen werden ausschließlich lokal im Browser gespeichert.

**Zum Testen:** die Startseite über GitHub Pages öffnen. Ist Pages noch nicht aktiviert: Repository → Settings → Pages → Deploy from a branch → main / (root). Es gibt **noch keine Kachel im CHEMIE_KI_LINKS-Portal**.

Dateien der Anwendung: index.html, styles.css, app.js sowie data/learning_paths.json und data/tools.json.

Die bisherigen Molekül-Apps bleiben unverändert. Eine automatische Rückgabe aus externen Apps, ein direkt eingebetteter Sketcher/Viewer und die technische Überarbeitung von MOLLAB_PRO folgen erst nach dem Pilot-Test.

## V0.2.0 – Übergabe an MOLLAB PRO

Bei MW-001 führen eigene Links für Ethanol und Dimethylether direkt in den 2D-Editor von MOLLAB PRO. Im freien Molekülstudio übernimmt der Link das ausgewählte Beispiel oder einen eigenen SMILES. Die Werkstatt bleibt im ersten Tab geöffnet, und MOLLAB PRO zeigt einen sicheren Rücklink zur Aufgabenansicht oder zum freien Arbeitsbereich.

Die **3D-Berechnung startet weiterhin bewusst erst per Knopfdruck** im Zielwerkzeug. Es werden keine Arbeitsnotizen, Modellkoordinaten oder Ergebnisse übertragen. Die bestehende MOL_LAB-Colab-Vertiefung bleibt unverändert.

**[Übergabeprotokoll und Testablauf](docs/HANDOFF_V0.2.md)** · **[MOLEKÜL-WERKSTATT öffnen](https://ekerzendorfer.github.io/MOLEKUELWERKSTATT/)**

Technik: `molecule-handoff.js`, `tests/handoff.test.cjs`, `.github/workflows/handoff-regression.yml`.

Die nächste Freigabe erfolgt nach einem echten Browserdurchlauf: Ethanol/Dimethylether → JSME → 3D → zurück zur Werkstatt. Das Portal CHEMIE_KI_LINKS ist **nicht** verändert worden.

## V0.3.0 – MW-002: Wasser und Schwefelwasserstoff

Der zweite Forschungsweg behandelt **Molekülform, Polarität und zwischenmolekulare Kräfte**. Die zentrale Leitfrage: *Warum ist Wasser bei Raumtemperatur flüssig, Schwefelwasserstoff gasförmig?* Die vier didaktischen Schritte und der didaktisch bewusst verzögerte Erklärungsteil bleiben erhalten.

Das Zielwerkzeug ist der bereits kuratierte DIDACTIC-Vergleich im Modul „Polarität und Löslichkeit“. Der direkte SMILES-Transfer zu MOLLAB PRO funktioniert für beide Moleküle. Ein Rücklink aus MOLLAB PRO bringt den Nutzer **gezielt zu MW-002**, nicht zurück zu MW-001. Die freien Werkzeuge und MW-001 bleiben uneingeschränkt verwendbar.

**Wichtig:** MW-001 speichert seine bisherigen Notizen weiterhin unter dem ursprünglichen `localStorage`-Schlüssel `molekuelwerkstatt:v0.1`. Die Daten bleiben erhalten; MW-002 erhält einen separaten Teilbereich darin. Das Zurücksetzen einer Aufgabe löscht nicht den Fortschritt der anderen.

- [MW-002 praktisch testen](docs/MW002_TEST.md)
- [Datenbasis der Lernwege](data/learning_paths.json)
- [Automatisierte Zustands- und Handoff-Tests](tests/learning-paths.test.cjs)

**Sicherheitshinweis:** Schwefelwasserstoff ist giftig. MW-002 ist eine digitale Analyseaufgabe, keine praktische Versuchsanleitung mit H₂S.

Nach der Browser-Abnahme können wir behutsam weitere didaktische Fälle aus MOL_LAB DIDACTIC übernehmen. Weder das zentrale CHEMIE_KI_LINKS-Portal noch das DIDACTIC-Notebook selbst wurden für MW-002 geändert.

## Forschungswege-Katalog V0.1 – vollständige DIDACTIC-Erschließung

Alle **61 DIDACTIC-Moduleinträge** (53 unterschiedliche SMILES) sind jetzt einem der **30 geplanten Forschungswege** zugeordnet: 14 Paarvergleiche (A), zehn Untersuchungs-/Beispielwege (B) und sechs Konformerwege (C). **Nur MW-001 und MW-002 sind bislang in der App umgesetzt**; die weiteren 28 sind fachlich-redaktionelle Entwürfe, keine anklickbaren Aufgaben.

- **[Detaillierter Forschungswege-Katalog](docs/FORSCHUNGSWEGE_KATALOG_V0.1.md)** – 30 Steckbriefe mit Leitfrage, Lernziel, Quellkarten, didaktischen Grenzen, Prioritäten und Datenlücken
- [Strukturierter Katalog (JSON)](data/forschungswege_katalog_v0.1.json) – für spätere Aufgabenbibliothek und Datenmigration
- [DIDACTIC-Quellenmanifest](data/didactic_quellen_manifest_v0.1.json) – Revisionsbasis mit 61 eindeutigen Modul/Karten-IDs, sieben Isomeriepaaren und sieben Polaritätsvergleichen
- [Automatischer Katalogtest](tests/research-catalog.test.cjs) – prüft Quellbezug und 61/61-Abdeckung

**Vorschlag für die weitere Entwicklung:** Einen zusätzlichen Vergleich (MW-009, Propanal/Aceton), einen neuen Strukturweg (MW-019, Methanol/Phenol) und einen Konformerweg (MW-024, Cyclohexan) einzeln als Piloten umsetzen. Erst danach die filterbare Bibliothek aufbauen. DIDACTIC, MOLLAB_PRO, die Live-Lernwege und der CHEMIE_KI_LINKS-Hub bleiben bei dieser Katalogerstellung unverändert.

