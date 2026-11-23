/* MOLEKÜL-WERKSTATT v0.3 – MW-001 / MW-002, independent learning states */
(function () {
  "use strict";
  // The historical key remains unchanged so existing MW-001 notes survive the upgrade.
  var STORE_KEY = "molekuelwerkstatt:v0.1";
  var STEPS = ["Vermuten", "Untersuchen", "Deuten", "Sichern"];
  var VIEWS = ["start", "aufgabe", "frei"];
  var NOTE_FIELDS = ["hypothesis", "observation", "interpretation", "conclusion"];
  var emptyCase = {
    step:0, hypothesis:"", observation:"", interpretation:"", conclusion:"",
    investigated:false, explanation:false, done:false
  };
  var data = null;
  var toolData = null;
  var canSave = true;
  var state = readState();

  function elem(id) { return document.getElementById(id); }
  function escapeHtml(input) {
    return String(input == null ? "" : input)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function cleanCase(obj) {
    var result = Object.assign({},emptyCase);
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      Object.keys(emptyCase).forEach(function (key) {
        if (typeof obj[key] === typeof result[key]) result[key] = obj[key];
      });
    }
    result.step = Math.min(3,Math.max(0,Math.floor(result.step)||0));
    NOTE_FIELDS.forEach(function (key) {result[key]=result[key].slice(0,4000);});
    return result;
  }
  function readState() {
    var saved = {};
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) saved = JSON.parse(raw) || {};
    } catch(error) {canSave=false;}
    var defaults = {view:"start",caseId:"MW-001",freeSmiles:"CCO",selectedExample:1};
    var state = Object.assign({}, cleanCase(saved), defaults);
    ["view","caseId","freeSmiles","selectedExample"].forEach(function (key) {
      if (typeof saved[key] === typeof defaults[key]) state[key] = saved[key];
    });
    if (!VIEWS.includes(state.view)) state.view = "start";
    if (!["MW-001","MW-002"].includes(state.caseId)) state.caseId = "MW-001";
    state.freeSmiles = state.freeSmiles.slice(0,3000);
    state.selectedExample = Math.trunc(state.selectedExample);
    var older = saved.cases && typeof saved.cases === "object" ? saved.cases : {};
    state.cases = {"MW-002":cleanCase(older["MW-002"])};
    return state;
  }
  function persist() {
    if (!canSave) return;
    try {localStorage.setItem(STORE_KEY,JSON.stringify(state));}
    catch(error) {
      canSave=false;
      notice("Lokales Speichern ist hier nicht verfügbar. Kopiere die Notizen vor dem Schließen.");
    }
  }
  function notice(value) {
    var box=elem("notice");box.textContent=value;box.hidden=false;
  }
  function clearNotice() {elem("notice").hidden=true;}
  function currentPath() {
    if (!data || !Array.isArray(data.learning_paths)) return null;
    return data.learning_paths.find(function(path) {return path.id===state.caseId;}) || null;
  }
  function activeNotes() {
    return state.caseId==="MW-002" ? state.cases["MW-002"] : state;
  }
  function getTool(id) {
    return ((toolData&&toolData.tools)||[]).find(function(tool){return tool.id===id;});
  }
  function toolUrl(id) {
    var t=getTool(id);
    return t && /^https:\/\//.test(t.url) ? t.url : "";
  }
  function molLink(smiles,name,context) {
    if(!window.MoleculeHandoff)throw Error("Übergabemodul fehlt.");
    return window.MoleculeHandoff.makeLink(toolUrl("MOLLAB_PRO"),{
      smiles:smiles,name:name,context:context
    });
  }
  function renderCaseHeader() {
    var path=currentPath();
    if(!path)return;
    elem("case-eyebrow").textContent="Geführter Lernweg · "+path.id;
    elem("case-title").textContent=path.title;
    elem("case-intro").textContent=path.intro||path.question;
    elem("case-molecules").innerHTML=path.molecules.map(function(mol,i){
      var kind=mol.kind||(i===0?"Alkohol":"Ether");
      var formula=mol.formula==="C2H6O"?"C₂H₆O":mol.formula;
      return '<div><strong>'+escapeHtml(mol.name)+'</strong><small>'+
        escapeHtml(kind)+' · '+escapeHtml(formula)+'</small><code>'+
        escapeHtml(mol.smiles)+'</code>'+
        '<button type="button" class="copy-mini" data-copy="'+escapeHtml(mol.smiles)+
        '" aria-label="SMILES von '+escapeHtml(mol.name)+' kopieren">SMILES kopieren</button>'+
        '<a id="case-handoff-'+i+'" class="case-handoff" href="'+escapeHtml(toolUrl("MOLLAB_PRO"))+
        '" target="_blank" rel="noopener noreferrer">In 2D/3D betrachten ↗</a></div>';
    }).join("");
    path.molecules.forEach(function(mol,i) {
      var a=elem("case-handoff-"+i);
      if(!a)return;
      try {
        a.href=molLink(mol.smiles,mol.name,path.id);
        a.title=mol.name+" im MOLLAB_PRO-Editor laden";
      } catch(error) {
        a.removeAttribute("href");a.title=error.message;
      }
    });
  }
  function showView(view,updateHash) {
    if(!VIEWS.includes(view))view="start";
    state.view=view;persist();clearNotice();
    VIEWS.forEach(function(item){elem("view-"+item).hidden=(item!==view);});
    document.querySelectorAll(".nav-btn[data-view]").forEach(function(btn){
      if(btn.dataset.view===view)btn.setAttribute("aria-current","page");
      else btn.removeAttribute("aria-current");
    });
    if(view==="aufgabe"){renderCaseHeader();renderStep();}
    if(view==="frei")renderFree();
    if(view==="start")renderHome();
    if(updateHash && window.location.hash!=="#"+view)window.location.hash=view;
    window.scrollTo({top:0,behavior:"instant"});
  }
  function selectCase(id) {
    if(!data || !data.learning_paths.some(function(x){return x.id===id;}))return;
    state.caseId=id;persist();
    var url=new URL(window.location.href);
    if(id==="MW-002")url.searchParams.set("case",id);
    else url.searchParams.delete("case");
    url.hash="aufgabe";
    window.history.replaceState(null,"",url.href);
    showView("aufgabe",false);
  }
  function renderHome() {
    var first=document.querySelector('[data-action="start-case"]');
    var next=document.querySelector('[data-action="select-case"][data-case="MW-002"]');
    if(first)first.textContent=state.done||state.step>0||state.hypothesis ?
      "An MW-001 weiterarbeiten →" : "Vergleich MW-001 starten →";
    var b=state.cases["MW-002"];
    if(next)next.textContent=b.done||b.step>0||b.hypothesis ?
      "An MW-002 weiterarbeiten →" : "MW-002 beginnen →";
  }
  function stepTo(value){
    activeNotes().step=Math.max(0,Math.min(3,value));
    persist();renderStep();
  }
  function renderStatus(){
    var notes=activeNotes();
    var n=NOTE_FIELDS.filter(function(field){return notes[field].trim().length>0;}).length;
    var text=n+" von 4 Notizfeldern bearbeitet";
    if(notes.investigated)text+=" · externe Untersuchung selbst bestätigt";
    if(notes.done)text+=" · Abschluss markiert";
    elem("case-status").textContent=text+".";
  }
  function renderStep(){
    var path=currentPath(), notes=activeNotes();
    if(!path)return;
    var step=notes.step;
    elem("step-fraction").textContent="Schritt "+(step+1)+" von 4";
    elem("steps").innerHTML=STEPS.map(function(label,i){
      return '<button type="button" data-step="'+i+'" class="step-button'+
        (i<step?' step-done':'')+'"'+(i===step?' aria-current="step"':'')+
        '><span class="step-line" aria-hidden="true"></span><span>'+(i+1)+
        '. '+label+'</span></button>';
    }).join("");
    var content="";
    if(step===0){
      content=
        '<p class="eyebrow dark">Schritt 1 · eigene Idee</p>'+
        '<h4>Was vermutest du?</h4>'+
        '<p class="question">'+escapeHtml(path.question)+'</p>'+
        '<p>'+escapeHtml(path.predictionHint)+'</p>'+
        '<label class="field-label" for="field-hypothesis">Deine erste Vermutung</label>'+
        '<textarea id="field-hypothesis" data-field="hypothesis" maxlength="4000" placeholder="Ich vermute, dass …">'+
        escapeHtml(notes.hypothesis)+'</textarea>'+
        '<p class="example-input">Hier erfolgt bewusst noch keine Bewertung. Halte fest, was du vor der Untersuchung denkst.</p>';
    }else if(step===1){
      var guide=path.notebookSteps.map(function(line){
        var k=line.indexOf(":");
        return '<li>'+(k>=0?'<strong>'+escapeHtml(line.slice(0,k))+':</strong> '+
          escapeHtml(line.slice(k+1).trim()):escapeHtml(line))+'</li>';
      }).join("");
      content=
        '<p class="eyebrow dark">Schritt 2 · digital untersuchen</p>'+
        '<h4>Vergleiche die beiden Moleküle</h4>'+
        '<p>'+escapeHtml(path.investigationIntro)+'</p>'+
        '<div class="callout"><strong>Im Notebook – vier kurze Schritte:</strong>'+
        '<ol class="notebook-steps">'+guide+'</ol></div>'+
        '<div class="lab-launch"><a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="'+
        escapeHtml(toolUrl("MOL_LAB_DIDACTIC"))+'">MOL_LAB DIDACTIC öffnen ↗</a>'+
        '<span class="tool-note">Die Werkstatt bleibt in diesem Tab geöffnet. Eine Colab-Laufzeit ist erforderlich.</span></div>'+
        '<label class="check-row"><input type="checkbox" id="investigated"'+
        (notes.investigated?' checked':'')+'>Ich habe den Vergleich im externen Werkzeug selbst durchgeführt.</label>'+
        '<label class="field-label" for="field-observation">'+escapeHtml(path.observationPrompt||"Was hast du beobachtet?")+'</label>'+
        '<textarea id="field-observation" data-field="observation" maxlength="4000" placeholder="'+
        escapeHtml(path.observationPlaceholder)+'">'+escapeHtml(notes.observation)+'</textarea>'+
        (path.id==="MW-002"?
        '<p class="example-input">Hinweis: H₂S ist giftig. Diese Aufgabe nutzt digitale Modelle und bekannte Stoffdaten – kein Schulversuch mit Schwefelwasserstoff.</p>':
        '<p class="example-input">Die Durchführungsbestätigung stammt von dir. Es gibt keine automatische Ergebnis-Rückgabe aus Colab.</p>');
    }else if(step===2){
      content=
        '<p class="eyebrow dark">Schritt 3 · chemisch begründen</p>'+
        '<h4>Wie erklärst du die Unterschiede?</h4>'+
        '<p class="question">'+escapeHtml(path.interpretationQuestion)+'</p>'+
        '<label class="field-label" for="field-interpretation">Deine Begründung</label>'+
        '<textarea id="field-interpretation" data-field="interpretation" maxlength="4000" placeholder="'+
        escapeHtml(path.interpretationPlaceholder)+'">'+escapeHtml(notes.interpretation)+'</textarea>'+
        '<div class="reveal">'+
          (notes.explanation?
            '<div class="answer-box"><strong>Fachliche Erklärung</strong>'+
            path.explanation.map(function(p){return '<p>'+escapeHtml(p)+'</p>';}).join("")+'</div>':
            '<button type="button" class="btn btn-outline" data-action="reveal-answer">Erklärung anzeigen – erst nach eigener Überlegung</button>')+
        '</div>';
    }else{
      content=
        '<p class="eyebrow dark">Schritt 4 · Erkenntnisse sichern</p>'+
        '<h4>Was nimmst du aus dem Vergleich mit?</h4>'+
        '<p>'+escapeHtml(path.conclusionPrompt)+'</p>'+
        '<label class="field-label" for="field-conclusion">Dein Fazit</label>'+
        '<textarea id="field-conclusion" data-field="conclusion" maxlength="4000" placeholder="'+
        escapeHtml(path.conclusionPlaceholder)+'">'+escapeHtml(notes.conclusion)+'</textarea>'+
        '<div class="callout secondary"><strong>Dein persönlicher Ergebnistext</strong>'+
        '<p>Nur deine Notizen und der Arbeitsauftrag; keine automatische Übertragung an einen Server.</p>'+
        '<div class="report-actions">'+
        '<button type="button" class="btn btn-secondary" data-action="copy-report">Protokoll kopieren</button>'+
        '<button type="button" class="btn btn-outline" data-action="download-report">Als .md speichern</button></div>'+
        '<pre class="report" id="report-preview">'+escapeHtml(buildReport())+'</pre></div>';
    }
    elem("step-body").innerHTML=content;
    elem("prev-step").disabled=step===0;
    elem("next-step").textContent=step===3?(notes.done?"Zur Übersicht →":"Aufgabe abschließen →"):"Weiter →";
    renderStatus();
  }
  function buildReport(){
    var path=currentPath(),notes=activeNotes();
    return "# MOLEKÜL-WERKSTATT – "+path.id+"\n\n"+
      "**Leitfrage:** "+path.question+"\n"+
      "**Moleküle:** "+path.molecules.map(function(m){return m.name+" ("+m.smiles+")";}).join("; ")+"\n"+
      "\n## Vermutung\n"+(notes.hypothesis.trim()||"(nicht eingetragen)")+
      "\n\n## Beobachtungen\n"+(notes.observation.trim()||"(nicht eingetragen)")+
      "\n\n## Deutung\n"+(notes.interpretation.trim()||"(nicht eingetragen)")+
      "\n\n## Fazit\n"+(notes.conclusion.trim()||"(nicht eingetragen)")+
      "\n\n**Durchführung in MOL_LAB DIDACTIC:** "+(notes.investigated?"von mir bestätigt":"nicht bestätigt")+
      "\n**Hinweis:** Eigene Aufzeichnungen; keine automatische Auswertung oder Leistungsbeurteilung.\n";
  }
  function renderFree(){
    if(!data)return;
    elem("example-chips").innerHTML=data.free_examples.map(function(item,i){
      return '<button type="button" class="example-chip" data-example="'+i+
        '" aria-pressed="'+(i===state.selectedExample?'true':'false')+'">'+escapeHtml(item.name)+'</button>';
    }).join("");
    elem("free-smiles").value=state.freeSmiles;
    updateFreeLink();
    if(toolUrl("MOL_LAB"))elem("free-colab-link").href=toolUrl("MOL_LAB");
  }
  function updateFreeLink(){
    if(!toolData)return;
    var link=elem("free-mollab-link"),info=elem("free-transfer-status");
    var smiles=state.freeSmiles.trim(),chosen=data&&data.free_examples[state.selectedExample];
    var name=chosen&&chosen.smiles===smiles?chosen.name:"Eigenes Molekül";
    if(!smiles){
      link.href=toolUrl("MOLLAB_PRO");link.textContent="MOLLAB_PRO ohne Molekül öffnen ↗";
      info.textContent="Ohne gewählten SMILES wird der 2D-Sketcher leer geöffnet.";
      return;
    }
    try{
      link.href=molLink(smiles,name,"frei");
      link.textContent=name+" in MOLLAB_PRO öffnen ↗";
      info.textContent="Die 2D-Struktur wird direkt übernommen. Die 3D-Erzeugung startest du dort selbst.";
    }catch(error){
      link.href=toolUrl("MOLLAB_PRO");
      link.textContent="MOLLAB_PRO ohne Übergabe öffnen ↗";
      info.textContent="Übergabe nicht möglich: "+error.message;
    }
  }
  async function copyText(text){
    if(!text){notice("Kein Text zum Kopieren eingetragen.");return;}
    try{await navigator.clipboard.writeText(text);notice("Text in die Zwischenablage kopiert.");}
    catch(error){
      var tmp=document.createElement("textarea");
      tmp.value=text;tmp.style.position="fixed";tmp.style.left="-9999px";
      document.body.appendChild(tmp);tmp.select();
      var success=document.execCommand("copy");tmp.remove();
      notice(success?"Text in die Zwischenablage kopiert.":"Bitte Text markieren und manuell kopieren.");
    }
  }
  function downloadReport(){
    var path=currentPath();
    var content=new Blob([buildReport()],{type:"text/markdown;charset=utf-8"});
    var url=URL.createObjectURL(content),a=document.createElement("a");
    a.href=url;a.download=path.id+"_Molekuelvergleich.md";
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(function(){URL.revokeObjectURL(url);},1000);
  }
  function resetCurrentCase(){
    var id=state.caseId;
    if(!window.confirm("Nur den Arbeitsstand von "+id+" auf diesem Gerät zurücksetzen?"))return;
    if(id==="MW-001"){
      Object.keys(emptyCase).forEach(function(k){state[k]=emptyCase[k];});
    }else{
      state.cases["MW-002"]=Object.assign({},emptyCase);
    }
    persist();renderStep();
    notice(id+" wurde zurückgesetzt; andere Aufgaben bleiben erhalten.");
  }
  document.addEventListener("click",function(event){
    var item=event.target.closest("[data-view]");
    if(item){showView(item.dataset.view,true);return;}
    item=event.target.closest("[data-view-link]");
    if(item){event.preventDefault();showView(item.dataset.viewLink,true);return;}
    item=event.target.closest("[data-step]");
    if(item&&state.view==="aufgabe"){stepTo(Number(item.dataset.step));return;}
    item=event.target.closest("[data-example]");
    if(item&&data){
      var example=data.free_examples[Number(item.dataset.example)];
      if(example){
        state.selectedExample=Number(item.dataset.example);state.freeSmiles=example.smiles;
        persist();renderFree();
      }
      return;
    }
    item=event.target.closest("[data-copy]");
    if(item){copyText(item.dataset.copy);return;}
    var button=event.target.closest("[data-action]");
    if(!button)return;
    switch(button.dataset.action){
      case "start-case":selectCase("MW-001");break;
      case "select-case":selectCase(button.dataset.case);break;
      case "prev-step":stepTo(activeNotes().step-1);break;
      case "next-step":
        if(activeNotes().step<3)stepTo(activeNotes().step+1);
        else{
          activeNotes().done=true;persist();showView("start",true);
          notice(state.caseId+" ist als abgeschlossen markiert. Du kannst ihn erneut öffnen.");
        }
        break;
      case "reveal-answer":activeNotes().explanation=true;persist();renderStep();break;
      case "copy-report":copyText(buildReport());break;
      case "download-report":downloadReport();break;
      case "reset-case":resetCurrentCase();break;
      case "copy-free-smiles":copyText(state.freeSmiles.trim());break;
    }
  });
  document.addEventListener("input",function(event){
    var input=event.target,field=input.dataset.field;
    if(NOTE_FIELDS.includes(field)){
      var notes=activeNotes();
      notes[field]=input.value.slice(0,4000);notes.done=false;
      persist();renderStatus();
      if(notes.step===3 && elem("report-preview"))elem("report-preview").textContent=buildReport();
    }
    if(input.id==="free-smiles"){
      state.freeSmiles=input.value.slice(0,3000);state.selectedExample=-1;
      persist();
      document.querySelectorAll("[data-example]").forEach(function(chip){chip.setAttribute("aria-pressed","false");});
      updateFreeLink();
    }
  });
  document.addEventListener("change",function(event){
    if(event.target.id==="investigated"){
      var notes=activeNotes();
      notes.investigated=event.target.checked;notes.done=false;persist();renderStatus();
    }
  });
  function handleLocation(){
    var requested=new URLSearchParams(window.location.search).get("case");
    if(requested==="MW-001"||requested==="MW-002")state.caseId=requested;
    var view=window.location.hash.slice(1);
    showView(VIEWS.includes(view)?view:state.view,false);
  }
  window.addEventListener("hashchange",handleLocation);
  window.addEventListener("popstate",handleLocation);
  Promise.all([
    fetch("./data/learning_paths.json").then(function(r){if(!r.ok)throw Error("Lernwege nicht geladen");return r.json();}),
    fetch("./data/tools.json").then(function(r){if(!r.ok)throw Error("Werkzeugliste nicht geladen");return r.json();})
  ]).then(function(result){
    data=result[0];toolData=result[1];
    if(!Array.isArray(data.learning_paths)||data.learning_paths.length<2 ||
       !["MW-001","MW-002"].every(function(id){return data.learning_paths.some(function(p){
         return p.id===id&&p.molecules.length===2&&p.notebookSteps.length===4&&p.explanation.length>=2;
       });}))throw Error("Lernwege unvollständig");
    var selected=data.free_examples[state.selectedExample];
    if(state.selectedExample>=0 && (!selected||selected.smiles!==state.freeSmiles))state.selectedExample=-1;
    handleLocation();persist();
    if(!canSave)notice("Lokales Speichern ist deaktiviert. Notizen vor dem Schließen kopieren.");
  }).catch(function(error){
    notice("Aufgabendaten konnten nicht geladen werden. Bitte neu laden. ("+error.message+")");
    document.querySelectorAll('[data-action="start-case"],[data-action="select-case"]').forEach(function(b){b.disabled=true;});
  });
})();