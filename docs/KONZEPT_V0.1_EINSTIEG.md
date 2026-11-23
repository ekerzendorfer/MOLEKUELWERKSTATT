# MOLEKÜL-WERKSTATT – Fachliches und funktionales Konzept V0.1 „Einstieg“

**Stand:** 23.11.2026 · **Status:** Konzeptentwurf zur fachlich-didaktischen Abstimmung · **Implementierung:** noch nicht begonnen

## 1. Ziel und didaktisches Leitbild

Die MOLEKÜL-WERKSTATT ist die *zentrale Benutzeroberfläche* für den Molekülbereich von „CHEMIE mit KI“. Sie ist **kein weiteres Molekülrechenprogramm**. Der Nutzer soll nicht zwischen kryptischen Werkzeugnamen wählen müssen, sondern anhand einer chemischen Frage intuitiv einen passenden Lernweg finden.

**Leitsatz: „Erst die chemische Frage – dann das Werkzeug.“**

Leitprinzip von MOL_LAB DIDACTIC: **Beobachten → Vermuten → Antwort prüfen → Erklärung anzeigen**; in der Werkstatt auf einen durchgehenden Arbeitsauftrag übertragen: **Leitfrage → Vermutung → Untersuchen → Deuten → Sichern**.

Vorbild CHEMIE_ANALYTIK_HUB: Fortschritt und Kontext bleiben beim Hub; Detailanwendungen sind eigenständig nutzbar. Geführter und später freierer Modus verändern nicht das fachliche Ergebnis, sondern den Umfang der Hilfestellung. Keine künstlich erschwerte Chemie.

**Priorität:** Zugänglichkeit und fachlich sinnvolle Handlungskette vor Funktionsumfang; wissenschaftliche Vertiefung bleibt über Colab erreichbar. Zielgruppen: SEK1, SEK2, Lehrkräfte/Fortbildung, FH-/Uni-Einstieg.

## 2. Bestand und Verantwortlichkeiten

| Bestehender Baustein | Rolle in der Zielarchitektur | Umfang in V0.1 |
| --- | --- | --- |
| MOL_LAB DIDACTIC v0.4.2 | Didaktischer Leitstern: kuratierte Stoff- und Vergleichsfälle, Fehlvorstellungen, Vorhersage und Ergebnistext | Hauptziel mehrerer Pilotaufgaben; Link mit klarer Anleitung |
| MOL_LAB_TASKS | Zwölf vorhandene Aufgaben für SEK1/SEK2, Ketcher-Editor, Lehrerhinweise und SMILES | Aufgabenvorrat und ergänzender Zugang, nicht zweite Hauptnavigation |
| MOLLAB_PRO | Frei erkundbarer 2D/3D-Editor und Geometrievergleich | Optionaler Pfad „3D frei untersuchen“; Kernüberarbeitung erst ab V0.3 |
| MOL_LAB (Colab) | Rechenvertiefung mit RDKit, MMFF/UFF, xTB-GFN2, Konformeren, RMSD | Optionaler Expertenpfad für ausgewählte Aufgaben; Notebook bleibt unverändert |
| MOLEKÜL-WERKSTATT (neu) | Zentrales Ziel, Aufgabenführung, Lernstand, Hilfen und Rückkehr | **Einzige neue Anwendung in V0.1** |

GENLABOR, PROTEINLABOR und Docking bleiben außen vor. Gleichgewichts-App und WAAGE_LAB bleiben bis zu ihren Workshops getrennt und unveröffentlicht.

**Wichtig:** Eine DIDACTIC- oder Colab-Auswahl per URL ist derzeit nicht als zuverlässig geprüft. V0.1 zeigt deshalb die exakten Schritte zur Auswahl im Zielwerkzeug. Die Aufgabenbearbeitung in externen Tools wird nicht automatisch als erledigt behauptet. Eine technische Zweiwege-Bridge ist ausdrücklich *nicht* Bestandteil von V0.1.

## 3. Was V0.1 liefern muss

1. **Ein öffentlicher, verständlicher Einstieg** mit Projektname, einem Satz Nutzenerklärung und *einem* eindeutigen primären Startbutton.
2. **Aufgabenbibliothek** aus zunächst vier bewusst ausgewählten Pilotfällen, filterbar nach Themengebiet und Niveau.
3. **Ein geführter Arbeitsbereich** für den gewählten Fall, mit Leitfrage, eigener Vermutung, klarer nächster Aktion und dokumentierter Erkenntnis.
4. **Ein verständlicher Weg zu bestehenden Werkzeugen**, jeweils mit Zweck, Startanweisung, Übergabe/ggf. SMILES-Kopierhilfe und gut sichtbarem Rückkehrhinweis.
5. **Ein eigenständiger Zugang „Frei erkunden“** für Interessierte, die ohne vorgegebene Aufgabe beginnen wollen; er steht visuell hinter dem geführten Einstieg zurück.
6. **Persistenz des *lokalen* Arbeitsstandes** pro Browser, inklusive Fortsetzen/Zurücksetzen; keine Anmeldung und keine zentrale Speicherung.
7. **Aktuelle Designlinie der CHEMIE-mit-KI-Labore**: ruhige, kontrastreiche Karten, logische Schrittanzeige, keine überladenen Schaltflächen.
8. **Prüfung auf Desktop und Mobilgerät** und ein nachvollziehbarer manueller Smoke-Test.

V0.1 **nicht**: ein integrierter 2D-Editor, ein neuer 3D-Viewer, RDKit-WASM-Kern, neue Energieoptimierung, xTB im Browser, automatische Überlagerung/RMSD, automatisierter Leistungsnachweis, automatische Resultatrückgabe, Migration bestehender Tools, Hub-Kachel/öffentliche Bewerbung.

## 4. Informationsarchitektur

### 4.1 Erste Seite (maximal drei Entscheidungen)

**Hero:** „MOLEKÜL-WERKSTATT“ · „Von der Strukturformel zum räumlichen Molekül und seinen Eigenschaften“  
Kurzer Satz: „Untersuche eine chemische Frage Schritt für Schritt – von einer Vermutung bis zum begründeten Ergebnis.“

**Primäraktion:** „Mit einem Vergleich starten“ → öffnet den ersten Pilotfall (Ethanol/Dimethylether), ohne vorherige Registrierung.

**Sekundäraktionen:** „Andere Aufgabe wählen“ und „Frei erkunden“.

**Unterhalb, nicht dominierend:** „Wissenschaftliche Vertiefung mit Colab“: verständlicher Hinweis, dass hierfür eine separate Notebook-Laufzeit benötigt wird.

Keine Startseite mit vier gleichwertigen Toolnamen, keine Funktionsliste mit 20 Buttons, keine technische Versions-/Engine-Information im Vordergrund.

### 4.2 Fallübersicht

Kompakte Aufgabenkarten mit **Leitfrage als Titel**, Thema, Niveau, erwarteten Lernzielen und maximal einer zweizeiligen Erläuterung. Filter: Thema (Polarität / Isomerie / Räumliche Gestalt / Konformere), Niveau (Basis / Vertiefung). Auf der Startseite höchstens vier Pilotfälle; spätere Inhalte kommen aus JSON.

### 4.3 Einzelner Arbeitsbereich (Hauptansicht)

- Oben: Brotkrumen „Werkstatt / Aufgabe“ und sichtbar „Aufgabe wechseln“.
- Mitte: **Leitfrage + Schrittanzeige** (1 Vermuten / 2 Untersuchen / 3 Deuten / 4 Sichern).
- Aktueller Schritt prominent; Folgeaktionen nur dann sichtbar, wenn passend; freiwillig zurückgehen stets möglich.
- Rechts am Desktop bzw. darunter mobil: **„Dein Arbeitsstand“**, Molekülname(n), gegebene SMILES, Lernziel und *eine* Schaltfläche für den nächsten sinnvollsten Schritt.
- Bei Start eines externen Werkzeugs: Name, Warum, kurze genaue Bedienanleitung und Hinweis „Werkstatt bleibt im anderen Tab geöffnet“.
- Rückkehr: „Ich habe die Untersuchung durchgeführt“ ist eine *Selbstangabe*, keine automatische Messwert-Rückgabe.
- Abschluss: kurze Begründung/Erkenntnis, optional SchülerInnen-Protokoll als Text kopieren; kein automatisches Verraten der Lösung vor der eigenen Bearbeitung.

## 5. Lernweg einer Pilotaufgabe im Detail

**Beispiel MW-001: „Gleiche Summenformel – warum unterschiedliche Stoffeigenschaften?“**

**Stoffe:** Ethanol und Dimethylether (C₂H₆O). **Niveau:** Basis/SEK2, mit vereinfachten Fragen für SEK1. **Fachliche Quelle:** DIDACTIC, Modul Isomerie, kuratiertes Vergleichspaar Ethanol/Dimethylether; ergänzend bestehende TASKS-Aufgabe `sek1_org_003`.

1. **Leitfrage:** „Warum unterscheiden sich Ethanol und Dimethylether trotz gleicher Summenformel?“
2. **Vermutung:** Freies Textfeld mit Prompt „Welche Strukturmerkmale könnten dafür verantwortlich sein?“; speichert lokal, ohne Korrektur.
3. **Untersuchen:** „MOL_LAB DIDACTIC öffnen“ mit Anleitung „Modul Isomerie auswählen, Ethanol und Dimethylether vergleichen“. Bei Bedarf Aufgaben-Editor oder SMILES `CCO` / `COC` anzeigen; durch Nutzer kopierbar.
4. **Beobachten:** „Was fällt an den funktionellen Gruppen, der räumlichen Struktur und den Eigenschaften auf?“; Textfeld für Beobachtung; keine automatische Übernahme aus Colab.
5. **Deuten:** strukturierte Rückfrage „Welche Moleküle können untereinander Wasserstoffbrücken bilden?“; fachliche Erläuterung erst nach Klick „Erklärung anzeigen“.
6. **Sichern:** „Meine Begründung“, Vergleich zur ursprünglichen Vermutung und kopierbarer Kurzbericht.

**Prinzip:** Innerhalb einer Aufgabe darf es weitere fachlich sinnvolle Aktionen geben, aber niemals den Zwang, mehrere externe Apps zu öffnen. Ein verständlicher Pfad muss ausreichen.

## 6. Vier Pilotaufgaben und ihre Zielwege

| ID | Didaktische Leitfrage | Schwerpunkt | Primäres Ziel | Vertiefung optional |
| --- | --- | --- | --- | --- |
| MW-001 | Warum unterscheiden sich Ethanol und Dimethylether trotz gleicher Summenformel? | Isomerie, funktionelle Gruppen, H-Brücken | MOL_LAB DIDACTIC · Isomerie | TASKS, freier 3D-Viewer |
| MW-002 | Warum unterscheiden sich Wasser und Schwefelwasserstoff in ihren Eigenschaften? | Polarität, intermolekulare Kräfte | MOL_LAB DIDACTIC · Polarität und Löslichkeit | zusätzliche 3D-Inspektion |
| MW-003 | Warum ist die räumliche Anordnung von Butan veränderlich? | Konformere, anti/gauche, Torsion | MOL_LAB DIDACTIC · Konformere (sofern dort passende Auswahl vorhanden) | MOL_LAB Colab: Konformeranalyse |
| MW-004 | Warum ist Benzol planar? | Geometrie, sp², Aromatizität | MOL_LAB_TASKS · `sek2_org_020` | MOL_LAB Colab: 3D/Optimierung |

DIDACTIC und TASKS enthalten weitere geeignete Fälle (z. B. Aceton, Cyclohexan, Polaritätsvergleiche, Koffein). Diese bleiben für die Erweiterung zurückgestellt. **Vor Implementierung** muss die genaue Auswahlbezeichnung in DIDACTIC für MW-003 noch geprüft werden; ein ungeprüfter Direktlink darf nicht versprochen werden.

## 7. Navigation zu externen Bausteinen

V0.1 ist zunächst ein **Orchestrator mit didaktischer Führung**, keine technische Vollintegration.

- **DIDACTIC**: `https://colab.research.google.com/github/ekerzendorfer/MOL_LAB_DIDACTIC/blob/main/MOL_LAB_DIDACTIC_v0_4_2.ipynb`. Fester Link, daneben sichtbare Anleitung „Modul/Beispiel wählen → Zellen ausführen → Ergebnis ansehen“.
- **TASKS**: `https://ekerzendorfer.github.io/MOL_LAB_TASKS/`. Ggf. Aufgabe über deren Oberfläche anwählen; keine direkte task-ID-Übergabe behaupten.
- **MOLLAB_PRO**: `https://ekerzendorfer.github.io/MOLLAB_PRO/`. Freie 2D/3D-Inspektion; die im Bestand enthaltenen irreführenden Docking-/QM-Bezeichnungen werden erst bei dessen Überarbeitung korrigiert.
- **MOL_LAB Colab**: `https://colab.research.google.com/github/ekerzendorfer/MOL_LAB/blob/main/MOL_LAB.ipynb`. Rechenvertiefung; eigene Laufzeit nötig. Das TASKS-Tool bietet bereits URL-Parameter `smiles`, `name`, `autoload2d`; diese Übergabe wird vor produktiver Verwendung gezielt getestet. V0.1 bietet immer die transparente SMILES-Kopierhilfe.
- Der derzeitige Hub-Eintrag MOL_LAB verweist auf `https://ekerzendorfer.github.io/MOL_LAB/`; im entsprechenden Repo sind nur Notebook, Python-Datei und README erkennbar, kein `index.html`. Das ist **vor der späteren Hub-Anpassung zu prüfen**, nicht stillschweigend zu übernehmen.

Externe Anwendungen öffnen in neuem Tab und bleiben eigenständig. Keine automatische Synchronisation von Messergebnissen, Modellgeometrien oder Nutzertexten.

## 8. Gestaltung und Interaktionsregeln

Visuelle Orientierung am aktuellen CHEMIE_ANALYTIK_HUB: dunkler/blauer Hero, helle ruhige Arbeitskarten, ein dominierender Primärbutton, zurückhaltende Statuschips und klar lesbare Typografie. Kein überflüssiges Neon, keine überladenen Technik-Badges.

- Responsive: Desktop zwei Spalten für Hauptarbeit/Arbeitsstand; auf Smartphone untereinander mit sichtbarer Hauptaktion.
- Stabile Geometrie: keine überdeckten Labels, keine horizontalen Überläufe, kein Abschneiden von Molekülnamen.
- Tastatur und Screenreader: semantische Buttons/Labels, sichtbarer Fokus, kontrastreiche Farben; Aufgabenschritte nicht ausschließlich farbcodieren.
- Hilfen sind kontextbezogen und einklappbar; Expertenlink nicht mit Basisaufgabe vermischen.
- Deutsch als Ausgangssprache; Daten- und UI-IDs so anlegen, dass Englisch später möglich ist.
- Bei Colab erklären: „Erweiterte Berechnungen · separater Tab · Start der Python-Laufzeit erforderlich“.

**Zu vermeiden:** technischen Jargon als Einstieg, automatische Öffnung mehrerer Fenster, sofortige Präsentation der Lösung, kryptische Toolnamen als alleinige Navigation.

## 9. Lokaler Zustand und minimaler Datenvertrag

GitHub Pages, statisches HTML/CSS/JavaScript und kuratierte lokale JSON-Daten. Kein Server und keine Login-Pflicht.

Dateistruktur ab implementierter V0.1:

```text
MOLEKUELWERKSTATT/
├── index.html
├── styles.css
├── app.js
├── data/
│   ├── learning_paths.json     # kuratierte Fälle mit stabilen IDs
│   └── tools.json              # Ziel-Apps und deren Fähigkeiten
├── docs/
│   └── KONZEPT_V0.1_EINSTIEG.md
└── README.md
```

Beispieldatensatz (Schemaentwurf, noch keine implementierte Datenschnittstelle):

```json
{
  "id": "MW-001",
  "title": "Gleiche Summenformel – andere Eigenschaften?",
  "topic": "Isomerie",
  "level": "Basis",
  "molecules": [
    {"name": "Ethanol", "smiles": "CCO"},
    {"name": "Dimethylether", "smiles": "COC"}
  ],
  "question": "Warum unterscheiden sich die Eigenschaften?",
  "primaryTool": "MOL_LAB_DIDACTIC",
  "targetInstructions": "Im Modul Isomerie Ethanol/Dimethylether auswählen.",
  "sourceReferences": [
    {"repo": "MOL_LAB_DIDACTIC", "module": "Isomerie"},
    {"repo": "MOL_LAB_TASKS", "taskId": "sek1_org_003"}
  ],
  "optionalTools": ["MOL_LAB_TASKS", "MOLLAB_PRO"]
}
```

Versionierter `localStorage`-Schlüssel etwa `molekuelwerkstatt:v0.1` mit letzter Fall-ID, aktuellem Schritt, Vermutung, Beobachtung, Deutung, Abschluss, optional selbst abgehakten Aktionen und Zeit der letzten lokalen Bearbeitung. Kein externer Datentransfer dieser Eingaben. Die Speicherung ist browser-/gerätegebunden, kann gelöscht werden und ist **kein Prüfungs-/Leistungsnachweis**. Reset/Neubeginn sichtbar.

## 10. Didaktische Modi und spätere Erweiterbarkeit

**V0.1:** Standard **Geführt**. Zusätzlich eigenständiger Pfad „Frei erkunden“, der direkt auf die bestehende freie Molekül-App verweist und nur kurz erklärt, welche Möglichkeiten sie bietet.

**Später:** optionaler „Expertenmodus“ analog Analytik-Hub: dieselben Aufgaben und gespeicherten Beobachtungen, aber weniger Wegweisung und stärkere selbstständige Entscheidung über Methoden. Kein neuer Chemieinhalt allein wegen des Modus; kein Abschalten fachlicher Schranken.

Wissenschaftlicher Ausbau der Bausteine folgt getrennt: RDKit-Viewer/SMILES-Abgleich, MOLLAB_PRO mit automatischer Molekülzentrierung/Kabsch-Alignment/RMSD (fachlich zuerst prüfen), echte Geometriedatenübergabe und Colab-Bridge erst in weiteren Versionen.

## 11. Abnahmekriterien für V0.1

**Benutzerführung**
- [ ] Erstnutzer versteht ohne Anleitung, dass eine chemische Frage den Startpunkt bildet.
- [ ] Eine geführte Aufgabe ist vom Einstieg aus in höchstens zwei bewussten Klicks erreichbar.
- [ ] Der jeweils nächste sinnvolle Schritt ist eindeutig erkennbar.
- [ ] Ein Nutzer findet nach dem Wechsel in ein externes Werkzeug wieder zur angefangenen Aufgabe zurück.
- [ ] „Frei erkunden“ und „Colab-Vertiefung“ sind verfügbar, dominieren aber nicht den Einstieg.

**Fachlich**
- [ ] Für vier Pilotfälle sind Leitfrage, Vorhersage, Handlung, Deutung und Sicherung vorhanden.
- [ ] Die fachliche Erklärung bleibt bis zu einem bewussten Klick verborgen.
- [ ] Kein 3D-Modell wird fälschlich als QM-berechnet bezeichnet.
- [ ] Ergebnisse externer Apps gelten nicht automatisch als vom Hub übernommen.

**Technisch**
- [ ] Alle vier Tool-Links werden getestet; bei Problemen wird ein verständlicher Hinweis gezeigt.
- [ ] JSON-Daten sind separat von der Darstellung gepflegt; stabile Fall-/Tool-IDs.
- [ ] Browser-Refresh und Zurück-Navigation verlieren lokale Textnotizen nicht.
- [ ] Keine bestehenden Repositories müssen verändert werden.
- [ ] Desktop (breit/schmal) und Smartphone ohne Überlappungen und abgeschnittene Bedienelemente geprüft.
- [ ] „Zurücksetzen“ löscht nur lokalen Werkstatt-Zustand, nicht externe Notebook-Daten.

## 12. Manuelle Smoke-Tests (vor Veröffentlichung)

1. **MW-001**: Einstieg → Vermutung erfassen → DIDACTIC öffnen → nach Anleitung Isomerievergleich → zurück → Beobachtung/Begründung → Text kopieren → Refresh → Zustand vorhanden.
2. **MW-002**: Polaritätsvergleich, Erklärung bleibt bis bewusster Freigabe verborgen.
3. **MW-003**: Konformerpfad, Colab ist optional; Nutzer kann die Basisaufgabe ohne xTB abschließen.
4. **MW-004**: TASKS-Link, richtige Aufgabenidentifikation, verständlicher Hinweis beim Wechsel.
5. Test ohne gespeicherten Zustand, mit gespeicherten Daten, nach Reset, mit schmalem Bildschirm und mit nicht verfügbarer externer Ziel-App.

**Wichtig:** Diese Tests sollen mit 2–3 Personen erfolgen, die die vorhandenen Tools nicht bereits kennen. Beobachten, an welcher Stelle sie stocken; erst danach weitere Funktionen ergänzen.

## 13. Nächste kleine Schritte

1. **Dieses Konzept gemeinsam prüfen und V0.1-Umfang freigeben.**
2. Ein zunächst nicht im Hub verlinktes statisches UI-Grundgerüst mit Einstieg, vier Karten und einem vollständig geführten Pilotfall **MW-001** bauen.
3. MW-001 mit realem Zieltool im Browser durchspielen, Übergabe-/Rückkehrhürden notieren.
4. Weitere drei Pilotfälle in denselben Datenvertrag einfügen, ohne neue Hauptnavigation.
5. Erst nach bestandener Abnahme: öffentliche GitHub-Pages-URL und Hub-Kachel.

Keine Umsetzung im Analytik-Hub, im MOL_LAB oder in MOL_LAB DIDACTIC ohne gesonderten fachlichen Bedarf.

## 14. Quellenbasis und Annahmen

Direkt untersucht am 23.11.2026:
- `ekerzendorfer/CHEMIE_ANALYTIK_HUB`: `README.md`, `index.html`, `data/cases.json`; geführte/expertische Arbeitslogik als Vorbild.
- `ekerzendorfer/MOL_LAB_DIDACTIC`: `MOL_LAB_DIDACTIC_v0_4_2.ipynb`, `molecules_v0_4_2.json`; kuratierte Module und Vergleiche als didaktische Ausgangsbasis.
- `ekerzendorfer/MOL_LAB_TASKS`: `index.html`, `tasks/tasks.json` (12 Aufgaben); Root-`tasks.json` ist derzeit syntaktisch ungültig, wird von der App nicht geladen.
- `ekerzendorfer/MOL_LAB`: `MOL_LAB.ipynb`, `molekuellabor.py`; RDKit/MMFF/UFF/xTB, Konformere und MMFF/xTB-Alignment.
- `ekerzendorfer/MOLLAB_PRO`: `index.html`; bestehender Viewer und manuelle Transformationsoberfläche.

Die hier beschriebene Werkstatt und die Zielstruktur sind **Konzeptvorschläge**, keine Behauptung bereits implementierter Funktionalität. Externe Browser-/Colab-Durchläufe stehen noch aus.

## Ergänzung nach Fachabstimmung (23.11.2026) – freies Molekülstudio

Die MOLEKÜL-WERKSTATT hat **zwei Hauptwege**: (1) **Geführt untersuchen** mit MW-001 und (2) **Frei erkunden** ohne Aufgabenbindung, insbesondere für spontane Unterrichtsvorführungen von 2D-Strukturen und 3D-Modellen.

In der ersten Pilotversion öffnet „Frei erkunden“ das bereits vorhandene MOLLAB_PRO mit 2D-Sketcher und 3D-Viewer; optional ist MOL_LAB (Colab) für Konformere, MMFF/UFF und xTB erreichbar. Die Werkstatt bietet Beispielmoleküle und SMILES-Kopierhilfe. Eine automatische SMILES-Übernahme in MOLLAB_PRO wird nicht behauptet. Ein direkt eingebetteter 2D-Sketcher und 3D-Viewer bleiben ein späterer Integrationsschritt. Das didaktische Primat gilt für geführte Aufgaben; freie Exploration ist bewusst ohne Leitfrage zugänglich.

### Implementierungsstand V0.1.0

- Geführter Lernweg MW-001 Ethanol/Dimethylether als erster vollständiger Fall: Vermuten, Untersuchen, Deuten, Sichern; lokale Notizen; Erklärung erst bei ausdrücklichem Aufruf; kopier-/herunterladbarer Bericht.
- Freies Molekülstudio mit direktem 2D-/3D-Zugang, Colab-Option und editierbarer SMILES-Kopierhilfe.
- Keine Änderungen an bisherigen Molekül-Apps oder am CHEMIE_KI_LINKS-Portal.
- Keine automatische Resultat-Rückgabe; Bestätigung einer externen Untersuchung nur als Selbstangabe.
- GitHub-Pages-Freischaltung und Sicht-/Funktionstest im Browser vor endgültiger Freigabe.
