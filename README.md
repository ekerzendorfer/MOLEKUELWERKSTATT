# MOLEKÜL-WERKSTATT – CHEMIE mit KI

**Projektstatus:** V0.1.0 – erster testbarer Einstieg (MW-001 + freies Molekülstudio), noch nicht im Portal veröffentlicht

Die MOLEKÜL-WERKSTATT wird die **gemeinsame, didaktisch geführte Einstiegsoberfläche** zu den vorhandenen Molekül-Apps. Ausgangspunkt ist eine chemische Fragestellung – nicht die Auswahl einer Software. Vorbild: CHEMIE_ANALYTIK_HUB. Das Prinzip von MOL_LAB DIDACTIC (Beobachten → Vermuten → Antwort prüfen → Erklärung anzeigen) steht im Zentrum.

➡️ **[Detailliertes Konzept V0.1](docs/KONZEPT_V0.1_EINSTIEG.md)**

## Vorhandene Komponenten (bleiben eigenständig)
- [MOL_LAB DIDACTIC v0.4.2](https://github.com/ekerzendorfer/MOL_LAB_DIDACTIC) – kuratierte Vergleiche und Aufgaben; didaktischer Leitstern
- [MOL_LAB_TASKS](https://github.com/ekerzendorfer/MOL_LAB_TASKS) – Aufgabenbestand, Ketcher, SMILES-Übergabe
- [MOLLAB_PRO](https://github.com/ekerzendorfer/MOLLAB_PRO) – interaktiver 2D/3D-Viewer und Geometrievergleich (Überarbeitung geplant)
- [MOL_LAB (Colab)](https://github.com/ekerzendorfer/MOL_LAB) – RDKit, Konformere, MMFF/UFF, xTB-GFN2 für die wissenschaftliche Vertiefung

**Nicht Teil dieses Projektschritts:** GENLABOR, PROTEINLABOR, Docking.

V0.1 wird zuerst als eigenständige, statische GitHub-Pages-Anwendung erprobt. Bestehende Apps und Links bleiben zunächst unverändert; eine neue Hub-Kachel erfolgt erst nach Freigabe.

## V0.1.0 – erster Prototyp

Der Prototyp bietet **zwei Einstiege**: den geführten Lernweg MW-001 (Ethanol/Dimethylether) und **„Frei erkunden“**, unabhängig von einer Aufgabenstellung, mit Links zu den bestehenden 2D-/3D-Werkzeugen und zur Colab-Vertiefung. Notizen werden ausschließlich lokal im Browser gespeichert.

**Zum Testen:** die Startseite über GitHub Pages öffnen. Ist Pages noch nicht aktiviert: Repository → Settings → Pages → Deploy from a branch → main / (root). Es gibt **noch keine Kachel im CHEMIE_KI_LINKS-Portal**.

Dateien der Anwendung: index.html, styles.css, app.js sowie data/learning_paths.json und data/tools.json.

Die bisherigen Molekül-Apps bleiben unverändert. Eine automatische Rückgabe aus externen Apps, ein direkt eingebetteter Sketcher/Viewer und die technische Überarbeitung von MOLLAB_PRO folgen erst nach dem Pilot-Test.
