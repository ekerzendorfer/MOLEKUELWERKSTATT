# MOLEKÜL-WERKSTATT – Forschungswege-Katalog V0.1

**Stand:** 23.11.2026 · **Dokumenttyp:** didaktisches Planungsdokument, **keine** neue aktive Aufgabenliste.  
**Quelle:** `ekerzendorfer/MOL_LAB_DIDACTIC/molecules_v0_4_2.json`, Blob-SHA `f2ef10a3730fa752e6944499082d2219ecaf2bde`.  
**Maschinenlesbare Entwürfe:** [Forschungswege-Katalog](../data/forschungswege_katalog_v0.1.json) und [DIDACTIC-Quellenmanifest](../data/didactic_quellen_manifest_v0.1.json).  
**Aktuelle App:** [MOLEKÜL-WERKSTATT](https://ekerzendorfer.github.io/MOLEKUELWERKSTATT/), derzeit mit den fertig gestellten Aufgaben MW-001 und MW-002.

## 1. Auftrag und didaktisches Konzept

Die MOLEKÜL-WERKSTATT erhält einen **einheitlichen, auf Lernfragen statt Softwarefunktionen aufgebauten Aufgabenbestand**. Ausgangsbasis ist die fachliche Struktur des vorhandenen DIDACTIC-Projekts: Fehlvorstellungen korrigieren, vergleichen, eigene Vermutungen bilden und anhand digitaler 2D-/3D-Modelle sowie Stoffdaten begründet beurteilen.

**Zentrales Prinzip:** *Leitfrage → Vermutung → Untersuchung → Deutung → Ergebnissicherung.* Die wissenschaftliche Tiefe bleibt erreichbar, ohne den Einstieg zu erschweren.

Die verfügbaren DIDACTIC-Daten sind nicht mit der Aufgabe gleichzusetzen: Die **61 Moduleinträge** enthalten **53 unterschiedliche SMILES-Strukturen**, 14 kuratierte Vergleichspaare (7 Isomerie + 7 Polarität), aber auch mehrfach in verschiedenen Modulen verwendete Moleküle. Ihre Wiederholung ist fachlich sinnvoll: Das gleiche Molekül kann für eine andere Leitfrage erneut benötigt werden.

Ziel der Katalogversion V0.1 ist die **fachlich überprüfbare Zuordnung sämtlicher 61 Einträge** zu einer überschaubaren Anzahl Forschungswege, *nicht* die automatische Generierung fertiger Unterrichtsaufgaben aus SMILES oder MC-Karten.

## 2. Katalog in Zahlen

| Kennzahl | Bestand / Planung |
|---|---:|
| DIDACTIC-Themenmodule | 5 |
| Modulgebundene Einzelkarten | 61 |
| Unterschiedliche SMILES-Strukturen | 53 |
| Vorhandene Isomerie-Vergleichspaare, richtungsbereinigt | 7 |
| Vorhandene Polaritäts-/Löslichkeitsvergleiche | 7 |
| **Geplante Forschungswege** | **30** |
| Davon A – Vergleichen | 14 |
| Davon B – Struktur oder Stoffgruppe untersuchen | 10 |
| Davon C – räumliche Gestalt/Konformere | 6 |
| Schon als durchgängige Werkstatt-Aufgabe implementiert | 2 (MW-001, MW-002) |
| DIDACTIC-Moduleinträge einem Forschungsweg zugeordnet | **61 von 61** |
| DIDACTIC-Einträge ohne eines der fünf Basis-Stoffdatenfelder | 35 |
| DIDACTIC-Karten mit noch sehr allgemeiner MC-Leitfrage | 7 |

**Wichtig:** „61 von 61 zugeordnet“ ist eine **Katalog-Abdeckung**, noch kein Qualitätssiegel und keine Aussage darüber, ob alle Aufgaben im Browser/Colab bereits funktionieren.

## 3. Drei wiederverwendbare Vorlagen

### A – Vergleichen: 14 Wege

Für **kuratierte Zweiervergleiche** nach dem Muster MW-001 und MW-002. Aufgabenunterschiede liegen in den vorgelegten Molekülen, der Leitfrage, den zu beobachtenden Eigenschaften, den fachlichen Grenzen und dem experimentellen Bezug. Nicht jedes Paar benötigt dieselben Messwerte.

**Standard-Werkzeugweg:** Werkstatt → DIDACTIC-Vergleich → ggf. freier 2D/3D-Einzelblick in MOLLAB_PRO → Werkstatt. Alle 14 Paarungen sind bereits in DIDACTIC hinterlegt; 12 Werkstattwege müssen noch redaktionell ausgearbeitet und implementiert werden.

### B – Struktur oder Stoffgruppe untersuchen: 10 Wege

Die Nutzer wählen eine **einzelne Struktur** oder ein **Beispiel aus einer thematisch begrenzten Reihe** und gehen einer gemeinsamen Leitfrage nach. Eine Reihe von sieben funktionellen Gruppen (MW-017) bedeutet *nicht*, dass jeder Schüler sieben Moleküle hintereinander bearbeiten muss. Stattdessen werden ein Kernbeispiel und optionale Varianten oder arbeitsteilige Gruppenaufträge angeboten.

**Standard-Werkzeugweg:** Werkstatt → DIDACTIC-Einzelkarte/MC → optional MOLLAB_PRO zur Strukturansicht → Werkstatt.

### C – Räumliche Gestalt und Konformere: 6 Wege

Eine 3D-Struktur ist nur der Einstieg. Die Lernenden unterscheiden Konfiguration, Konformation, Torsionswinkel und energetische Bevorzugung.

**Standard-Werkzeugweg:** Werkstatt → DIDACTIC-Konformerbeispiel → **nur bei Bedarf** MOL_LAB Colab für Konformersuche und MMFF/UFF/xTB → Werkstatt. Einzelne 3D-Modelle ersetzen keine Energieanalyse.

## 4. Vollständige Katalogübersicht

### Polarität und Löslichkeit (9 Wege)

| ID | Leitidee / Titel | DIDACTIC-Beispiele | Status |
|---|---|---|---|
| MW-002 | Wasser oder Schwefelwasserstoff – warum flüssig und gasförmig? | Wasser · Schwefelwasserstoff | **fertig** |
| MW-003 | Methan und Hexan: Unpolar ist nicht wechselwirkungsfrei | Methan · Hexan | geplant |
| MW-004 | Ethanol und 1-Hexanol: Ein OH reicht nicht immer | Ethanol · 1-Hexanol | geplant |
| MW-005 | Essigsäure und Palmitinsäure: Wie groß darf der Rest sein? | Essigsäure · Palmitinsäure | geplant |
| MW-006 | Diethylether und Diethylenglycol: H-Brücken richtig deuten | Diethylether · Diethylenglycol | geplant |
| MW-007 | Methanol und Methanal: OH oder C=O? | Methanol · Methanal | geplant |
| MW-008 | Aceton und Essigsäure: Carbonyl ist nicht gleich Carboxyl | Aceton · Essigsäure | geplant |
| MW-015 | Molekülform: Bindungsdipol oder Moleküldipol? | Kohlenstoffdioxid · Ammoniak · Methan · Wasser | geplant |
| MW-016 | Alkoholreihe: Von Methanol zu 1-Hexanol | Methanol · Ethanol · n-Butanol · 1-Hexanol | geplant |

### Isomerie (7 Wege)

| ID | Leitidee / Titel | DIDACTIC-Beispiele | Status |
|---|---|---|---|
| MW-001 | Gleiche Summenformel – andere Eigenschaften? | Ethanol · Dimethylether | **fertig** |
| MW-009 | Propanal und Aceton: Aldehyd oder Keton? | Propanal · Aceton | geplant |
| MW-010 | Butan und Isobutan: Warum verzweigen? | Butan · Isobutan | geplant |
| MW-011 | Propansäure und Essigsäuremethylester: Säure oder Ester? | Propansäure · Essigsäuremethylester | geplant |
| MW-012 | D-Alanin und L-Alanin: Spiegelbilder | D-Alanin · L-Alanin | geplant |
| MW-013 | Glucose und Fructose – offene Ketten | Glucose offen · Fructose offen | geplant |
| MW-014 | Maleinsäure und Fumarsäure: cis/trans | Maleinsäure · Fumarsäure | geplant |

### Funktionelle Gruppen (4 Wege)

| ID | Leitidee / Titel | DIDACTIC-Beispiele | Status |
|---|---|---|---|
| MW-017 | Carbonylfamilie: Wer gehört wohin? | Ethanal · Aceton · Essigsäure · Ethylacetat · Acetanhydrid · Acetamid · Diethylether | geplant |
| MW-018 | Ethylamin und Anilin: Nicht jedes Amin ist gleich basisch | Ethylamin · Anilin | geplant |
| MW-019 | Methanol und Phenol: Ist jede OH-Gruppe eine Alkoholgruppe? | Methanol · Phenol | geplant |
| MW-020 | Salicylsäure und Vanillin: Mehrere Gruppen in einem Molekül | Salicylsäure · Vanillin | geplant |

### Konformere (6 Wege)

| ID | Leitidee / Titel | DIDACTIC-Beispiele | Status |
|---|---|---|---|
| MW-021 | Butan: anti oder gauche? | Butan | geplant |
| MW-022 | 1,2-Dichlorethan: Eine Drehung verändert den Dipol | 1,2-Dichlorethan | geplant |
| MW-023 | Ethylenglykol: Zwei OH-Gruppen in Bewegung | Ethylenglykol | geplant |
| MW-024 | Cyclohexan: Weshalb eine Sesselstruktur? | Cyclohexan | geplant |
| MW-025 | n-Pentan: Mehr Bindungen, mehr Konformere | n-Pentan | geplant |
| MW-026 | Milchsäure und 2-Butanol: Bewegung und Chiralität | Milchsäure · 2-Butanol | geplant |

### Wirkstoffe und Biomoleküle (4 Wege)

| ID | Leitidee / Titel | DIDACTIC-Beispiele | Status |
|---|---|---|---|
| MW-027 | Wirkstoffstrukturen lesen: Was leisten funktionelle Gruppen? | Coffein · Aspirin · Paracetamol · Ibuprofen · Acetazolamid | geplant |
| MW-028 | Aminosäuren: Glycin, Alanin, Phenylalanin | Glycin · Alanin · Phenylalanin | geplant |
| MW-029 | Adenin und Ribose: Bausteine der RNA | Adenin · Ribose | geplant |
| MW-030 | Citronensäure: Drei Carboxylgruppen | Citronensäure | geplant |


## 5. Detailsteckbriefe: Leitfragen, Quellen, fachliche Grenzen

Die folgenden 30 Entwürfe sind **redaktionelle Vorschläge**, sofern nicht ausdrücklich als fertig markiert. Sie sind keine stillschweigende Ergänzung der DIDACTIC-Quelldaten. Quellverweise nennen jeweils **DIDACTIC-Modul und Karten-ID**, damit ein späterer Abgleich und gezieltes Nacharbeiten möglich ist.

### MW-001: Gleiche Summenformel – andere Eigenschaften?

- **Vorlage / Phase:** A – Vergleichen; bereits umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Warum unterscheiden sich Ethanol und Dimethylether trotz gleicher Summenformel?
- **Quellbezug:** DIDACTIC-Isomerenpaar: Ethanol ↔ Gegenstück; Ethanol (`Isomerie/ethanol`); Dimethylether (`Isomerie/dimethylether`).
- **Lernziel:** Unterschied zwischen Alkohol und Ether; H-Brücken-Donoren und -Akzeptoren.
- **Fachliche Grenze:** Stoffdaten als Vergleich; kein QM-Modell.
- **Datenlage:** Bei allen einbezogenen DIDACTIC-Karten ist mindestens eine grundlegende Stoffdaten-Kategorie befüllt; Vollständigkeit und Vergleichbarkeit sind damit noch nicht garantiert.

### MW-002: Wasser oder Schwefelwasserstoff – warum flüssig und gasförmig?

- **Vorlage / Phase:** A – Vergleichen; bereits umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Warum ist Wasser bei Raumtemperatur flüssig, H₂S aber gasförmig?
- **Quellbezug:** DIDACTIC-Polaritätspaar: Wasser vs. Schwefelwasserstoff; Wasser (`Polarität und Löslichkeit/wasser`); Schwefelwasserstoff (`Polarität und Löslichkeit/schwefelwasserstoff`).
- **Lernziel:** Molekülform, Bindungspolarität und H-Brücken-Netzwerk auseinanderhalten.
- **Fachliche Grenze:** H₂S giftig: ausschließlich digitale Modell-/Stoffdatenauswertung.
- **Datenlage:** Bei allen einbezogenen DIDACTIC-Karten ist mindestens eine grundlegende Stoffdaten-Kategorie befüllt; Vollständigkeit und Vergleichbarkeit sind damit noch nicht garantiert.

### MW-003: Methan und Hexan: Unpolar ist nicht wechselwirkungsfrei

- **Vorlage / Phase:** A – Vergleichen; Konzept; noch nicht umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Warum ist Methan gasförmig, Hexan aber flüssig?
- **Quellbezug:** DIDACTIC-Polaritätspaar: Methan vs. Hexan; Methan (`Polarität und Löslichkeit/methan`); Hexan (`Polarität und Löslichkeit/hexan`).
- **Lernziel:** Größe, Polarisierbarkeit und London-Dispersionskräfte verknüpfen.
- **Fachliche Grenze:** London-Kräfte werden im Viewer nicht direkt dargestellt.
- **Datenlage:** Bei allen einbezogenen DIDACTIC-Karten ist mindestens eine grundlegende Stoffdaten-Kategorie befüllt; Vollständigkeit und Vergleichbarkeit sind damit noch nicht garantiert.

### MW-004: Ethanol und 1-Hexanol: Ein OH reicht nicht immer

- **Vorlage / Phase:** A – Vergleichen; Konzept; noch nicht umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Warum verringert eine längere Kohlenstoffkette die Wasserlöslichkeit?
- **Quellbezug:** DIDACTIC-Polaritätspaar: Ethanol vs. 1-Hexanol; Ethanol (`Polarität und Löslichkeit/ethanol`); 1-Hexanol (`Polarität und Löslichkeit/1_hexanol`).
- **Lernziel:** Einfluss von polarem und unpolarem Molekülteil abwägen.
- **Fachliche Grenze:** Löslichkeit aus Stoffdaten, nicht aus einem einzelnen 3D-Modell ableiten.
- **Datenlage:** Bei allen einbezogenen DIDACTIC-Karten ist mindestens eine grundlegende Stoffdaten-Kategorie befüllt; Vollständigkeit und Vergleichbarkeit sind damit noch nicht garantiert.

### MW-005: Essigsäure und Palmitinsäure: Wie groß darf der Rest sein?

- **Vorlage / Phase:** A – Vergleichen; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Warum ist Palmitinsäure trotz Carboxylgruppe kaum wasserlöslich?
- **Quellbezug:** DIDACTIC-Polaritätspaar: Essigsäure vs. Palmitinsäure; Essigsäure (`Polarität und Löslichkeit/essigsaeure`); Palmitinsäure (`Polarität und Löslichkeit/palmitinsaeure`).
- **Lernziel:** Lange unpolare Alkylkette gegen polare funktionelle Gruppe abwägen.
- **Fachliche Grenze:** pH, Salzbildung und Kristallstruktur nicht automatisch berücksichtigt.
- **Datenlage:** Bei allen einbezogenen DIDACTIC-Karten ist mindestens eine grundlegende Stoffdaten-Kategorie befüllt; Vollständigkeit und Vergleichbarkeit sind damit noch nicht garantiert.

### MW-006: Diethylether und Diethylenglycol: H-Brücken richtig deuten

- **Vorlage / Phase:** A – Vergleichen; Konzept; noch nicht umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Warum ist Diethylenglycol stärker wasserfreundlich?
- **Quellbezug:** DIDACTIC-Polaritätspaar: Diethylether vs. Diethylenglycol; Diethylether (`Polarität und Löslichkeit/diethylether`); Diethylenglycol (`Polarität und Löslichkeit/diethylenglycol`).
- **Lernziel:** H-Brücken-Donor und -Akzeptor unterscheiden.
- **Fachliche Grenze:** Löslichkeit und H-Brücken nicht aus der Anzahl O-Atome allein erklären.
- **Datenlage:** Bei allen einbezogenen DIDACTIC-Karten ist mindestens eine grundlegende Stoffdaten-Kategorie befüllt; Vollständigkeit und Vergleichbarkeit sind damit noch nicht garantiert.

### MW-007: Methanol und Methanal: OH oder C=O?

- **Vorlage / Phase:** A – Vergleichen; Konzept; noch nicht umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Warum unterscheiden sich Methanol und Methanal in ihren Wechselwirkungen?
- **Quellbezug:** DIDACTIC-Polaritätspaar: Methanol vs. Methanal; Methanol (`Polarität und Löslichkeit/methanol`); Methanal (`Polarität und Löslichkeit/methanal`).
- **Lernziel:** Carbonylgruppe und Hydroxygruppe vergleichen.
- **Fachliche Grenze:** Wässrige Hydratisierung von Methanal nicht aus isoliertem Molekül erklären.
- **Datenlage:** Bei allen einbezogenen DIDACTIC-Karten ist mindestens eine grundlegende Stoffdaten-Kategorie befüllt; Vollständigkeit und Vergleichbarkeit sind damit noch nicht garantiert.

### MW-008: Aceton und Essigsäure: Carbonyl ist nicht gleich Carboxyl

- **Vorlage / Phase:** A – Vergleichen; Konzept; noch nicht umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Warum kann Essigsäure sauer reagieren, Aceton aber nicht entsprechend?
- **Quellbezug:** DIDACTIC-Polaritätspaar: Aceton vs. Essigsäure; Aceton (`Polarität und Löslichkeit/aceton`); Essigsäure (`Polarität und Löslichkeit/essigsaeure`).
- **Lernziel:** Carboxylgruppe, Säure-Base-Chemie und H-Brücken vergleichen.
- **Fachliche Grenze:** Dissoziationsgleichgewicht und pH nicht als 3D-Funktion versprechen.
- **Datenlage:** Bei allen einbezogenen DIDACTIC-Karten ist mindestens eine grundlegende Stoffdaten-Kategorie befüllt; Vollständigkeit und Vergleichbarkeit sind damit noch nicht garantiert.

### MW-009: Propanal und Aceton: Aldehyd oder Keton?

- **Vorlage / Phase:** A – Vergleichen; Konzept; noch nicht umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Was verändert die Position der Carbonylgruppe bei C₃H₆O?
- **Quellbezug:** DIDACTIC-Isomerenpaar: Propanal ↔ Gegenstück; Propanal (`Isomerie/propanal`); Aceton (`Isomerie/aceton`).
- **Lernziel:** Funktionelle Isomerie von Aldehyd und Keton deuten.
- **Fachliche Grenze:** Propanal-Stoffdaten im DIDACTIC-Bestand nachgetragen.
- **Datenlage:** Bei allen einbezogenen DIDACTIC-Karten ist mindestens eine grundlegende Stoffdaten-Kategorie befüllt; Vollständigkeit und Vergleichbarkeit sind damit noch nicht garantiert.

### MW-010: Butan und Isobutan: Warum verzweigen?

- **Vorlage / Phase:** A – Vergleichen; Konzept; noch nicht umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Warum können verzweigte Alkane andere Siedeeigenschaften haben?
- **Quellbezug:** DIDACTIC-Isomerenpaar: Butan ↔ Gegenstück; Butan (`Isomerie/butan`); Isobutan (`Isomerie/isobutan`).
- **Lernziel:** Konstitutionsisomerie vs. Molekülgestalt unterscheiden.
- **Fachliche Grenze:** Beide Karten haben noch keine Stoffdaten; zuerst verlässliche Vergleichswerte prüfen.
- **Datenlage:** Bei Butan, Isobutan sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-011: Propansäure und Essigsäuremethylester: Säure oder Ester?

- **Vorlage / Phase:** A – Vergleichen; Konzept; noch nicht umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Wie kann dieselbe Summenformel zu anderen funktionellen Gruppen führen?
- **Quellbezug:** DIDACTIC-Isomerenpaar: Propansäure ↔ Gegenstück; Propansäure (`Isomerie/propansaeure`); Essigsäuremethylester (`Isomerie/essigsaeuremethylester`).
- **Lernziel:** Carbonsäure und Ester strukturell und im Säure-Base-Verhalten vergleichen.
- **Fachliche Grenze:** Physikalische Daten bei beiden Stoffen noch nicht kuratiert.
- **Datenlage:** Bei Propansäure, Essigsäuremethylester sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-012: D-Alanin und L-Alanin: Spiegelbilder

- **Vorlage / Phase:** A – Vergleichen; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Weshalb sind spiegelbildliche Strukturen nicht immer biologisch austauschbar?
- **Quellbezug:** DIDACTIC-Isomerenpaar: D-Alanin ↔ Gegenstück; D-Alanin (`Isomerie/d_alanin`); L-Alanin (`Isomerie/l_alanin`).
- **Lernziel:** Chiralität von Konformation unterscheiden.
- **Fachliche Grenze:** Stereochemische SMILES, Protonierungszustand und 3D-Quelle eigens prüfen; keine echte Spiegelung durch Drehen.
- **Datenlage:** Bei D-Alanin, L-Alanin sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-013: Glucose und Fructose – offene Ketten

- **Vorlage / Phase:** A – Vergleichen; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Wie unterscheiden sich Aldose und Ketose bei gleicher Summenformel?
- **Quellbezug:** DIDACTIC-Isomerenpaar: Glucose offen ↔ Gegenstück; Glucose offen (`Isomerie/glucose_offen`); Fructose offen (`Isomerie/fructose_offen`).
- **Lernziel:** Offenkettige Aldose und Ketose in Strukturformeln erkennen.
- **Fachliche Grenze:** Isolierte offene Form ist ein Modell; Ringschluss und wässriges Gleichgewicht werden nicht nachgebildet; keine Reinstoffwerte für isolierte offene Form einsetzen.
- **Datenlage:** Bei Glucose offen, Fructose offen sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-014: Maleinsäure und Fumarsäure: cis/trans

- **Vorlage / Phase:** A – Vergleichen; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Warum verändert die räumliche Anordnung bei C=C die Stoffeigenschaften?
- **Quellbezug:** DIDACTIC-Isomerenpaar: Maleinsäure ↔ Gegenstück; Maleinsäure (`Isomerie/maleinsaeure`); Fumarsäure (`Isomerie/fumarsaeure`).
- **Lernziel:** Geometrische Isomerie mit unterschiedlichen Eigenschaften verknüpfen.
- **Fachliche Grenze:** Stereochemische Schrägstriche im SMILES erhalten; exakte 3D-Stereochemie prüfen.
- **Datenlage:** Bei allen einbezogenen DIDACTIC-Karten ist mindestens eine grundlegende Stoffdaten-Kategorie befüllt; Vollständigkeit und Vergleichbarkeit sind damit noch nicht garantiert.

### MW-015: Molekülform: Bindungsdipol oder Moleküldipol?

- **Vorlage / Phase:** B – Struktur und Stoffgruppe untersuchen; Konzept; noch nicht umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Warum ist CO₂ trotz polarer Bindungen insgesamt unpolar?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Kohlenstoffdioxid (`Polarität und Löslichkeit/kohlenstoffdioxid`); Ammoniak (`Polarität und Löslichkeit/ammoniak`); Methan (`Polarität und Löslichkeit/methan`); Wasser (`Polarität und Löslichkeit/wasser`).
- **Lernziel:** Lineare, gewinkelte, trigonal-pyramidale und tetraedrische Gestalten vergleichen.
- **Fachliche Grenze:** Moleküldipol entsteht aus Vektoraddition; auf einzelne Moleküle beschränkte 3D-Modelle ersetzen keine Messung.
- **Datenlage:** Bei allen einbezogenen DIDACTIC-Karten ist mindestens eine grundlegende Stoffdaten-Kategorie befüllt; Vollständigkeit und Vergleichbarkeit sind damit noch nicht garantiert.

### MW-016: Alkoholreihe: Von Methanol zu 1-Hexanol

- **Vorlage / Phase:** B – Struktur und Stoffgruppe untersuchen; Konzept; noch nicht umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Wie beeinflusst die Kettenlänge die Wasserfreundlichkeit?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Methanol (`Polarität und Löslichkeit/methanol`); Ethanol (`Polarität und Löslichkeit/ethanol`); n-Butanol (`Polarität und Löslichkeit/n_butanol`); 1-Hexanol (`Polarität und Löslichkeit/1_hexanol`).
- **Lernziel:** Trend anhand gleicher OH-Gruppe bei zunehmendem Alkylrest erarbeiten.
- **Fachliche Grenze:** Daten müssen bei gleichen Bedingungen vergleichbar sein.
- **Datenlage:** Bei allen einbezogenen DIDACTIC-Karten ist mindestens eine grundlegende Stoffdaten-Kategorie befüllt; Vollständigkeit und Vergleichbarkeit sind damit noch nicht garantiert.

### MW-017: Carbonylfamilie: Wer gehört wohin?

- **Vorlage / Phase:** B – Struktur und Stoffgruppe untersuchen; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Wie erkennt man Aldehyd, Keton, Carbonsäure, Ester, Anhydrid und Amid?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Ethanal (`Funktionelle Gruppen/ethanal`); Aceton (`Funktionelle Gruppen/aceton`); Essigsäure (`Funktionelle Gruppen/essigsaeure`); Ethylacetat (`Funktionelle Gruppen/ethylacetat`); Acetanhydrid (`Funktionelle Gruppen/acetanhydrid`); Acetamid (`Funktionelle Gruppen/acetamid`); Diethylether (`Funktionelle Gruppen/diethylether`).
- **Lernziel:** Strukturmotive erkennen und qualitativ unterschiedliche Reaktivität begründen.
- **Fachliche Grenze:** Ethanal, Ethylacetat, Acetanhydrid und Acetamid: derzeit keine kuratierten Stoffdaten; Ether als Abgrenzungsfall.
- **Datenlage:** Bei Ethanal, Ethylacetat, Acetanhydrid, Acetamid sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-018: Ethylamin und Anilin: Nicht jedes Amin ist gleich basisch

- **Vorlage / Phase:** B – Struktur und Stoffgruppe untersuchen; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Wie verändert die aromatische Anbindung das freie Elektronenpaar am N?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Ethylamin (`Funktionelle Gruppen/ethylamin`); Anilin (`Funktionelle Gruppen/anilin`).
- **Lernziel:** Aromatische und aliphatische Amine vergleichen; Mesomerie qualitativ ansprechen.
- **Fachliche Grenze:** pKa-Werte und Protonierungsbedingungen bei Detailaussagen berücksichtigen.
- **Datenlage:** Bei Ethylamin, Anilin sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-019: Methanol und Phenol: Ist jede OH-Gruppe eine Alkoholgruppe?

- **Vorlage / Phase:** B – Struktur und Stoffgruppe untersuchen; Konzept; noch nicht umgesetzt; Priorität 1 (1 = früh, 3 = später).
- **Leitfrage:** Warum unterscheiden sich Phenol und aliphatischer Alkohol in Eigenschaften und Säurestärke?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Methanol (`Funktionelle Gruppen/methanol`); Phenol (`Funktionelle Gruppen/phenol`).
- **Lernziel:** OH am Aromaten vs. gesättigten C; Funktionelle Gruppe und Säurestärke begründen.
- **Fachliche Grenze:** Säurestärken nicht allein an einer 3D-Ansicht ablesen.
- **Datenlage:** Bei Phenol sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-020: Salicylsäure und Vanillin: Mehrere Gruppen in einem Molekül

- **Vorlage / Phase:** B – Struktur und Stoffgruppe untersuchen; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Wie bestimmt das Zusammenspiel mehrerer funktioneller Gruppen das Verhalten?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Salicylsäure (`Funktionelle Gruppen/salicylsaeure`); Vanillin (`Funktionelle Gruppen/vanillin`).
- **Lernziel:** Carboxyl-, Phenol-, Aldehyd- und Ether-Motive am Beispiel erkennen.
- **Fachliche Grenze:** Mehrfachfunktionen benötigen angepasste Aufgabentexte statt pauschaler Stoffwertvergleiche.
- **Datenlage:** Bei Salicylsäure, Vanillin sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-021: Butan: anti oder gauche?

- **Vorlage / Phase:** C – Räumliche Gestalt und Konformere; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Weshalb besitzen Drehstellungen um C–C unterschiedliche Energien?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Butan (`Konformere/butan`).
- **Lernziel:** Torsionswinkel und Konformerenergie unterscheiden.
- **Fachliche Grenze:** Einfacher 3D-Viewer liefert noch keine Energieberechnung; Colab/MMFF/xTB für Vertiefung.
- **Datenlage:** Bei Butan sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-022: 1,2-Dichlorethan: Eine Drehung verändert den Dipol

- **Vorlage / Phase:** C – Räumliche Gestalt und Konformere; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Warum sind nicht alle Drehstellungen energetisch gleichwertig?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; 1,2-Dichlorethan (`Konformere/1_2_dichlorethan`).
- **Lernziel:** Konformation, polare C–Cl-Bindungen und Drehwinkel betrachten.
- **Fachliche Grenze:** Vergleich der Konformerenergien erfordert passende Optimierung; Solvatation beeinflusst Ergebnisse.
- **Datenlage:** Bei 1,2-Dichlorethan sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-023: Ethylenglykol: Zwei OH-Gruppen in Bewegung

- **Vorlage / Phase:** C – Räumliche Gestalt und Konformere; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Wie beeinflusst die räumliche Nähe von OH-Gruppen die Konformation?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Ethylenglykol (`Konformere/ethylenglykol`).
- **Lernziel:** Flexible Moleküle und mögliche intramolekulare Wechselwirkungen untersuchen.
- **Fachliche Grenze:** Gasphase und Lösung können andere Konformerpräferenzen zeigen.
- **Datenlage:** Bei Ethylenglykol sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-024: Cyclohexan: Weshalb eine Sesselstruktur?

- **Vorlage / Phase:** C – Räumliche Gestalt und Konformere; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Welche räumlichen Strukturen vermeiden Ringspannung?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Cyclohexan (`Konformere/cyclohexan`).
- **Lernziel:** Sessel-/Boot-Geometrie und Ringspannung qualitativ erklären.
- **Fachliche Grenze:** Konformere/Übergänge nicht aus nur einer zufällig erzeugten 3D-Struktur ableiten.
- **Datenlage:** Bei Cyclohexan sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-025: n-Pentan: Mehr Bindungen, mehr Konformere

- **Vorlage / Phase:** C – Räumliche Gestalt und Konformere; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Warum nimmt mit der Kettenlänge die Zahl möglicher Konformationen zu?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; n-Pentan (`Konformere/n_pentan`).
- **Lernziel:** Drehfreiheiten und Kombinationen von Torsionswinkeln verstehen.
- **Fachliche Grenze:** Konformere nicht mit Konstitutionsisomeren verwechseln.
- **Datenlage:** Bei n-Pentan sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-026: Milchsäure und 2-Butanol: Bewegung und Chiralität

- **Vorlage / Phase:** C – Räumliche Gestalt und Konformere; Konzept; noch nicht umgesetzt; Priorität 3 (1 = früh, 3 = später).
- **Leitfrage:** Wie unterscheiden wir Rotation um Einfachbindungen von Spiegelbildisomerie?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Milchsäure (`Konformere/milchsaeure`); 2-Butanol (`Konformere/2_butanol`).
- **Lernziel:** Konformation und Konfiguration voneinander abgrenzen.
- **Fachliche Grenze:** 2-Butanol-SMILES hat noch kein @-Stereozentrum; für Enantiomerenvergleich explizite Konfiguration wählen.
- **Datenlage:** Bei Milchsäure, 2-Butanol sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-027: Wirkstoffstrukturen lesen: Was leisten funktionelle Gruppen?

- **Vorlage / Phase:** B – Struktur und Stoffgruppe untersuchen; Konzept; noch nicht umgesetzt; Priorität 3 (1 = früh, 3 = später).
- **Leitfrage:** Welche polaren und unpolaren Bereiche lassen sich in fünf Wirkstoffbeispielen erkennen?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Coffein (`Wirkstoffe und Biomoleküle/coffein`); Aspirin (`Wirkstoffe und Biomoleküle/aspirin`); Paracetamol (`Wirkstoffe und Biomoleküle/paracetamol`); Ibuprofen (`Wirkstoffe und Biomoleküle/ibuprofen`); Acetazolamid (`Wirkstoffe und Biomoleküle/acetazolamid`).
- **Lernziel:** Funktionelle Gruppen, Wechselwirkungspotenzial und Grenzen einfacher 2D/3D-Vorhersagen erkennen.
- **Fachliche Grenze:** Wirkung, Dosis, Bindungstaschen und Stoffwechsel werden nicht allein aus SMILES abgeleitet; mehrere Varianten.
- **Datenlage:** Bei Coffein, Aspirin, Paracetamol, Ibuprofen, Acetazolamid sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-028: Aminosäuren: Glycin, Alanin, Phenylalanin

- **Vorlage / Phase:** B – Struktur und Stoffgruppe untersuchen; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Wie verändert die Seitenkette die Eigenschaften einer Aminosäure?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Glycin (`Wirkstoffe und Biomoleküle/glycin`); Alanin (`Wirkstoffe und Biomoleküle/alanin`); Phenylalanin (`Wirkstoffe und Biomoleküle/phenylalanin`).
- **Lernziel:** Amphoteres Verhalten, Zwitterionen und unterschiedliche Seitenketten einordnen.
- **Fachliche Grenze:** Neutralform der SMILES beschreibt bei Wasser nicht automatisch vorherrschende Zwitterionen.
- **Datenlage:** Bei Glycin, Alanin, Phenylalanin sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-029: Adenin und Ribose: Bausteine der RNA

- **Vorlage / Phase:** B – Struktur und Stoffgruppe untersuchen; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Welche strukturellen Rollen übernehmen Base und Zucker?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Adenin (`Wirkstoffe und Biomoleküle/adenin`); Ribose (`Wirkstoffe und Biomoleküle/ribose`).
- **Lernziel:** Purinring, OH-Gruppen und Stoffklassen unterscheiden.
- **Fachliche Grenze:** Ribose als offene Struktur vereinfacht; RNA enthält ringförmige Ribose und ein Nucleotid, nicht freie Einzelmoleküle.
- **Datenlage:** Bei Adenin, Ribose sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.

### MW-030: Citronensäure: Drei Carboxylgruppen

- **Vorlage / Phase:** B – Struktur und Stoffgruppe untersuchen; Konzept; noch nicht umgesetzt; Priorität 2 (1 = früh, 3 = später).
- **Leitfrage:** Was bedeutet eine mehrprotonige Säure für das Säure-Base-Verhalten?
- **Quellbezug:** Einzelkarten / kuratierte Beispielserie; Citronensäure (`Wirkstoffe und Biomoleküle/citronensaeure`).
- **Lernziel:** Carboxylgruppen zählen und qualitative Mehrprotonigkeit erkennen.
- **Fachliche Grenze:** pH/pKa nicht aus einem isolierten 3D-Modell berechnen.
- **Datenlage:** Bei Citronensäure sind in DIDACTIC keine der fünf grundlegenden Stoffdaten-Kategorien befüllt. Prüfen, ob sie für den Lernweg tatsächlich erforderlich sind.


## 6. Nachweis der vollständigen DIDACTIC-Abdeckung

| Quellmodul | Einträge | Zu mindestens einem Weg zugeordnet | Ohne Basis-Stoffdaten |
|---|---:|---:|---:|
| Polarität und Löslichkeit | 16 | 16 | 0 |
| Isomerie | 14 | 14 | 8 |
| Funktionelle Gruppen | 13 | 13 | 9 |
| Konformere | 7 | 7 | 7 |
| Wirkstoffe und Biomoleküle | 11 | 11 | 11 |
| **Gesamt** | **61** | **61** | **35** |

Der Abgleich erfolgt auf **Modul + Karten-ID**, nicht nur auf Namen: So gelten etwa „Aceton“ in *Polarität*, *Isomerie* und *Funktionelle Gruppen* als drei bewusst unterschiedliche Quellperspektiven. Die referenzierten SMILES werden zusätzlich gegen den DIDACTIC-Snapshot geprüft.

Alle 53 unterschiedlichen SMILES-Strukturen können unabhängig vom konkreten Forschungsweg weiterhin über den freien Bereich bzw. den MOLLAB_PRO-Editor untersucht werden. **„Frei erkunden“ wird dadurch nicht ersetzt.**

## 7. Datenqualität und noch offene Redaktionsarbeiten

**Physikalische Stoffdaten:** Bei 35 der 61 DIDACTIC-Einträge fehlen sämtliche fünf Basisfelder (Schmelzpunkt, Siedepunkt, Dichte, Wasserlöslichkeit, Aggregatzustand). Diese Werte müssen **nicht pauschal nachgetragen** werden. Für eine Frage nach Geometrie, funktionellen Gruppen oder Konformerenergien können sie entbehrlich sein. Für Siedepunkt-/Löslichkeitsvergleiche ist eine quellen- und bedingungsgerechte Ergänzung wichtig.

**MC-Fragen:** Im DIDACTIC-Bestand besitzen alle 61 Moleküle vier Antwortoptionen. Bei 7 Karten ist die Fragestellung zu allgemein und für einen Forschungsweg redaktionell zu konkretisieren:

- Isomerie: L-Alanin
- Isomerie: Fructose offen
- Wirkstoffe und Biomoleküle: Paracetamol
- Wirkstoffe und Biomoleküle: Ibuprofen
- Wirkstoffe und Biomoleküle: Acetazolamid
- Wirkstoffe und Biomoleküle: Alanin
- Wirkstoffe und Biomoleküle: Phenylalanin

**Vergleiche:** Für die sieben Polaritätsvergleiche sind bereits eigene MC-Fragen vorhanden. Bei den Isomerenvergleichen muss geprüft werden, ob die vorhandene Einzelmolekül-Frage tatsächlich **das Vergleichsproblem** prüft; bei Bedarf besser neue paarbezogene Fragen formulieren.

**Chemische Modellgrenzen:** Besonders prüfen:
- D-/L-Alanin: Chiralität und Protonierungszustand, keine scheinbare Spiegelung durch bloße Rotation;
- offene Glucose/Fructose und Ribose: Modellform gegenüber tatsächlich dominanten Ring-/Gleichgewichtsformen;
- Konformere: Quelle einer optimierten Geometrie, Energieeinheiten, Lösungsmittel-/Gasphaseneffekt;
- 2-Butanol: Quell-SMILES enthält kein festgelegtes Stereozentrum;
- Biowirkstoffe: keine Wirkungs-, Sicherheits- oder Bindungsbehauptung allein aus einem Strukturmodell.

**Aufgaben mit mehreren Varianten:** MW-015, MW-016, MW-017, MW-027 und MW-028 benötigen eine klare Beispiel-/Gruppenaufgabenauswahl, damit die Benutzer nicht in überlangen Einzelaufträgen stecken bleiben.

## 8. Priorisierung: kleine, tatsächlich prüfbare Schritte

### Stufe 1 – zwei fertige Wege als Referenz
- **MW-001** Ethanol/Dimethylether: implementiert und praktisch getestet.
- **MW-002** Wasser/Schwefelwasserstoff: implementiert und praktisch getestet.

### Stufe 2 – gezielte technische Validierung der Vorlagen
1. **MW-009 (A): Propanal/Aceton**. Neue, fachlich gut prüfbare Vergleichsaufgabe; die Stoffdatenkorrektur für Propanal ist bereits vorhanden. Nach MW-001/002 geringe zusätzliche Technik.
2. **MW-019 (B): Methanol/Phenol** oder **MW-015 (B): Molekülform und Dipole**. Hier muss die Werkstatt erstmals statt eines festen Zweiervergleichs eine **einzelne Struktur bzw. Beispielwahl** sinnvoll begleiten.
3. **MW-024 (C): Cyclohexan**. Hier klären wir die Aufgabenführung zwischen DIDACTIC-Konformerbeispiel, freiem Viewer und vertiefender Colab-Optimierung.

### Stufe 3 – Aufgabenbibliothek statt überladener Startseite

Erst wenn die A/B/C-Vorlagen nachweislich funktionieren: Themenfilter nach den fünf DIDACTIC-Modulen, Niveaufilter, kurze Forschungskarten und **ein klarer Startbutton pro Auftrag**. Freies Molekülstudio bleibt gleichberechtigt erreichbar.

### Stufe 4 – Datenqualität fallbezogen verbessern

Stoffdaten, Vergleichsfragen und fachliche Hinweise werden jeweils **vor** der Freigabe des entsprechenden Forschungswegs geprüft. Der separate [DIDACTIC-Daten-Audit](https://github.com/ekerzendorfer/MOL_LAB_DIDACTIC/blob/main/docs/DATENQUALITAET_AUDIT_2026-11-23.md) bleibt dafür die Ergänzungsliste.

## 9. Konsequenzen für die technische Architektur

- **Ein Katalog – ein Renderer mit A/B/C-Vorlagen:** kein zusätzliches Notebook und keine eigene HTML-Datei für jeden Weg.
- **DIDACTIC bleibt fachliche Quelle**, doch redaktionelle Forschungswege sind eigene, versionierte JSON-Datensätze der Werkstatt.
- **MOLLAB_PRO bleibt das freie 2D/3D-Werkzeug**; Übergabe per SMILES und sicherer Rücklink sind bereits erprobt.
- **MOL_LAB-Colab bleibt vertiefender Rechenkern**, besonders für Konformere und komplexe Moleküle.
- **Datenmodell:** stabile MW-IDs; `template`, `topic`, `sourceRefs`, optionale `sourcePair`, Leitfrage, Lernziel, fachliche Grenzen, Status und Priorität.
- **Statuswerte:** `live` (wirklich implementiert, derzeit MW-001/002) oder `planned` (nur Entwurf). Der Katalog wird **noch nicht automatisch** als öffentlich verfügbare Aufgabensammlung in der App eingelesen.
- **Fortschritt:** für jede Aufgabe getrennte Eingaben; beim zukünftigen Ausbau pro Aufgaben-ID speichern und bestehende MW-001/002-Daten behutsam migrieren.

## 10. Definition „Katalog V0.1 fertig“

- [x] Alle 61 DIDACTIC-Moduleinträge gezielt erfasst;
- [x] 53 unterschiedliche SMILES als eigenständige Strukturen erkannt;
- [x] alle sieben Isomeren- und sieben Polaritätsvergleiche berücksichtigt;
- [x] 30 Forschungswege zu A/B/C-Vorlagen und Modulen gruppiert;
- [x] Quellenverweise bis auf Modul und ID dokumentiert;
- [x] fachliche Risiken, fehlende Daten und noch nicht implementierte Funktionen gekennzeichnet;
- [ ] Leitfragen und fachliche Begründungen aller 28 geplanten Wege mit Blick auf Zielgruppe/Unterricht redaktionell freigeben;
- [ ] jeweils einen neuen B- und C-Weg technisch als Pilot entwickeln;
- [ ] benutzerfreundliche Filterbibliothek in der Werkstatt implementieren.

**Abgrenzung:** Diese Dokumentation verändert keine vorhandenen DIDACTIC-Notebooks, keine MOLLAB_PRO-Funktionen und keine laufenden Forschungswege in der Werkstatt. Die tatsächliche Umsetzung bleibt ein nächster, separat zu testender Entwicklungsschritt.
