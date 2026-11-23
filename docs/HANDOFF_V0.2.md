# MOLEKÜL-WERKSTATT ↔ MOLLAB PRO – Übergabeprotokoll V0.2

**Stand:** 23.11.2026 · **Scope:** eine kleine, einseitige SMILES-Übergabe und ein kontextbezogener Rücklink. Kein Umbau der chemischen Berechnung.

## Nutzerwege

### Geführte Aufgabe MW-001
1. In der Werkstatt MW-001 öffnen; bei Ethanol oder Dimethylether **„In 2D/3D betrachten“** wählen.
2. MOLLAB PRO öffnet in einem neuen Tab. Der SMILES wird in den bestehenden JSME-2D-Editor übernommen und über **Start** ausgewertet. Die 3D-Erzeugung wird **nicht automatisch gestartet**.
3. Optional **„3D-Modell A erzeugen“** klicken, Molekül untersuchen und zurück zur Werkstatt wechseln – entweder durch Wechsel in den Originaltab oder über **„Zur MOLEKÜL-WERKSTATT“**.
4. Rücklink führt bei MW-001 direkt zur Aufgabenansicht. Die Notizen bleiben dort im lokalen Browserzustand gespeichert.

### Frei erkunden
1. Im Bereich **„Frei erkunden“** zuerst ein Beispiel (Wasser, Ethanol, Aceton, Benzol, Cyclohexan, Koffein) wählen oder einen eigenen SMILES eintragen.
2. Über den dynamischen **„In MOLLAB_PRO öffnen“**-Link öffnen. Die Struktur erscheint dort im 2D-Editor.
3. Rücklink führt nach **„Frei erkunden“**. Ohne SMILES lässt sich MOLLAB PRO wie bisher als leerer Sketcher öffnen.
4. Für sehr komplexe Moleküle weiter das MOL_LAB-Colab-Notebook nutzen. Die externen 3D-Datenquellen in MOLLAB PRO haben eigene Grenzen; bei Calicheamicin γ₁ᴵ ist die Colab-Variante geeigneter.

## Technischer Vertrag

Zieladresse:
```text
https://ekerzendorfer.github.io/MOLLAB_PRO/?smiles=CCO&name=Ethanol&source=molekuelwerkstatt&context=MW-001
```

| Parameter | Bedeutung |
| --- | --- |
| `smiles` | URL-kodierter SMILES (max. 2000 Zeichen, kein Leer-/Steuerzeichen); **nur** Strukturtext, kein SDF/3D |
| `name` | Anzeigename (max. 100 Zeichen), nur in Textknoten angezeigt |
| `source` | `molekuelwerkstatt` markiert einen Werkstatt-Aufruf; keine Authentifizierung |
| `context` | Freigegebene IDs: `MW-001`, `MW-002`, `MW-009`, `MW-015`, `MW-024` → jeweils der eigene Forschungsweg (`?case=<ID>#aufgabe`; bei MW-001 nur `#aufgabe`); `frei` → `#frei`. Unbekannte Werte werden auf `frei` begrenzt. |

Die Funktion `MoleculeHandoff.makeLink` steht in **beiden** Repositories in `molecule-handoff.js`; `readLink` übernimmt die Parameter in MOLLAB PRO. Die Rückadresse ist im Code fest auf das bekannte Werkstatt-Portal begrenzt: frei übermittelte `return`-URLs werden **niemals** geöffnet. Die 2D-Übernahme wartet auf **beide** bereits vorhandenen Komponenten: JSME und 3Dmol-Viewer. RDKit-Deskriptoren werden bei späterer WebAssembly-Bereitschaft ergänzt.

**Wichtig:** Die URL enthält Molekülnamen und SMILES; keine persönlichen Angaben darin übermitteln. Lernnotizen werden **nicht** übertragen. Das Protokoll transportiert weder gemessene Ergebnisse noch Geometrien und ist **keine bidirektionale Lab-Bridge**. Auch die chemische Richtigkeit eines beliebigen SMILES wird durch die URL-Prüfung nicht bewiesen; der Ziel-Editor versucht die tatsächliche Interpretation.

## Abnahmekriterien / manueller Browsertest

- [ ] MW-001 → **Ethanol** → MOLLAB PRO: 2D-Struktur Ethanol bereits sichtbar, SMILES `CCO`; 3D erst durch eigenen Klick.
- [ ] MW-001 → **Dimethylether**: 2D-Struktur `COC`, nicht Ethanol; später zurück zur richtigen Aufgabe.
- [ ] Während des Aufrufs zuvor gespeicherte Vermutung in der Werkstatt erhalten.
- [ ] Frei → **Aceton**: `CC(=O)C` im 2D-Editor; Rücklink nach `#frei`.
- [ ] Frei → **eigener SMILES**: `N[C@@H](C)C(=O)O` bleibt mit stereochemischer Kennzeichnung im übertragenen Text erhalten; Ziel-Editor darf bei der Darstellung kanonisieren.
- [ ] Ändern eines SMILES aktualisiert den dynamischen Link ohne explizites Speichern.
- [ ] Leerer SMILES öffnet MOLLAB PRO ohne Übergabe; nicht zulässige Eingaben werden nicht stillschweigend als Molekül interpretiert.
- [ ] MOLLAB PRO **direkt** öffnen: kein Import-Banner, normales Zeichnen und 3D-Generieren unverändert.
- [ ] Beide Startreihenfolgen (JSME vor Viewer und Viewer vor JSME) funktionieren; Browser-Konsole ohne neue Fehler.
- [ ] Mobilgerät / schmaler Bildschirm: neue Buttons und Rücklink sichtbar, keine Überlagerungen.

## Automatisierte Tests

Beide Repositories enthalten `tests/handoff.test.cjs`, ausgeführt in GitHub Actions. Geprüft werden URL-Rundläufe, Stereochemie-Zeichen, unzulässige Zieladressen, Überlängen, feste Rücklinks und die nötigen UI-Anknüpfungen. Ein echter JSME-/Browserdurchlauf ist damit **noch nicht** nachgewiesen.

## Weitere Vernetzung

Ist diese Übergabe praktisch bestätigt, kann derselbe kleinstmögliche Vertrag für MOL_LAB_TASKS und weitere aufgabenbezogene Werkzeuge genutzt werden. Eine vollwertige Ergebnis-Rückgabe oder gemeinsamer 3D-Arbeitsstand ist ein **separater** Entwicklungsschritt.

## Ergänzung V0.3: zwei Aufgaben

Der Handoff-Vertrag akzeptiert zusätzlich `context=MW-002`. MOLLAB PRO leitet den Rückweg dann **nicht** zur zuletzt geöffneten Aufgabe, sondern über `?case=MW-002#aufgabe` ausdrücklich zum Wasser-/Schwefelwasserstoff-Fall.

Die Werkstatt verwendet **denselben Renderer** für MW-001 und MW-002; die voneinander unabhängigen Fortschritte liegen unter dem bisherigen Browser-Speicherschlüssel. Testfälle: `tests/handoff.test.cjs` und `tests/learning-paths.test.cjs`.

## Ergänzung V0.4 – Forschungswege der Vorlagen A, B und C

Das Rücklink-Protokoll unterstützt jetzt zusätzlich **MW-009, MW-015 und MW-024**. Die Parameter werden in beiden Apps nach derselben expliziten **Allowlist** geprüft; beliebige Werte wie `MW-999` erzeugen keinen frei konstruierten Rücklink.

- **MW-009:** Übergabe von Propanal (`CCC=O`) oder Aceton (`CC(=O)C`); Rücklink `?case=MW-009#aufgabe`.
- **MW-015:** Übergabe eines der vier auswählbaren Beispiele CO₂ (`O=C=O`), H₂O (`O`), NH₃ (`N`) oder CH₄ (`C`); Rücklink `?case=MW-015#aufgabe`. In der Werkstatt bleibt gespeichert, welches Beispiel gerade gewählt war.
- **MW-024:** Übergabe von Cyclohexan (`C1CCCCC1`); Rücklink `?case=MW-024#aufgabe`. Relative MMFF-Energien werden **nicht** zwischen den Apps übertragen.

Die automatisierten Tests sind in `tests/handoff.test.cjs` auf alle fünf Aufgabenkontexte erweitert. Die neuen Aufgabentypen und ihr lokaler Fortschritt werden in `tests/learning-paths.test.cjs` geprüft. Der reale Browser- und Colab-Test ist unter [Testblatt V0.4](PILOTWEGE_V0.4_TEST.md) beschrieben.
