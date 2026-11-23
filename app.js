/* MOLEKÜL-WERKSTATT V0.1 – task-first prototype, no result bridge */
(function () {
  "use strict";
  var STORE_KEY = "molekuelwerkstatt:v0.1";
  var STEPS = ["Vermuten", "Untersuchen", "Deuten", "Sichern"];
  var allowedViews = ["start", "aufgabe", "frei"];
  var data = null;
  var toolData = null;
  var saveAvailable = true;
  var defaults = {
    view: "start",
    step: 0,
    hypothesis: "",
    observation: "",
    interpretation: "",
    conclusion: "",
    investigated: false,
    explanation: false,
    done: false,
    freeSmiles: "CCO",
    selectedExample: 0
  };
  var state = readState();

  function elem(id) { return document.getElementById(id); }
  function safeText(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function readState() {
    var result = Object.assign({}, defaults);
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var stored = JSON.parse(raw);
        if (stored && typeof stored === "object") {
          Object.keys(defaults).forEach(function (key) {
            if (typeof stored[key] === typeof defaults[key]) result[key] = stored[key];
          });
        }
      }
    } catch (e) { saveAvailable = false; }
    if (!allowedViews.includes(result.view)) result.view = "start";
    result.step = Math.min(3, Math.max(0, Math.floor(result.step) || 0));
    ["hypothesis", "observation", "interpretation", "conclusion", "freeSmiles"]
      .forEach(function (key) { result[key] = result[key].slice(0, 6000); });
    return result;
  }
  function persist() {
    if (!saveAvailable) return;
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
    catch (e) { saveAvailable = false; showNotice("Lokales Speichern ist in diesem Browser nicht verfügbar. Kopiere deine Notizen vor dem Schließen."); }
  }
  function showNotice(message) {
    var node = elem("notice");
    node.textContent = message;
    node.hidden = false;
  }
  function clearNotice() { elem("notice").hidden = true; }
  function currentPath() {
    return data && data.learning_paths && data.learning_paths[0] ? data.learning_paths[0] : null;
  }
  function getTool(id) {
    return (toolData && toolData.tools || []).find(function (item) { return item.id === id; });
  }
  function urlFor(id) {
    var tool = getTool(id);
    return tool && /^https:\/\//.test(tool.url) ? tool.url : "";
  }
  function linkToMollab(smiles, name, context) {
    if (!window.MoleculeHandoff) throw new Error("Übergabe-Modul ist nicht geladen.");
    return window.MoleculeHandoff.makeLink(urlFor("MOLLAB_PRO"), {
      smiles: smiles, name: name, context: context
    });
  }
  function updateCaseHandoff() {
    var path = currentPath();
    if (!path || !Array.isArray(path.molecules)) return;
    path.molecules.slice(0, 2).forEach(function (mol, idx) {
      var link = elem("case-handoff-" + idx);
      if (!link) return;
      try {
        link.href = linkToMollab(mol.smiles, mol.name, path.id);
        link.title = mol.name + " direkt in MOLLAB_PRO laden";
      } catch (error) {
        link.removeAttribute("href");
        link.title = "Übergabe nicht verfügbar: " + error.message;
      }
    });
  }
  function updateFreeHandoff() {
    var link = elem("free-mollab-link");
    var status = elem("free-transfer-status");
    if (!link || !status || !toolData) return;
    var smiles = state.freeSmiles.trim();
    var examples = (data && data.free_examples) || [];
    var selected = examples[state.selectedExample];
    var name = selected && selected.smiles === smiles ? selected.name : "Eigenes Molekül";
    if (!smiles) {
      link.href = urlFor("MOLLAB_PRO");
      link.textContent = "MOLLAB_PRO ohne Molekül öffnen ↗";
      status.textContent = "Keine Struktur ausgewählt: Der 2D-Editor öffnet sich leer. Du kannst dort frei zeichnen.";
      return;
    }
    try {
      link.href = linkToMollab(smiles, name, "frei");
      link.textContent = name + " in MOLLAB_PRO öffnen ↗";
      status.textContent = "SMILES wird als URL-Parameter übergeben. In MOLLAB_PRO erscheint das Molekül direkt im 2D-Editor; die 3D-Erzeugung bleibt ein eigener Schritt.";
    } catch (error) {
      link.href = urlFor("MOLLAB_PRO");
      link.textContent = "MOLLAB_PRO ohne Übergabe öffnen ↗";
      status.textContent = "Übergabe nicht möglich: " + error.message + " Das Zielwerkzeug bleibt unabhängig zugänglich.";
    }
  }
  function setView(view, changeHash) {
    if (!allowedViews.includes(view)) view = "start";
    state.view = view;
    persist();
    clearNotice();
    allowedViews.forEach(function (v) {
      var section = elem("view-" + v);
      section.hidden = v !== view;
    });
    document.querySelectorAll("[data-view].nav-btn").forEach(function (btn) {
      if (btn.dataset.view === view) btn.setAttribute("aria-current", "page");
      else btn.removeAttribute("aria-current");
    });
    if (view === "aufgabe") { renderStep(); updateCaseHandoff(); }
    if (view === "start") updateStart();
    if (view === "frei") renderFree();
    if (changeHash && window.location.hash !== "#" + view) window.location.hash = view;
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function updateStart() {
    var startBtn = document.querySelector('[data-action="start-case"]');
    if (startBtn && currentPath()) {
      startBtn.innerHTML = (state.done ? "Aufgabe erneut ansehen" :
        (state.step > 0 || state.hypothesis ? "An MW-001 weiterarbeiten" : "Vergleich MW-001 starten")) +
        ' <span aria-hidden="true">→</span>';
    }
  }
  function goToStep(step) {
    state.step = Math.min(3, Math.max(0, step));
    persist();
    renderStep();
  }
  function progressSummary() {
    var written = ["hypothesis", "observation", "interpretation", "conclusion"]
      .filter(function (key) { return state[key].trim().length > 0; }).length;
    var status = written + " von 4 Notizfeldern bearbeitet";
    if (state.investigated) status += " · externe Untersuchung selbst bestätigt";
    if (state.done) status += " · Abschluss markiert";
    return status + ".";
  }
  function updateCaseStatus() { elem("case-status").textContent = progressSummary(); }
  function renderStep() {
    if (!currentPath()) return;
    var path = currentPath();
    var step = state.step;
    elem("step-fraction").textContent = "Schritt " + (step + 1) + " von 4";
    elem("steps").innerHTML = STEPS.map(function (label, idx) {
      var attrs = 'class="step-button' + (idx < step ? ' step-done' : '') + '" type="button" data-step="' + idx + '"';
      if (idx === step) attrs += ' aria-current="step"';
      return '<button ' + attrs + '><span class="step-line" aria-hidden="true"></span><span>' + (idx + 1) + ". " + label + '</span></button>';
    }).join("");
    var html = "";
    if (step === 0) {
      html =
        '<p class="eyebrow dark">Schritt 1 · eigene Idee</p>' +
        '<h4>Was vermutest du?</h4>' +
        '<p class="question">' + safeText(path.question) + '</p>' +
        '<p>Beide Stoffe bestehen aus denselben Atomsorten in derselben Anzahl. Die Verknüpfung ihrer Atome ist aber unterschiedlich.</p>' +
        '<label class="field-label" for="field-hypothesis">Deine erste Vermutung</label>' +
        '<textarea id="field-hypothesis" data-field="hypothesis" maxlength="4000" placeholder="Ich vermute, dass …">' + safeText(state.hypothesis) + '</textarea>' +
        '<p class="example-input">Es gibt hier bewusst keine sofortige Bewertung. Halte fest, was du vor der Untersuchung denkst.</p>';
    } else if (step === 1) {
      var didactic = urlFor("MOL_LAB_DIDACTIC");
      html =
        '<p class="eyebrow dark">Schritt 2 · digital untersuchen</p>' +
        '<h4>Vergleiche die beiden Strukturen</h4>' +
        '<p>Im MOL_LAB DIDACTIC ist das Isomerenpaar bereits kuratiert. Du musst keine Moleküle selbst eingeben.</p>' +
        '<div class="callout">' +
          '<strong>Im Notebook – vier kurze Schritte:</strong>' +
          '<ol class="notebook-steps">' +
            '<li><strong>Colab:</strong> Laufzeit → Alle ausführen.</li>' +
            '<li><strong>Modul:</strong> Isomerie.</li>' +
            '<li><strong>Beispiel:</strong> Ethanol (eigene SMILES aus).</li>' +
            '<li><strong>Aktion:</strong> Isomerenpaar vergleichen.</li>' +
          '</ol>' +
        '</div>' +
        '<div class="lab-launch"><a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="' + safeText(didactic) + '">MOL_LAB DIDACTIC öffnen ↗</a>' +
        '<span class="tool-note">Die Werkstatt bleibt in diesem Tab geöffnet. Die Colab-Laufzeit kann beim ersten Start etwas benötigen.</span></div>' +
        '<label class="check-row"><input type="checkbox" id="investigated"' + (state.investigated ? ' checked' : '') + '>Ich habe den Vergleich im externen Werkzeug selbst durchgeführt.</label>' +
        '<label class="field-label" for="field-observation">Was hast du beobachtet?</label>' +
        '<textarea id="field-observation" data-field="observation" maxlength="4000" placeholder="Ich sehe bei Ethanol … und bei Dimethylether …">' + safeText(state.observation) + '</textarea>' +
        '<p class="example-input">Diese Bestätigung stammt von dir. Es gibt in V0.1 keine automatische Rückmeldung aus Colab.</p>';
    } else if (step === 2) {
      html =
        '<p class="eyebrow dark">Schritt 3 · chemisch begründen</p>' +
        '<h4>Wie erklärst du die Unterschiede?</h4>' +
        '<p class="question">Welches Molekül kann zwischen eigenen Molekülen Wasserstoffbrücken ausbilden, und warum?</p>' +
        '<label class="field-label" for="field-interpretation">Deine Begründung</label>' +
        '<textarea id="field-interpretation" data-field="interpretation" maxlength="4000" placeholder="Bei Ethanol …, weil …">' + safeText(state.interpretation) + '</textarea>' +
        '<div class="reveal">' +
          (state.explanation ?
           '<div class="answer-box"><strong>Fachliche Erklärung</strong>' +
           '<p>In Ethanol ist der Sauerstoff an ein Wasserstoffatom gebunden (O–H). Ethanolmoleküle können deshalb untereinander Wasserstoffbrücken <em>spenden und aufnehmen</em>. Dimethylether enthält zwar ebenfalls ein polares C–O–C-Fragment und kann Wasserstoffbrücken <em>aufnehmen</em>, besitzt aber keine O–H-Bindung und kann zwischen seinen eigenen Molekülen keine solchen Brücken <em>spenden</em>. Diese Unterschiede in den zwischenmolekularen Kräften erklären unter anderem die deutlich unterschiedlichen Siedepunkte.</p>' +
           '<p>Wichtig: Auch Dimethylether kann mit passenden Wasserstoffbrücken-Donoren wie Wasser wechselwirken. „Keine O–H-Gruppe“ bedeutet nicht „unpolar“.</p></div>' :
           '<button type="button" class="btn btn-outline" data-action="reveal-answer">Erklärung anzeigen – erst nach eigener Überlegung</button>') +
        '</div>';
    } else {
      html =
        '<p class="eyebrow dark">Schritt 4 · Erkenntnisse sichern</p>' +
        '<h4>Was nimmst du aus dem Vergleich mit?</h4>' +
        '<p>Vergleiche deine anfängliche Vermutung mit deinen Beobachtungen. Formuliere eine kurze Schlussfolgerung, die den Zusammenhang zwischen Struktur und Eigenschaften erklärt.</p>' +
        '<label class="field-label" for="field-conclusion">Dein Fazit</label>' +
        '<textarea id="field-conclusion" data-field="conclusion" maxlength="4000" placeholder="Obwohl beide die gleiche Summenformel besitzen, …">' + safeText(state.conclusion) + '</textarea>' +
        '<div class="callout secondary"><strong>Dein persönlicher Ergebnistext</strong>' +
          '<p>Das Protokoll enthält nur deine eigenen Notizen und den Arbeitsauftrag. Es wird nichts automatisch an einen Server übermittelt.</p>' +
          '<div class="report-actions"><button type="button" class="btn btn-secondary" data-action="copy-report">Protokoll kopieren</button>' +
          '<button type="button" class="btn btn-outline" data-action="download-report">Als .md speichern</button></div>' +
          '<pre class="report" id="report-preview">' + safeText(buildReport()) + '</pre></div>';
    }
    elem("step-body").innerHTML = html;
    elem("prev-step").disabled = step === 0;
    elem("next-step").textContent = step === 3 ? (state.done ? "Zur Übersicht →" : "Aufgabe abschließen →") : "Weiter →";
    updateCaseStatus();
  }
  function buildReport() {
    return "# MOLEKÜL-WERKSTATT – MW-001\n" +
      "\n**Leitfrage:** Warum unterscheiden sich Ethanol und Dimethylether trotz gleicher Summenformel (C₂H₆O)?\n" +
      "**Moleküle:** Ethanol (CCO); Dimethylether (COC)\n" +
      "\n## Vermutung\n" + (state.hypothesis.trim() || "(nicht eingetragen)") +
      "\n\n## Beobachtungen\n" + (state.observation.trim() || "(nicht eingetragen)") +
      "\n\n## Deutung\n" + (state.interpretation.trim() || "(nicht eingetragen)") +
      "\n\n## Fazit\n" + (state.conclusion.trim() || "(nicht eingetragen)") +
      "\n\n**Durchführung in MOL_LAB DIDACTIC:** " + (state.investigated ? "von mir bestätigt" : "nicht bestätigt") +
      "\n**Hinweis:** Eigene Aufzeichnungen; keine automatische Auswertung oder Leistungsbeurteilung.\n";
  }
  function renderFree() {
    if (!data) return;
    var examples = data.free_examples || [];
    var chips = elem("example-chips");
    chips.innerHTML = examples.map(function (item, idx) {
      return '<button type="button" class="example-chip" data-example="' + idx + '" aria-pressed="' +
        (idx === state.selectedExample ? 'true' : 'false') + '">' + safeText(item.name) + '</button>';
    }).join("");
    elem("free-smiles").value = state.freeSmiles;
    updateFreeHandoff();
    if (urlFor("MOL_LAB")) elem("free-colab-link").href = urlFor("MOL_LAB");
  }
  function updateField(input) {
    var field = input.dataset.field;
    if (!Object.prototype.hasOwnProperty.call(defaults, field)) return;
    state[field] = input.value.slice(0, 4000);
    state.done = false;
    persist();
    updateCaseStatus();
    if (state.step === 3 && elem("report-preview")) elem("report-preview").textContent = buildReport();
  }
  async function copyText(content) {
    if (!content) { showNotice("Es ist noch kein Text zum Kopieren eingetragen."); return; }
    try {
      await navigator.clipboard.writeText(content);
      showNotice("Text wurde in die Zwischenablage kopiert.");
    } catch (e) {
      var temp = document.createElement("textarea");
      temp.value = content;
      temp.style.position = "fixed";
      temp.style.left = "-9999px";
      document.body.appendChild(temp);
      temp.select();
      var ok = document.execCommand("copy");
      temp.remove();
      showNotice(ok ? "Text wurde in die Zwischenablage kopiert." : "Kopieren ist hier blockiert. Markiere den Text und kopiere ihn manuell.");
    }
  }
  function downloadReport() {
    var file = new Blob([buildReport()], {type:"text/markdown;charset=utf-8"});
    var url = URL.createObjectURL(file);
    var a = document.createElement("a");
    a.href = url; a.download = "MW-001_Ethanol_Dimethylether.md";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  function setExample(index) {
    var examples = data.free_examples || [];
    var choice = examples[index];
    if (!choice) return;
    state.selectedExample = index;
    state.freeSmiles = choice.smiles;
    persist();
    renderFree();
  }
  function resetCase() {
    if (!window.confirm("Nur deine lokalen Notizen und den Fortschritt zu MW-001 löschen? Andere Apps bleiben unverändert.")) return;
    ["hypothesis", "observation", "interpretation", "conclusion"].forEach(function (k) { state[k] = ""; });
    state.step = 0; state.investigated = false; state.explanation = false; state.done = false;
    persist(); renderStep(); showNotice("MW-001 wurde lokal zurückgesetzt.");
  }
  document.addEventListener("click", function (event) {
    var viewBtn = event.target.closest("[data-view]");
    if (viewBtn) { setView(viewBtn.dataset.view, true); return; }
    var brand = event.target.closest("[data-view-link]");
    if (brand) { event.preventDefault(); setView(brand.dataset.viewLink, true); return; }
    var stepBtn = event.target.closest("[data-step]");
    if (stepBtn && state.view === "aufgabe") { goToStep(Number(stepBtn.dataset.step)); return; }
    var example = event.target.closest("[data-example]");
    if (example && data) { setExample(Number(example.dataset.example)); return; }
    var copyBtn = event.target.closest("[data-copy]");
    if (copyBtn) { copyText(copyBtn.dataset.copy); return; }
    var btn = event.target.closest("[data-action]");
    if (!btn) return;
    switch (btn.dataset.action) {
      case "start-case": setView("aufgabe", true); break;
      case "prev-step": goToStep(state.step - 1); break;
      case "next-step":
        if (state.step < 3) goToStep(state.step + 1);
        else { state.done = true; persist(); setView("start", true); showNotice("MW-001 ist als abgeschlossen markiert. Du kannst die Aufgabe jederzeit erneut ansehen."); }
        break;
      case "reveal-answer": state.explanation = true; persist(); renderStep(); break;
      case "copy-report": copyText(buildReport()); break;
      case "download-report": downloadReport(); break;
      case "reset-case": resetCase(); break;
      case "copy-free-smiles": copyText(state.freeSmiles.trim()); break;
    }
  });
  document.addEventListener("input", function (event) {
    var input = event.target;
    if (input.matches("[data-field]")) updateField(input);
    if (input.id === "free-smiles") {
      state.freeSmiles = input.value.slice(0, 3000);
      state.selectedExample = -1;
      persist();
      document.querySelectorAll("[data-example]").forEach(function (chip) { chip.setAttribute("aria-pressed","false"); });
      updateFreeHandoff();
    }
  });
  document.addEventListener("change", function (event) {
    if (event.target.id === "investigated") {
      state.investigated = event.target.checked;
      state.done = false;
      persist();
      updateCaseStatus();
    }
  });
  window.addEventListener("hashchange", function () {
    var view = (window.location.hash || "#start").slice(1);
    if (allowedViews.includes(view) && view !== state.view) setView(view, false);
  });
  Promise.all([
    fetch("./data/learning_paths.json").then(function (r) { if (!r.ok) throw new Error("Lernwege konnten nicht geladen werden"); return r.json(); }),
    fetch("./data/tools.json").then(function (r) { if (!r.ok) throw new Error("Werkzeugliste konnte nicht geladen werden"); return r.json(); })
  ]).then(function (result) {
    data = result[0]; toolData = result[1];
    if (!currentPath() || currentPath().id !== "MW-001" || !Array.isArray(data.free_examples)) throw new Error("Aufgabendaten sind unvollständig");
    var fragmentView = (window.location.hash || "").slice(1);
    setView(allowedViews.includes(fragmentView) ? fragmentView : state.view, false);
    if (!saveAvailable) showNotice("Lokales Speichern ist in diesem Browser deaktiviert. Notizen vor dem Schließen kopieren.");
  }).catch(function (error) {
    showNotice("Die Aufgabendaten konnten nicht geladen werden. Bitte die Seite über GitHub Pages öffnen und neu laden. (" + error.message + ")");
    document.querySelectorAll('[data-action="start-case"]').forEach(function (btn) { btn.disabled = true; });
  });
})();