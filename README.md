# MOLEKÜL-WERKSTATT – CHEMIE mit KI

**Projektstatus:** V0.2.0 – erster SMILES-Übergabeprototyp (MW-001 + frei erkunden), noch nicht im CHEMIE_KI_LINKS-Portal veröffentlicht

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
